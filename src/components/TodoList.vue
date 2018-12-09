<template>
  <div>
    <input type="text" class="todo-input" placeholder="what needs to de done" v-model="newTodo" v-on:keyup.enter="onAdd">
    <div v-for="(todo, index) in todos" v-bind:key="todo.id" class="todo-item">
        <div class="todo-item-left">
            <div v-if="!todo.editting" class="todo-item-label" @dblclick="onEdit(todo, index)">{{todo.title}}</div>
            <input v-else class="todo-item-edit" type="text" v-model="todo.title">
        </div>
        <div class="remove-item" v-on:click="onRemove(index)">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      todoCount: 3,
      todos: [
          {id: 1, title: 'Finish Vue Screencast', completed: false, editting: false},
          {id: 2, title: 'Take over world', completed: false, editting: false},
          {id: 3, title: 'Learn Vue', completed: false, editting: false}
      ]
    }
  },
  methods: {
      onAdd: function(){
          this.todoCount++;
          if (this.newTodo.trim().length === 0) return;
          this.todos.push({id: this.todoCount, title: this.newTodo, completed: false});
          this.newTodo = '';
      },
      onRemove: function(index) {
          this.todos.splice(index, 1)
      },
      onEdit: function(todo, index) {
          this.todos[index].editting = true;
          console.log(index)
      }
  }
}
</script>


<style>
  .todo-input {
      width: 100%;
      padding: 10px 18px;
      font-size: 18px;
      margin-bottom: 16px;
  }
  .todo-input:focus {
      outline: 0;
  }

  .todo-item {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

  .remove-item {
      cursor: pointer;
      margin-left: 14px;
  }

  .remove-item:hover {
      color: black;
  }
  .todo-item-label {
      padding: 6px;
  }
  .todo-item-edit {
      font-size: 16px;
      /* font-weight: 100; */
      color: #2c3e50;
      margin-left: 12px;
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  .todo-item-edit:focus {
      outline: none;
  }
</style>
