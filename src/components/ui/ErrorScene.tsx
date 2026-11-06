import { Mascot3D } from "./Mascot3D";

interface ErrorSceneProps {
  code: string;
  slate: string;
  lines: [string, string];
  copy: string;
  image: { src: string; alt: string; width: number; height: number; transparent?: boolean };
  /** Max width of the mascot; keep it near the source resolution. */
  frameClass?: string;
  children: React.ReactNode;
}

/**
 * Shared layout for the 404 and error pages: the 3D camera mascot on a lit
 * stage, with a film-slate style label and the page's actions.
 */
export function ErrorScene({ code, slate, lines, copy, image, frameClass = "max-w-md", children }: ErrorSceneProps) {
  return (
    <section className="container-x grid min-h-[100svh] items-center gap-14 pb-20 pt-[calc(var(--nav-h)+3rem)] lg:grid-cols-12 lg:gap-10">
      <div className="order-2 lg:order-1 lg:col-span-6">
        <p className="inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" aria-hidden />
          {slate}
        </p>
        <h1 className="display-l mt-8">
          <span className="block">{lines[0]}</span>
          <span className="accent-italic block">{lines[1]}</span>
        </h1>
        <p className="lead mt-6 max-w-lg">{copy}</p>
        <div className="mt-10 flex flex-wrap gap-3">{children}</div>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-6">
        <Mascot3D {...image} code={code} className={frameClass} />
      </div>
    </section>
  );
}
