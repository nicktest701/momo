import papaparse from "papaparse";
export function readCSV(result) {
  return papaparse.parse(result, {
    header: true,
    skipEmptyLines: "greedy",
  }).data
};
