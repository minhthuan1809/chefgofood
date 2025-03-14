export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#b17741] to-[#b17741]">
      <main className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-5xl font-extrabold text-red-600">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 text-white bg-[#b17741] rounded hover:bg-[#b17741] transition duration-300"
        >
          Go to Home
        </a>
      </main>
    </div>
  );
}
