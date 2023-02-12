import { useCallback, useEffect } from "react";
import Portal from "../Portal";
import CloseButton from "./CloseButton";
import "./index.css";

const styles = {
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#000000dd",
    zIndex: 100,
    animation: "fadeIn 150ms ease",
  },
  modal: {
    backgroundColor: "#000",
    padding: "1rem",
    animation:
      "slideUp 350ms cubic-bezier(.15,1.15,0.6,1.00), fadeIn 150ms ease",
    position: "relative",
  },
  top: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
} satisfies Record<string, React.CSSProperties>;

type ModalWidth = "small" | "medium" | "large";

const widthMap: Record<ModalWidth, number> = {
  small: 400,
  medium: 600,
  large: 800,
};

interface Props {
  open: boolean;
  onClose: () => void;
  width: ModalWidth;
  title?: string;
  children: React.ReactNode;
  color: string;
}

const stopPropagation: React.MouseEventHandler<unknown> = (event) =>
  event.stopPropagation();

const Modal = ({ open, onClose, width, title, children, color }: Props) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) =>
      open && event.key === "Escape" && onClose();

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const handleBackdropClick = useCallback(() => onClose(), [onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div
        style={{ ...styles.overlay, display: open ? "flex" : "none" }}
        onClick={handleBackdropClick}
      >
        <div
          style={{
            ...styles.modal,
            width: widthMap[width],
            border: `1px solid ${color}`,
          }}
          onClick={stopPropagation}
        >
          <div style={styles.top}>
            <h2>{title}</h2>
            <CloseButton onClick={onClose} color={color} />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
