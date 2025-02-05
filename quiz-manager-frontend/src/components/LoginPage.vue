<template>
    <div>
        <h1>Login</h1>
        <form class="form-block" @submit.prevent="login">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username">
            <label type="text" required> Role</label>
            <input type="text" id="role" value="admin" v-model="role" required>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password">
            <div style="background-color: white;">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
 export default {
    name: 'LoginPage',

    data() {
        return {
            username: '',
            role: 'admin',
            password: ''
        };
    },
 }

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