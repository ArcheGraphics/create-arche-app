"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const create_app_1 = require("./create-app");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cli = (0, cac_1.default)();
cli.option("-t, --template [template]", "Choose your project template");
try {
    const p = path_1.default.join(__dirname, "../package.json");
    const pkg = JSON.parse(fs_1.default.readFileSync(p, { encoding: "utf-8" }));
    console.log(`create-arche-app: ` + pkg.version);
}
catch (e) { }
// cli.help();
const parsed = cli.parse();
const directory = parsed.args[0];
const template = parsed.options["template"];
const questions = [];
if (!directory) {
    questions.push({
        type: "input",
        name: "directory",
        message: "Input Directory",
        default: ".",
    });
}
if (!template) {
    questions.push({
        type: "list",
        name: "template",
        message: "Select a template:",
        choices: [
            { name: chalk_1.default.yellow("Vanilla"), value: "vanilla" },
            { name: chalk_1.default.cyan("React"), value: "react" },
            { name: chalk_1.default.green("Vue"), value: "vue" },
            { name: chalk_1.default.blueBright("Ali-Mini"), value: "miniprogram" },
            { name: chalk_1.default.redBright("Library"), value: "library" },
        ],
        default: ".",
    });
}
questions.push({
    type: "input",
    name: "lib",
    message: "Input the name of library:",
    default: "arche-lib",
    when: (answers) => {
        const t = template !== null && template !== void 0 ? template : answers.template;
        return template === "library";
    },
});
// supress warning
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.cyanBright("You are creating an arche application."));
    const anwsers = Object.assign({ template,
        directory, lib: undefined }, (yield inquirer_1.default.prompt(questions)));
    const cwd = process.cwd();
    const targetPath = path_1.default.join(cwd, anwsers.directory);
    (0, create_app_1.createApp)(anwsers.template, targetPath, anwsers.lib);
    console.log(`\nDone. Now run:\n`);
    if (targetPath !== cwd) {
        console.log(`  cd ${path_1.default.relative(cwd, targetPath)}`);
    }
    console.log(`  npm install (or \`yarn\`)`);
    console.log(`  npm run dev (or \`yarn dev\`)`);
    console.log();
}), 0);
