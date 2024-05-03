/**
 * 其他资料
 * @link https://github.com/luzhisheng/js_reverse?tab=readme-ov-file
 * @link https://github.com/ChenZixinn/spider_reverse
 * @link https://github.com/LoseNine/Crack-JS-Spider
 */

/**
 * 监听前端对 cookie 的更改
 * @link https://github.com/JSREI/js-cookie-monitor-debugger-hook/blob/main/js-cookie-monitor-debugger-hook.js
 */
(function () {
    let c = document.cookie;
    Object.defineProperty(document, 'cookie', {
        get() {
            return c;
        },
        set(v) {
            debugger;
            c += v;
        },
    });
})();
