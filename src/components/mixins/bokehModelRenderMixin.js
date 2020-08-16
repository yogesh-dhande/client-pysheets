import {build_view} from "@bokeh/bokehjs";

export const bokehModelRenderMixin = {
    props: ['model'],
    data () {
        return {
            view: null
        }
    },
    mounted() {
        build_view(this.model).then(
            view => {
                this.view = view
                this.view.renderTo(this.$el)
            }
        )
    }
}