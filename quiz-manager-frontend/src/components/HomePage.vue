<template>
    <div>
        <h1>Welcome to Quiz Manager</h1>
        <router-link to="/quizzes">View Quizzes</router-link>
        <router-link to="/create-quiz">Create Quiz</router-link>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
};
</script>