'use client';

import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { addDoc, collection, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Loader from '@/components/PageLoader/loader';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
export default function ConfigPage() {
  const [key, setKey] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const { isLoading, setIsLoading } = useContext(ChatLoadingContext);
  const { data: session } = useSession();

  const [values, loading] = useCollection(
    session && query(collection(db, 'users', session?.user?.email!, 'ApiKey')),
  );

  useEffect(() => {
    if (!isEmpty(values?.docs[0]?.data())) {
      router.replace('/chat');
      setKey(values?.docs[0]?.data()?.apikey);
    }
  }, [values, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await addDoc(
      collection(db, 'users', session?.user?.email!, 'ApiKey'),
      {
        apikey: key,
      },
    );
    if (res?.id) {
      router.replace('/chat');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex max-h-64 max-w-2xl justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-center text-sm font-bold mb-2">
            Provide the OpenAI API Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none text-center focus:shadow-outline"
            id="Secret Key"
            type="text"
            value={key}
            required
            onChange={e => setKey(e?.target?.value)}
            placeholder="OpenAI API Key"
          />
        </div>

        <div className="justify-between text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {(loading || isLoading) && <Loader message="Checking configuration..." />}
    </div>
  );
}
