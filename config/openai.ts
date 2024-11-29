import OpenAI from "openai";
import { processEnv } from ".";

export const clientAI = new OpenAI({
  apiKey: processEnv.OPENAI_SECRET,
});
