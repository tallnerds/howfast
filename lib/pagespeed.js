
const fs = require('fs');
const lighthouse = require("lighthouse");
const chromeLauncher = require('chrome-launcher');

const getMetrics = async function(site) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const lhOptions = {logLevel: 'error', output: 'json', onlyCategories: ['performance'], port: chrome.port};
  const runnerResult = await lighthouse(site, lhOptions);

  // `.report` is the HTML report as a string
  // const reportJson = runnerResult.report;

  // console.log(reportJson);
  // fs.writeFileSync(`/tmp/${site}-report-${(new Date).toISOString()}.json`, reportJson);

  // `.lhr` is the Lighthouse Result as a JS object
  // console.log('Report is done for', runnerResult.lhr.finalUrl);
  // console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();

  return runnerResult;
}

module.exports = {
  getMetrics
};
