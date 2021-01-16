const shell = require('shelljs');
const config = require('./config.json');
const fs = require('fs');

require('dotenv').config();

let feRequestUrl = config.frontend.repoUrl
  .replace('@username', process.env.Username)
  .replace('@pass', process.env.Pass);

const feFolder = "./frontend";

function log(msg) {
  console.log(msg);
}

function createDirectory(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

function sleep(ms) {
  log('sleeping');
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

function isEmpty(path) {
  return fs.readdirSync(path).length === 0;
}

async function start() {
  createDirectory(feFolder);
  createDirectory(config.frontend.buildFolder);
  createDirectory(config.frontend.indexHTMLFolder);
  let i = 0;

  while(true) {
    CheckFrontend(feFolder, feRequestUrl, config.frontend.branchToPull);
    await sleep(10000);
    i++;
  }
}

function CheckFrontend(folder, url, branch) {
  const succedded = isEmpty(folder) ? Clone(folder, url, branch) : Pull(folder, url, branch);

  if (succedded) {
    shell.cd(folder);

    log('Installing dependencies');
    shell.exec('npm i --silent');

    log('Start building');
    shell.exec('npm run build --silent');

    shell.cd('../');

    shell.mv(folder + '/build/index.html', config.frontend.indexHTMLFolder);
    shell.mv(folder + '/build', config.frontend.buildFolder);

    RebuildProject();
  }
}

function Pull(folder, url, branch) {
  log('pulling repo... ' + url);
  const response = shell.exec(`git -C ${folder} pull ${url} ${branch}`);
  log('pulling repo... ' + url + ' response', response);

  return !response.stdout.includes('Already up to date');
}

function Clone(folder, url, branch) {
  log('cloning repo... ' + url);
  const response = shell.exec(`git clone --branch ${branch} ${url} ${folder}`);
  log('cloning repo... ' + url + ' response', response);

  return response.code === 0;
}

function RebuildProject() {
  log('Start rebuilding');
  shell.cd('../');

  shell.exec('docker-compose build');
  shell.exec('docker-compose down');
  shell.exec('docker-compose up -d');

  shell.cd('./CI');
}

start();