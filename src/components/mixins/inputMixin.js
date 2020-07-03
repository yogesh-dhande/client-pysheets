import {mapActions} from "vuex";

export const inputMixin = {
    data() {
        return {
            config: JSON.parse(JSON.stringify(this.$props))
        }
    },
    mounted() {
        Object.keys(this.config).forEach(
            prop => {
                this.$watch('config.' + prop, function (newValue, oldValue) {
                    console.log(prop + ' changed from ' + oldValue + ' to ' + newValue + '!');
                }, {deep: true})
            }
        )
    },
    methods: {
        ...mapActions(["updateValue"]),
    }
}
