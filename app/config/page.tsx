"use client";

import React, { useState } from "react";

export default function ConfigPage() {
  const [key, setKey] = useState("");

  // const handleSubmit =

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-center text-sm font-bold mb-2">
            Provide the OpenAI API Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none text-center focus:shadow-outline"
            id="Secret Key"
            type="text"
            required
            onChange={(e) => setKey(e?.target?.value)}
            placeholder="OpenAI API Key"
          />
        </div>

        <div className="justify-between text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            // onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
