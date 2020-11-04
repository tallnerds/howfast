const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const _ = require("lodash");
const lhCustomConfig = require("./lh-config.js");

const median = (values) => {
  if (values.length === 0) return 0;

  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);
  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

const getMetrics = async function (site, { verbose }) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const lhOptions = {
    logLevel: verbose ? "info" : "error",
    output: "json",
    onlyCategories: ["performance"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(site, lhOptions, lhCustomConfig);

  await chrome.kill();

  return runnerResult;
};

function average(numbers, places = 0) {
  return (_.sum(numbers) / numbers.length).toFixed(places);
}

const metricsToParse = [
  {
    label: "Performance Score",
    scorePath: "lhr.categories.performance.score",
  },
  {
    label: "First Contentful Paint",
    scorePath: "lhr.audits.first-contentful-paint.score",
    metricPath: "lhr.audits.first-contentful-paint.numericValue",
    metricUnit: "ms",
  },
  {
    label: "Largest Contentful Paint",
    scorePath: "lhr.audits.largest-contentful-paint.score",
    metricPath: "lhr.audits.largest-contentful-paint.numericValue",
    metricUnit: "ms",
  },
  {
    label: "Speed Index",
    scorePath: "lhr.audits.speed-index.score",
    metricPath: "lhr.audits.speed-index.numericValue",
    metricUnit: "ms",
  },
  {
    label: "Cumulative Layout Shift",
    scorePath: "lhr.audits.cumulative-layout-shift.score",
    metricPath: "lhr.audits.cumulative-layout-shift.numericValue",
  },
  {
    label: "Server Response Time",
    scorePath: "lhr.audits.server-response-time.score",
    metricPath: "lhr.audits.server-response-time.numericValue",
    metricUnit: "ms",
  },
  {
    label: "Total Blocking Time",
    scorePath: "lhr.audits.total-blocking-time.score",
    metricPath: "lhr.audits.total-blocking-time.numericValue",
    metricUnit: "ms",
  },
];

const parseMetrics = function (results, runs = 1) {
  const metrics = {};

  metricsToParse.forEach((metric) => {
    const scores = _.map(results, metric.scorePath).map((score) => score * 100);
    const numericValues = metric.metricPath
      ? _.map(results, metric.metricPath)
      : null;

    metrics[_.camelCase(metric.label)] = {
      ...metric,
      average: {
        score: average(scores),
        numericValue: numericValues ? average(numericValues, 2) : null,
      },
      median: {
        score: median(scores),
        numericValue: metric.metricPath ? median(numericValues) : null,
      },
      actual: {
        scores,
        numericValues,
      },
    };
  });

  return metrics;
};

module.exports = {
  getMetrics,
  parseMetrics,
};
