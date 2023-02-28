import Color from "color";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useEmojiColor } from "../../hooks/useEmojiColor";
import emojiDict from "emoji.json";
import Button from "../Button";
import Emoji from "../Emoji";
import Input from "../Input";
import Modal from "../Modal";
import racerABI from "../../contracts/Racer.json";
import { environment } from "../../utils/environment";
import { toBytes4 } from "../../utils/bytes";
import { BigNumber } from "ethers";
import { useCycle } from "../../store";
import Ellipsis from "../Ellipsis";

const styles = {
  modalContent: {
    display: "grid",
    gridTemplateAreas: "'emoji description button'",
    gridTemplateColumns: "max-content 3fr 1fr",
    gridTemplateRows: "1fr",
    alignItems: "start",
    gap: "1rem",
    fontFamily: "SFMono, ui-monospace, monospace",
  },
  modalContentMobile: {
    gridTemplateAreas: "'emoji description' 'button button'",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "1fr 1fr",
  },
  modalContentDescription: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
} satisfies Record<string, React.CSSProperties>;

interface Props {
  setModalOpen: (value: boolean) => void;
  emoji?: string;
  value?: number;
  rank?: number;
  total?: number;
  editable: boolean;
}

const VoteModal = ({
  setModalOpen,
  emoji,
  value = 0,
  rank = 0,
  total = 0,
  editable,
}: Props) => {
  const isMobile = useBreakpoint(580);
  const [voteAmount, setVoteAmount] = useState(1);
  const [emoji_, setEmoji] = useState(emoji ?? "");
  const [label, setLabel] = useState("Type en emoji");
  const emojiColor = useEmojiColor(emoji_);

  useEffect(() => {
    if (emoji_) {
      setLabel(emojiDict.find((e) => e.char === emoji_)?.name ?? "Unknown");
    } else {
      setLabel("Type an emoji");
    }
  }, [emoji_]);

  const labelColor = useMemo(() => {
    return Color(emojiColor).alpha(0.6).string();
  }, [emojiColor]);

  const cycleId = useCycle((state) => state.id);

  const { config } = usePrepareContractWrite({
    address: environment.VITE_CONTRACT_ADDRESS,
    abi: racerABI,
    functionName: "placeVote",
    args: [cycleId, toBytes4(emoji_)],
    enabled: Boolean(emoji_) && Boolean(voteAmount),
    overrides: {
      value: BigNumber.from("10000000000000000").mul(voteAmount),
    },
  });
  const { data: tx, write } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    enabled: Boolean(tx),
    chainId: 11155111,
    hash: tx?.hash,
    onSuccess: () => {
      setTimeout(() => {
        setModalOpen(false);
      }, 3000);
    },
    onError: (error) => {
      console.log(error);
      setTimeout(() => {
        setModalOpen(false);
      }, 3000);
    },
  });

  const isSubmitted = isLoading || isSuccess || isError;

  return (
    <Modal
      width="medium"
      title={
        isSuccess ? (
          "Vote Sent!"
        ) : isError ? (
          "Vote Error"
        ) : isLoading ? (
          <Ellipsis text="Sending Transaction" />
        ) : editable ? (
          "Place Custom Vote"
        ) : (
          "Place Vote"
        )
      }
      onClose={() => setModalOpen(false)}
      color={isSuccess ? "green" : isError ? "red" : emojiColor}
    >
      <div
        style={{
          ...styles.modalContent,
          ...(isMobile ? styles.modalContentMobile : {}),
        }}
      >
        <Emoji
          emoji={emoji_}
          setEmoji={setEmoji}
          size={100}
          backgroundColor={labelColor}
          editable={editable}
          loading={isLoading}
        />
        <div style={styles.modalContentDescription}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>{label}</h2>
            <p style={{ marginLeft: 2 }}>{value} votes</p>
            <p style={{ marginLeft: 2, marginTop: "auto" }}>
              #{rank + 1} / {total}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            gridArea: "button",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              alignItems: "center",
              minWidth: 220,
            }}
          >
            <p>{(voteAmount * 0.01 || 0).toFixed(2)} ETH</p>
            <Input
              value={voteAmount.toString()}
              setValue={(value: string) => setVoteAmount(parseInt(value) || 0)}
              type="number"
              min="1"
              max="100000"
              disabled={isSubmitted}
            />
          </div>
          <Button
            color={isLoading ? "#000" : emojiColor}
            onClick={() => write?.()}
            disabled={!emoji_ || isSubmitted}
          >
            Vote
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default VoteModal;
