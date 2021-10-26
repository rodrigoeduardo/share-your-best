import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_SECRET_ID,
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
      session.error = user.error;
      return session;
    },
  },
});
