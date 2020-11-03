const open = require("open");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const parser = require("url");

const generateMarkdown = (metrics, runs) => {
  let md = `| Run #	| PS 	| FCP (ms)	| LCP (ms)	| SI (ms)	| CLS 	| SRT (ms)	| TBT (ms)	|
  |-	|-	|-	|-	|-	|-	|-	|-	|\n`;

  for (let run = 1; run <= runs; run++) {
    const cols = [
      run,
      _.get(
        metrics,
        `performanceScore.actual.scores.${run - 1}`,
        0
      ).toFixed(0),
      _.get(
        metrics,
        `firstContentfulPaint.actual.numericValues.${run - 1}`,
        0
      ).toFixed(2),
      _.get(
        metrics,
        `largestContentfulPaint.actual.numericValues.${run - 1}`,
        0
      ).toFixed(2),
      _.get(metrics, `speedIndex.actual.numericValues.${run - 1}`, 0).toFixed(
        2
      ),
      _.get(
        metrics,
        `cumulativeLayoutShift.actual.numericValues.${run - 1}`,
        0
      ).toFixed(2),
      _.get(
        metrics,
        `serverResponseTime.actual.numericValues.${run - 1}`,
        0
      ).toFixed(2),
      _.get(
        metrics,
        `totalBlockingTime.actual.numericValues.${run - 1}`,
        0
      ).toFixed(2),
    ];
    md = md.concat(`| ${cols.join(" | ")} |\n`);

    if (run === runs) {
      const avgCols = [
        "Average",
        _.get(metrics, `performanceScore.average.score`),
        _.get(metrics, `firstContentfulPaint.average.numericValue`),
        _.get(metrics, `largestContentfulPaint.average.numericValue`),
        _.get(metrics, `speedIndex.average.numericValue`),
        _.get(metrics, `cumulativeLayoutShift.average.numericValue`),
        _.get(metrics, `serverResponseTime.average.numericValue`),
        _.get(metrics, `totalBlockingTime.average.numericValue`),
      ];

      md = md.concat(`| ${avgCols.join(" | ")} |\n`);
    }
  }

  return md;
};

const generateReport = function (templateFile, site, metrics, times) {
  const templateHtml = fs.readFileSync(templateFile, { encoding: "utf8" });
  const compile = _.template(templateHtml);
  return compile({
    site: site,
    json: JSON.stringify(metrics, null, " "),
    markdown: generateMarkdown(metrics, times),
  });
};

const renderReport = (metrics, { times, filepath, site, ...options }) => {
  const templateFile = path.join(__dirname, "_output.html");
  const outputFile = `${filepath}/${
    parser.parse(site).hostname
  }-report-${new Date().toISOString()}.${options.html ? "html" : "json"}`;

  let output = JSON.stringify(metrics);
  if (options.html) {
    output = generateReport(templateFile, site, metrics, times);
  }

  fs.writeFileSync(outputFile, output, { encoding: "utf8" });

  open(outputFile);
};

module.exports = renderReport;
