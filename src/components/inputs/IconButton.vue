<template>
    <b-button type="submit"
              :id="id"
              @click="dispatchAction({event: 'button click', value: $props})"
              :variant="variant"
              v-b-tooltip.hover :title="tooltip"
              :block="block"
    >
        <i :class="localIcon" aria-hidden="true"></i>
    </b-button>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'icon-button',
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            icon: {
                type: Object
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
        computed: {
            ...mapState(['app']),
            localIcon () {
                return "fa fa-" + this.app.models[this.icon.id].icon_name
            }
        }
    };
</script>
