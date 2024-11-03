import Nav from "../components/header/Nav";

export default function ErrorSyteam() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full">
        <Nav />
      </header>
      <main className="mt-[5rem]">
        <h1 className="text-4xl text-center font-bold text-red-600">
          500 - Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Xin lỗi vì sự cố không muong muốn này
        </p>
      </main>
    </div>
  );
}
