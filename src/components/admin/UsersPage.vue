<template>
  <div class="con">
    <!-- Table Header -->
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Delete</th>
          <th>View</th>
          <th>View user details</th>
          <th>Edit</th>
          <th>Total records</th>
        </tr>
      </thead>
      <tbody>
        <!-- User Rows -->
        <tr v-for="user in filteredUsers" :key="user.id" class="user-row">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td><button class="download-btn" @click="deleteUser(user.id)">Delete</button></td>
          <td><button class="download-btn" @click="goToUserDetail(user.id)">View Data</button></td>
          <td><button class="download-btn" @click="userview(user.id)">View user details</button></td>
          <td><button class="download-btn" @click="edit(user)">Edit User</button></td>
          <td><button class="download-btn" @click="Orders(user.id)">{{user.total_orders}}</button></td>
      
       
        </tr>
      </tbody>
    </table>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit User</h2>
          <button @click="showModal = false">Close</button>
        </div>
        <div class="modal-body">
          <label>ID:</label>
          <input type="text" v-model="selectedUser.id" disabled/>
    
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

  </div>

  <!-- Modal code remains the same -->
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '../../store/user'
const user = useUserStore()
const users = ref([]);
const router = useRouter();
const showModal = ref(false);
const selectedUser = ref({});
// const totalOrders = ref (0);

// const fetchTotalOrders = async (id) => {
//   try {
//     const response = await axios.get(`http://localhost:3333/search/${id}`);
//     totalOrders.value = response.data.totalRecords;
//     console.log(totalOrders.value)
//     return  totalOrders.value;
//   } catch (error) {
//     console.error('Error fetching total orders:', error);
//   }
// };

// async function fetchTotalOrders(id){
//   try {
//     const response = await axios.get(`http://localhost:3333/search/${id}`);
//     totalOrders.value = response.data.totalRecords;
//     console.log('hhh ',response)
//     // return  totalOrders.value;
//   } catch (error) {
//     console.error('Error fetching total orders:', error);
//   }
// }

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3333/getAllUsers');
    users.value = response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const Orders = (userId) => {
  console.log(userId);
  router.push({ name: 'AdminSideViewOrder', params: { id: userId } });
}

const userview = async (userId) => {
  console.log(userId);
  router.push({ name: 'UserDetailAdminSide', params: { id: userId } });
}

const filteredUsers = computed(() => users.value.filter(user => user.role === 'user'));

const goToUserDetail = (userId) => {
  router.push({ name: 'viewPage', params: { id: userId } });
}

const edit = (user) => {
  selectedUser.value = { ...user }; // Clone the user object
  showModal.value = true;
}

const updateUser = async () => {
  try {
    if (selectedUser.value.password) {
      const response = await axios.put(`http://localhost:3333/updateUser/${selectedUser.value.id}`, selectedUser.value);
      console.log(response);
      showModal.value = false; // Close the modal
      // Fetch the updated list
      alert(response.data.message);

      user.setUserDetails({
        city: response.data.user.city,
        phone: response.data.user.phone,
        role: response.data.user.role,
      });
    } else {
      const response = await axios.put(`http://localhost:3333/updateUser/${selectedUser.value.id}`, {
        username: selectedUser.value.username,
        email: selectedUser.value.email,
        city: selectedUser.value.city,
        address: selectedUser.value.address,
        phone: selectedUser.value.phone
      });
      user.setUserDetails({
        city: response.data.user.city,
        phone: response.data.user.phone,
        role: response.data.user.role,
      });
      console.log(response);
      showModal.value = false;
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    alert("phone no invalid");
  }
}

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete('http://localhost:3333/deleteUser', {
      data: { id: userId }
    });
    alert(`the records and user against ${userId} are deleted`);
    console.log(response);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

onMounted(fetchUsers);

</script>


<style scoped>
/* Your CSS styles */

/* Modal Styling */
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

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th, .user-table td {
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd;
}

.user-table th {
  background-color: #7c7373;
  font-weight: bold;
  color: white;
}

.user-row:hover {
  background-color: red;
}
/* ... Your previous CSS ... */
</style>
