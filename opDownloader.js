import fs from 'fs';
import https from 'https';

import commandLineArgs from 'command-line-args'

function codeToUrl(code) {
    return `https://en.onepiece-cardgame.com/images/cardlist/card/${code}.png`
}

function downloadImage(code, outputDir) {
    const outputFile = `${outputDir}/${code}.png`
    if (!fs.existsSync(outputFile)) {
        https.get(codeToUrl(code), (res) => res.pipe(fs.createWriteStream(outputFile)))
    }
}

function listToCodes(list) {
    const matcher = /[0-9].*x(.*)/;
    const codes = list.split(`\n`).map((x) => matcher.exec(x.trim())[1]);
    return [...new Set(codes)];
}

const optionDefinitions = [
  { name: 'list', type: String},
  { name: 'output', type: String }
]

function readArgs() {
  const args = commandLineArgs(optionDefinitions);

  if (!args.list) {
    console.error("Missing required parameter: list");
    return;
  }
  if (!args.output) {
    console.error("Missing required parameter: output");
    return;
  }

  return args;
}

function main() {
    const { output, list } = readArgs();
    const data = fs.readFileSync(list, 'utf8');
    const codes = listToCodes(data);
    console.log(`Downloading ${codes.length} images...`);
    codes.forEach((c) => downloadImage(c, output));
    console.log(`Finished downloading images to ${output}`);
}

main();