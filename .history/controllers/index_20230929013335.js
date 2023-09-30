import fs from "fs";
import wordListPath from "word-list";
import readline from "readline";
export const ping = async (req, res, next) => {
  return res.status(200).json(displayCharacters("people", 5));
};

function displayCharacters(chars, n) {
  let ans = 0;
  const count = new Array(26).fill(0);
  let result = "";
  let broken = false;

  for (const c of chars) {
    ++count[c.charCodeAt(0) - "a".charCodeAt(0)];
  }

  const words = fs.readFileSync(wordListPath, "utf-8").split("\n");
  words.forEach((word) => {
    const tempCount = [...count];
    for (const c of word) {
      if (--tempCount[c.charCodeAt(0) - "a".charCodeAt(0)] < 0) {
        broken = true;
        break;
      }
    }

    if (broken === false && word.length === n) {
      result += word + ",";
    }

    broken = false;
  });

  return result;
}

// const displayCharacters = (chars, n) => {
//   let count = Array(26).fill(0);

//   let result = "";
//   let broken = false;

//   for (const c of chars.split("")) {
//     //console.log(c + ",");
//     ++count[c.charCodeAt(0) - "a".charCodeAt(0)];
//   }

//   console.log(count);

//   const words = fs.readFileSync(wordListPath, "utf-8").split("\n");

//   // Iterate over the words
//   words.forEach((word) => {
//     let tempCount = [...count];
//     for (const c of word.split()) {
//       if (--tempCount[c.charCodeAt(0) - "a".charCodeAt(0)] < 0) {
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
//   });

//   return result;
// };

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
