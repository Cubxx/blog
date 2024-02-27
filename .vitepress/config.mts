import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cubx's Blog",
  description: '',
  base: '/blog/',
  srcDir: './docs',
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '编程', items: [] },
      { text: '动画', items: [] },
      { text: '心理', items: [] },
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Examples',
        items: [],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Cubxx' },
      // { icon: 'twitter', link: 'https://twitter.com/Cubxxxxxx' },
    ],
  },
});
