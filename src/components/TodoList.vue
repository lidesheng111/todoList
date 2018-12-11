<template>
<div>
    <input type="text" class="todo-input" placeholder="what needs to de done" v-model="newTodo" v-on:keyup.enter="onAdd">
    
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">

        <todo-item v-for="(todo, index) in todosFiltered" v-bind:key="todo.id" :todo_="todo" :index_="index" :checkAll_="anyRemaining" @onRemove_="onRemove" @onFinished_="onFinished">

        </todo-item>
    </transition-group>

    <div class="extra-container">
        <div>
            <label for="checkAll">Check All</label>
            <!-- anyRemaining取决于remaining是否等于0，将anyRemaining赋值给checked，以控制checkbox; 同时通过toogle方法，用checked值 和 forEach，控制(取消)全选 和 remaining -->
            <input type="checkbox" id="checkAll" v-bind:checked="anyRemaining" @change="toggleCheckAll">
        </div>
        <div>{{remaining}} items left</div>
    </div>

    <div class="button-container">
        <button :class="{ active: filter == 'all' }" @click=" filter = 'all' ">All</button>
        <button :class="{ active: filter == 'active' }" @click=" filter = 'active' ">Active</button>
        <button :class="{ active: filter == 'completed' }" @click=" filter = 'completed' ">Completed</button>
        <transition name="fade">
            <button class="clear-btn" v-if="showClearCompletedButton" @click="onClearCompleted">Clear Completed</button>
        </transition>    
    </div>
</div>
</template>

<script>
import TodoItem from './TodoItem';

export default {
    name: "todo-list",

    components: {
        TodoItem
    },

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
            filter: 'all',
        };
    },

    computed: {
        remaining() {
            return this.todos.filter(todo => !todo.completed).length
        },
        anyRemaining() {
            return this.remaining == 0;
        },
        todosFiltered() {
            switch (this.filter) {
                case 'all': return this.todos;
                    break;

                case 'active':
                    return this.todos.filter(todo => !todo.completed);
                    break;

                case 'completed': return this.todos.filter(todo => todo.completed);
                    break;

                default: return this.todos;
            }
        },
        showClearCompletedButton() {
            return this.todos.filter( todo => todo.completed).length > 0;
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
            // 接收子组件emit过来的数据，更新todos
            this.todos.splice(index, 1);
        },
        toggleCheckAll() {
            this.todos.forEach( (todo) => {
                todo.completed = event.target.checked;
            })
        },
        onClearCompleted() {
            this.todos = this.todos.filter( todo => !todo.completed );
        },
        onFinished(data) {
            // 接收子组件emit过来的数据，更新todos
            this.todos.splice(data.index, 1, data.todo)
        }
    }
};
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

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
        animation-duration: 0.3s;

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

    .button-container {
        display: block;

        button {
            font-size: 14px;
            background-color: white;
            appearance: none;
            &:hover {
                background: lightgreen;
            }
            &:focus {
                outline: none;
            }
        }

        .active {
            background: lightgreen;
        }

        .clear-btn {
            float: right;
        }   
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
