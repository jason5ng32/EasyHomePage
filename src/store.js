// store.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {

    state: () => ({
        isMobile: false,
    }),

    getters: {
    },

    actions: {
        setIsMobile(value) {
            this.isMobile = value;
        }
    }
});