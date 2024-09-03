import DrawComponent from "./components/DrawComponent";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 drop-shadow-lg">
          Draw Page
        </h1>
        <DrawComponent />
      </div>
    </div>
  );
}
