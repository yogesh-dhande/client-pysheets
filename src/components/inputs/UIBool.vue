<template>
    <b-button
            type="submit"
            @click="toggle"
            :variant="variant"
            v-b-tooltip.hover :title="tooltip"
            :block="block"
            :id="id"
    >
        <i :class="localIcon" aria-hidden="true"></i>
        {{config.label}}
    </b-button>
</template>

<script>

    import {inputMixin} from "../mixins/inputMixin";
    import {mapGetters, mapState} from "vuex";

    export default {
        name: "ui-bool",
        mixins: [inputMixin],
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            value: {
                type: Boolean
            },
            icon: {
                type: Object
            },
            inactive_icon: {
                type: Object
            },
            tooltip: {
                type: String
            },
            block: {
                type: Boolean
            }
        },
        computed: {
            ...mapState(['app']),
            ...mapGetters(['getConfig']),
            variant() {
                return this.value ? "success" : "secondary"
            },
            activeIcon() {
                return this.icon ? "fa fa-" + this.getConfig(this.icon.id).icon_name : "fa fa-check"
            },
            inactiveIcon() {
                return this.inactive_icon ? "fa fa-" + this.getConfig(this.inactive_icon.id).icon_name : "fa fa-times"
            },
            localIcon() {
                return this.config.value ? this.activeIcon : this.inactiveIcon
            }
        },
        methods: {
            toggle() {
                this.config.value = !this.config.value
                this.updateValue(this.config)
            }
        }
    };
</script>


