import { useState, useEffect } from "react";
import "./App.css";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement);

const colorlist = [
  "#eab100", // Deep Red
  "#3EC70B", // Deep Yellow/Golden
  "#3B44F6", // Deep Green
  "#A149FA", // Deep Bluefdb515
  "#eab100", // Deep Red
  "#3EC70B", // Deep Yellow/Golden
  "#3B44F6", // Deep Green
  "#A149FA",
];
function App() {
  const [colorAngles, setColorAngles] = useState([
    22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5,
  ]); //[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5],[45, 135, 225, 315]
  const [colors, setColors] = useState([...colorlist].reverse());
  const [spin, setSpin] = useState(false);
  const [reset, setReset] = useState(false);
  const [angle, setAngle] = useState(0);
  const [color, setColor] = useState("");

  const randomAngle = () => {
    const angleId = Math.floor(Math.random() * colorAngles.length);
    const newAngle = colorAngles[angleId] + 360 * 3;
    setAngle(newAngle);
    setTimeout(() => {
      setColor(colors[angleId]);
      setReset(true);
      if (colorAngles.length === 1) {
        setColorAngles([22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]);
        setColors([...colorlist].reverse());
      } else {
        setColorAngles((prev) => prev.filter((_, index) => index !== angleId));
        setColors((prev) => prev.filter((_, index) => index !== angleId));
      }
    }, 2000);
  };

  const animate = () => {
    if (spin) return;
    setSpin(true);
    randomAngle();
    setTimeout(() => {
      setAngle(0);
    }, 3500);
    setTimeout(() => {
      setSpin(false);
      setReset(false);
    }, 5500);
  };

  return (
    <div
      className={"p-1 rounded-3xl"}
      style={{
        animation: `rotateGradient 2s linear ${
          spin && !reset ? "infinite" : "0"
        }`,
      }}
    >
      <div
        className="md:px-15 px-3 pb-5 container rounded-3xl"
        style={spin ^ reset ? {} : { boxShadow: `0px 0px 5px 5px ${color}` }}
      >
        <p className="text-7xl pointer">🔻</p>
        <div
          className="mb-10 md:w-md"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: "transform 2s ease-out",
          }}
        >
          <Pie
            data={{
              datasets: [
                {
                  data: Array(colorlist.length).fill(1),
                  backgroundColor: colorlist,
                  borderColor: colorlist.map(() => "#000"), //(color) => `${color}50`   () => "#000"
                  borderWidth: 0,
                },
              ],
            }}
            options={{
              maintainAspectRatio: true,
              responsive: true,
            }}
          />
        </div>
        <button
          onClick={animate}
          disabled={spin}
          className={`mt-4 px-4 py-2 rounded text-white transition-all duration-300
    ${
      spin
        ? reset
          ? "bg-fuchsia-500 hover:shadow-lg hover:shadow-red-300/50"
          : "bg-red-500 hover:shadow-lg hover:shadow-red-300/50"
        : "bg-blue-600 hover:shadow-lg hover:shadow-sky-300/50"
    }
     `}
        >
          {spin ? (reset ? "Resetting..." : "Spinning...") : "Spin"}
        </button>
      </div>
    </div>
  );
}

export default App;
