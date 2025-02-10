<template>
    <div>
        <h1>Create User</h1>
        <form @submit.prevent="createUser" class="form-block">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required>

            <label for="role">Role</label>
            <select id="role" v-model="role" required>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="user">User</option>
                <option value="viewer">Viewer</option>
            </select>

            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>

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

    .form-block {
        justify-content: center;
        width: 50%;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
        margin-top: 50px;
    }

    label {
        width: 45%;
        display: inline-block;
        margin-top: 10px;
        background-color: white;
    }

    input {
        width: 45%;
        padding: 5px;
        margin-top: 5px;
        background-color: white;
    }

    button {
        margin-top: 10px;
        padding: 5px;
        background-color: orange;
        color: white;
    }


</style>