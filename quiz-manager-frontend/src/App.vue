<template>
  <div id="app">
      <nav>
          <div class="nav-left">
              <router-link to="/" v-if="!isLoggedIn">Create User</router-link>
              <router-link to="/login-page" v-if="!isLoggedIn">Login</router-link>
              <router-link to="/home-page" v-if="isLoggedIn">Home Page</router-link>
              <router-link to="/quizzes" v-if="isLoggedIn">Quizzes</router-link>
              <router-link 
                to="/create-quiz" 
                v-if="isLoggedIn && (userRole === 'admin' || userRole === 'editor')"
              >
                Create Quiz
              </router-link>
          </div>

          <div class="nav-right">
            <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
          </div>
      </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userRole: null,
      isLoggedIn: false,
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
      checkAuth() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role) {
            this.userRole = user.role;
            this.isLoggedIn = true;
        } else {
            this.userRole = null;
            this.isLoggedIn = false;
        }
      },
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userRole = null;
        this.isLoggedIn = false;
        this.$router.push('/login-page');
      }
  },
  watch: {
    '$route': 'checkAuth' // Recheck auth whenever route changes
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: rgb(32, 31, 44);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #1a1a2e;
}

.nav-left {
  display: flex;
}

.nav-right {
  margin-left: auto;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

.logout-btn {
  background: red;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.logout-btn:hover {
  background: darkred;
}
</style>
