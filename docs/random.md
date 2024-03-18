---
editLink: false
---

<script setup>
import { useRouter, withBase } from 'vitepress'
import { data } from './routes.data.ts'

const router = useRouter();
const routes = data.map(e => e.url).filter(e => !['/', '/random'].includes(e));
const randomRoute = routes[Math.floor(Math.random() * routes.length)];
const debugMode = false;
debugMode || router.go(withBase(randomRoute));
</script>

<pre v-if="debugMode">{{ routes }}</pre>
