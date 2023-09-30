import Dictionary from "dictionary-en";

export const ping = async (req, res, next) => {
  return res.status(200).json(displayCharacters("apple", 5));
};

const displayCharacters = (chars, n) => {
  const dictionary = new Dictionary();
  let count = [];
  let result = "";
  let broken = false;

  for (const c of chars.split()) {
    ++count[c - "a"];
  }

  const words = dictionary.getWords();

  // Loop through all words
  for (const word of words) {
    console.log(word);
    // Perform your desired operations with each word
  }

  return result;
};
