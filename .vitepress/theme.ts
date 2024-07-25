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
function toNavItem(dirpath: string): DefaultTheme.NavItem {
    const { files, dirs } = getFilesAndDirs(dirpath);
    const routepath = dirpath.replaceAll(path.sep, '/').replace(srcDir, '');
    const name = path.basename(dirpath);
    let configFilepath = '';

    if (files.length) {
        //页面文件夹
        sidebar[`${routepath}/`] = files.some(
            (e) => e.includes(configFilename) && (configFilepath = e),
        )
            ? JSON.parse(fs.readFileSync(configFilepath).toString()).map((e: SidebarConfig) =>
                  toSidebarItem(e, routepath),
              )
            : files.flatMap((filepath) => {
                  const { name } = path.parse(filepath);
                  return name === 'index' ? [] : toSidebarItem(name, routepath);
              });
        const filepath = files[+files[0].includes(configFilename)];
        if (!filepath) {
            log('文件夹下没有内容文件', dirpath);
            return { text: name, link: '/404' };
        }
        return { text: name, link: `${routepath}/${path.parse(filepath).name}` };
    } else {
        //@ts-ignore
        return dirs.length
            ? { text: name, items: dirs.map(toNavItem) } //父文件夹
            : { text: name, link: '/404' }; //空文件夹
    }
}

const configFilename = 'sidebar.json';
type SidebarConfig = { text: string; items: SidebarConfig[] } | string;
function toSidebarItem(config: SidebarConfig, routepath: string): DefaultTheme.SidebarItem {
    return typeof config === 'string'
        ? { text: config, link: `${routepath}/${config}` }
        : {
              text: config.text,
              items: config.items.map((e: SidebarConfig) => toSidebarItem(e, routepath)),
              collapsed: false,
          };
}
const log = (function () {
    const filepath = `${__dirname}/theme.log`;
    fs.writeFileSync(filepath, new Date().toString() + '\n');
    return function (...args: any[]) {
        fs.appendFileSync(filepath, args.join(' ') + '\n');
    };
})();

export const srcDir = 'docs';
export const sidebar: DefaultTheme.SidebarMulti = {};
export const nav: DefaultTheme.NavItem[] = [];

const { files, dirs } = getFilesAndDirs(srcDir);
Object.assign(nav, dirs.map(toNavItem));
log(JSON.stringify({ nav, sidebar }, null, 4));
