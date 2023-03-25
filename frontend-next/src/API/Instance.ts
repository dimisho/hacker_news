import axios from 'axios';
// import process from 'process';

const Instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
console.log(process.env.REACT_APP_API_URL);

export default Instance;
