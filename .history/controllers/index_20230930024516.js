import fs from "fs";
import wordListPath from "word-list";
import readline from "readline";
import SortedArray from "sorted-array";
export const ping = async (req, res, next) => {
  let n = req.body.lengthForSubmit;
  let starts = req.body.startForSubmit;
  let ends = req.body.endForSubmit;
  let letters = req.body.letterForSubmit;
  return res.status(200).json(displayCharacters(letters, n, starts, ends));
};

function displayCharacters(chars, n, starts, ends) {
  let sortedNumbers = [];
  let numOfIndexes = 0;
  let seenIndexes = new Array(26).fill(0);
  let data = [];
  const count = new Array(1000).fill(0);
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

    //Conditions for result
    if (n == null && starts == null && ends == null) {
      if (broken === false) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }

      //N is not null
    } else if (n != null && starts == null && ends == null) {
      if (broken === false && word.length === n) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }
    } else if (n != null && starts != null && ends == null) {
      if (broken === false && word.length === n && word.startsWith(starts)) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }
    } else if (n != null && starts == null && ends != null) {
      if (broken === false && word.length === n && word.endsWith(ends)) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }
    } else if (n != null && starts != null && ends != null) {
      if (
        broken === false &&
        word.length === n &&
        word.startsWith(starts) &&
        word.endsWith(ends)
      ) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }
    }

    //N is null
    else if (n == null && starts != null && ends == null) {
      if (broken === false && word.startsWith(starts)) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }
    } else if (n == null && starts == null && ends != null) {
      if (broken === false && word.endsWith(ends)) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }
    } else if (n == null && starts != null && ends != null) {
      if (broken === false && word.startsWith(starts) && word.endsWith(ends)) {
        [numOfIndexes, seenIndexes, sortedNumbers, data] = checkIndexes(
          word,
          numOfIndexes,
          seenIndexes,
          sortedNumbers,
          data
        );
        result += word + ",";
      }
    }

    //start is null

    //End is null

    broken = false;
  });
  //   console.log(numOfIndexes, "Number of indexes");
  //   console.log(seenIndexes, "Seen indexes");
  //   console.log(sortedNumbers, "Sorted numbers");
  //   console.log(data, "data");
  //console.log("linkup");
  if (data.length == 0) {
    data = [{ key: "No Words Found" }];
    return data;
  }
  return data.reverse();
}

function checkIndexes(input, numOfIndexes, seenIndexes, sortedNumbers, data) {
  let length = input.length;

  if (seenIndexes[length] == 0) {
    seenIndexes[length] = 1;
    let num = length;
    //Insert into sortedNum
    const index = sortedNumbers.findIndex((element) => element > num);
    if (index === -1) {
      sortedNumbers.push(num);
    } else {
      sortedNumbers.splice(index, 0, num);
    }
    numOfIndexes = numOfIndexes + 1;
    data[length] = { key: [] };
  }
  data[length].key.push(input);
  return [numOfIndexes, seenIndexes, sortedNumbers, data];
}
