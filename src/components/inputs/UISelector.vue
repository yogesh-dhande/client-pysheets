<template>
    <b-form-group
            class="form-input"
            description=""
            :id="id"
            :label="label"
    >
        <b-form-select
                class="form-input-element"
                :options="options"
                v-model="config.value"
                @change="updateValue(config)"
        ></b-form-select>
    </b-form-group>
</template>

<script>
    import {mapActions} from "vuex";
    import {inputMixin} from "../mixins/inputMixin";

    export default {
        name: "ui-selector",
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
        },
        methods: {
            ...mapActions(["updateValue"]),
        },
    };
</script>



