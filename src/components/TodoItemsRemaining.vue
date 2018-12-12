<template>
    <div>{{remaining_}} items left</div>
</template>

<script>
export default {
    name: 'todo-remaining',

    props:{
        remaining_: {
            type: Number,
            required:true
        }
    }
}
</script>

