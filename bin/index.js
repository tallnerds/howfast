#!/usr/bin/env node

const fs = require('fs');
const yargs = require("yargs");
const parser = require('url');
const { getMetrics } = require('./../lib/pagespeed');

const options = yargs
 .usage("Usage: -n <name>")
 .option("s", { alias: "site", describe: "Site to run performance on", type: "string", demandOption: true })
 .option("t", { alias: "times", describe: "Number of runs to average across", type: "number", default: 3 })
 .option("o", { alias: "output", describe: "Place you would like to output your file", type: "string", default: "/tmp" })
 .argv;

(async () => {
  let results = {};
  // Run through and get results
  for(let x = 0; x < options.times; x++) {
    results[x] = await getMetrics(options.site);
  }

  // Average metrics over runs
  // console.log(results);

  // Output

  fs.writeFileSync(`${options.output}/${parser.parse(options.site).hostname}-report-${(new Date).toISOString()}.json`, results[0].report);
})();
