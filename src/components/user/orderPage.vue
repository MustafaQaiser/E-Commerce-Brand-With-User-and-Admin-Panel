<template>
  <div class="user-details">
    <div class="field">
      <label class="label">IDDD:</label>
      <input class="input" :value="id" disabled />
    </div>
    <div class="field">
      <label class="label">Username:</label>
      <input class="input" :value="username" disabled />
    </div>
   
    
    <div class="field">
      <label class="label">Address:</label>
      <select class="select" v-model="selectedAddress">
        <option v-for="address in addressOptions" :key="address">{{ address }}</option>
      </select>
    </div>
    <div class="field">
  <label class="label">Item:</label>
  <select class="select" v-model="selectedItem" @change="fetchItemDetails(selectedItem)">
    <option v-for="item in items" :key="item.id" :value="item">{{ item.main_item }}</option>
  </select>
</div>

    <div class="field">
      <label class="label">Size:</label>
      <select class="select" v-model="selectsize">
        <option v-for="size in sizes" :key="size">{{ size }}</option>
      </select>
    </div>
    <div class="field">
      <label class="label">Phone:</label>
      <select class="select" v-model="selectedPhone">
        <option v-for="phone in phoneOptions" :key="phone">{{ phone }}</option>
      </select>
    </div>
    <div class="field">
      <label class="label">Quantity:</label>
      <div class="quantity-control">
        <button class="quantity-button" @click="selectedQuantity--">-</button>
        <input class="quantity-input" type="number" v-model="selectedQuantity" />
        <button class="quantity-button" @click="selectedQuantity++">+</button>
      </div>
    </div>
    
    <div class="field">
      <label class="label">Price:</label>
      <span>{{ calculatedPrice }}</span>
    </div>
    
    <button class="button" @click="submitForm">Submit</button>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { useUserStore } from '../../store/user'; // Update the import path
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const store = useUserStore();

    const id = computed(() => store.id);
    const username = computed(() => store.username);
    const email = computed(() => store.email);
   
    const selectsize=ref('');
    const selectedAddress = ref('');
    const selectedItem = ref('');
    const selectedPhone = ref('');
    const items=ref('');
    const addressOptions = ref([]);
    const phoneOptions = ref([]);
    const selectedQuantity = ref(0);
    const pricePerItem = ref(0);
    const sizes=ref('')

    const calculatedPrice = computed(() => selectedQuantity.value * pricePerItem.value);
    const submitForm = async () => {
      try {
        
        const formData = {
          username: username.value,
          email:email.value,
          address: selectedAddress.value,
          items: selectedItem.value.main_item,
          phone: selectedPhone.value,
          qty: selectedQuantity.value,
          price: calculatedPrice.value,
          sizes:selectsize.value
        };
        const response = await axios.post(`http://localhost:3333/storeOrderDetail/${store.id}`, formData);
        console.log('Form submission response:', response.data.orderDetail.order_no);
        alert(`your order no is ${response.data.orderDetail.order_no}`);
        router.push({ name: 'viewOrder' });
       

        // You can handle success or error cases here
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
    // Fetch addresses and phones
    async function fetchUserProfiles() {
console.log(email.value)
      try {
        const response = await axios.get(`http://localhost:3333/getUserProfiles/${store.id}`);
        // console.log(response.data.userProfiles.address)      // Assuming response.data.phones is an array of phones
        const addresses = response.data.userProfiles.map(profile => profile.address);
        const phones = response.data.userProfiles.map(profile => profile.phone);

        addressOptions.value = addresses;
        phoneOptions.value = phones;
        console.log(phoneOptions.value)
const res=await axios.get("http://localhost:3333/getorderitems");
console.log(res.data.data)
const it=res.data.data.map(itt=>itt)
items.value=it;
        
      } catch (error) {
        console.error(error);
      }
    }
    const fetchItemDetails = async (item) => {
  console.log('Fetching item details for item with ID:', item.id);
  try {
    if (item.id) {
      const response = await axios.get(`http://localhost:3333/getitemdetailsbyid/${item.id}`);
      console.log('Item details response:', response.data.itemdetail); // Log the response data
       const size = response.data.itemdetail.map(detail =>detail.sizes);
       const price=response.data.itemdetail[0].price
       selectedQuantity.value= selectedQuantity.value+1;
       
console.log(size,price,selectedQuantity.value)
pricePerItem.value=price;
        sizes.value = size;
    }
  } catch (error) {
    console.error('Error fetching item details:', error);
  }
};

    // Watch for changes and fetch data if needed
    watchEffect(() => {
      
        fetchUserProfiles();
     
    });
  

    return {
      id,
      username,
      items,
      selectedAddress,
      selectedItem,
      selectedPhone,
      addressOptions,
      phoneOptions,
      submitForm,
      calculatedPrice,
      selectedQuantity,
      fetchItemDetails,
      sizes,
      selectsize
      
    };
  },
};
</script>

  <style>
  .user-details {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .field {
    margin-bottom: 10px;
  }
  
  .label {
    font-weight: bold;
  }
  
  .input,
  .select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
  }
  
  .select {
    cursor: pointer;
  }
  .quantity-input {
    width: 50px; /* Adjust the width as needed */
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    text-align: center;
  }
  
  .quantity-input::-webkit-inner-spin-button,
  .quantity-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  
  /* Style the up and down arrows */
  .quantity-input::-webkit-inner-spin-button:after,
  .quantity-input::-webkit-outer-spin-button:after {
    content: '▲▼'; /* Unicode characters for up and down arrows */
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 50%;
    text-align: center;
    line-height: 16px;
    font-size: 10px;
    color: #555;
    background-color: #f8f8f8;
    cursor: pointer;
  }
  
  /* Style the up arrow */
  .quantity-input::-webkit-inner-spin-button:after {
    content: '▲';
    top: 0;
  }
  
  /* Style the down arrow */
  .quantity-input::-webkit-outer-spin-button:after {
    content: '▼';
    top: 50%;
  }
  .quantity-button{
    background-color: blue;
    width: 5%;
    height: 20px;
    margin-left: 5px;
    margin-right: 5px;
  }
  
  </style>
  <!-- <div class="field">
      <label class="label">Email:</label>
      <input class="input" :value="email" disabled />
    </div> -->