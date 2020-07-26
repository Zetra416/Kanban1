<template >
  <div class="card">

       <footer class="card-footer">
         <h3>Title : {{task.title}}</h3>
         <h4>Created By : {{ task.User.email}}</h4>
         <h4>Created At : {{ task.createdAt}}</h4>

         <a class="card-footer-item" href="" @click="editTask(task.id)">Edit</a>
         <a class="card-footer-item" href="" @click="deleteTask(task.id)">Delete</a>
       </footer>
     </div>
</template>

<script>
export default {
  props:['task'],
  methods: {
    deleteTask(id){
      var newData = {id: id, title: this.task.title}
      this.$emit('emitDelete',newData)
    },
    editTask(id){
      var newData = {id: id, title: this.task.title}
      this.$emit('emitEdit',newData)
    }
  }
}

</script>

<style lang="css" scoped>
  .card-footer {
    border: 3px dotted black;
  }
</style>
