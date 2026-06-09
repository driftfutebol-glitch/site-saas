import { NextResponse } from "next/server";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";

/** Devolve o usuário logado (ou null). Usado pela Navbar para mostrar o estado. */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: isAdminEmail(user.email),
    },
  });
}
