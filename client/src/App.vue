<template>
  <div>
    <div v-if="access_token" class="wrapper-main-page">

      <div class="nav-bar">
        <div class="nav-left">
          <h2>Kanban Hacktiv8</h2>
        </div>


        <div class="nav-right">

          <div >
            <button v-on:click="logout">Logout</button>
          </div>
        </div>
      </div>

      <div class="container">
        <form v-on:submit.prevent="addTask">
          <input type="text" v-model="newTaskName" placeholder="Task name">

          <select v-model="newTaskCategory">
            <option value="" disabled selected hidden>--Select category--</option>
            <option value="Backlog">Backlog</option>
            <option value="Product">Product</option>
            <option value="Development">Development</option>
            <option value="Done">Done</option>
          </select>

          <input type="submit" value="Add">
        </form>

        <div class="columns">
          <CategoryCard status="status-1" :categoryName=listCategory[0] :dataTask="tasksBacklog" @emitUpdate="editTask(data)"></CategoryCard>
          <CategoryCard status="status-2" :categoryName=listCategory[1] :dataTask="tasksProduct" @emitUpdate="editTask(data)"></CategoryCard>
          <CategoryCard status="status-3" :categoryName=listCategory[2] :dataTask="tasksDevelopment" @emitUpdate="editTask(data)"></CategoryCard>
          <CategoryCard status="status-4" :categoryName=listCategory[3] :dataTask="tasksDone" @emitUpdate="editTask(data)"></CategoryCard>
        </div>
      </div>

    </div>

    <div v-else >
      <form v-on:submit.prevent="login">
        <h1>Login</h1>
        <label >Email</label><br>
        <input type="text" v-model="emailLogin" placeholder="your email"> <br>
        <label for="password">Password</label><br>
        <input type="password"  v-model="passwordLogin" placeholder="your password">
        <input type="submit" value="Login">
      </form>

      <!-- <div id="google-signin-button"></div> -->

      <form v-on:submit.prevent="register">
        <h1>Register</h1>
        <label >Email</label><br>
        <input type="text" v-model="emailRegister" placeholder="your email"> <br>
        <label >Password</label><br>
        <input type="password"  v-model="passwordRegister" placeholder="your password">
        <input type="submit" value="Register">
      </form>
    </div>

     <!-- <button id="show-modal" @click="showModal = true">Show Modal</button>
     <modal v-if="showModal" @close="showModal = false">
       <h3 slot="header">custom header</h3>
     </modal> -->


      <div v-if="toggleDelete" id="deletePopUp" class="elements">
        <div class="box">
          <h2>Are you sure about that?</h2>
          <button @click="deleteTask">Yes</a>
          <button @click="closeDelete">Cancel</a>
        </div>
      </div>

    <div v-if="toggleEdit" id="editPopUp" class="elements">
      <div class="box">
        <form id="edit-form" class="forms" @submit.prevent="updateTask">
          <label for="edit-title">Edit title</label> <br>
          <textarea id="edit-title" type="text" placeholder="title" required v-model="editTitle"></textarea><br><br>
          <label for="edit-category">Edit Category</label> <br>
          <select  id="edit-category" v-model="newTaskCategory">
            <option value="" disabled selected hidden>--Select category--</option>
            <option value="Backlog">Backlog</option>
            <option value="Product">Product</option>
            <option value="Development">Development</option>
            <option value="Done">Done</option>
          </select>
          <input type="submit" id="register-submit" value="Edit">

        </form>
      </div>
    </div>

</div>


</template>

<script>

// import TaskCard from './components/TaskCard'
import CategoryCard from './components/CategoryCard'
import axios from 'axios'

