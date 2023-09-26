<template>
    <div class="user-container">
      <!-- User Details -->
      <section class="user-details" v-if="users">
        <h2>User Details</h2>
        <div class="info-item">
          <label>Username:</label>
          <span>{{ users.username }}</span>
        </div>
        <div class="info-item">
          <label>Email:</label>
          <span>{{ users.email }}</span>
        </div>
      </section>
  
      <!-- User Extras Details -->
      <section class="user-extras" v-if="userextras">
        <h2>Additional User Details</h2>

        <h3>Adresses</h3>
        <div class="info-item" v-for="(extra, index) in userextras" :key="index">
          <label>Address:{{index+1}}</label>
          <span>{{ extra.address }}</span>
        </div>

        <h3>City</h3>
        <div class="info-item" v-for="(extra, index) in userextras" :key="index">
          <label>City: {{index+1}}</label>
          <span>{{ extra.city }}</span>
        </div>

        <h3>Phone</h3>
        <div class="info-item" v-for="(extra, index) in userextras" :key="index">
          <label>Phone: {{index+1}}</label>
          <span>{{ extra.phone }}</span>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from "axios";
  import { useRoute } from 'vue-router';

  export default {
    setup() {
      const route = useRoute();
      const users = ref([]);
      const userextras = ref([]);

      onMounted(async () => {
        const userId = route.params.id;
        if (!userId) {
          console.error("User ID is missing.");
          return;
        }

        try {
          const response = await axios.get(`http://localhost:3333/viewUserDetails/${userId}`);
          users.value = response.data.userDetails[0];
          userextras.value = response.data.userextras;
          console.log(users.value.email);
          console.log(userextras.value.address);
        } catch (error) {
          console.error("There was an error:", error);
        }
      });

      return {
        users,
        userextras
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
  
  .user-details, .user-extras {
    background-color: #fff;
    padding: 1em 2em;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1em;
  }
  
  h2 {
    font-size: 1.5em;
    margin-bottom: 1em;
    color: #333;
    border-bottom: 2px solid #ddd;
    padding-bottom: 0.5em;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }
  
  label {
    font-weight: bold;
    color: #555;
  }
  
  span {
    color: #333;
  }
  </style>
  