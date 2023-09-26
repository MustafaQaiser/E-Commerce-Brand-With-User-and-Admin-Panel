<template>
  <div class="user-container">
    <!-- User Details -->
    <section class="user-details" >
      <h2>User Details</h2>
      <div class="info-item">
        <label>Username:</label>
        <span>{{ userst.username }}</span>
      </div>
      <div class="info-item">
        <label>Email:</label>
        <span>{{ userst.email }}</span>
      </div>
    </section>

    <!-- User Extras Details -->
    <section class="user-extras" v-if="userextras">
      <h2>Additional User Details</h2>
      
      <div class="extra-item" v-for="(extra, index) in userextras" :key="index">
       <div>
        <h3>User details NO {{index+1}}</h3>
       </div>


        <!-- <div class="label">Address:{{index+1}}</div> -->
        <div class="value">Adress:  {{ extra.address }}</div>
        <div class="value">City:  {{ extra.city }}</div>
        <div class="value">Phone:   {{ extra.phone }}</div>
      </div>
      <!-- <h3>User Cities</h3>
      <div class="extra-item" v-for="(extra, index) in userextras" :key="index">
        <div class="label">City: {{index+1}}</div>
        <div class="value">{{ extra.city }}</div>
      </div>
      <h3>User Phone No:</h3>
      <div class="extra-item" v-for="(extra, index) in userextras" :key="index">
        <div class="label">Phone:{{index+1}}</div>
        <div class="value">{{ extra.phone }}</div>
      </div> -->
    </section>
    
  </div>
</template>


  
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from "axios";
  import { useUserStore } from '../../store/user';
  
  export default {
    setup() {
      const users = ref([]);
      const userextras= ref([]);
      const userst = useUserStore();
  
      onMounted(async () => {
        // console.log(user.id)
        const userId = userst.id;
  
        try {
          const response = await axios.get(`http://localhost:3333/viewUserDetails/${userId}`);
          console.log(response.data.userextras)
          users.value = response.data.userDetails[0];
          userextras.value = response.data.userextras;
          console.log( userextras.value )
          // console.log(response.data.data.username)
          // console.log(users.value.profile.address)
          
        } catch (error) {
          console.error("There was an error:", error);
        }
      });
  
      return {
        users,
        userextras,
        userst
      };
    }
  }
  </script>
  
  <style scoped>
.user-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-details,
.user-extras {
  background-color: #fff;
  padding: 1em 2em;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  

}

h2 {
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #333;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5em;
}

.info-item,
.extra-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.label {
  font-weight: bold;
  color: #555;
  flex-basis: 30%;
}

.value {
  color: #333;
  
}
</style>
