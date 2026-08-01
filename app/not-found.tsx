import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center gap-4 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Go back to the home page
        </Link>
      </main>
    </div>
  );
}
