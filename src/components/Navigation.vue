<template>
    <b-navbar>
        <b-navbar-brand to="dashboard">Biokeh</b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item to="dashboard">Dashboard</b-nav-item>
            <b-nav-item to="settings">Settings</b-nav-item>
            <b-nav-item @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
    const fb = require('../firebaseConfig.js')

    export default {
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
