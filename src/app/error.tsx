"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { ErrorScene } from "@/components/ui/ErrorScene";

/** Runtime error boundary for every route (keeps the navbar and footer). */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Technical details only; never user-entered data.
    console.error("[page error]", error.digest ?? error.message);
  }, [error]);

  return (
    <ErrorScene
      code="500"
      slate="Cut! · Technical glitch"
      lines={["That take didn't", "go to plan."]}
      copy="Something went wrong while loading this page. Let's roll the camera again; it usually works on the second take."
      image={{
        src: "/images/mascot/mascot-shooting.webp",
        alt: "The Purple Door camera mascot lining up a shot with a camera",
        width: 266,
        height: 222,
      }}
      frameClass="max-w-xs"
    >
      <button type="button" onClick={reset} className="btn btn-primary">
        <RotateCcw size={16} aria-hidden /> Try again
      </button>
      <Link href="/" className="btn btn-ghost">
        Back to home
      </Link>
    </ErrorScene>
  );
}
