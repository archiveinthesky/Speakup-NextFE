import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: '您的信箱',
                },
                password: { label: 'Password', type: '您的密碼' },
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                    }
                );
                const user = await res.json();

                if (res.ok && user) {
                    return {
                        name: user.username,
                        email: credentials.email,
                        image: user.profileImg,
                        ...user,
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (user) {
                token.authToken = user.Token;
                token.reputation = user.reputation;
                token.role = user.role;
            }
            console.log(token);
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session.authToken = token.authToken;
                session.reputation = token.reputation;
                session.role = token.role;
            }
            console.log(session);
            return session;
        },
    },

    session: {
        strategy: 'jwt',
    },
});
