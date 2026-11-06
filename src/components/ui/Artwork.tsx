import type { ArtworkVariant } from "@/types";

/**
 * Art-directed SVG scenes used as clearly-labelled placeholders until real
 * project media is supplied. They are lightweight, resolution-independent and
 * never pretend to be client photography.
 */
interface ArtworkProps {
  variant: ArtworkVariant;
  tone?: number;
  className?: string;
}

export function Artwork({ variant, tone = 0, className }: ArtworkProps) {
  const id = `aw-${variant}-${tone}`.replace(/[^a-z0-9-]/gi, "");
  const Scene = scenes[variant];
  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className ?? "absolute inset-0 h-full w-full"}
      style={tone ? { filter: `hue-rotate(${tone}deg)` } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <Scene id={id} />
    </svg>
  );
}

type SceneProps = { id: string };

function Defs({ id, warm = "#e9b77a" }: SceneProps & { warm?: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={warm} stopOpacity="0.9" />
        <stop offset="100%" stopColor={warm} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-purple`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9d6cff" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#6a46a3" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={warm} stopOpacity="0.45" />
        <stop offset="100%" stopColor={warm} stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a2119" />
        <stop offset="100%" stopColor="#0d0b0a" />
      </linearGradient>
      <linearGradient id={`${id}-vignette`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
        <stop offset="40%" stopColor="#000" stopOpacity="0" />
        <stop offset="75%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  );
}

const Vignette = ({ id }: SceneProps) => <rect width="1600" height="1000" fill={`url(#${id}-vignette)`} />;

function Interior({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} />
      <rect width="1600" height="1000" fill="#18130f" />
      {/* back wall panels */}
      <rect x="260" y="120" width="1080" height="560" fill="#241c16" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={300 + i * 115} y="150" width="3" height="520" fill="#1a140f" opacity="0.8" />
      ))}
      {/* window */}
      <rect x="1060" y="190" width="220" height="380" fill="#cfa877" opacity="0.55" />
      <rect x="1166" y="190" width="6" height="380" fill="#241c16" />
      <polygon points="1060,190 1280,190 900,1000 420,1000" fill={`url(#${id}-beam)`} opacity="0.55" />
      {/* floor */}
      <polygon points="0,1000 260,680 1340,680 1600,1000" fill={`url(#${id}-floor)`} />
      <polygon points="0,0 260,120 260,680 0,1000" fill="#120e0b" />
      <polygon points="1600,0 1340,120 1340,680 1600,1000" fill="#15100c" />
      {/* rug */}
      <polygon points="430,880 600,740 1060,740 1210,880" fill="#3b2f25" opacity="0.8" />
      {/* sofa */}
      <rect x="470" y="560" width="560" height="150" rx="26" fill="#5b4a3c" />
      <rect x="490" y="500" width="520" height="110" rx="30" fill="#6b5847" />
      <rect x="440" y="560" width="70" height="150" rx="24" fill="#4e3f33" />
      <rect x="990" y="560" width="70" height="150" rx="24" fill="#4e3f33" />
      {/* side table + lamp */}
      <rect x="1110" y="610" width="90" height="100" fill="#2e241c" />
      <rect x="1150" y="470" width="8" height="140" fill="#1a140f" />
      <path d="M1110 470 L1200 470 L1180 410 L1130 410 Z" fill="#e9c999" />
      <circle cx="1155" cy="460" r="150" fill={`url(#${id}-glow)`} opacity="0.55" />
      {/* pendant */}
      <rect x="760" y="0" width="3" height="230" fill="#0c0907" />
      <ellipse cx="762" cy="245" rx="55" ry="22" fill="#e6c08a" />
      <circle cx="762" cy="260" r="220" fill={`url(#${id}-glow)`} opacity="0.35" />
      {/* art on wall */}
      <rect x="560" y="250" width="380" height="190" fill="#2f251d" stroke="#3d3127" strokeWidth="6" />
      <circle cx="680" cy="345" r="60" fill="#6a46a3" opacity="0.5" />
      <Vignette id={id} />
    </>
  );
}

function Bedroom({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} warm="#f0c38c" />
      <rect width="1600" height="1000" fill="#16110e" />
      <rect x="200" y="100" width="1200" height="620" fill="#221a15" />
      <polygon points="0,1000 200,720 1400,720 1600,1000" fill={`url(#${id}-floor)`} />
      {/* headboard */}
      <rect x="480" y="360" width="640" height="260" rx="10" fill="#3d3027" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={500 + i * 78} y="375" width="62" height="230" rx="8" fill="#463830" />
      ))}
      {/* bed */}
      <rect x="440" y="600" width="720" height="170" rx="16" fill="#cbbba8" />
      <rect x="440" y="680" width="720" height="90" rx="10" fill="#8c7a68" />
      <rect x="520" y="560" width="200" height="70" rx="26" fill="#e7dccd" />
      <rect x="880" y="560" width="200" height="70" rx="26" fill="#e7dccd" />
      {/* lamps */}
      {[330, 1270].map((x) => (
        <g key={x}>
          <rect x={x - 50} y="620" width="100" height="120" fill="#2b221b" />
          <path d={`M${x - 45} 520 L${x + 45} 520 L${x + 30} 460 L${x - 30} 460 Z`} fill="#f2d2a2" />
          <circle cx={x} cy="510" r="200" fill={`url(#${id}-glow)`} opacity="0.5" />
        </g>
      ))}
      <Vignette id={id} />
    </>
  );
}

