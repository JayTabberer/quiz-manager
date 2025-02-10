<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="loginUser" class="form-block">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required>

            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>

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
