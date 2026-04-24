import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { useMainStore } from './store';
import { applyThemePreferences } from './theme';
import { applySiteMetadata, siteConfig } from '@/content/site';
import './style.css'
import 'vue-sonner/style.css'
import App from './App.vue'

import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

// 创建 Vue 实例
applySiteMetadata();
applyThemePreferences();
const app = createApp(App);
const pinia = createPinia();

// 注册 Pinia
app.use(pinia);
const store = useMainStore(pinia); 

if (siteConfig.analytics.enabled && siteConfig.analytics.provider === 'googleAnalytics') {
    const analytics = Analytics({
        app: siteConfig.analytics.app || siteConfig.site.title,
        plugins: [
            googleAnalytics({
                measurementIds: siteConfig.analytics.measurementIds || [],
            })
        ]
    });

    analytics.page();
}

// 监听窗口大小变化
function handleResize() {
    store.setIsMobile(window.innerWidth < 768 ? true : false);
}
handleResize();
window.addEventListener('resize', handleResize);

app.mount('#app');
