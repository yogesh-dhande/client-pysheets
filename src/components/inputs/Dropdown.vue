<template>
    <b-dropdown type="submit"
                :id="id"
                :text="label"
                :variant="button_type"
                v-b-tooltip.hover :title="tooltip"
                block
    >
        <b-dropdown-item-button
                v-for="item in menu"
                @click="selectOption(item)"
                :key="item">
            {{item}}
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
            menu: {
                type: Array
            },
            tooltip: {
                type: String
            },
            button_type: {
                type: String
            }
        },
        methods: {
            ...mapActions(['dispatchAction']),
            selectOption(item) {
                this.config.value = item
                this.dispatchAction({
                    event: 'menu item click',
                    value: this.config
                })
            }
        },
    };
</script>

