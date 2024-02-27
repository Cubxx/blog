import { defineConfig } from 'vitepress';
import { srcDir, nav, sidebar } from './theme';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Cubx's Blog",
    description: '',
    base: '/blog/',
    srcDir: srcDir,
    cleanUrls: true,
    lastUpdated: true,
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
        outline: { level: 2, label: '页面导航' },
        editLink: {
            text: '在 GitHub 上编辑此页面',
            pattern: 'https://github.com/cubxx/blog/edit/main/docs/:path',
        },
    },
});
