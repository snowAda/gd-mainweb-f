<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// App.vue 现在只作为路由容器
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  width: 100%;
}
</style>
