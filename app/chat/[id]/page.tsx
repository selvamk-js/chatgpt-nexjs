'use client';

import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';

type Value = {
  params: {
    id: string;
  };
};

export default function ChatPage({ params: { id } }: Value) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}
