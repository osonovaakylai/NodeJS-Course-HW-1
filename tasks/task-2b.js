// Task 1.2b Implementation with pipeline

import fs from "fs"
import csv from "csvtojson"
import stream from "stream"
import util from "util"
const filePath = "nodejs-hw1-ex1.csv";
const pipeline = util.promisify(stream.pipeline);

const mapObj = {
  Book: "book",
  Author: "author",
  Amount: "amount",
  Price: "price",
};

async function run() {
  await pipeline(
    csv()
      .fromFile(filePath)
      .preRawData((csvRawData) => {
        return new Promise((resolve, reject) => {
          const newData = csvRawData.replace(
            /Book|Author|Amount|Price/gi,
            function (matched) {
              return mapObj[matched];
            }
          );
          resolve(newData);
          reject(new Error("Something went wrong"));
        });
      }),
    fs.createWriteStream("csvtojson-with-pipeline.txt")
  );
  console.log("Pipeline succeeded.");
}

run().catch(console.error);
