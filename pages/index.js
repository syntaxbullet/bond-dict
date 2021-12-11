import Link from "next/link";
export default function Home() {
  return (
    <div className="flex sm:w-screen justify-center items-center h-screen flex-col mx-auto bg-gray-900">
      <h1 className="sm:text-4xl text-3xl font-bold text-gray-100 text-center">
        Our bond touch pattern dictionary
      </h1>
      <p className="sm:text-lg text-md text-gray-500 my-1 text-center">
        Record a pattern for the Bond touch partner bracelet.
      </p>
      <div className="flex items-center p-4 sm:flex-row flex-col w-2/3 justify-center">
        <button className="mx-2 sm:my-0 mb-2 bg-red-400 hover:bg-red-500 text-gray-900 font-bold py-3 px-4 rounded flex align-center">
          Record a pattern
        </button>
        <Link href="/browse">
          <button className="mx-2 sm:my-0 my-2 bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-3 px-4 rounded flex align-center">
            Browse patterns
          </button>
        </Link>
      </div>
    </div>
  );
}
