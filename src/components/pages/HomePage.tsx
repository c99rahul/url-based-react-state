import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to Our Store
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A demo of URL-based state management in React using a dummy API to
            create a store-like utility where URL and search (query) parameters
            control views.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link
              to="https://github.com/c99rahul/url-based-react-state"
              target="_blank"
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-gray-400"
            >
              Fork this on GitHub
            </Link>
            <Link
              to="/products"
              className="rounded-lg border border-gray-900 bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Go to Products page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
