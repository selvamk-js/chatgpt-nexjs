'use client';

import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import { useContext } from 'react';
import { ChatLoadingContext } from '@/context/loading.context';
import Loader from './PageLoader/loader';

type Value = {
  chatId: string;
};

export default function Chat({ chatId }: Value) {
  const { data: session } = useSession();
  const { isLoading } = useContext(ChatLoadingContext);
  console.log(isLoading, 'Chat');

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages',
        ),
        orderBy('createdAt', 'asc'),
      ),
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.docs.map(message => (
        <Message key={message.id} message={message.data()} />
      ))}
      {isLoading && <Loader />}
    </div>
  );
}
