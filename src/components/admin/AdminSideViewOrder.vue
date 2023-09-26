<template>
    <div class="order-container" v-if="orderDetails && orderDetails.length">
        <h2 v-if="orderDetails && orderDetails.length">Total Orders: {{ totalOrders }}</h2>
        <h2 >First order By this User ia At : {{  formattedDateTime(firstorder)}}</h2>
        <h2  v-if="orderDetails && orderDetails.length">Last order By this User is At: {{  formattedDateTime(lastorder)}}</h2>
        <button class="download-btn" @click="Generate">Generate</button>
        <button  class="download-btn" @click="Download">Download</button>
        
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Items</th>
            <th>Phone</th>
            <th>SubTotal</th>
            <th>qty</th>
            <th>price</th>
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
            <td>{{ orderDetail.phone }}</td>
            <td>{{ '200' }}</td>
            <td>{{ orderDetail.qty }}</td>
            <td>{{ orderDetail.price }}</td>
            <td>{{ formattedDateTime(orderDetail.created_at)}}</td>


          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script >
  import { ref, onMounted ,toRefs } from 'vue';
  import axios from "axios";
//   import { useRouter } from 'vue-router';
//   import { useUserStore } from '../../store/user'; // Update the import path
  
  export default {
    props: ['id'],
    setup(props) {
    //   const store = useUserStore();
      const orderDetails = ref([]);
    //   const route = useRouter();
      const { id } = toRefs(props);
    const userId=id._object.id;
    const totalOrders = ref(0);
    const firstorder=ref('');
    const lastorder=ref('')
    const filename=ref('');
      onMounted(() => {
        console.log(userId)
        fetchTotalOrders(userId);
      getData(userId);
      firstorlast(userId);
      });
      const formattedDateTime =(date)=> {
      const dateTime = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return dateTime.toLocaleString('en-US', options);
      }
      const firstorlast = async (id)=>{
        const response = await axios.get(`http://localhost:3333/sortrecords/${id}`);
        firstorder.value= response.data.firstOrder.created_at
        lastorder.value=response.data.lastOrder.created_at
        console.log(firstorder.value)
      }
      const fetchTotalOrders = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3333/search/${id}`);
       
        totalOrders.value = response.data.totalRecords;
        console.log(totalOrders.value)
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };
    const Download = async () => {
  if (!userId) {
    console.error("User ID is missing.");
    return;
  }

  try {
    if (filename.value) {
      const response = await axios.post(
        `http://localhost:3333/downloadFiles`,
        {
          filename: filename.value,
        },
        {
          responseType: 'blob', // This is crucial for file downloads
        }
      );

      const blob = new Blob([response.data], { type: 'application/octet-stream' });

      // Use an anchor tag to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename.value; // Use the correct variable for the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("First Generate The File");
    }
  } catch (error) {
    console.error("There was an error:", error);
  }
};

    const Generate= async ()=>{
       if(!userId){
        console.error("User ID is missing.");
        return;
       }
       try {
          const response = await axios.post(`http://localhost:3333/getorderfile/${userId}`);
          console.log(response.data)
          filename.value=response.data;

          alert("Excel File Generated Now You Can Download")
        } catch (error) {
          console.error("There was an error:", error);
        }
      }
      const getData= async (id) =>{
        if (!id) {
        console.error("User ID is missing.");
        return;
      }
        try {
          const response = await axios.get(`http://localhost:3333/getOrderDetailsByUserId/${id}`);
          orderDetails.value = response.data.orderDetails;
        } catch (error) {
          console.error("There was an error:", error);
        }
      
      }
      
      return {
        getData,
        orderDetails,
        formattedDateTime,totalOrders, firstorder,lastorder,Generate,Download
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
  .download-btn {
    padding: 5px 10px;
    cursor: pointer;
    background: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
}

.download-btn:hover {
    background: #0056b3;
}
  </style>
  