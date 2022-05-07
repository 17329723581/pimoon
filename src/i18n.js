import Vue from 'vue'
import Vue18n from 'vue-i18n'

Vue.use(Vue18n);

const i18n = new Vue18n({
    locale: sessionStorage.getItem("locale") ||"en",
    silentTranslationWarn: true,
    messages: {
        'en': require('@/locale/en').default,// 英文
        'zhHans': require('@/locale/zhHans').default,//中文
    }
})

export default i18n;
