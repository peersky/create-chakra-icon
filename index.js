#!/usr/bin/env node

const fs = require("fs");
const cheerio = require("cheerio");
const camelcase = require("camelcase");
const path = require("path");
const mkdirp = require("mkdirp");
const forEach = require("lodash.foreach");
const titleize = require("titleize");
const minimist = require("minimist");
const { toJSON } = require("cssjson");

const argv = minimist(process.argv.slice(2));
const src = argv._.slice(0, argv._.length - 1);
const distDir = argv._.pop();

if (!src || !distDir) {
  throw new Error("Please check you argument.");
}

const cleanAtrributes = ($el, $) => {
  const attrs = ["xlink:href", "clip-path", "fill-opacity", "fill"];

  forEach(attrs, (attr) => {
    $el.removeAttr(attr);
  });

  if ($el.children().length === 0) {
    return false;
  }

  $el.children().each((index, el) => {
    cleanAtrributes($(el), $);
  });
};

const getClass = (str) => {
  var localStr = (" " + str).slice(1);
  if (localStr.indexOf(`class="`) === -1) {
    return false;
  }
  const classIndex = localStr.indexOf(`class="`) + `class="`.length;
  localStr = localStr.slice(classIndex, localStr.length);
  const closingIndex = localStr.indexOf(`"`, 1);
  localStr = localStr.slice(0, closingIndex);
  return localStr;
};
const getD = (str) => {
  var localStr = (" " + str).slice(1);
  const classIndex = localStr.indexOf(`d="`) + `d="`.length;
  localStr = localStr.slice(classIndex, localStr.length);
  const closingIndex = localStr.indexOf(`"`, 1);
  localStr = localStr.slice(0, closingIndex);
  return localStr;
};

const createComponentString = (viewBox, iconSvg, id) => {
  const name = titleize(id).replace(/[-]/g, "");

  var styleClassIndexes = [],
    i = -1;

  const styleStart = iconSvg.indexOf("<style>") + "<style>".length;
  const styleEnd = iconSvg.indexOf("</style>");
  const styleContent = iconSvg.slice(styleStart, styleEnd);
  const jsonStyle = toJSON(styleContent);
  while ((i = styleContent.indexOf(".", i + 1)) != -1) {
    styleClassIndexes.push(i);
  }

  var pathes = [];

  var index = -1;

  while ((index = iconSvg.indexOf("<path", index + 1)) !== -1) {
    const svgSlicedStart = iconSvg.slice(
      index + "<path".length,
      iconSvg.length
    );

    const closingIndex = svgSlicedStart.indexOf("/>");
    const PathContent = svgSlicedStart.slice(0, closingIndex);
    pathes.push({ class: getClass(PathContent), d: getD(PathContent) });
  }
  Object.keys(jsonStyle.children).map((key, idx) => {
    jsonStyle.children[key].color = idx;
  });
  return `import React from "react";
  import { Icon } from "@chakra-ui/react";
  import { chakra } from "@chakra-ui/react";
  const ${name} = (props) => (
    <Icon viewBox="${viewBox}" {...props}>
     ${pathes.map((path) => {
       return `<path
     ${
       path?.class
         ? `fill={props?.${`colors?.[${
             jsonStyle.children[`.${path.class}`].color
           }]`} ?? "${jsonStyle.children[`.${path.class}`].attributes.fill}"}`
         : ``
     }
     d={"${path.d}"}
   />`;
     })}
    </Icon>
  );
  export default chakra(${name})`;
};

mkdirp(distDir, (err) => {
  if (err) throw new Error("Error creating icons directory.");

  src.forEach((iconPath) => {
    const id = path.basename(iconPath, ".svg");
    const svg = fs.readFileSync(iconPath, "utf-8");
    let $ = cheerio.load(svg, {
      xmlMode: true,
    });
    const $svg = $("svg");
    // disable cleanAtrributes in favour of svg source optimisation step i.e. svgo
    // cleanAtrributes($svg, $)
    const iconSvg = $svg.html();
    const viewBox = $svg.attr("viewBox");
    const componentString = createComponentString(viewBox, iconSvg, id);
    fs.writeFileSync(
      path.join(distDir, camelcase(id, { pascalCase: true }) + ".js"),
      componentString,
      "utf-8"
    );
  });
});
