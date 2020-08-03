// Task 1.2a

import fs from "fs"
import csv from "csvtojson"
const filePath = "nodejs-hw1-ex1.csv";

const writer = fs.createWriteStream("csvtojson.txt", {
  flags: "a",
});

csv()
  .fromFile(filePath)
  .subscribe(
    (book) => {
      const newBook = Object.fromEntries(
        Object.entries(book).map(([key, value]) => [key.toLowerCase(), value])
      );
      writer.write(JSON.stringify(newBook) + "\n");
    },
    (error) => {
      console.log(error);
      writer.end();
    },
    () => writer.end()
  );
