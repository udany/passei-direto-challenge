import axios from 'axios';

let options = {};

options.baseURL = `http://localhost:3001`;
options.withCredentials = true;

export default axios.create(options)