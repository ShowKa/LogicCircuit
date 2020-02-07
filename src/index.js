import Vue from 'vue'
import App from './App.vue'
import '../assets/app.scss'
// BootstrapのJavaScript側の機能
import "bootstrap";
// スタイルシート
import "./index.scss";
new Vue({
  el: '#app',
  render: h => h(App)
})