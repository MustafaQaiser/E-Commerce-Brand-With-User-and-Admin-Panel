<template>
    <div class="auth-form">
      <h2 class="h2">Sign Up</h2>
      <form @submit.prevent="signup">
        <input type="file" ref="imageInput" @change="handleImageUpload" accept="image/*" style="display: none" />
<button type="button" class="btn-primary" @click="$refs.imageInput.click()">Upload Imageeee</button>

        <input type="text" v-model="username" placeholder="Username" class="input-field" />
        <input type="email" v-model="email" placeholder="Email" class="input-field" />
        <input type="password" v-model="password" placeholder="Password" class="input-field" />
  
        <!-- Radio buttons for Role -->
        <div>
          <input type="radio" id="admin" value="admin" v-model="role" />
          <label for="admin">Adminnnnnnnnn</label>
        </div>
        <div>
          <input type="radio" id="user" value="user" v-model="role" :checked="true" />
          <label for="user">User</label>
        </div>
  
        <button type="submit" class="btn-primary">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const role = ref('user');
  const imageFile = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
  }
};

  const signup = async () => {
    const formData = new FormData();
  formData.append('username', username.value);
  formData.append('email', email.value);
  formData.append('password', password.value);
  formData.append('role', role.value);
  formData.append('image', imageFile.value);
    console.log(username.value)
    try {
      const response = await axios.post('http://localhost:3333/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for file upload
      },
    });

      if (response) {
       
        console.log('Signup successful', response);
        alert('New user added');
        router.push({ name: 'LoginPage' });
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('An error occurred while signing up', error);
    }
  };
  
  const router = useRouter();
  </script>
  
  
  <!-- ...rest of your code remains unchanged -->
  
  <style scoped>
  * {
    margin: 0;
  }
  
  .auth-form {
    color: #ffffff;
    max-width: 350px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 150px;
    background-color:#333;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .h2 {
    margin-bottom: 20px;
  }
  
  .input-field {
    width: 90%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-primary {
    background-color: #800000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  