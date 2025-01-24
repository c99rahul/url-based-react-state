import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-md px-4 py-8 text-center">
        <div className="rounded-lg border border-gray-200 bg-white p-8">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Error</h2>
          <p className="mb-6 text-gray-600">{message}</p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-lg border border-gray-900 bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
