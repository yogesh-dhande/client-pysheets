<template>
    <div id="app">
        <navigation v-if="currentUser"></navigation>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Navigation from './components/Navigation.vue'

    export default {
        name: 'App',
        components: {
            'navigation': Navigation
        },
        computed: {
            ...mapState(['currentUser'])
        },
    }
</script>

<style>
</style>
