import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl w-full text-center mt-5">
        Hello there, Welcome to the Todo App!!
      </h1>
      <div className="w-full h-[90vh] flex flex-col justify-center items-center gap-5">
        <div>
          <button className="bg-red-600 rounded-lg px-4 py-1"><Link href="/signup">Sign Up</Link></button>
        </div>
        <div>
          <button className="bg-blue-600 rounded-lg px-4 py-1"><Link href="/signin">Sign In</Link></button>
        </div>
      </div>
    </div>
  );
}
