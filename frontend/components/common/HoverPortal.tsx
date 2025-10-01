import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface HoverPortalProps {
  children: ReactNode;
}

const HoverPortal = ({ children }: HoverPortalProps) => {
  const mount = document.getElementById("hover-layer");
  if (!mount) return null;
  return createPortal(children, mount);
};

export default HoverPortal;
