<template>
    <div class="view-csv">
      <h2>CSV Results</h2>
      
      <table v-if="results && results.length">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.id">
            <td>{{ result.filename }}</td>
            <td>{{ result.created_at }}</td>
            <td>
              <button class="download-btn" @click="downloadFile(result.filename)">Download</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No data available.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const results = ref([]);
  
  const fetchResults = async () => {
    try {
      const userId = route.params.id;
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }
  
      const response = await axios.post('http://localhost:3333/getuserresults', {
        user_id: userId
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
  
      results.value = response.data;
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };
  
  const downloadFile = async (filename) => {
    try {
      const userId = localStorage.getItem('token');
      if (!userId) {
        console.log('User ID missing');
        return;
      }
  
      const response = await axios.post('http://localhost:3333/downloadFile', {
        filename: filename,
        user_id: userId
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        responseType: 'blob'  // Important for file downloads
      });
  
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
  onMounted(fetchResults);
  </script>
  
  <style scoped>
  .view-csv {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    padding: 8px 12px;
    border: 1px solid #ccc;
  }
  
  th {
    background: #e0e0e0;
  }
  
  button.download-btn {
    padding: 5px 10px;
    cursor: pointer;
    background: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    transition: background-color 0.2s;  /* Added a transition for smoother color change */
  }
  
  button.download-btn:hover {
    background: #0056b3;
  }
  </style>
  