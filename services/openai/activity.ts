import { clientAI } from "@/config";

export const suggestDescriptionAdditions = async (
  sources: string[],
  description: string,
) => {
  const messages = sources.map((source) => ({
    role: "user" as const,
    content: source,
  }));

  const chatCompletion = await clientAI.chat.completions.create({
    messages: [
      {
        role: "system",
        content: description,
      },
      {
        role: "system",
        content:
          "Write a concise 50-word summary of the additional information for the following article(s). This summary will be added to the existing description.",
      },
      ...messages,
    ],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion;
};

export const suggestDescription = async (sources: string[]) => {
  const messages = sources.map((source) => ({
    role: "user" as const,
    content: source,
  }));

  const chatCompletion = await clientAI.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Write a concise, 100-word description for the following article(s). Focus on summarizing its main points to help create an activity related to its content.",
      },
      ...messages,
    ],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion;
};
