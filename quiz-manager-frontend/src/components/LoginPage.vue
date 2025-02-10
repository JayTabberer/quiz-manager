<template>
    <div class="container">
      <h1>Login</h1>
      <form @submit.prevent="loginUser" class="form-block">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required>
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import quizService from '../services/quizService';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await quizService.loginUser({
            username: this.username,
            password: this.password
          });
  
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
  
          alert('Login successful!');
  
          this.$router.push({ name: 'HomePage' });
        } catch (error) {
          console.error('Login failed:', error.response?.data?.message || error.message);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Center everything */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
  }
  
  .form-block {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Each form group (label + input) stacked */
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* Responsive button */
  button {
    width: 100%;
    padding: 10px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  button:hover {
    background-color: darkorange;
  }
  
  /* Make sure it looks good on all screen sizes */
  @media (max-width: 500px) {
    .form-block {
      width: 90%;
    }
  }
  </style>
  