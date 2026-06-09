import { site } from "@/lib/site";

type Props = {
  className?: string;
  /** Sufixo para deixar o id do gradiente único quando o logo aparece 2x na página. */
  idSuffix?: string;
};

/** Só o símbolo (emblema com gradiente + "F" geométrico). */
export function LogoMark({ className = "", idSuffix = "a" }: Props) {
  const gid = `ferraz-grad-${idSuffix}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={`${site.name}`}
      fill="none"
    >
      <defs>
        <linearGradient id={gid} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* emblema */}
      <rect x="2" y="2" width="44" height="44" rx="13" fill={`url(#${gid})`} />
      {/* borda interna sutil para dar acabamento */}
      <rect
        x="2.75"
        y="2.75"
        width="42.5"
        height="42.5"
        rx="12.25"
        stroke="#ffffff"
        strokeOpacity="0.18"
      />
      {/* "F" geométrico */}
      <path
        d="M16 13 L34 13 L34 19 L22 19 L22 23 L31 23 L31 29 L22 29 L22 35 L16 35 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/** Logo completo: símbolo + nome (com "Code" no gradiente). */
export function Logo({ className = "", idSuffix = "a" }: Props) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark
        idSuffix={idSuffix}
        className="h-9 w-9 drop-shadow-[0_4px_14px_rgba(124,58,237,0.45)]"
      />
      <span className="text-lg font-semibold tracking-tight">
        {site.name.replace(/Code$/, "")}
        <span className="text-gradient">Code</span>
      </span>
    </span>
  );
}
