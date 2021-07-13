<template>
  <div id="app">
    <el-container>

      <!-- 头部 -->
      <el-header class="header" height="45px">
        <nav-bar></nav-bar>
      </el-header>

      <!-- 主体 -->
      <el-main class="main">
        <router-view/>
      </el-main>

      <!-- 尾部 -->
      <el-footer class="footer" height="45px">
          
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import NavBar from './components/common/NavBar.vue'

export default {
  components: {NavBar},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
