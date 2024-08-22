import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener el token de la cookie
  const token = request.cookies.get('access_token');

  // Verificar si el token existe
  if (!token) {
    return NextResponse.redirect(new URL('/index', request.url));
  }

  // Si el token existe, permitir el acceso a la ruta
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:home*','/protected/:home*',], // Aplica middleware a todas las rutas bajo /protected
};
