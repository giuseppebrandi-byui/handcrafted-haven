import { DefaultSession } from "next-auth";

declare module "next-auth" { 
  export interface Session {
    user: {
      role: string;
      username: string;
    } & DefaultSession["user"];
  }
}