export const bokehButtonMixin = {
    methods: {
        click() {
            if (this.view) {
                this.view.click()
            }
        }
    }
}