import {
  AppWindow,
  Boxes,
  Brain,
  Car,
  Clock,
  Database,
  Globe,
  Headset,
  Heart,
  Layers,
  Megaphone,
  MessageSquare,
  Palette,
  Play,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
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
  Play,
  User,
  Brain,
  Megaphone,
  Target,
  TrendingUp,
};

type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.6} />;
}