function Door({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} />
      <rect width="1600" height="1000" fill="#09080b" />
      <ellipse cx="800" cy="980" rx="700" ry="90" fill={`url(#${id}-purple)`} opacity="0.5" />
      {/* door frame + light */}
      <rect x="640" y="180" width="320" height="700" fill="#b996ff" />
      <rect x="640" y="180" width="320" height="700" fill={`url(#${id}-purple)`} />
      <polygon points="640,880 960,880 1300,1000 300,1000" fill="#8f6ad8" opacity="0.35" />
      {/* door panel ajar */}
      <polygon points="640,180 760,215 760,915 640,880" fill="#3a2662" />
      <circle cx="742" cy="560" r="7" fill="#d9c8ff" />
      <rect x="620" y="160" width="360" height="20" fill="#121015" />
      <rect x="620" y="160" width="20" height="720" fill="#121015" />
      <rect x="960" y="160" width="20" height="720" fill="#121015" />
      <Vignette id={id} />
    </>
  );
}

function Commercial({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} warm="#d7d2ff" />
      <rect width="1600" height="1000" fill="#0b0a10" />
      <rect x="0" y="0" width="1600" height="1000" fill={`url(#${id}-purple)`} opacity="0.35" />
      {/* spotlight cone */}
      <polygon points="740,0 860,0 1160,1000 440,1000" fill={`url(#${id}-beam)`} opacity="0.5" />
      <ellipse cx="800" cy="860" rx="360" ry="60" fill="#d7d2ff" opacity="0.18" />
      {/* garment on hanger */}
      <path d="M800 260 l0 -30 a22 22 0 1 1 22 -22" stroke="#cfcbe0" strokeWidth="6" fill="none" />
      <path
        d="M800 260 L640 330 L590 520 L660 540 L680 450 L690 800 L910 800 L920 450 L940 540 L1010 520 L960 330 Z"
        fill="#2b3a7a"
      />
      <path d="M800 260 L760 300 L800 420 L840 300 Z" fill="#203063" />
      <rect x="770" y="330" width="6" height="440" fill="#1c2756" />
      {[380, 460, 540, 620, 700].map((y) => (
        <circle key={y} cx="790" cy={y} r="6" fill="#cfcbe0" opacity="0.7" />
      ))}
      <rect x="840" y="460" width="70" height="60" fill="#22306a" stroke="#3a4b94" strokeWidth="3" />
      <Vignette id={id} />
    </>
  );
}

function Product({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} warm="#f6e3c3" />
      <rect width="1600" height="1000" fill="#0c0b0e" />
      <circle cx="800" cy="420" r="520" fill={`url(#${id}-purple)`} opacity="0.4" />
      <polygon points="760,0 840,0 1080,1000 520,1000" fill={`url(#${id}-beam)`} opacity="0.45" />
      {/* plinth */}
      <ellipse cx="800" cy="700" rx="260" ry="44" fill="#2a2730" />
      <rect x="540" y="700" width="520" height="300" fill="#1c1a21" />
      <ellipse cx="800" cy="700" rx="260" ry="44" fill="#34303b" />
      {/* bottle */}
      <rect x="730" y="400" width="140" height="300" rx="28" fill="#2d1f45" />
      <rect x="730" y="400" width="34" height="300" rx="17" fill="#f6e3c3" opacity="0.35" />
      <rect x="770" y="330" width="60" height="80" rx="8" fill="#1b1325" />
      <rect x="760" y="500" width="80" height="110" fill="#65449b" opacity="0.85" />
      <ellipse cx="800" cy="702" rx="90" ry="12" fill="#000" opacity="0.6" />
      <Vignette id={id} />
    </>
  );
}

