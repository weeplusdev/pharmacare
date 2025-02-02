import NextAuth from 'next-auth'
import LineProvider from 'next-auth/providers/line'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.userId
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/error',
    signOut: '/'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }