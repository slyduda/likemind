import { load } from "cheerio";

export function getDomainAndTLD(url: string) {
  console.log("getting domain");
  try {
    const parsedUrl = new URL(url);
    // Split the hostname into parts by `.`
    const parts = parsedUrl.hostname.split(".");
    if (parts.length > 2) {
      // If there's a subdomain, remove it
      return parts.slice(-2).join(".");
    }
    // Return the hostname as is if no subdomain exists
    return parsedUrl.hostname;
  } catch (error) {
    console.error("Invalid URL:", url);
    return null;
  }
}

export const checkUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURI(url)}`,
    );
    // If successful
    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      if (!data.contents || typeof data.contents !== "string")
        throw Error("contents of response is not a string");
      return data.contents;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const parseArticle = async (
  htmlText: string,
): Promise<string | null> => {
  const $ = load(htmlText);
  const $article = $("article");
  if ($article.length === 0) return null;
  return $article.text().replace(/\s+/g, " ").trim();
};
