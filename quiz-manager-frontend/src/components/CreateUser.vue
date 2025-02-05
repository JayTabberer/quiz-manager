<template>
    <div>
        <h1>Create User</h1>
        <form @submit.prevent="createUser" class="form-block">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required>
            <label type="text" required> Role</label>
            <input type="text" id="role" value="admin" v-model="role" required>
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
            role: 'admin',
            password: ''
        };
    },

    methods: {
        async createUser() {
            const user = {
                username: this.username,
                role: this.role,
                password: this.password
            };
            await quizService.registerUser(user);
            this.$router.push({ name: 'UserList' });
        }
        
    },
};

</script>

<style>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background: rgb(32, 31, 44);
    }
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