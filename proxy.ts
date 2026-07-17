import { NextRequest, NextResponse } from "next/server";
import { getCurrentAuth } from "./features/auth/services/auth.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(pathname);
  let token: string = request.cookies.get("accessToken")?.value || "";
  let userData = await getCurrentAuth(token)
    .then((res) => res)
    .catch((err) => {
      NextResponse.redirect(new URL("/login", request.url));
      throw err;
    });
  const isAuthenticated = Boolean(token && userData.id);

  // checking if the token valid

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
