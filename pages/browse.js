import Pattern from "../components/pattern";
export default function Home() {
  return (
    <div className="flex w-screen items-center h-screen flex-col mx-auto bg-gray-900 text-gray-100 py-16">
      <Pattern patternData={[1000, 200, 1000, 200, 2000]} label="hello world" />
    </div>
  );
}
