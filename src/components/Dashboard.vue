<template>
    <b-container id="dashboard" style="padding: 4px; margin: 16px">
        <b-row>
            <b-col cols="4">
                <ui-group v-bind="side" :key="side.id"></ui-group>
            </b-col>
            <b-col>
                <ui-group v-bind="main" :key="main.id"></ui-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import UIGroup from "./groups/UIGroup";

    export default {
        components: {
            'ui-group': UIGroup,
        },
        data() {
            return {
                post: {
                    content: ''
                },
                comment: {
                    postId: '',
                    userId: '',
                    content: '',
                    postComments: 0
                },
                showCommentModal: false,
                showPostModal: false,
                fullPost: {},
                postComments: []
            }
        },
        computed: {
            ...mapState(['session', 'app', 'userProfile', 'currentUser', 'posts', 'hiddenPosts']),
            ...mapGetters(['getConfig']),

            side() {
                return this.app.models[this.app.layout.side.id]
            },
            main() {
                return this.app.models[this.app.layout.main.id]
            }
        },
    }
</script>
