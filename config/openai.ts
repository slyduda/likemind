import OpenAI from "openai";
import { processEnv } from "./main";

export const clientAI = new OpenAI({
  apiKey: processEnv.OPENAI_SECRET,
});
