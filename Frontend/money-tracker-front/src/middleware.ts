import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

export const config = {
  matcher: '/main/:function*',
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    try {
        const response = await fetch('http://localhost:3003/auth/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`, 
            },
            body: JSON.stringify({ token: token.value })
        });

        if (response.ok) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } catch (error) {
        console.error('Middleware error:', error);
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Internal server error' }),
            { status: 500 }
        );
    }
}
