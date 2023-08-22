import App from './App.vue'
// #ifndef VUE3
import Vue from 'vue'
import {
	Button
} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
app.use(Button);
// #endif
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif