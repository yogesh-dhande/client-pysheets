<template>
    <b-button type="submit"
              :id="id"
              @click="dispatchAction({event: 'button click', value: $props})"
              :variant="variant"
              v-b-tooltip.hover :title="tooltip"
              :block="block"
    >
        <i :class="icon" aria-hidden="true"></i>
        {{label}}
    </b-button>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'ui-button',
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            icon: {
                type: String
            },
            tooltip: {
                type: String
            },
            block: {
                type: Boolean
            },
            variant: {
                type: String
            }
        },
        methods: {
            ...mapActions(['dispatchAction'])
        },
    };
</script>
