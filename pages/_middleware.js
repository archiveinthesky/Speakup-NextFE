import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;
    const pathnameParse = pathname.split('/');

    const allowAdmin = ['creator', 'seniorcr', 'coop'];

    if (pathnameParse[1] == 'assets') return NextResponse.next();

    console.log(`Trying to go to ${pathname}`);
    console.log(`Token is ${token ? token.authToken : null}`);

    if (pathname.includes('/api/auth') || token) {
        if (pathnameParse[1] == 'admin' && !allowAdmin.includes(token.role)) {
            const url = req.nextUrl.clone();
            url.pathname = '/home';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    console.log('Not signed in,');
    console.log(pathnameParse);

    const allowedPaths = [
        '',
        'login',
        'signup',
        'about',
        'discussions',
        'auth',
    ];

    return NextResponse.next();

    if (!token && !allowedPaths.includes(pathnameParse[1])) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}
