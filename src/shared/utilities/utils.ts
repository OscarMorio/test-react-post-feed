export const getIdFromURI = (uri: string) => {
  return uri.split("?")[0].split("/").at(-1);
};

export const capitalizeSentence = (sentence: string): string => {
  return sentence.length > 0
    ? sentence.charAt(0).toUpperCase() + sentence.slice(1)
    : sentence;
};
