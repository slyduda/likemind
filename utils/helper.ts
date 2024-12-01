export function removeLastBackslash(url: string) {
  // Check if the URL ends with a backslash
  if (url.endsWith("/")) {
    // Remove the last character (backslash)
    return url.slice(0, -1);
  } else {
    // Return the original URL if it doesn't end with a backslash
    return url;
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
