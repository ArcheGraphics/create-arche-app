"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const templatesDir = path_1.default.join(__dirname, "../", "templates");
function createApp(template, targetPath, libName) {
    const templateDir = path_1.default.join(templatesDir, template);
    const isTemplateExist = fs_1.default.existsSync(templateDir);
    if (!isTemplateExist) {
        throw `Can't find template: ${template}`;
    }
    copy(templateDir, targetPath);
    if (libName) {
        const pkgJsonPath = path_1.default.join(targetPath, "package.json");
        const pkgJson = require(pkgJsonPath);
        pkgJson.name = libName;
        fs_1.default.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2), {
            encoding: "utf-8",
        });
    }
}
exports.createApp = createApp;
function copy(src, dest) {
    const stat = fs_1.default.statSync(src);
    if (stat.isDirectory()) {
        copyDir(src, dest);
    }
    else {
        fs_1.default.copyFileSync(src, dest);
    }
}
function copyDir(srcDir, destDir) {
    fs_1.default.mkdirSync(destDir, { recursive: true });
    for (const file of fs_1.default.readdirSync(srcDir)) {
        const srcFile = path_1.default.resolve(srcDir, file);
        const destFile = path_1.default.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}
