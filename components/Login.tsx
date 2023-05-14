'use client';

import { isEmpty } from 'lodash';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const [animateLogo, setAnimateLogo] = useState(false);
  const [canSessionLogIn, setCanSessionLogIn] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      setTimeout(() => {
        setCanSessionLogIn(false);
        router.replace(`/`);
      }, 2000);
    }
    if (status === 'authenticated' && !isEmpty(session?.user)) {
      setTimeout(() => {
        router.replace(`/config`);
      }, 2000);
    }
  }, [status, session, router]);

  const handleSignIn = () => {
    setAnimateLogo(true);
    setTimeout(() => {
      signIn('google');
      setAnimateLogo(false);
    }, 1500);
  };

  if (canSessionLogIn) {
    return (
      <div className="bg-[#cbd5e1] h-screen flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500">
        <Image
          src="/chat.png"
          width={120}
          height={120}
          alt="logo"
          className="animate-spin"
        />
        <p className="text-2xl font-bold p-2 text-slate-800">
          Validating session...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#cbd5e1] h-screen w-screen flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500">
      <Image
        src="/chat.png"
        width={120}
        height={120}
        alt="logo"
        className={animateLogo ? 'animate-spin' : ''}
      />
      <button
        onClick={handleSignIn}
        disabled={animateLogo}
        className="bg-[#374151] hover:bg-[#374151] text-teal-200 mt-5 text-3xl font-bold py-2 px-4 rounded-full opacity-80 hover:opacity-100 transition duration-300 ease-in-out"
      >
        Sign up
      </button>
    </div>
  );
}
