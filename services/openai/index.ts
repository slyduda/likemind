export * from "./activity";
import { clientAI } from "@/config";

export const testOpenAPI = async () =>
  await clientAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  });
