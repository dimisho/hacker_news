import axios from 'axios';

const Instance = axios.create({
  baseURL: 'https://api.hnpwa.com/v0',
});

export default Instance;
