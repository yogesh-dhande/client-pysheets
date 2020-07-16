<template>
    <div :id="id" class="toolbar toolbar-background">
        <div @mouseover="mouseover" @mouseleave="mouseleave">
            <span v-show="!showButtons">{{name}}</span>
            <b-button-group v-show="showButtons">
                <component :is="tool.component"
                           v-for="tool in localChildren"
                           :id="tool.id"
                           :key="tool.id"
                           v-bind="tool"
                           class="toolbar-background"
                >
                </component>
            </b-button-group>
        </div>
    </div>
</template>

<script>
    import UIBool from "./UIBool";
    import {mapGetters, mapState} from "vuex";
    import IconButton from "./IconButton";

    export default {
        name: 'toolbar',
        props: {
            id: {
                type: String
            },
            name: {
                type: String
            },
            children: {
                type: Array
            }
        },
        components: {
            "icon-button": IconButton,
            'ui-bool': UIBool
        },
        data() {
            return {
                showButtons: false,
            }
        },
        methods: {
            mouseover: function () {
                this.showButtons = true
            },
            mouseleave: function () {
                this.showButtons = false
            }
        },
        computed: {
            ...mapState(['app']),
            ...mapGetters(['getConfig']),
            localChildren() {
                return this.children.map(child => {
                    let config = this.getConfig(child.id)
                    config.tooltip = config.label
                    config.label = ""
                    config.block = false
                    return config
                })
            }
        }
    }
</script>
<style scoped>
    .toolbar {
        border-radius: 10px;
        margin: 16px 0;
        padding: 0;
        display: block;
        text-align: center;
        line-height: 50px;
        color: #fff;
        overflow: hidden;
    }

    .toolbar-background {
        background-color: #007db9;
        border-color: #007db9;
    }
</style>
