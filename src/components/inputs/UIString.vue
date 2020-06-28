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
                v-model="value"
                @change="updateValue(value)"
        ></b-form-input>
    </b-form-group>
</template>

<script>
    import {inputMixin} from "../mixins/inputMixin";

    export default {
        name: "ui-string",
        mixins: [inputMixin],
        mounted() {
            Object.keys(this.value).forEach(
                prop => {
                    this.$watch('value.' + prop, function (newValue, oldValue) {
                        console.log(prop + ' changed from ' + oldValue + ' to ' + newValue + '!');
                    }, {deep: true})
                }
            )

        }
    };
</script>



