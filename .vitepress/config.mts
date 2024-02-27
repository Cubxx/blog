import { defineConfig } from 'vitepress';
import { srcDir, nav, sidebar } from './theme';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Cubx's Blog",
    description: '',
    base: '/blog/',
    srcDir: srcDir,
    cleanUrls: true,
    markdown: {
        image: {
            lazyLoading: true,
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: nav,
        sidebar: sidebar,
        search: {
            provider: 'local',
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Cubxx' },
            // { icon: 'twitter', link: 'https://twitter.com/Cubxxxxxx' },
        ],
        outline: { label: '页面导航', level: 2 },
        editLink: {
            text: '在 GitHub 上编辑此页面',
            pattern: 'https://github.com/cubxx/blog/edit/main/docs/:path',
        },
        lastUpdated: { text: '最后更新于' },
    },
});
