import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { useMainStore } from './store';
import 'bootstrap';
import './style.css'
import App from './App.vue'

import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

// 创建 Vue 实例
const app = createApp(App);
const pinia = createPinia();

// 注册 Pinia
app.use(pinia);
const store = useMainStore(pinia); 

// Google Analytics 配置
const analytics = Analytics({
    app: 'MyIP',
    plugins: [
        googleAnalytics({
            measurementIds: ['G-Z5G5JGDFMK'],
        })
    ]
});

analytics.page();

// 监听窗口大小变化
function handleResize() {
    store.setIsMobile(window.innerWidth < 768 ? true : false);
}
handleResize();
window.addEventListener('resize', handleResize);

app.mount('#app');
