<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <div class="nav">
          <!-- Show logout link if token exists -->
          <template v-if="token && user.role === 'user'">
            <!-- http://localhost:3333/${{ user.image }} -->
            <div class="user-info">
                <img :src=imageURL alt="User Image" class="user-image" v-if="user.image" />
               
              </div> 
            <div>
              <h1>welcome back user        </h1>
              <router-link to="/" @click="logout" class="nav-link">Logout</router-link>
              <router-link  to="/csvUploader"  class="nav-link">Csv Uploader</router-link>
              <router-link  to="/userView"  class="nav-link">User View</router-link>
              <router-link  to="/viewOrder"  class="nav-link">View Order</router-link>
              <router-link  to="/productview"  class="nav-link">Product View</router-link>
         
            </div>
          </template>
          <template v-else-if="token && user.role === 'admin'">
            <div class="user-info">
                <img :src=imageURL alt="User Image" class="user-image" v-if="user.image" />
               
              </div> 

            <div>
              <h1>welcome back admin        </h1>
              <router-link to="/adminLogin" @click="adminlogout" class="nav-link">Logout</router-link>
              <router-link to="/UsersPage"  class="nav-link">UsersPage</router-link>
              <router-link  to="/RedisDb"  class="nav-link">Redis Db</router-link>
            </div>
          </template>

          
         
         
          <!-- <router-link v-if="token && role === 'admin'" to="/UsersPage"  class="nav-link">UsersPage</router-link> -->
          <!-- Show login and sign up links if token does not exist -->
          <template v-else-if="!token">
            <div >
              <router-link to="/" class="nav-link">Login</router-link>
              <router-link to="/adminLogin" class="nav-link">Admin Login</router-link>
              <router-link to="/signup" class="nav-link">Sign Up</router-link>
            </div>
          </template>
        </div>
      </div>
    </header>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useUserStore } from './store/user';  // Replace with the actual path to your store
import { useRouter } from 'vue-router'; 
const user = useUserStore();
// const role = ref(user.role);
const token = ref(user.token);
const router = useRouter(); 
const imageURL = ref()
// Watch for changes in user token
watchEffect(() => {
  token.value = user.token;
  imageURL.value = 'http://localhost:3333/' + user.image
});

// Logout function to remove user details from store
const adminlogout=()=>{
  console.log('hhhhh')
  user.clearUserDetails();  // Assuming you have a method like this in your store
  router.push({ name: 'adminLogin' });
}
const logout = () => {


 console.log(user.role)

        // if (role.value === 'user') {
        //   router.push({ name: '/' });
        // } else if (role.value === 'admin') {
        //     router.push({ name: 'adminLogin' });
        //   }
    

  user.clearUserDetails();  // Assuming you have a method like this in your store
  router.push({ name: 'LoginPage' });
};
</script>

<style>
/* Reset some default browser styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img{
  height: 20vh;
  width:70%;
  border-radius: 50%;
}

/* Global styling */
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header styles */
.header {
  background-color: #333;
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  margin-left: 20px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ff5500;
}
</style>
