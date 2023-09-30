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
    let tempCount = [...count];
    for (const c of word.split()) {
      if (--tempCount[c - "a"] < 0) {
        broken = true;
        break;
      }
    }

    //   if(broken == false && word.length == n && word.charAt(0)==('a') && word.charAt(word.length-1)==('l')){
    //      result+=word+",";
    //   }

    if (broken == false && word.length == n && word.charAt(0) == "a") {
      result += word + ",";
    }

    broken = false;
  }

  return result;
};
