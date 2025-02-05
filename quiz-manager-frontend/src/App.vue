<template>
  <div id="app">
    <nav>
      <router-link to="/">Create User</router-link>
      <router-link to="/login-page">Login</router-link>
      <router-link to="/home-page">HomePage</router-link>
      <router-link to="/quizzes">Quizzes</router-link>
      <router-link to="/create-quiz">Create Quiz</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>