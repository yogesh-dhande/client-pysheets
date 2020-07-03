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
        {{label}}
    </b-button>
</template>

<script>

    import {inputMixin} from "../mixins/inputMixin";

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
                type: String
            },
            inactive_icon: {
                type: String
            },
            tooltip: {
                type: String
            },
            block: {
                type: Boolean
            }
        },
        computed: {
            variant() {
                return this.value ? "success" : "secondary"
            },
            activeIcon() {
                return this.icon ? this.icon : "fa fa-check"
            },
            inactiveIcon() {
                return this.inactive_icon ? this.inactive_icon : "fa fa-times"
            },
            localIcon() {
                return this.value ? this.activeIcon : this.inactiveIcon
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


