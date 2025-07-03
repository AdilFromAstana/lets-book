import { useState, useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import "./TransitionEffect.css";

interface TransitionEffectProps {
  children: ReactNode;
}

const TransitionEffect: React.FC<TransitionEffectProps> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAnimating(true); // Начинаем анимацию при смене маршрута
    const timeout = setTimeout(() => setIsAnimating(false), 2000); // 2 секунды для анимации
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="transition-container">
      {isAnimating && (
        <div className="wave-container">
          <svg
            className="wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#0077ff"
              d="M0,192L30,186.7C60,181,120,171,180,165.3C240,160,300,160,360,176C420,192,480,224,540,224C600,224,660,192,720,165.3C780,139,840,117,900,112C960,107,1020,117,1080,133.3C1140,149,1200,171,1260,186.7C1320,203,1380,213,1410,218.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            ></path>
          </svg>
        </div>
      )}
      <div className="content">{children}</div>
    </div>
  );
};

export default TransitionEffect;
