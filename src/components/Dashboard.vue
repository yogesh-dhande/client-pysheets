<template>
    <b-container id="dashboard" style="padding: 4px; margin: 16px">
        <b-row>
            <b-col class="col1">
                <ui-group v-bind="side" :key="side.key"></ui-group>
            </b-col>
            <b-col class="col2">
                <ui-group v-bind="main" :key="main.key"></ui-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapState} from 'vuex'
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
            side() {
                return this.app.models[this.app.layout.side.id]
            },
            main() {
                return this.app.models[this.app.layout.main.id]
            }
        },
    }
</script>