export default {
  data(){
    return {
      access_token: localStorage.getItem('access_token'), //pake this untuk memanggil semua data disini
      emailLogin: '',
      passwordLogin: '',
      emailRegister: '',
      passwordRegister: '',
      tasksBacklog: [],
      tasksProduct: [],
      tasksDevelopment: [],
      tasksDone: [],
      newTaskName:'',
      newTaskCategory:'',
      listCategory: ["Backlog", "Product", "Development", "Done"]
    }
  },
  components: {
    CategoryCard
  },
  created(){
    this.cekToken();
  },
  methods: {
    cekToken(){
      if (this.access_token) {
        this.getTask()
      }
    },
    onSignIn (user) {
      const profile = user.getBasicProfile()
    },
    register(){
      console.log(this.email)
      console.log(this.password)
      axios({
        method: 'POST',
        url: "http://localhost:3000/register",
        data: {
          email: this.emailRegister,
          password: this.passwordRegister
        }
        })
        .then( response=>{
          console.log('success register')
          console.log(response)
          this.email = ''
          this.password = ''
        })
          .catch( err=>{
            console.log(err)
            console.log('failed register')
          })
        },
    login(){
      axios({
        method:'POST',
        url: 'http://localhost:3000/login',
        data: {email:this.emailLogin,password:this.passwordLogin}
      })
      .then( response => {
        console.log(response.data, "ini responsenya");
        localStorage.setItem('access_token', response.data.accessToken)
        this.access_token= localStorage.access_token;
        this.getTask(); //ini contoh memanggil method
      })
      .catch(err => {
        this.message = err
      })
    },
    logout(){
      localStorage.removeItem('access_token');
      this.access_token= null
    },
    getTask(){
      console.log("masuk getTask");
      axios({
        method:'GET',
        url: 'http://localhost:3000/tasks',
        headers:{access_token: this.access_token} //ini contohnya pake this
      })
      .then(response => {
        this.tasksBacklog= []
        this.tasksProduct= []
        this.tasksDevelopment= []
        this.tasksDone= []
        this.filterTask(response.data)
        console.log(response.data);
      })
      .catch(err => {
        console.log(err, "ini error");
        this.message = err
      })
    },
    filterTask(dataTask){
      for (let i = 0; i < dataTask.length; i++) {
        // console.log(dataTask[i], "ini task nya");
        if (dataTask[i].category === 'Backlog') {
          this.tasksBacklog.push(dataTask[i])
        }
        else if (dataTask[i].category === 'Product') {
          this.tasksProduct.push(dataTask[i])
        }
        else if (dataTask[i].category === 'Development') {
          this.tasksDevelopment.push(dataTask[i])
        }
        else{
          this.tasksDone.push(dataTask[i])
        }
      }
      console.log(this.tasksBacklog, this.tasksProduct, this.tasksDevelopment, this.tasksDone, "ini filter task");
    },
    addTask() {
      console.log("ini MASUK add Task");
      axios({
        method:'POST',
        url: 'http://localhost:3000/tasks',
        data: {title: this.newTaskName, category: this.newTaskCategory},
        headers:{access_token: this.access_token} //ini contohnya pake this
      })
      .then(response => {
        console.log(response, "ini then addtask");
        this.getTask();
        // console.log(this.newTaskName, this.newTaskCategory);
      })
      .catch(err => {
        console.log(err, "ini errornya addTask");
        this.message =err
      })
     },
     editTask(){
       axios({
          method:'PUT',
          url: 'http://localhost:3000/tasks/${this.editId}',
         headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            title: this.editTitle,
            category: this.editCategory
          }
        })
        .then( response => {
          console.log(response);
          console.log('success update')
          this.getTask();
        })
        .catch(response => {
          this.message = response
        })
      },
      deleteTask(){
        let taskId = this.indexDelete;
        axios({
          method:'DELETE',
          url: 'http://localhost:3000/tasks/${id}',
          headers:{access_token: this.access_token} //ini contohnya pake this
        })
        .then(response => {
          console.log(response, "ini then deleteTask");
          this.getTask();
        })
        .catch(err => {
          console.log(err, "ini errornya deleteTask");
          this.message = err;
        })
      },
      showRegister() {
        this.loginPage = false;
        this.registerPage = true;
      },
      backToLogin() {
        this.loginPage = true;
        this.registerPage = false;
      },
    }
  }
</script>

<style lang="css">
* {
  margin: 10px;
}
.nav-bar {
  height: 5vh;
  background-color: orange;
  border: 3px solid black;
  text-shadow: 3px 2px black;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;
}

.columns {
  text-shadow: 3px 2px black;
  color: white;
  display: flex;
  align-items: flex-start;
  word-break: break-all;
  justify-content: space-around;

}

.tag  {
  border: 4px dotted black;
  margin: 30px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  justify-content: space-around;

}

.status-1 {
  background-color: #ed8077;
}
.status-2 {
  background-color: #4488c5;
}
.status-3 {
  background-color: #5eb5a6;
}
.status-4 {
  background-color: #cee8e4;
}

.card {
  margin-bottom: 5px;
}
.card-footer-item {
  padding-top: 0px;
  padding-bottom: 0px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#deletePopUp{
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0; top: 0; width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.box{
  background-color: #fefefe;
  margin: auto; padding: 20px;
  border: 1px solid #888;
  width: 80%
}

</style>
