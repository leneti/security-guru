import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import type { Schema } from "@site/amplify/data/resource";
import config from "@site/amplify_outputs.json";

export const { runWithAmplifyServerContext } = createServerRunner({ config });

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  authMode: "identityPool",
  config,
  cookies,
});

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}
