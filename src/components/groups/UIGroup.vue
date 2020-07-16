<template>
    <div :id="id">
        <component v-for="config in localChildren"
                   :key="config.key? config.key: config.id"
                   :is="config.component"
                   v-bind="config"
        ></component>
    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";

    export default {
        name: "ui-group",
        props: {
            id: {
                type: String
            },
            children: {
                type: Array
            }
        },
        components: {
            'ui-string': () => import('../inputs/UIString'),
            'ui-bool': () => import('../inputs/UIBool'),
            'ui-selector': () => import('../inputs/UISelector'),
            'ui-button': () => import('../inputs/UIButton'),
            'drop-down': () => import('../inputs/Dropdown'),
            'ui-column-collapsible': () => import('../inputs/UIColumnCollapsible'),
            'ui-table-summary': () => import('../inputs/UITableSummary'),
            'multi-choice': () => import('../inputs/MultiChoice'),
            'toolbar': () => import('../inputs/Toolbar'),
            'jexcel-sheet': () => import('../inputs/JexcelSheet'),
            'bokeh': () => import('../inputs/Bokeh'),
        },
        computed: {
            ...mapState(['app']),
            ...mapGetters(['getConfig']),
            localChildren() {
                return this.children.map(child => {
                    // console.log(this.getConfig(child.id))
                    return this.getConfig(child.id)
                })
            }
        }
    }
</script>

<style scoped>

</style>
