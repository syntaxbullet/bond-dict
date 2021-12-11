import { AiFillDelete, AiFillPlaySquare } from "react-icons/ai";
export default function Pattern(props) {
  const patternDataElements = props.patternData.map((patternData, index) => {
    return (
      <div
        className="pattern odd:bg-blue-400 py-2 flex-initial rounded-full"
        style={{ width: patternData / 100 + "%" }}
      ></div>
    );
  });
  return (
    <div className="flex-col sm:w-4/5 w-5/6 border-gray-800 border-2 p-2 hover:border-gray-600">
      <div className="flex justify-between text-gray-500 text-xl">
        <AiFillPlaySquare
          className="hover:text-gray-100"
          onClick={() => navigator.vibrate(props.patternData)}
        ></AiFillPlaySquare>
        <div className="patternwrapper flex flex-grow mx-4">
          {patternDataElements}
        </div>
        <AiFillDelete className="hover:text-gray-100" />
      </div>
      <label className="text-center w-full block text-gray-500">
        {props.label}
      </label>
    </div>
  );
}
