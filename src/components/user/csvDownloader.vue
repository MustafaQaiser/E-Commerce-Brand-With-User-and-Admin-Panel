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
import { useUserStore } from '../../store/user'// Replace with the actual path to your store

const results = ref([]);
const user = useUserStore();

onMounted(async () => {
    try {
        const userId = user.id; // fetch userId from pinia store

        if (!userId) {
            console.log('User ID missing');
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
});

const downloadFile = async (filename) => {
    try {
        const userId = user.id; // fetch userId from pinia store

        if (!userId) {
          console.log('User ID missing');
          return;
        }

        console.log(filename)
        const response = await axios.post('http://localhost:3333/downloadFile', {
          filename: filename,
          user_id: userId
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          responseType: 'blob'  // This is crucial for file downloads
        });

        // Create a blob from the response data for downloading
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        
        // Use an anchor tag to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (error) {
        console.error("Error downloading file:", error);
      }
}
</script>

<style scoped>
.view-csv {

    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    margin-top: 70px;
    background: #333;
    color:white;
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
    background: #333;
}

button.download-btn {
    padding: 5px 10px;
    cursor: pointer;
    background: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
}

button.download-btn:hover {
    background: #0056b3;
}
</style>
