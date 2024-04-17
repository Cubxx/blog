---
editLink: false
lastUpdated: false
---

<script setup>
import { useRouter, withBase } from 'vitepress'
import { data } from './routes.data.ts'

const routes = data.map(e => e.url).filter(e => !['/', '/random'].includes(e));
const randomRoute = routes[Math.floor(Math.random() * routes.length)];
const content = randomRoute
    ? useRouter().go(withBase(randomRoute))
    : {
        msg: '意料外的错误',
        data: Array.isArray(data) ? (data.length > 0 || '空数组') : '非数组',
        routes: Array.isArray(routes) ? (routes.length > 0 || '空数组') : '非数组',
        randomRoute: typeof randomRoute === 'string' ? randomRoute : '非字符串',
    };
</script>
<pre>{{ content }}</pre>
