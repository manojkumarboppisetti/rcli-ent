#!/usr/bin/env node

const yargs = require("yargs");
const {generateComponent} = require("./../utils/component.utils");

const options = yargs
    .usage("Usage: -c <componentName>")
    .option("c", {alias: "componentName", describe: "Component name", type: "string", demandOption: false})
    .option("s", {alias: "componentName", describe: "Screen name", type: "string", demandOption: false})
    .option("--type", {alias: "type", describe: "", type: "string", demandOption: false})
    .option("--camelCase", {alias: "camelCase", describe: "", type: "boolean", demandOption: false})
    .option("--styles", {alias: "styles", describe: "", type: "string", demandOption: false})
    .option("--skipStyles", {alias: "skipStyles", describe: "", type: "boolean", demandOption: false}).argv;

if (!options?.componentName) {
    console.log("Component/Screen name is missing");
    return;
}

const componentPath = options?.componentName;
const skipStyles = options?.skipStyles;
const isScreen = options?.s === 'true';
const isCamelCase = options?.camelCase;
const type = options?.type && ['class', 'functional'].includes(options.type) ? options?.type : "functional";
const styles = options?.styles && ['scss', 'css'].includes(options.styles) ? options?.styles : "scss";
let componentName = '';
let directoryName = '';

const componentPathBits = componentPath.split('/');

if (componentPathBits.length > 1) { // nested folders structure
    componentName = componentPathBits[componentPathBits.length - 1];
    directoryName = componentPath;
} else {
    componentName = componentPath;
    directoryName = componentPath;
}

generateComponent(directoryName, componentName, type, styles, skipStyles, isScreen, isCamelCase);
