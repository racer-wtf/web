import { useCallback, useEffect, useMemo } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import Portal from "../Portal";
import CloseButton from "./CloseButton";
import Color from "color";
import "./index.css";

const styles = {
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100%",
    background: "#000000dd",
    zIndex: 100,
    animation: "fadeIn 150ms ease",
  },
  overlayMobile: {
    alignItems: "flex-end",
    borderBottom: "none",
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
  color?: string;
}

const stopPropagation: React.MouseEventHandler<unknown> = (event) =>
  event.stopPropagation();

const Modal = ({ open, onClose, width, title, children, color = "#222" }: Props) => {
  const isMobile = useBreakpoint(580);
  const borderColor = useMemo(
    () =>
      Color(color).luminosity() < 0.1
        ? Color(color).mix(Color("#fff")).string()
        : color,
    [color]
  );

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
      <RemoveScroll>
        <div
          style={{
            ...styles.overlay,
            ...(isMobile ? styles.overlayMobile : {}),
          }}
          onClick={handleBackdropClick}
        >
          <div
            style={{
              ...styles.modal,
              width: widthMap[width],
              ...(isMobile
                ? { borderTop: `1px solid ${borderColor}` }
                : { border: `1px solid ${borderColor}` }),
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
      </RemoveScroll>
    </Portal>
  );
};

export default Modal;
