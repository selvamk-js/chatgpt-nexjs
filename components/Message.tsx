import { DocumentData } from 'firebase/firestore';

type Value = {
  message: DocumentData;
};

export default function Message({ message }: Value) {
  const isChatGPT = message.user.name === 'ChatGPT';
  return (
    <div className={`py-5 text-black ${isChatGPT && 'bg-[#f1f5f9]'}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8" />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}
