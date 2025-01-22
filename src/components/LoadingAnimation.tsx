import { Loader2 } from "lucide-react";

export default function LoadingAnimation() {
  return (
    <div className="flex h-96 items-center justify-center rounded-lg border border-gray-200 bg-white">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );
}
