<template>
    <div class="order-container">
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Items</th>
            <th>size</th>
            <th>Phone</th>
            <th>sub total</th>
            <th>qty</th>
            <th>total price</th>
            <th>Date | Time</th>
            <th>user_id</th>
            <th>Edit</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderDetail, index) in orderDetails" :key="index">
            <td>{{ orderDetail.order_no }}</td>
            <td>{{ orderDetail.username }}</td>
            <td>{{ orderDetail.email }}</td>
            <td>{{ orderDetail.address }}</td>
            <td>{{ orderDetail.items }}</td>
            <td>{{ orderDetail.size }}</td>
            <td>{{ orderDetail.phone }}</td>
            <td>{{ orderDetail.sub_total }}</td>
            <td>{{ orderDetail.qty }}</td>
            <td>{{ orderDetail.total_price }}</td>
            <td>{{ orderDetail.created_at}}</td>
            <td>{{ orderDetail.user_id}}</td>
            <td><button @click="Editt(orderDetail)">Edit</button></td>


          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit User</h2>
          <button @click="showModal = false">Close</button>
        </div>
        <div class="modal-body">
          <label>ID:</label>
          <input type="text" v-model="selectProduct.id" disabled/>
    
          <label>Username:</label>
          <input type="text" v-model="selectProduct.username" disabled/>
    
          <label>Email:</label>
          <input type="text" v-model="selectProduct.email" disabled/>

          <label>address:</label>
          <input type="text" v-model="selectProduct.address" />

          <label>items:</label>
          <input type="text" v-model="selectProduct.items" />

          <label>size:</label>
          <input type="text" v-model="selectProduct.size" />

          <label>Phone:</label>
          <input type="text" v-model="selectProduct.phone" />

          <label>sub_total:</label>
          <input type="text" v-model="selectProduct.sub_total" />

          <label>total_price:</label>
          <input type="text" v-model="selectProduct.total_price" />

          <label>created_at:</label>
          <input type="text" v-model="selectProduct.created_at" disabled/>

          <label>user_id:</label>
          <input type="text" v-model="selectProduct.user_id" disabled/>
    
          <button @click="Edit(selectProduct)">Edit</button>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from "axios";
import { useUserStore } from '@/store/user';
  
  export default {
    setup() {
      const selectProduct=ref([]);
      const orderDetails = ref([]);
      const user= useUserStore();
      const showModal = ref(false);
    const Edit=async (product)=>{
      try {
        if(!product){
          return "product not found"
        }
        console.log(product.sub_total)
          const response = await axios.put(`http://localhost:3333/updateProduct/${product.id}`,{
           address : product.address,
      items : product.items,
      size : product.size,
      phone : product.phone,
    sub_total : product.sub_total
          });
          alert(response.data.message)
          showModal.value=false;
          console.log(response)
          
        } catch (error) {
          console.error("There was an error:", error);
        }
    }
    const Editt=async (product)=>{
      try {
        if(!product){
          return "product not found"
        }
         showModal.value=true;
         selectProduct.value=product
        } catch (error) {
          console.error("There was an error:", error);
        }
    }
      onMounted(async () => {
        try {
          const response = await axios.get(`http://localhost:3333/viewProducts/${user.id}`);
          console.log(response)
          orderDetails.value = response.data;
        } catch (error) {
          console.error("There was an error:", error);
        }
      });
  
      return {
        orderDetails,
       Edit,
       showModal,
       Editt,
       selectProduct
      };
    }
  }
  </script>
  
  <style scoped>
  /* Your existing styles here */
  
  .order-container {
    width: 100%;
    background-color: #fff;
    padding: 1em 2em;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1em;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1em;
  }
  
  th, td {
    padding: 0.5em;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f9;
    font-weight: bold;
    text-align: left;
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
  max-height: 80%; /* Adjust the maximum height as needed */
  overflow-y: auto; /* Add scrollbar when content overflows */
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
  