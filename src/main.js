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

// Initialize theme preferences and Vue app instance
applyThemePreferences();
const app = createApp(App);
const pinia = createPinia();

// Register Pinia store
app.use(pinia);
const store = useMainStore(pinia); 
applySiteMetadata(store.currentLocale);

const currentConfig = store.siteConfig;
if (currentConfig.analytics.enabled && currentConfig.analytics.provider === 'googleAnalytics') {
    const analytics = Analytics({
        app: currentConfig.analytics.app || currentConfig.site.title,
        plugins: [
            googleAnalytics({
                measurementIds: currentConfig.analytics.measurementIds || [],
            })
        ]
    });

    analytics.page();
}

// Track viewport size changes for responsive layout
function handleResize() {
    store.setIsMobile(window.innerWidth < 768 ? true : false);
}
handleResize();
window.addEventListener('resize', handleResize);

app.mount('#app');
