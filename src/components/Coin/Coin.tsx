import React from "react";

import CoinImg from "../../assets/images/coin.png";

interface ICoinProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const Coin: React.FC<ICoinProps> = React.memo(
  ({ size = 10, style = {}, className, onClick = () => {} }) => {
    return (
      <img
        src={CoinImg}
        className={className}
        style={{
          width: size,
          height: size,
          position: "relative",
          marginInline: "2px 6px",
          ...style,
        }}
        alt=""
        onClick={onClick}
      />
    );
  }
);

export default Coin;
