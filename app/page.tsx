import Image from "next/image";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20 text-black">ChatGPT</h1>
      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8 text-black" />
            <h2 className="text-black text-xl">Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="textMessage">
              &quot;Explain quantum computing in simple terms&quot;
            </p>
            <p className="textMessage">
              &quot;Got any creative ideas for a 1 year old&apos;s
              birthday?&quot;
            </p>
            <p className="textMessage">
              &quot;How do I make an HTTP request in Javascript?&quot;
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8 text-black" />
            <h2 className="text-black text-xl">Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="textMessage">
              Remembers what user said earlier in the conversation
            </p>
            <p className="textMessage">
              Allow user to provide follow-up corrections
            </p>
            <p className="textMessage">
              Trained to decline inappropriate requests
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8 text-black" />
            <h2 className="text-black text-xl">Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="textMessage">
              May occasionally generate incorrect information
            </p>
            <p className="textMessage">
              May occasionally produce harmful instructions or biased content
            </p>
            <p className="textMessage">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
