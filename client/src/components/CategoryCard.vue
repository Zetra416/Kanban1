<template>

  <div class="columns">
     <div :class="status">
       <div class="tags">
         <span class="tag">{{categoryName}}</span>
         <span class="tag is-dark">{{dataTask.length}}</span>
          <div v-if="dataTask.length > 0" v-for="item in dataTask" :key="item.id" class="task-wrapper">
            <Task :task="item" @deleteTask="deleteTask" @editTask="editTask"></Task>
         <!-- <Task v-for="item in dataTask" :item="item" :key="item.id" @emitUpdate="editTask" @emitDelete="deleteTask"></Task> -->
         </div>
       </div>
     </div>

</template>

<script>
import Task from './TaskCard';

export default {
  props: [ 'id', 'categoryName', 'dataTask', 'status' ],
  methods: {
    deleteTask(newData){
      this.$emit('deleteTask',newData)
    },
    editTask(newData){
      this.$emit('editTask',newData)
    },
  },
  components:{
    Task
  },
}
</script>

<style lang="css" scoped>
span {
  display: inline;
  border: 0px;
  font-size: 30px;
}
</style>
