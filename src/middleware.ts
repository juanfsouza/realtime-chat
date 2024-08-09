import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Obtém o token do cookie
  const token = req.cookies.get('token');

  // Redireciona para login se não houver token e não estiver acessando a página de login
  if (!token && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permite o acesso se o usuário estiver autenticado ou estiver acessando a página de login
  return NextResponse.next();
}

// Aplica o middleware a todas as rotas, exceto para API e caminhos estáticos
export const config = {
  matcher: ['/((?!api|static|favicon.ico).*)'],
};
