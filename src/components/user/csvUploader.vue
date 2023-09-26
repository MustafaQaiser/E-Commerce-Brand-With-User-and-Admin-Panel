<template>
    <div class="csv-uploader">
      <h2 class="h2">CSV Uploader</h2>
      <input type="file" @change="onFileChange" class="input-file" accept=".csv" />
      <button class="btn-insert" @click="insertData">Insert</button>
      <button class="btn-generate" @click="generateFile">Generate File</button>
      

      <button class="btn-insert" @click="insertProduct">Insert Product File</button>
      <button class="btn-generate" @click="generateProductFile">Generate File</button>


      <button class="btn-d" @click="downloadFile">
        <router-link class="btn-download" to="/csv-user">Download Files</router-link>
      </button>

      <button class="btn-generate"  @click="edit(user)">Edit User</button>
      <button class="btn-insert" @click="Orderitems">Order Items</button>
  

    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit User</h2>
          <button @click="showModal = false">Close</button>
        </div>
        <div class="modal-body">
          <label>ID:</label>
          <input type="text" v-model="user.id" disabled/>
    
          <label>Username:</label>
          <input type="text" v-model="selectedUser.username" />
    
          <label>Email:</label>
          <input type="text" v-model="selectedUser.email" />

          <label>password:</label>
          <input type="text" v-model="selectedUser.password" />

          <label>address:</label>
          <input type="text" v-model="selectedUser.address" />

          <label>ciy:</label>
          <input type="text" v-model="selectedUser.city" />

          <label>Phone:</label>
          <input type="text" v-model="selectedUser.phone" />
    
          <button @click="updateUser">Edit</button>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { useUserStore } from '../../store/user'// Replace with the actual path to your store


const user = useUserStore();
  const file = ref(null);
  const router = useRouter();
  const showModal = ref(false);
  const selectedUser = ref({user});

  const onFileChange = (event) => {
    file.value = event.target.files[0];
  };

  const insertProduct=async()  =>{
    if (!file.value) {
      console.log('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append("csv", file.value);
    
    try {
      const response = await axios.post(`http://localhost:3333/importProductCsv/${user.id}`, formData);
      console.log(response)
      alert(response.data.message);
      console.log('Data inserted:', response.data.message);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }

  const generateProductFile=async ()=>{
    const userId = user.id;
    
    if (!userId) {
      console.log('User ID missing');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3333/exportProduct', { user_id: userId });
      alert( response.data.message);
      console.log('Response from the server:', response.data);
    } catch (error) {
      console.error("Error generating file:", error);
    }
  }
  
  
  const insertData = async () => {
    if (!file.value) {
      console.log('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append("csv", file.value);
    
    try {
      const response = await axios.post('http://localhost:3333/importcsv', formData);
      console.log(response)
      alert(response.data.message);
      console.log('Data inserted:', response.data.message);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };
  
  const generateFile = async () => {
    const userId = user.id;
    
    if (!userId) {
      console.log('User ID missing');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3333/exportStocks', { user_id: userId });
      alert( response.data.message);
      console.log('Response from the server:', response.data);
    } catch (error) {
      console.error("Error generating file:", error);
    }
  };
  
  const downloadFile = () => {
    try {
      router.push({ name: 'csvDownloader' });
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  
    const edit = (user) => {
      console.log(user.id)
  selectedUser.value = { ...user }; // Clone the user object
 
  showModal.value = true;
}
const updateUser = async () => {
  try {
    if(selectedUser.value.password!==null)
{
  console.log(selectedUser.value.password)
  const response = await axios.put(`http://localhost:3333/updateUser/${selectedUser.value.id}`, selectedUser.value);
    console.log(response);
    showModal.value = false; // Close the modal
    // Fetch the updated list
    alert(response.data.message)
}  

else{
  const response = await axios.put(`http://localhost:3333/updateUser/${selectedUser.value.id}`, {
   username: selectedUser.value.username,
    email:selectedUser.value.email,
    city:selectedUser.value.city,
    address: selectedUser.value.address ,
    phone:selectedUser.value.phone
  });
    console.log(response);
    showModal.value = false; 
    alert(response.data.message)
}
    
  } catch (error) {
    console.error('Error updating user:', error);
    alert("phone no invalid")
    
  }
}
const Orderitems=()=>{
  router.push({ name: 'orderPage' });
}


  </script>
  
  <style scoped>
* {
  margin: 0;
}

.csv-uploader {
  color: #ffffff;
  max-width: 350px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  background-color:#333;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.h2 {
  margin-bottom: 20px;
}

.input-file {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
}

.btn-insert,
.btn-generate,
.btn-download {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  color: #fff;
}

.btn-insert {
  background-color: #800000;
}

.btn-generate {

  background-color: #4a4a4a;
}

.btn-d {
  margin-bottom: 10px;
  padding-top: 8px;
  text-align: center;
  height: 8vh;
  width: 100%;
  background-color: #0056b3;
}

.btn-download {
  width: 100%;
  color: #fff;
  text-decoration: none;
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  width: 60%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.3s, opacity 0.3s;
  transform: scale(1);
  opacity: 1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.modal-header button {
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.modal-header button:hover {
  color: #007BFF;
}

.modal-body {
  margin-top: 20px;
}

.modal-body label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.modal-body input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-body button {
  padding: 10px 20px;
  background-color: #007BFF;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.modal-body button:hover {
  background-color: #0056b3;
}
</style>
  