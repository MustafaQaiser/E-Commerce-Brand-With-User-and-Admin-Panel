<template>
    <div class="auth-form">
      <h2 class="h2">Admin Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="email" placeholder="email" class="input-field" />
        <input type="password" v-model="password" placeholder="Password" class="input-field" />
        <button type="submit" class="btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router'; // Import the useRouter function
  import { useUserStore } from '../../store/user'
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const router = useRouter(); // Create the router instance
      const user = useUserStore()
      const login = async () => {
        try {
          const response = await axios.post('http://localhost:3333/login', {
            email: email.value,
            password: password.value,
          });
  
          
          if (response.data.success) {
  
  if (response.data.user.role!=='user') {
    
  
  
            user.setUserDetails({
             id: response.data.user.id,
            username:response.data.user.username,
           email: response.data.user.email,
           role:response.data.user.role,
           image:response.data.user.image,
            token:response.data.token
            });
           
  
           
            // localStorage.setItem('token', response.data.user.id);
            alert('You are logged in');
  
            // Navigate to the desired route based on user role
            if (response.data.user.role === 'user') {
              router.push({ name: 'csvUploader' });
            }
            else {
              router.push({ name: 'UsersPage' });
            }
          }
          else{
            alert('user cannot loggin as admin go to user login page');
          }
          } else {
            alert('Wrong credentials');
          }
        } catch (error) {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      };
  
      return { email, password, login };
    },
  };
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
    margin-top: 180px;
    padding: 20px;
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
  