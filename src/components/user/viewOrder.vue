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

          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderDetail, index) in orderDetails" :key="index">
            <td>{{ orderDetail.order_no }}</td>
            <td>{{ orderDetail.username }}</td>
            <td>{{ orderDetail.email }}</td>
            <td>{{ orderDetail.address }}</td>
            <td>{{ orderDetail.items }}</td>
            <td>{{ orderDetail.sizes }}</td>
            <td>{{ orderDetail.phone }}</td>
            <td>{{ orderDetail.price/orderDetail.qty }}</td>
            <td>{{ orderDetail.qty }}</td>
            <td>{{ orderDetail.price }}</td>
            <td>{{ formattedDateTime(orderDetail.created_at)}}</td>


          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from "axios";
  import { useUserStore } from '../../store/user'; // Update the import path
  
  export default {
    setup() {
      const store = useUserStore();
      const orderDetails = ref([]);
      
      
      const formattedDateTime =(date)=> {
      const dateTime = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return dateTime.toLocaleString('en-US', options);
      }
      onMounted(async () => {
        try {
          const response = await axios.get(`http://localhost:3333/getOrderDetailsByUserId/${store.id}`);
          orderDetails.value = response.data.orderDetails;
        } catch (error) {
          console.error("There was an error:", error);
        }
      });
  
      return {
        orderDetails,
        formattedDateTime
      };
    }
  }
  </script>
  
  <style scoped>
  /* Your existing styles here */
  
  .order-container {
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
  </style>
  