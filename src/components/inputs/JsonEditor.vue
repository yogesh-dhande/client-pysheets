<template>
    <div>
        <multi-choice
                id="id"
                label="json"
                :options="flattenedKeys"
                v-model="selectedKeys"
        >
        </multi-choice>
        <b-form-group
                v-for="key in selectedKeys"
                :label="key"
                :key="key"
        >
            <b-form-input
                    type="text"
                    :value="flattenedObject[key]"
                    @change="v => updateModel(key, v)"
            >
            </b-form-input>
        </b-form-group>
        <br>
        {{value}}
        <br>
        {{selectedKeys}}
    </div>
</template>

<script>
    import MultiChoice from "./MultiChoice"

    export default {
        name: "JsonEditor",
        components: {
            "multi-choice": MultiChoice
        },
        data() {
            return {
                value: {
                    key1: {
                        key11: "value11"
                    },
                    key2: "value2"
                },
                selectedKeys: []
            }
        },
        computed: {
            flattenedObject() {
                return this.flatten(this.value)
            },
            flattenedKeys() {
                return Object.keys(this.flattenedObject)
            },
        },
        methods: {
            updateModel(flattenedKey, value) {
                this.flattenedObject[flattenedKey] = value
                this.value = this.unflatten(this.flattenedObject)
            },
            flatten(data) {
                let result = {};

                function recurse(cur, prop) {
                    if (Object(cur) !== cur) {
                        result[prop] = cur;
                    } else if (Array.isArray(cur)) {
                        let l = cur.length
                        for (let i = 0; i < l; i++)
                            recurse(cur[i], prop + "[" + i + "]");
                        if (l === 0)
                            result[prop] = [];
                    } else {
                        let isEmpty = true;
                        for (let p in cur) {
                            isEmpty = false;
                            if (Object.prototype.hasOwnProperty.call(cur, p)) {
                                recurse(cur[p], prop ? prop + "." + p : p);
                            }
                        }
                        if (isEmpty && prop)
                            result[prop] = {};
                    }
                }

                recurse(data, "");
                return result;
            },
            unflatten(data) {
                "use strict";
                if (Object(data) !== data || Array.isArray(data))
                    return data;
                let result = {}, idx, temp;
                for (let p in data) {
                    let cur = result
                    let prop = ""
                    let last = 0;
                    if (Object.prototype.hasOwnProperty.call(data, p)) {
                        do {
                            idx = p.indexOf(".", last);
                            temp = p.substring(last, idx !== -1 ? idx : undefined);
                            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
                            prop = temp;
                            last = idx + 1;
                        } while (idx >= 0);
                        cur[prop] = data[p];

                    }

                }
                return result[""];
            }
        }

    }
</script>

<style scoped>

</style>