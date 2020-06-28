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
                v-model="localValue"
                @change="updateValue($props)"
        ></b-form-select>
    </b-form-group>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "ui-selector",
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
        data() {
            return {
                localValue: this.value
            };
        },
        methods: {
            ...mapActions(["updateValue"]),
        },
    };
</script>



