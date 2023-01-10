// @ts-nocheck
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const ejs = require("ejs");

const whiteList = ["index.ts", ".DS_Store"]

type IBusinessList = { name: string; path: string }[];
function getAllBiz(source: string): IBusinessList {
  if (!fs.existsSync(source)) {
    console.log(chalk.yellow(`目录不存在${source}`));
    return [];
  }
  const folders: string[] = fs.readdirSync(source);
  const bizList: IBusinessList = [];
  folders.forEach((item) => {
    if (whiteList.includes(item)) return;
    const itemPath = path.resolve(__dirname, `../../packages/lordaeron-react/src/components/${item}/`);
    bizList.push({
      name: item,
      path: itemPath,
    });
  });
  return bizList;
}
const targetFile: string = path.resolve(__dirname, "../../packages/lordaeron-react/src/index.ts");
const bizPath: string = path.resolve(__dirname, "../../packages/lordaeron-react/src/components");
const templatePath: string = path.resolve(
  __dirname,
  "./auto-import.ts.ejs",
);

console.log(chalk.green(`配置插件...`));

const template: Buffer = fs.readFileSync(templatePath, "utf8");
const bizList: IBusinessList = getAllBiz(bizPath);
const result = ejs.render(template, { plugins: bizList });

fs.writeFile(targetFile, result, (err: NodeJS.ErrnoException) => {
  if (err) {
    console.error("write file error", err);
  } else {
    console.log(chalk.green(`配置插件完成: ${targetFile}\n`));
  }
});