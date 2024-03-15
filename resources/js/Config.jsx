import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1";

//ROUTE 
export default{
    //AUTH
    getRegister:(data)=>axios.post(`${base_api_url}/auth/register`, data),
    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`, data)


    
}