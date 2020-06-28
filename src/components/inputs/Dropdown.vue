<template>
    <b-dropdown type="submit"
                :id="id"
                :text="label"
                :variant="variant"
                v-b-tooltip.hover :title="tooltip"
                block
    >
        <b-dropdown-item-button
                v-for="item in options"
                @click="selectOption(item)"
                :key="item.value">
            {{item.text}}
        </b-dropdown-item-button>
    </b-dropdown>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'drop-down',
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            value: {
                type: String
            },
            options: {
                type: Array
            },
            tooltip: {
                type: String
            },
            variant: {
                type: String
            }
        },
        methods: {
            ...mapActions(['dispatchAction']),
            selectOption(item) {
                this.value = item.value
                this.dispatchAction({
                    event: 'menu item click',
                    value: this.$props
                })
            }
        },
    };
</script>

