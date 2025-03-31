import { useState, useEffect } from "react";
import "./App.css";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement);

const colorlist = [
  "#Fc143C",
  "#FF6600",
  "#FFD700",
  "#fffd8d",
  "#00C853",
  "#66FF66",
  "#0026FF",
  "#00CFFF",
  "#DE73FF",
  "#FF1493",
];
function App() {
  const [colorAngles, setColorAngles] = useState([
    18, 54, 90, 126, 162, 198, 234, 270, 306, 342,
  ]);
  const [colors, setColors] = useState([...colorlist].reverse());
  const [spin, setSpin] = useState(false);
  const [reset, setReset] = useState(false);
  const [angle, setAngle] = useState(0);
  const [color, setColor] = useState("");

  const randomAngle = () => {
    const angleId = Math.floor(Math.random() * colorAngles.length);
    console.log(angleId);
    console.log(colors);
    const newAngle = colorAngles[angleId] + 360 * 3;
    setAngle(newAngle);
    setTimeout(() => {
      setColor(colors[angleId]);
      setReset(true);
      if (colorAngles.length === 1) {
        setColorAngles([18, 54, 90, 126, 162, 198, 234, 270, 306, 342]);
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
        className="px-15 pb-5 container rounded-3xl"
        style={spin ^ reset ? {} : { boxShadow: `0px 0px 5px 5px ${color}` }}
      >
        <p className="text-7xl pointer">🔻</p>
        <div
          className="mb-10"
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
              maintainAspectRatio: false,
              responsive: true,
            }}
            width={400}
            height={400}
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
