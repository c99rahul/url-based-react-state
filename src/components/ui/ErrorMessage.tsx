export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-red-50 p-6 text-red-600">
        Error: {message}
      </div>
    </div>
  );
}
