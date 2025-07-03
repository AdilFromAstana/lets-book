import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./AnimationLayer.css";

interface AnimationLayerProps {
  inProp: boolean;
}

const AnimationLayer: React.FC<AnimationLayerProps> = ({ inProp }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={inProp}
      timeout={1000}
      classNames="layer"
      unmountOnExit
      nodeRef={nodeRef} // 👈 обязательно
    >
      <div ref={nodeRef} className="layer">
        dwad
      </div>
    </CSSTransition>
  );
};

export default AnimationLayer;
