<template>
    <div class="table-container">
      <table>
        <tbody>
          <tr>
            <th>Bull</th>
          </tr>
          <tr>
            <td @click="fetchData('bull:exportStockJob:')">Export stock</td>
          </tr>
          <tr>
            <td @click="fetchData('bull:importStockJob:')">Import stock</td>
          </tr>
        </tbody>
      </table>
  
      
    <!-- <select v-model="selectedOption" @change="fetchSingleData">
      <option value="">Select an option</option>
      <option v-for="(option, index) in dropdownOptions" :key="index" :value="option">{{ option }}</option>
    </select> -->
    <table><tr>
        <th>Keys</th>
        <th>name</th>
        <th>data</th>
        <th>opts</th>
        <th>timestamp</th>
        <th>delay</th>
        <th>priority</th>
        <th>processedOn</th>
        <th>returnvalue</th>
        <th>finishedOn</th>
        
        </tr>
        
        <tr v-for="(option, index) in dropdownOptions" :key="index" :value="option">
            <td  @click="fetchSingleData(option)">
            {{ option }}
            </td>
        <td v-if="dt[index]">{{ dt[index].name }}</td>
        <td v-if="dt[index]">{{ dt[index].data }}</td>
        <td v-if="dt[index]"><ul v-if="isObjectData(dt[index].opts)">
            <!-- {{ dt[index].opts }} -->
            <li v-for="(value, key) in parseOpts(dt[index].opts)" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </li>
        </ul>  
        
        
        </td>
        <td v-if="dt[index]">{{ dt[index].timestamp }}</td>
        <td v-if="dt[index]">{{ dt[index].delay }}</td>
        <td v-if="dt[index]">{{ dt[index].priority }}</td>
        <td v-if="dt[index]">{{ dt[index].processedOn }}</td>

        <td v-if="dt[index]"><ul v-if="isObjectData(dt[index].returnvalue)">
           
            <li v-for="(value, key) in parseOpts(dt[index].returnvalue)" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </li>
        </ul>
        <ul v-else>{{dt[index].returnvalue}}</ul>
        </td>

      
        <td v-if="dt[index]">{{ dt[index].finishedOn }}</td>
            
        </tr>
        </table>



    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  
  const dropdownOptions = ref([]);
  const data=ref([])
  


const dt =ref([])

const parseOpts=(optsString) =>{
      try {
        // Try to parse the string as JSON
        return JSON.parse(optsString);
      } catch (error) {
     
        console.error('Error parsing optsString:', error);
        return {};
      }
    }

const isObjectData = (data) => {
    console.log('helloo jjj',data)
    const object = JSON.parse(data);
    const bool = typeof object === 'object' && object !== null;
  
  return bool;
};
const fetchSingleData = async (key) => {

  if (key) {

    try {
        const response = await axios.post('http://localhost:3333/redissingle', {
                key: key,
         
        });

dt.value.push(response.data.data)
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};


  const fetchData = async (type) => {
   
    try {
        dt.value=[];
        if(type==='bull:exportStockJob:'){
            
            const response = await axios.post('http://localhost:3333/redisLength', {
                name: type,
         
        });
       data.value = response.data.keys;
       dropdownOptions.value = data.value.filter(item => /bull:exportStockJob:\d+/.test(item));
        }
        else{
            
            const response = await axios.post('http://localhost:3333/redisLength', {
                name: type,
         
        });
        data.value = response.data.keys;
      console.log(data.value)
      dropdownOptions.value = data.value.filter(item => /bull:importStockJob:\d+/.test(item));
         }
        
  
      // Update the dropdownOptions with the received data.
   
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  watch(dropdownOptions, async (newOptions) => {
    for (const option of newOptions) {
        
      await fetchSingleData(option);
    }
    console.log(dt.value)
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed; /* Fixed table layout */
  }

  th, td {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
    white-space: nowrap; /* Prevent text wrapping in cells */
    overflow: hidden; /* Hide overflow content */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
    font-size: 12px;
  }

  th {
    background-color: #f0f0f0;
  }

  tr:hover {
    background-color: #82b430;
  }

  select {
    width: 30%;
    margin-top: 20px;
    padding: 8px;
  }

  /* Enable horizontal scrolling when table content exceeds the available width */
  .table-container {
    overflow-x: auto;
    max-width: 100%; /* Ensure the table doesn't overflow its container */
  }
  ul {
  list-style-type: disc; 
  }
</style>

  