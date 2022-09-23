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
    let refObj = {
      regions: region,
      districts: district,
      municipalities: municipality,
      "cadastral territories": cadastralTerritory,
    };
    let ref = csvData;

    ["regions", "districts", "municipalities", "cadastral territories"].forEach(
      (elem) => {
        if (ref[elem] === undefined) ref[elem] = [];

        let maybeExistingRecord = ref[elem].find(
          (item) => item.name === refObj[elem]
        );

        if (!maybeExistingRecord) {
          let newRef = { name: refObj[elem] };
          ref[elem].push(newRef);
          ref = newRef;
        } else {
          ref = maybeExistingRecord;
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
