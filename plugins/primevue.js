import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Dialog from "primevue/dialog";
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.use(ToastService, {ripple: true});

    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('Dialog', Dialog);
    // nuxtApp.vueApp.component('Dialog', Button);
    //other components that you need
});