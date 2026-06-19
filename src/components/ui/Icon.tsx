import {
  AppWindow,
  Boxes,
  Car,
  Clock,
  Database,
  Globe,
  Headset,
  Heart,
  Layers,
  MessageSquare,
  Palette,
  Server,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Workflow,
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
  Workflow,
  Palette,
  Server,
  Database,
  Clock,
  Heart,
};

type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.6} />;
}
