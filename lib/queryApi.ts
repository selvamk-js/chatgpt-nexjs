import openai from "./chatgpt";

const query = async (inputText: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt: inputText,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `ChatGPT was unable to find the solution for that . (Error: ${err.message})`
    );
  return res;
};

export default query;
