'use client';

import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useContext, useState } from 'react';
import { ChatLoadingContext } from '@/context/loading.context';

type Value = {
  chatId: string;
};

export default function ChatInput({ chatId }: Value) {
  const [inputText, setInputText] = useState('');
  const { data: session } = useSession();
  const { isLoading, setIsLoading } = useContext(ChatLoadingContext);

  const model = 'text-davinci-003';

  const sendInput = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (!inputText) return;

    const data = inputText.trim();
    setInputText('');

    const message: Message = {
      text: inputText,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages',
      ),
      message,
    );

    // const notification = toast.loading('Asking ChatGPT...')
    setIsLoading(true);

    await fetch('/api/queries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputText: data,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="bg-[#202123] text-sm text-white">
      <form onSubmit={sendInput} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent focus:outline-none flex-1
            disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          type="text"
          placeholder="Send a message."
        />

        <button
          disabled={!inputText || !session}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded
            disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}
