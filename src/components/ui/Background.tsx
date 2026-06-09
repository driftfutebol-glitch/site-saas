/** Fundo decorativo: grade sutil + orbes neon flutuando. Puramente visual. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base escura */}
      <div className="absolute inset-0 bg-[#06060c]" />

      {/* grade */}
      <div className="grid-bg absolute inset-0" />

      {/* orbes de luz */}
      <div className="animate-float-slow absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.45),transparent_60%)] blur-3xl" />
      <div className="animate-float-slow-2 absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.30),transparent_60%)] blur-3xl" />
      <div className="animate-float-slow absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.25),transparent_60%)] blur-3xl" />

      {/* partículas flutuantes */}
      {Array.from({ length: 22 }).map((_, i) => {
        const left = (i * 47) % 100;
        const top = (i * 71) % 100;
        const size = 2 + (i % 3);
        const duration = 7 + (i % 7);
        const delay = i % 6;
        return (
          <span
            key={i}
            className="animate-particle absolute rounded-full bg-white/40"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}

      {/* vinheta para escurecer as bordas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,6,12,0.85)_100%)]" />
    </div>
  );
}
