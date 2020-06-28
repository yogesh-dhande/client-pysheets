<template>
    <b-table striped hover
             :id="id"
             :items="JSON.parse(value).data"
             small responsive="true"
             head-variant="dark"
    ></b-table>
</template>

<script>
    export default {
        name: "ui-table-summary",
        props: {
            id: {
                type: String
            },
            value: {
                type: String
            },
        },
    }
</script>

<style scoped>

</style>
