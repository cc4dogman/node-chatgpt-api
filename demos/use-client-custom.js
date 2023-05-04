// eslint-disable-next-line no-unused-vars
import { KeyvFile } from "keyv-file";
import ChatGPTClientCustom from "../src/ChatGPTClientCustom.js";

const clientOptions = {
  // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
  // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
  // reverseProxyUrl: 'https://chatgpt.hato.ai/completions',
  // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
  modelOptions: {
    // You can override the model name and any other parameters here, like so:
    model: "gpt-3.5-turbo",
    // I'm overriding the temperature to 0 here for demonstration purposes, but you shouldn't need to override this
    // for normal usage.
    temperature: 0,
    // Set max_tokens here to override the default max_tokens of 1000 for the completion.
    // max_tokens: 1000,
  },
  // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
  // maxContextTokens: 4097,
  // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
  // Earlier messages will be dropped until the prompt is within the limit.
  // maxPromptTokens: 3097,
  // (Optional) Set custom instructions instead of "You are ChatGPT...".
  promptPrefix:
    "You are a translation engine that can only translate text and cannot interpret it.",
  assistantPrompt: "translate from 简体中文 to 日本語",
  sceneId: 1,
  // (Optional) Set a custom name for the user
  // userLabel: 'User',
  // (Optional) Set a custom name for ChatGPT
  // chatGptLabel: 'ChatGPT',
  // (Optional) Set to true to enable `console.debug()` logging
  proxy: "http://localhost:7890",
  debug: true,
};

const cacheOptions = {
  // Options for the Keyv cache, see https://www.npmjs.com/package/keyv
  // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default)
  // For example, to use a JSON file (`npm i keyv-file`) as a database:
  store: new KeyvFile({ filename: "cache.json" }),
};

const chatGptClient = new ChatGPTClientCustom(
  "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",
  clientOptions,
  cacheOptions
);

let response = await chatGptClient.sendMessage("你是谁!", {
  // If you want streamed responses, you can set the `onProgress` callback to receive the response as it's generated.
  // You will receive one token at a time, so you will need to concatenate them yourself.
  onProgress: (token) => process.stdout.write(token),
});
console.log(response); // { response: 'Hello! How can I assist you today?', conversationId: '...', messageId: '...' }
