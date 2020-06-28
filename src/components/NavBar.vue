<template>
    <div class="container-fluid">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#"><font-awesome-icon icon="seedling" size="lg" /> Welcome to PySheets</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li v-show="user" class="nav-item">
                        <a class="nav-link" @click="signoutButtonPressed">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>

    </div>
</template>

<script>
    import firebase from "firebase";
    export default {
        data() {
            return {
                user: null,
                activeTab: null
            };
        },
        created() {
            firebase.auth().onAuthStateChanged(user => {
                this.user = user;
            });
        },
        methods: {
            signoutButtonPressed(e) {
                e.stopPropagation();
                firebase.auth().signOut();
                this.$router.push({ name: "Login" });
            }
        }
    };
</script>
