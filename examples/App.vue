<!--
 * @since: 2021-11-24 14:23:10
 * @LastAuthor: Do not edit
 * @lastTime: 2021-11-30 09:20:48
 * @文件相对于项目的路径: \financial-sx-sso-webe:\npm仓库\curd-table\examples\App.vue
 * @Author: ltm@xtoneict.com
 * @message: 
-->
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/curTable">自定义表格</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
