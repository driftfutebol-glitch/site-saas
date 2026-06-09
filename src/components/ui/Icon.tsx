import {
  AppWindow,
  Boxes,
  Car,
  Globe,
  Headset,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Mapa de nomes (usados em site.ts) para os componentes de ícone. */
const icons: Record<string, LucideIcon> = {
  Car,
  UtensilsCrossed,
  Boxes,
  Globe,
  AppWindow,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Headset,
};

type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.6} />;
}