function Food({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} warm="#ffcf8a" />
      <rect width="1600" height="1000" fill="#130d09" />
      <circle cx="1300" cy="120" r="520" fill={`url(#${id}-glow)`} opacity="0.35" />
      {/* tray */}
      <rect x="260" y="300" width="1080" height="560" rx="30" fill="#2c1f16" transform="rotate(-6 800 580)" />
      {[
        [470, 450],
        [720, 420],
        [970, 400],
        [1200, 380],
        [500, 680],
        [760, 650],
        [1010, 630],
        [1240, 600],
      ].map(([x, y], i) => (
        <g key={i} transform={`rotate(${i * 23} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="110" ry="70" fill="#c98a41" />
          <ellipse cx={x! - 20} cy={y! - 15} rx="70" ry="35" fill="#e5b06a" opacity="0.8" />
          <path
            d={`M${x! - 90} ${y} q30 -40 60 0 q30 -40 60 0 q30 -40 60 0`}
            stroke="#8a5523"
            strokeWidth="6"
            fill="none"
            opacity="0.6"
          />
        </g>
      ))}
      <Vignette id={id} />
    </>
  );
}

function Digital({ id }: SceneProps) {
  const phones = [
    [260, 220, -8, "#6a46a3"],
    [600, 160, -2, "#65449b"],
    [940, 200, 4, "#e9b77a"],
    [1280, 140, 9, "#8b5cf6"],
  ] as const;
  return (
    <>
      <Defs id={id} />
      <rect width="1600" height="1000" fill="#0d0c12" />
      <circle cx="800" cy="520" r="620" fill={`url(#${id}-purple)`} opacity="0.35" />
      {phones.map(([x, y, r, c], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y + 330})`}>
          <rect x={x - 140} y={y} width="280" height="580" rx="38" fill="#18161f" stroke="#2c2936" strokeWidth="6" />
          <rect x={x - 120} y={y + 40} width="240" height="300" rx="12" fill={c} opacity="0.75" />
          <circle cx={x - 70} cy={y + 150} r="45" fill="#fff" opacity="0.18" />
          <rect x={x - 120} y={y + 360} width="170" height="14" rx="7" fill="#fff" opacity="0.4" />
          <rect x={x - 120} y={y + 390} width="220" height="10" rx="5" fill="#fff" opacity="0.2" />
          <rect x={x - 120} y={y + 412} width="190" height="10" rx="5" fill="#fff" opacity="0.2" />
          {[0, 1, 2].map((k) => (
            <rect key={k} x={x - 120 + k * 82} y={y + 450} width="74" height="74" rx="8" fill="#fff" opacity="0.08" />
          ))}
        </g>
      ))}
      <Vignette id={id} />
    </>
  );
}

function Bts({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} warm="#f1e6ff" />
      <rect width="1600" height="1000" fill="#0a090d" />
      <circle cx="1180" cy="330" r="420" fill={`url(#${id}-purple)`} opacity="0.5" />
      {/* softbox */}
      <g>
        <polygon points="1040,170 1300,120 1320,420 1060,450" fill="#efe6ff" />
        <polygon points="1040,170 1300,120 1320,420 1060,450" fill={`url(#${id}-glow)`} />
        <line x1="1180" y1="440" x2="1180" y2="930" stroke="#1a1820" strokeWidth="10" />
        <line x1="1180" y1="930" x2="1080" y2="1000" stroke="#1a1820" strokeWidth="8" />
        <line x1="1180" y1="930" x2="1280" y2="1000" stroke="#1a1820" strokeWidth="8" />
      </g>
      {/* camera on tripod */}
      <g fill="#050407">
        <rect x="340" y="420" width="260" height="150" rx="14" />
        <rect x="600" y="455" width="110" height="80" rx="8" />
        <rect x="380" y="380" width="90" height="44" rx="6" />
        <line x1="470" y1="570" x2="380" y2="1000" stroke="#050407" strokeWidth="14" />
        <line x1="470" y1="570" x2="560" y2="1000" stroke="#050407" strokeWidth="14" />
        <line x1="470" y1="570" x2="470" y2="1000" stroke="#050407" strokeWidth="12" />
      </g>
      {/* crew silhouette */}
      <g fill="#060509">
        <circle cx="820" cy="430" r="52" />
        <path d="M720 1000 L740 560 Q820 500 900 560 L930 1000 Z" />
      </g>
      <Vignette id={id} />
    </>
  );
}

function Film({ id }: SceneProps) {
  return (
    <>
      <Defs id={id} warm="#ffb36b" />
      <rect width="1600" height="1000" fill="#0c0a0e" />
      <rect x="0" y="560" width="1600" height="440" fill="#0f0c10" />
      <circle cx="800" cy="560" r="300" fill="#ff9a4d" opacity="0.85" />
      <circle cx="800" cy="560" r="600" fill={`url(#${id}-glow)`} opacity="0.6" />
      <rect x="0" y="560" width="1600" height="440" fill="#0c0a0e" />
      <ellipse cx="800" cy="566" rx="700" ry="10" fill="#ffb36b" opacity="0.6" />
      {/* athlete silhouette */}
      <g fill="#050405">
        <circle cx="820" cy="300" r="40" />
        <path d="M790 340 L860 340 L900 470 L860 480 L840 420 L835 560 L885 720 L850 735 L800 590 L760 735 L725 720 L770 560 L770 420 L740 480 L700 470 Z" />
      </g>
      <rect x="0" y="0" width="1600" height="90" fill="#000" />
      <rect x="0" y="910" width="1600" height="90" fill="#000" />
    </>
  );
}

const scenes: Record<ArtworkVariant, (p: SceneProps) => React.ReactNode> = {
  door: Door,
  interior: Interior,
  "interior-bedroom": Bedroom,
  commercial: Commercial,
  product: Product,
  digital: Digital,
  bts: Bts,
  film: Film,
  food: Food,
};
