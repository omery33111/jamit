import axios from "axios";
import { authenticationURL } from "../../endpoints/endpoints";
import { Login, Register } from "../../models/Authentication";



export const registerUser = async (userData: Register) => {
  const response = await axios.post(`${authenticationURL}/register/`, userData);
  
  return response.data;
};



export const loginUser = async (userData: Login) => {
  const response = await axios.post(`${authenticationURL}/login/`, userData);
  
  return response;
};



export const registerAdmin = async (userData: Register) => {
  const response = await axios.post(`${authenticationURL}/admin_register/`, userData);
  
  return response.data;
};



export const logoutUser = () =>
{
    sessionStorage.removeItem("access")
    sessionStorage.removeItem("refresh")
    sessionStorage.removeItem("userName")
    sessionStorage.removeItem("isAdmin")
    window.location.href = "/"
}
