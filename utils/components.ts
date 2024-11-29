export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export function encodeListForQueryParams(list: string[]): string {
  const encodedList = list.map(encodeURIComponent).join(",");
  return encodedList;
}

export function decodeListFromQueryParams(
  queryParam: string | string[],
): string[] {
  if (!queryParam) return []; // Return empty array if the queryParam is empty or undefined

  // If queryParam is already an array, we join its elements
  if (Array.isArray(queryParam)) {
    return queryParam.map(decodeURIComponent); // Decode each item in the array
  }

  // If it's a single string, split by commas and decode each part
  return queryParam.split(",").map(decodeURIComponent);
}

export function truncateFirstParagraph(text: string, n: number): string {
  // Split the text into paragraphs based on line breaks
  const paragraphs = text.split(/\n+/).filter((para) => para.trim() !== "");

  // Get the first paragraph
  const firstParagraph = paragraphs[0] || "";

  // If the paragraph is within the limit, return it
  if (firstParagraph.length <= n) {
    return firstParagraph;
  }

  // Truncate the paragraph to the limit and avoid cutting words
  const truncated = firstParagraph.slice(0, n);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  // If no space is found (single long word), truncate directly; otherwise, cut at the last space
  const result =
    lastSpaceIndex === -1 ? truncated : truncated.slice(0, lastSpaceIndex);

  return result + "...";
}
