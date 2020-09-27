<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand class="navbar-brand" href="#">
                <font-awesome-icon icon="seedling" size="lg"/>
                Welcome to PySheets
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-show="user" @click="signoutButtonPressed">
                        Logout
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

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
                this.$router.push({name: "Login"});
            }
        }
    };
</script>
