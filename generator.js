#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");


// Defines
DIRPATH = "." || __dirname;
CURSORS = ["default", "pointer", "not-allowed", "progress", "text", "wait"];
THEMES = ["light", "dark"];
MANIFEST = JSON.parse(fs.readFileSync("package.json", "utf8"));


class Fvursor {
    // Pull package information from package.json file.
    static MANIFEST() {
        return `/*
* @name         : ${MANIFEST["name"]}
* @version      : ${MANIFEST["version"]}
* @description  : ${MANIFEST["description"]}
* @author       : ${MANIFEST["author"]}
* @license      : ${MANIFEST["license"]}
*/\n`;
    }


    // We produce our CSS codes and return them by offering the minify option to anyone who wishes.
    static GENERATE(minify=false) {
        let css = "";
        THEMES.forEach((mode) => {
            for (let j = 0; j < THEMES.length; j++) {
                if (j === 0) {
                    if (mode === "light") {
                        css += ":root {\n";
                    } else {
                        css += "@media (prefers-color-scheme: dark) {\n:root {\n";
                    }
                } else {
                    if (mode === "light") {
                        css += "[data-theme='light'] {\n"
                    } else {
                        css += "[data-theme='dark'] {\n    color-scheme: dark;\n"
                    }
                }
    
                CURSORS.forEach(cursor => {
                    css += `   --cursor-${cursor}: url('https://cdn.jsdelivr.net/gh/ahmetcanisik/mycursor/cursor/${mode}/${cursor}.svg');\n`;
                });
    
                if (mode === "light") {
                    css += "}\n"
                } else {
                    css += "}\n"
                    if (j === 0) {
                        css += "}\n"
                    }
                }
            }
        });

        css += "textarea, input { cursor: var(--cursor-text); }\n";
        css += "html, body, div, span, p, bdo, bdi, abbr, cite, code, kbd, samp, strong, em, small, mark, ruby, rt, rp, data, time, dfn, meter, progress, output, details, h1, h2, h3, h4, h5, h6, ul, ol, li, table, tr, td, th, header, footer, section, article, aside, img, video, audio, iframe, form, fieldset, legend, summary, canvas, svg, template, slot, select, option, label, input[type='checkbox'], input[type='radio'] { cursor: var(--cursor-default), default; }\n"
        css += "button, a, input[type='button'], input[type='submit'], input[type='reset'] { cursor: var(--cursor-pointer), pointer; }\n"
        CURSORS.forEach(cur => {
            css += `.cursor-${cur} {cursor: var(--cursor-${cur}), ${cur};}\n`
        });
        return minify ? css.replace(/\s+/g, '').trim() : css;
    }


    // We create our files in accordance with the given parameters.
    static ACTION(minify=false, file_name="fvursor.css") {
        fs.mkdir(DIRPATH, {recursive: true}, (err) => {
            if (err) throw new Error(`Klasör oluşturulamadı: ${err.message}`);
        });

        const full_path = path.join(DIRPATH, file_name);
        const content = Fvursor.MANIFEST() + Fvursor.GENERATE(minify);
        fs.writeFileSync(full_path, content, "utf8");
        console.log(`saving successfully! ${full_path}`);
    }


    // Our main function where we will create fvursor css files
    static run(minify=false, file_name="fvursor.css") {
        Fvursor.ACTION(minify, file_name);
    }
}


// If the file name is accessed directly via the console, then these codes will work.
if (require.main === module) {
    Fvursor.run(false, "index.css");
    Fvursor.run(true, "min/index.css");
}


// We open the Fvursor class to access.
module.exports=Fvursor;