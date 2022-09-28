// @ts-check
let fs = require("fs");
let { parse } = require("csv-parse");

console.time("elapsed time");

let csvData = {};

fs.createReadStream(
  "Czech-Republic-regions-districts-municipalities-cadastral-territories-no-metadata.csv"
)
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    let [region, district, municipality, cadastralTerritory] = row;

    let keyMap = {
      regions: region,
      districts: district,
      municipalities: municipality,
      "cadastral territories": cadastralTerritory,
    };

    let currentRef = csvData;

    ["regions", "districts", "municipalities", "cadastral territories"].forEach(
      (elem) => {
        if (currentRef[elem] === undefined) currentRef[elem] = [];

        let maybeExistingRecord = currentRef[elem].find(
          (item) => item.name === keyMap[elem]
        );

        if (!maybeExistingRecord) {
          let newRef = { name: keyMap[elem] };
          currentRef[elem].push(newRef);
          currentRef = newRef;
        } else {
          currentRef = maybeExistingRecord;
        }
      }
    );
  })

  .on("end", function () {
    fs.writeFile(
      "Czech-Republic-regions-districts-municipalities-cadastral-territories-no-metadata.json",
      JSON.stringify(csvData, null, 2),
      "utf8",
      () => {
        console.log("done!");
        console.timeEnd("elapsed time");
      }
    );
  });
