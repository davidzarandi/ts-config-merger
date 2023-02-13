# Typescript Configuration File Merger

A tool that generates multiple configuration files by merging multiple input configuration files. The input files,
output file names, and their order of merging are specified in a central configuration file.

## Installation

You can install the tool globally or as a development dependency in your project using the `npm install` command, or use
it directly with `npx`.

To install it globally, run:

```shell
npm install -g ts-config-merger
```

To install it as a development dependency in your project, run:

```shell
npm install --save-dev ts-config-merger
```

To use it directly with `npx`, run:

```shell
npx ts-config-merger
```

## Usage

The tool can be run from the command line and takes two optional arguments:

- `configFile`: The location of the central configuration file (defaults to `./config.json`).
- `outputFolder`: The location of the output folder (defaults to the current working directory).

### Example usage:

```npm
ts-config-merger -- configFile=./path/to/config.json outputFolder=./path/to/output
```

## Configuration File Format

The central configuration file is a JSON file that specifies the names of the output files and the order in which the
input files should be merged. The format of the file is as follows:

```json
{
  "tsconfig.outputFile1.json": [
    "./tsconfig.inputFile1.json",
    "./tsconfig.inputFile2.json"
  ],
  "tsconfig.outputFile2.json": [
    "./tsconfig.inputFile3.json",
    "./tsconfig.inputFile4.json"
  ]
}
```

## Limitations

- The tool only supports [TS Config](https://www.typescriptlang.org/tsconfig) JSON files as inputs and outputs.
