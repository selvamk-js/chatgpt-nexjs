'use client';

import { useSession, signOut } from 'next-auth/react';
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatHistory from './ChatHistory';
import Image from 'next/image';

export default function SideBar() {
  const { data: session } = useSession();

  const handleSignout = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'asc'),
      ),
  );
  // console.log(ApiKey.docs)
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.docs.map(chat => (
              <ChatHistory key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className="flex flex-row justify-center">
          <Image
            width={50}
            height={50}
            src={session.user?.image!}
            alt="Profile Picture"
            className="rounded-full cursor-pointer mb-2 "
          />
          <button onClick={handleSignout}>
            <p className="text-xl font-bold p-2 text-white hover:text-teal-400">
              Sign out
            </p>
          </button>
        </div>
      )}
    </div>
  );
}
