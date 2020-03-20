import Vue from 'vue'
import App from './App.vue'
// vuex store
import store from './store'
// style
import '../assets/app.scss'
// BootstrapのJavaScript側の機能
import 'bootstrap'
// スタイルシート
import './index.scss'
// debug tool: run following command!
// ./node_modules/.bin/vue-devtools
import devtools from '@vue/devtools'

if (process.env.DEBUG) {
  devtools.connect('localhost', '8098')
}

Vue.directive('cloneable', {
  bind: function(el, binding, vnode) {
    el.style.position = 'relative'
    var startX, startY, initialMouseX, initialMouseY
    const component = vnode.componentInstance
    // move
    function mousemove(e) {
      const dx = e.clientX - initialMouseX
      const dy = e.clientY - initialMouseY
      var top = startY + dy
      var left = startX + dx
      el.style.top = top + 'px'
      el.style.left = left + 'px'
      return false
    }
    // up
    function mouseup(e) {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
      const boadRect = e.target.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      if (
        e.target.id === 'board' &&
        elRect.x >= boadRect.x &&
        elRect.y >= boadRect.y
      ) {
        component.$emit('drop', component)
        return
      }
      // at start position
      var top = startY
      var left = startX
      el.style.top = top + 'px'
      el.style.left = left + 'px'
    }
    // down
    el.addEventListener('mousedown', function(e) {
      startX = el.offsetLeft
      startY = el.offsetTop
      initialMouseX = e.clientX
      initialMouseY = e.clientY
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    })
  }
})

Vue.directive('draggable', {
  bind: function(el, binding, vnode) {
    el.style.position = 'absolute'
    var startX, startY, initialMouseX, initialMouseY
    const component = vnode.componentInstance

    function mousemove(e) {
      const dx = e.clientX - initialMouseX
      const dy = e.clientY - initialMouseY
      var top = startY + dy
      top = top >= 0 ? top : 0
      var left = startX + dx
      left = left >= 0 ? left : 0
      const parentRect = el.offsetParent.getBoundingClientRect()
      const thisRect = el.getBoundingClientRect()
      const topMax = parentRect.height - thisRect.height
      const leftMax = parentRect.width - thisRect.width
      top = top > topMax ? topMax : top
      left = left > leftMax ? leftMax : left
      el.style.top = top + 'px'
      el.style.left = left + 'px'
      component.$emit('dragging', component)
      return false
    }

    function mouseup() {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }

    el.addEventListener('mousedown', function(e) {
      startX = el.offsetLeft
      startY = el.offsetTop
      initialMouseX = e.clientX
      initialMouseY = e.clientY
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    })
  }
})
/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store
})
