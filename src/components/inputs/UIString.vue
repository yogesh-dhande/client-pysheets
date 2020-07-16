<template>
    <b-form-group
            class="form-input"
            description=""
            :id="id.toString()"
            :label="label"
    >
        <b-form-input
                class="form-input-element"
                type="text"
                v-model="config.value"
                @change="updateValue(config)"
        ></b-form-input>
    </b-form-group>
</template>

<script>
    import {inputMixin} from "../mixins/inputMixin";

    export default {
        name: "ui-string",
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
        }
    };
</script>



