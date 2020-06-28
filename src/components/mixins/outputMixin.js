export const outputMixin = {
    props: ["value", "config", "label"],
    data() {
      return {
        localValue: this.value
      };
    },
    watch: {
      value: function(val) {
        this.localValue = val;
      }
    }

}