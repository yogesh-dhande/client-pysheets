<template>
    <div :id="id" class="toolbar toolbar-background">
        <div @mouseover="mouseover" @mouseleave="mouseleave">
            <span v-show="!showButtons">{{label}}</span>
            <b-button-group v-show="showButtons">
                <component :is="tool.component"
                           v-for="tool in children"
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
    import UIButton from "./UIButton";
    import UIBool from "./UIBool";

    export default {
        name: 'toolbar',
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            children: {
                type: Array
            }
        },
        components: {
            'ui-button': UIButton,
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
