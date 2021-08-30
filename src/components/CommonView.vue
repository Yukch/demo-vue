<template>
  <div>
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
      <!-- <el-footer class="footer" height="45px">

      </el-footer> -->

    </el-container>
  </div>
</template>

<script>
import NavBar from './common/NavBar'

export default {
  components: {NavBar},
  name: 'CommonView'
}
</script>

<style>
.header {
    position: fixed;
    width: 100%;
    z-index: 9999;
}

.main {
    margin-top: 45px;
    width: 100%;
    position: fixed;
    height: 100%;
}

</style>
