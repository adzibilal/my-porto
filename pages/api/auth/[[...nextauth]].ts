import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_SECRET_AUTH,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const user: any = { id: 1, email: email, password: password }

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }) {
      if (account?.provider === "credentials") {
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email
      }
      return session
    },
  },
}

export default NextAuth(authOption)
