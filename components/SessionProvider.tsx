'use client';

import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

type Value = {
  children: React.ReactNode;
  session: Session | null;
};

export function SessionProvider({ children, session }: Value) {
  return <Provider>{children}</Provider>;
}
