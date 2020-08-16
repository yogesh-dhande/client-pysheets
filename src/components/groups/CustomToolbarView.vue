<template>
    <div :id="model.id" class="toolbar toolbar-background">
        <div @mouseover="mouseover" @mouseleave="mouseleave">
            <span v-show="!showButtons">{{model.name}}</span>
            <b-button-group v-show="showButtons">
                <component
                        class="toolbar-background"
                        v-for="child in children" :key="child.id"
                        :is="child.default_view.name"
                        :model="child"
                ></component>
            </b-button-group>
        </div>
    </div>
</template>

<script>
    import Toolbar from "./../inputs/Toolbar"
    import components from "../bokeh";

    export default {
        name: "CustomToolbarView",
        components: {
            ...components,
            "toolbar": Toolbar
        },
        props: ["model"],
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
            children () {
                return this.model.children.map(
                    child => {
                        child.tooltip = child.label
                        child.label = ""
                        child.block = false
                        return child
                    }
                )
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