import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: 'b2deed86ede447a3a2244f3575bee1a2',
      clientSecret: '81f39fbda552404caf9ed237e9e117e3',
      scope: 'user-read-private user-top-read',
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});
