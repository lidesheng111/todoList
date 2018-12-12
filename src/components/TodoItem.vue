<template>
    <div class="todo-item-container">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="onFinished_">
            <div v-if="!editing" class="todo-item-label" :class="{completed: completed}" @dblclick="onEdit_" >{{title}}</div>
            <input v-else class="todo-item-edit" type="text" v-model="title" @blur="onFinished_" @keyup.enter="onFinished_" v-focus @keyup.esc="onCancel">
        </div>
        <div>
            <button @click="onPluralize_">Plural</button>
            <span class="remove-item" @click="onRemove_(index_)">&times;</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',

    // 接收父组件传递过来的数据
    props: {
        todo_: {
            type: Object,
            required: true,
        },
        index_: {
            type: Number,
            required: true,
        },
        checkAll_: {
            type: Boolean,
            required: true,
        }
    },

    data() {
        return {
            // 把接收到的数据变成自己的数据
            id: this.todo_.id,
            title: this.todo_.title,
            completed: this.todo_.completed,
            editing: this.todo_.editing,
            beforeEditCache: '',
        }
    },

    directives: {
        focus: {
            // 指令的定义
            inserted: function(el) {
            el.focus();
            }
        }
    },

    // created() {
    //     eventBus.$on('onPluralize', this.handlePluralize);
    // },
    // beforeDestroy() {
    //     eventBus.$off('onPluralize', this.handlePluralize);
    // },

    // 把父组件里的anyRemaining值（true/false）引入，以控制单个todo的completed。每次anyRemaining变换，TodoItem都会重新被渲染
    // watch属性直接侦听props里数据变动，从而触发后续动作；需保持变量名与方法名的对应；watch里的方法无需绑定在template里
    watch: {
        checkAll_() {
            this.completed = this.checkAll_ ? true : this.todo_.completed
        }
    },

    methods: {
        onRemove_(index) {
            this.$store.dispatch('onRemove', index)
        },
        onEdit_() {
            this.beforeEditingCache = this.title; // 编辑开始前，先把内容缓存
            this.editing = true;
        },
        onFinished_(todo) {
            // 不允许编辑后内容为空
            if (this.title.trim() === "") {
                this.title = this.beforeEditingCache;
            } 
            this.editing = false;

            this.$store.dispatch('onFinishEdit', {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing,
            });
        },
        onCancel(todo) {
            this.title = this.beforeEditingCache; // 取消：调用缓存
            this.editing = false;
        },
        onPluralize_() {
            // eventBus.$emit('onPluralize');

            // 改变本组件内部的title
            this.title = this.title + 's';
            
            // 改变store里的title
            this.$store.dispatch('onFinishEdit', {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing,
            });
        },
        // handlePluralize() {
        //     // 改变本组件内部的title
        //     this.title = this.title + 's';
            
        //     // 改变store里的title
        //     this.$store.dispatch('onFinishEdit', {
        //         id: this.id,
        //         title: this.title,
        //         completed: this.completed,
        //         editing: this.editing,
        //     });
        // }
     }
}
</script>