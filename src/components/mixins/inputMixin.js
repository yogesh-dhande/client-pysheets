import {mapActions} from "vuex";

export const inputMixin = {
    props: {
        id: {
            type: String
        },
        label: {
            type: String
        },
        value: {
            type: String
        }
    },
    data() {
        return {
            localValue: this.value
        }
    },
    methods: {
        ...mapActions(["updateValue"]),
    }
}
