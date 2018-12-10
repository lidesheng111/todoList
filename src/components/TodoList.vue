<template>
<div>
    <input type="text" class="todo-input" placeholder="what needs to de done" v-model="newTodo" v-on:keyup.enter="onAdd">
    <div v-for="(todo, index) in todos" v-bind:key="todo.id" class="todo-item-container">
        <div class="todo-item-left">
            <input type="checkbox" v-model="todo.completed" @click="onCheckAll">
            <div v-if="!todo.editing" class="todo-item-label" :class="{completed: todo.completed}" @dblclick="onEdit(todo)" >{{todo.title}}</div>
            <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="onFinished(todo)" @keyup.enter="onFinished(todo)" v-focus @keyup.esc="onCancel(todo)">
        </div>
        <div class="remove-item" v-on:click="onRemove(index)">&times;</div>
    </div>

    <div class="extra-container">
        <div>
            <label for="checkAll">Check All</label>
            <input type="checkbox" id="checkAll" v-model="allCompleted" @click="toggleCheckAll(allCompleted)">
        </div>
        <div>{{remaining}} items left</div>
    </div>
</div>
</template>

<script>
export default {
    name: "todo-list",

    data() {
        return {
            newTodo: "",
            todoCount: 3,
            beforeEditingCache: "",
            todos: [
                { id: 1, title: "Finish Vue Screencast", completed: false, editing: false },
                { id: 2, title: "Take over world", completed: false, editing: false },
                { id: 3, title: "Learn Vue", completed: false, editing: false }
            ],
            allCompleted: false,
        };
    },

    computed: {
        remaining() {
            return this.todos.filter(todo => !todo.completed).length
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

    methods: {
        onAdd() {
            this.todoCount++;
            if (this.newTodo.trim().length === 0) return;
            
            this.todos.push({
                id: this.todoCount,
                title: this.newTodo,
                completed: false
            });
            
            this.allCompleted = false;
            this.newTodo = "";
        },
        onRemove(index) {
            this.todos.splice(index, 1);
        },
        onEdit(todo) {
            this.beforeEditingCache = todo.title; // 编辑开始前，先把内容缓存
            todo.editing = true;
        },
        onFinished(todo) {
            if (todo.title.trim() === "") {
            todo.title = this.beforeEditingCache;
            } // 不允许编辑后内容为空
            todo.editing = false;
        },
        onCancel(todo) {
            todo.title = this.beforeEditingCache; // 取消：调用缓存
            todo.editing = false;
        },
        onCheckAll() {
            if (this.remaining - 1 == 0) { this.allCompleted = true; }
            else { this.allCompleted = false; }
        },
        toggleCheckAll(allCompleted) {
            console.log(this.todos)
            this.todos.forEach( (todo) => {
                todo.completed = !allCompleted
            })
        }
    }
};
</script>


<style lang="scss">
    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
        outline: 0;
        }
    }

    .todo-item-container {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .todo-item-label {
            padding: 6px;
            display: inline-block;
        }

        .todo-item-edit {
            font-size: 16px;
            color: #2c3e50;
            padding: 5px;
            border: 1px solid #ccc;
            font-family: "Avenir", Helvetica, Arial, sans-serif;
            &:focus {
                outline: none;
            }
        }

        .remove-item {
            cursor: pointer;
            margin-left: 14px;
            &:hover {
                color: black;
            }
        }

        .completed {
            text-decoration: line-through;
            color: grey;
        }
    }

    .extra-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        border-top: 1px solid lightgreen;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
        &:hover {
            background: none;
        }
        &:focus {
            outline: none;
        }
    }

    .active {
        background: lightgreen;
    }
</style>
