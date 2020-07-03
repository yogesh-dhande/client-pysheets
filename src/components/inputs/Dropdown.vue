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
    import {inputMixin} from "../mixins/inputMixin";

    export default {
        name: 'drop-down',
        mixins: [inputMixin],
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
                this.config.value = item.value
                this.dispatchAction({
                    event: 'menu item click',
                    value: this.config
                })
            }
        },
    };
</script>

