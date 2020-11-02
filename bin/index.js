#!/usr/bin/env node

const yargs = require("yargs");
const { metricSummary } = require("./../lib/console");
const renderReport = require("./../lib/renderReport");
const { getMetrics, parseMetrics } = require("./../lib/pagespeed");

const options = yargs
  .option("s", {
    alias: "site",
    describe: "Site to run performance on",
    type: "string",
    demandOption: true,
  })
  .option("t", {
    alias: "times",
    describe: "Number of runs to average across",
    type: "number",
    default: 3,
  })
  .option("json", {
    type: "boolean",
    description: "(Default) Output raw json metric data to file",
  })
  .option("html", {
    type: "boolean",
    description: "Output an html report of metric data to file",
  })
  .option("f", {
    alias: "filepath",
    describe: "Location to output metric data",
    type: "string",
    default: "/tmp",
  }).argv;

(async () => {
  let results = [];
  // Run through and get results
  for (let x = 0; x < options.times; x++) {
    console.log(`Run ${x + 1} for ${options.site}`);
    results.push(await getMetrics(options.site));
  }

  const metrics = parseMetrics(results, options.times);
  renderReport(metrics, options);

  // Summary of runs
  metricSummary(metrics);
})();
