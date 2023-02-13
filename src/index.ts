#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";

type Config = Record<string, string[]>;

const mergeObject = (target: Record<string, any>, source: Record<string, any>) => {
  for (const key in source) {
    if (source[key] === null) {
      continue;
    }

    if (Array.isArray(source[key])) {
      if (!Array.isArray(target[key])) {
        target[key] = [];
      }

      target[key] = [].concat(target[key], source[key]);
      continue;
    }

    if (typeof source[key] === "object") {
      if (typeof target[key] !== "object") {
        target[key] = {};
      }
      mergeObject(target[key], source[key]);
      continue;
    }

    target[key] = source[key];
  }
};

const mergeObjects = (target: Record<string, any>, ...sources: Record<string, any>[]) => {
  for (const source of sources) {
    mergeObject(target, source);
  }

  return target;
};

const generateFile = (generatedFolderPath: string, fileName: string, content: Record<string, any>) => {
  if (!fileName.endsWith(".json")) {
    return console.error("fileName needs to end with .json");
  }

  const filePath = join(generatedFolderPath, fileName);
  writeFileSync(filePath, JSON.stringify(content, null, 2));

  console.log("\x1b[32m", `✔ ${fileName} successfully generated`);
};

const generateFiles = (configFilePath: string = "./config.json", outputFolderPath: string = ".") => {
  const config: Config = require(resolve(configFilePath));

  const generatedFolderPath = resolve(outputFolderPath);
  if (!existsSync(generatedFolderPath)) {
    mkdirSync(generatedFolderPath);
  }

  for (const fileName in config) {
    const target: Record<string, any> = {};

    for (const sourceFileName of config[fileName]) {
      const source: Record<string, any> = require(sourceFileName);
      mergeObjects(target, source);
    }

    generateFile(generatedFolderPath, fileName, target);
  }
};

const parseArgs = (args: string[]) => {
  const parsedArgs: Record<string, string> = {};

  args.forEach((arg) => {
    const parts = arg.split("=");

    parsedArgs[parts[0]] = parts[1];
  });

  return parsedArgs;
};

const args = parseArgs(process.argv.slice(2));
console.log("\x1b[36m", "Generating files ...", "\x1b[0m");
generateFiles(args?.["configFile"], args?.["outputFolder"]);
console.log("\x1b[36m", "... Done", "\x1b[0m");
