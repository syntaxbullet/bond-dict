import { useEffect, useState } from "react";
export default function Home() {
  const [Status, setStatus] = useState("ready");
  const [StartingTime, setStartingTime] = useState(0);
  const [EndingTime, setEndingTime] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const convertTime = (time) => {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  };

  return (
    <div className="flex w-screen items-center h-screen flex-col justify-center bg-gray-900 text-gray-100 py-16">
      <div className="flex items-center w-5/6 justify-around text-gray-500 toolbar">
        <span
          className={
            Status == "recording" ? "text-red-500 font-bold" : "status"
          }
        >
          {Status}
        </span>
      </div>
      <button
        className="mx-2 sm:my-0 my-2 bg-gray-500 hover:bg-gray-600 text-gray-900 font-bold py-3 px-4 rounded flex align-center my-8"
        onMouseDown={DownHandler}
        onMouseUp={UpHandler}
      >
        Browse patterns
      </button>
      <div>
        elapsed:
        {StartingTime && EndingTime ? Math.abs(EndingTime - StartingTime) : 0}
      </div>
      <div>{isPause ? "paused" : "recording"}</div>
    </div>
  );
}
