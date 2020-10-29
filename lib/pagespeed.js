const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const _ = require("lodash");

const getMetrics = async function (site) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const lhOptions = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(site, lhOptions);

  // fs.writeFileSync("report.json", JSON.stringify(runnerResult));

  // `.report` is the HTML report as a string
  // const reportJson = runnerResult.report;

  // console.log(reportJson);
  // fs.writeFileSync(`/tmp/${site}-report-${(new Date).toISOString()}.json`, reportJson);

  // `.lhr` is the Lighthouse Result as a JS object
  // console.log('Report is done for', runnerResult.lhr.finalUrl);
  // console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();

  return runnerResult;
};

function parseNumeric(path, results, runs) {
  return (_.sum(_.map(results, path)) / runs).toFixed(2);
}

function parseScore(path, results, runs) {
  return _.sum(_.map(results, (r) => _.get(r, path) * 100)) / runs;
}

const parseMetrics = function (results, runs = 1) {
  return {
    performanceScore: {
      score: parseScore("lhr.categories.performance.score", results, runs),
    },
    firstContentfulPaint: {
      score: parseScore(
        "lhr.audits.first-contentful-paint.score",
        results,
        runs
      ),
      numericValue: parseNumeric(
        "lhr.audits.first-contentful-paint.numericValue",
        results,
        runs
      ),
    },
    largestContentfulPaint: {
      score: parseScore(
        "lhr.audits.largest-contentful-paint.score",
        results,
        runs
      ),
      numericValue: parseNumeric(
        "lhr.audits.largest-contentful-paint.numericValue",
        results,
        runs
      ),
    },
    speedIndex: {
      score: parseScore("lhr.audits.speed-index.score", results, runs),
      numericValue: parseNumeric(
        "lhr.audits.speed-index.numericValue",
        results,
        runs
      ),
    },
    cumulativeLayoutShift: {
      score: parseScore(
        "lhr.audits.cumulative-layout-shift.score",
        results,
        runs
      ),
      numericValue: parseNumeric(
        "lhr.audits.cumulative-layout-shift.numericValue",
        results,
        runs
      ),
    },
    serverResponseTime: {
      score: parseScore("lhr.audits.server-response-time.score", results, runs),
      numericValue: parseNumeric(
        "lhr.audits.server-response-time.numericValue",
        results,
        runs
      ),
    },
  };
};

module.exports = {
  getMetrics,
  parseMetrics,
};
