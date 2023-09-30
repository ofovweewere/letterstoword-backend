import fs from "fs";
import wordListPath from "word-list";
import readline from "readline";
export const ping = async (req, res, next) => {
  return res.status(200).json(displayCharacters("apple", 5));
};

const displayCharacters = (chars, n) => {
  let count = [];
  let result = "";
  let broken = false;

  for (const c in chars.split()) {
    console.log(c + ",");
    ++count[c - "a"];
  }

  console.log(count);

  const words = fs.readFileSync(wordListPath, "utf-8").split("\n");

  // Iterate over the words
  words.forEach((word) => {
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
  });

  return result;
};

function iterateWordList(req, res) {
  const words = fs.readFileSync(wordListPath, "utf-8").split("\n");

  // Iterate over the words
  words.forEach((word) => {
    // Perform your desired operations with each word
    console.log(word);
    // ...
  });

  // Send a response indicating the iteration is complete
  res.send("Word list iteration complete.");
}
