<template>
    <div class="container">
      <h1>Create User</h1>
      <form @submit.prevent="createUser" class="form-block">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required>
        </div>
  
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="role" required>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="user">User</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
  
        <button type="submit">Create User</button>
      </form>
    </div>
  </template>
  
  <script>
  import quizService from '../services/quizService';
  
  export default {
    name: 'CreateUser',
    data() {
      return {
        username: '',
        role: 'user',
        password: ''
      };
    },
    methods: {
      async createUser() {
        try {
          const user = {
            username: this.username,
            role: this.role,
            password: this.password
          };
  
          await quizService.registerUser(user);
          this.$router.push({ name: 'LoginPage' });
        } catch (error) {
          console.error('Error creating user:', error.response?.data?.error || error.message);
        }
      }
    },
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
  
  input,
  select {
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
  