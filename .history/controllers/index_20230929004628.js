import Dictionary from "dictionary-en";
const dictionary = new Dictionary();
export const ping = async (req, res, next) => {
  return res
    .status(200)
    .json(displayCharacters(["apple", "appel", "app", "appo"], "apple", 5));
};

const displayCharacters = (words, chars, n) => {
  let count = [];
  let result = "";
  let broken = false;

  for (const c of chars.split()) {
    ++count[c - "a"];
  }

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
