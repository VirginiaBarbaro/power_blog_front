function truncateText(text: string, limit: number) {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  } else {
    return text;
  }
}

export default truncateText;
