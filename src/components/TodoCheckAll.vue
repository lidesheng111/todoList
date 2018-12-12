<template>
    <div>
        <label for="checkAll">Check All</label>
        <!-- anyRemaining取决于remaining是否等于0，将anyRemaining赋值给checked，以控制checkbox; 同时通过toogle方法，用checked值 和 forEach，控制(取消)全选 和 remaining -->
        <input type="checkbox" id="checkAll" v-bind:checked="anyRemaining_" @change="onChecked">
    </div>
</template>

<script>
export default {
    name: 'todo-check-all',

    props:{
        anyRemaining_: {
            type: Boolean,
            required: true
        },
    },

    methods: {
        onChecked() {
            eventBus.$emit('toggleCheckAll')
        }
    }
}
</script>

