const open = require("open");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const parser = require("url");

const generateMarkdown = (metrics, runs) => {
  let md = `| Run #	| PS 	| FCP 	| LCP 	| SI 	| CLS 	| SRT 	|
  |-	|-	|-	|-	|-	|-	|-	|\n`;

  for (let run = 1; run <= runs; run++) {
    const cols = [
      run,
      _.get(metrics, `performanceScore.actual.scores.${run - 1}`),
      _.get(metrics, `firstContentfulPaint.actual.scores.${run - 1}`),
      _.get(metrics, `largestContentfulPaint.actual.scores.${run - 1}`),
      _.get(metrics, `speedIndex.actual.scores.${run - 1}`),
      _.get(metrics, `cumulativeLayoutShift.actual.scores.${run - 1}`),
      _.get(metrics, `serverResponseTime.actual.scores.${run - 1}`),
    ];
    md = md.concat(`| ${cols.join(" | ")} |\n`);

    if (run === runs) {
      const avgCols = [
        "Average",
        _.get(metrics, `performanceScore.average.score`),
        _.get(metrics, `firstContentfulPaint.average.score`),
        _.get(metrics, `largestContentfulPaint.average.score`),
        _.get(metrics, `speedIndex.average.score`),
        _.get(metrics, `cumulativeLayoutShift.average.score`),
        _.get(metrics, `serverResponseTime.average.score`),
      ];

      md = md.concat(`| ${avgCols.join(" | ")} |\n`);
    }
  }

  return md;
};

const renderReport = (metrics, { times, output, site }) => {
  const templateFile = path.join(__dirname, "_output.html");
  const outputFile = `${output}/${
    parser.parse(site).hostname
  }-report-${new Date().toISOString()}.html`;

  const templateHtml = fs.readFileSync(templateFile, { encoding: "utf8" });
  const compile = _.template(templateHtml);

  fs.writeFileSync(
    outputFile,
    compile({
      site: site,
      json: JSON.stringify(metrics, null, " "),
      markdown: generateMarkdown(metrics, times),
    }),
    { encoding: "utf8" }
  );

  open(outputFile);
};

module.exports = renderReport;
