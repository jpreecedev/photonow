import React, { FunctionComponent } from "react"

interface ImageStackProps {
  imgSrc: string
  caption?: string
  onClick?: Function
  size?: 225 | 150
  selected?: boolean
}

const ImageStack: FunctionComponent<ImageStackProps> = ({
  imgSrc,
  caption,
  onClick,
  size = 225,
  selected = false
}) => {
  return (
    <div className="stack" onClick={() => onClick && onClick()}>
      <div className="image"></div>
      {caption && <span>{caption}</span>}
      <style jsx>{`
        .image {
          background-image: url("${imgSrc}");
          background-position: center;
          background-size: cover;
          width: 100%;
          height: 100%;
        }
        .stack {
          margin: ${caption ? "50px" : "20px"} auto;
          position: relative;
          cursor: ${onClick ? "pointer" : "default"};
        }
        .stack:before {
          background: #eff4de;
          top: -10px;
          left: -15px;
          transform: rotate(-5deg);
        }
        .stack:after {
          background: #768590;
          top: 5px;
          left: 0px;
          transform: rotate(4deg);
        }
        .stack,
        .stack:before,
        .stack:after {
          border: 6px solid ${selected ? "limegreen" : "white"};
          width: ${size}px;
          height: ${size * 0.8}px;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }
        .stack:before,
        .stack:after {
          content: "";
          position: absolute;
          z-index: -1;
        }
        span {
          position: relative;
          top: 15px;
          margin: 0 auto;
          width: 90%;
          color: #949494;
          font-size: 1rem;
          padding: 10px;
          display: block;
          background: #fafafa;
          text-align: center;
          z-index: -10;
          border-radius: 3px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
        }
      `}</style>
    </div>
  )
}

export { ImageStack }
