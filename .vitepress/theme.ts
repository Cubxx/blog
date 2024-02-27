import fs from 'node:fs';
import path from 'node:path';
import { DefaultTheme } from 'vitepress';

function getFilesAndDirs(dirPath: string) {
    const files = fs.readdirSync(dirPath);
    return files.reduce(
        (acc, cur) => {
            const curPath = path.join(dirPath, cur);
            if (fs.statSync(curPath).isDirectory()) {
                acc.dirs.push(curPath);
            } else {
                acc.files.push(curPath);
            }
            return acc;
        },
        { files: [] as string[], dirs: [] as string[] },
    );
}
function DirToItem(dirpath: string): DefaultTheme.NavItem | [] {
    const { files, dirs } = getFilesAndDirs(dirpath);
    const routepath = dirpath.replaceAll(path.sep, '/').replace(srcDir, '');
    const name = path.basename(dirpath);
    let configFilepath = '';
    //@ts-ignore
    return dirs.length
        ? files.length
            ? (log('文件夹内不能同时具有文件和子文件夹'), []) //非法文件夹
            : { text: name, items: dirs.flatMap(DirToItem) } //父文件夹
        : files.length
        ? ((sidebar[`${routepath}/`] = files.some(
              (e) => e.includes(configFilename) && (configFilepath = e),
          )
              ? JSON.parse(fs.readFileSync(configFilepath).toString()).map((e: SidebarConfig) =>
                    parseSidebarConfig(e, routepath),
                )
              : files.flatMap(FileToItem)),
          {
              text: name,
              link: `${routepath}/${path.basename(
                  files[+files[0].includes(configFilename)],
                  '.md',
              )}`,
          }) //页面文件夹
        : { text: name, items: [] }; //空文件夹
}
function FileToItem(filepath: string): DefaultTheme.NavItemWithLink | [] {
    const name = path.basename(filepath, '.md');
    return name === 'index' ? [] : { text: name, link: `./${name}` };
}

const configFilename = 'sidebar.json';
type SidebarConfig = { text: string; items: SidebarConfig[] } | string;
function parseSidebarConfig(config: SidebarConfig, routepath: string): DefaultTheme.SidebarItem {
    return typeof config === 'string'
        ? { text: config, link: `${routepath}/${config}` }
        : {
              text: config.text,
              items: config.items.map((e: SidebarConfig) => parseSidebarConfig(e, routepath)),
              collapsed: false,
          };
}
const log = (function () {
    const filepath = 'create-theme-config.log';
    fs.writeFileSync(filepath, new Date().toString() + '\n');
    return function (...args: any[]) {
        fs.appendFileSync(filepath, args.join(' ') + '\n');
    };
})();

export const srcDir = 'docs';
const { files, dirs } = getFilesAndDirs(srcDir);
if (files.length !== 1 || path.basename(files[0]) !== 'index.md')
    log('根目录文件只能有一个index.md', files);
export const sidebar: DefaultTheme.SidebarMulti = {};
export const nav: DefaultTheme.NavItem[] = dirs.flatMap(DirToItem);
log(JSON.stringify({ nav, sidebar }, null, 4));
