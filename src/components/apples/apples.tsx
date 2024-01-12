import { PIXEL_COUNT_PER_ROW, PIXEL_SIZE } from "../../config";
import "./apples.scss";

const RESOLUTION = PIXEL_COUNT_PER_ROW ** 2;
// based on game resoluition
const NUMBER_OF_APPLES = Math.floor(RESOLUTION * 0.013);

console.log({ NUMBER_OF_APPLES, RESOLUTION });

const generateRandomPosition = (): [number, number] => {
  const x = Math.floor(Math.random() * PIXEL_COUNT_PER_ROW);
  const y = Math.floor(Math.random() * PIXEL_COUNT_PER_ROW);
  return [x, y];
};

const generateApples = () => {
  const applesSet: Set<string> = new Set();
  const apples: [number, number][] = [];
  while (applesSet.size <= NUMBER_OF_APPLES) {
    const appleLocation = generateRandomPosition();
    if (
      // prevent repeated apples
      !applesSet.has(appleLocation.join("")) &&
      // prevent apples from spawning on the edges
      appleLocation[0] !== 0 &&
      appleLocation[1] !== 0 &&
      appleLocation[0] !== PIXEL_COUNT_PER_ROW - 1 &&
      appleLocation[1] !== PIXEL_COUNT_PER_ROW - 1
    ) {
      console.log(appleLocation);
      applesSet.add(appleLocation.join(""));
      apples.push(appleLocation);
    }
  }
  return apples;
};

const appleLocations = generateApples();

const Apples = () => {
  return (
    <>
      {appleLocations.map((location) => (
        <div
          className="Apples__apple"
          key={location.join("")}
          style={{
            top: `${PIXEL_SIZE * location[1]}rem`,
            left: `${PIXEL_SIZE * location[0]}rem`,
            width: `${PIXEL_SIZE}rem`,
            height: `${PIXEL_SIZE}rem`,
            fontSize: `${PIXEL_SIZE * 0.7}rem`,
          }}
        >
          🍎
        </div>
      ))}
    </>
  );
};

export default Apples;
