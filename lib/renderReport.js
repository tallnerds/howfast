const open = require('open');
const path = require('path');
const template = require('lodash.template');
const fs = require('fs');

const renderReport = () => {
  const templateFile = path.join(__dirname, '_output.html');
  const outputFile = path.join(__dirname, 'output.html');

  const templateHtml = fs.readFileSync(templateFile, { encoding: 'utf8' });
  const compile = template(templateHtml);

  fs.writeFileSync(outputFile, compile({
    site: 'https://bankrate.com',
    json: JSON.stringify({ foo: 'bar' }, null, ' '),
    markdown: "# Hello"
  }), { encoding: 'utf8' });

  open(outputFile);
};

// uncomment to test: "node lib/renderReport.js"
// renderReport();

module.exports = renderReport;
