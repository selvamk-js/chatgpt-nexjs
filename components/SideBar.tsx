'use client';

import { useSession, signOut } from 'next-auth/react';
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatHistory from './ChatHistory';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SideBar() {
  const { data: session } = useSession();

  const router = useRouter();
  const handleSignout = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'asc'),
      ),
  );
  const [ApiKey] = useCollection(
    session && query(collection(db, 'users', session?.user?.email!, 'ApiKey')),
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
        <Image
          width={100}
          height={100}
          onClick={handleSignout}
          src={session.user?.image!}
          alt="Profile Picture"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
      )}
    </div>
  );
}
