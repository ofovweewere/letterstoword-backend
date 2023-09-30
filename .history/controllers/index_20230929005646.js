import wordList from "word-list";
import fs from "fs";
import readline from "readline";
export const ping = async (req, res, next) => {
  return res.status(200).json(displayCharacters("apple", 5));
};

const displayCharacters = (chars, n) => {
  let count = [];
  let result = "";
  let broken = false;

  for (const c of chars.split()) {
    ++count[c - "a"];
  }

  const wordListPath = require.resolve("word-list");
  const wordStream = readline.createInterface({
    input: fs.createReadStream(wordListPath),
  });

  // Loop through all words
  wordStream.on("line", (word) => {
    console.log(word);
    // Perform your desired operations with each word
  });

  //   // Convert the array of words into an iterable
  //   const wordIterable = [...words];
  //   // Loop through all words
  //   for (const word of wordIterable) {
  //     let tempCount = [...count];
  //     for (const c of word.split()) {
  //       if (--tempCount[c - "a"] < 0) {
  //         broken = true;
  //         break;
  //       }
  //     }

  //     //   if(broken == false && word.length == n && word.charAt(0)==('a') && word.charAt(word.length-1)==('l')){
  //     //      result+=word+",";
  //     //   }

  //     if (broken == false && word.length == n && word.charAt(0) == "a") {
  //       result += word + ",";
  //     }

  //     broken = false;
  //   }

  return result;
};
