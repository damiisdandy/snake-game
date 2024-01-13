import "./snake.scss";
import { PIXEL_SIZE } from "../../config";

type Props = {
  position: [number, number];
};

const len = 5;

const Snake = ({ position }: Props) => {
  return (
    <>
      {Array(len)
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map((_, i) => (
          <div
            className="Snake"
            style={{
              width: `${PIXEL_SIZE}rem`,
              height: `${PIXEL_SIZE}rem`,
              top: `${PIXEL_SIZE * position[1]}rem`,
              left: `${PIXEL_SIZE * position[0] - i}rem`,
            }}
          ></div>
        ))}
    </>
  );
};

export default Snake;
