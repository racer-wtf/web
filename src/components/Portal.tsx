import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
}

const Portal = ({ children }: Props) => {
  const element = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(element.current);
    return () => {
      document.body.removeChild(element.current);
    };
  }, []);

  return createPortal(children, element.current);
};

export default Portal;
