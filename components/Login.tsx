'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="bg-[#cbd5e1] h-screen flex flex-col items-center justify-center text-center text-white">
      <Image src="/chat.png" width={120} height={120} alt="logo" />
      <button
        onClick={() => signIn('google')}
        className="bg-[#374151] hover:bg-[#374151] text-white mt-5 text-3xl animate-pulse font-bold py-2 px-4 rounded"
      >
        Sign up{' '}
      </button>
    </div>
  );
}
