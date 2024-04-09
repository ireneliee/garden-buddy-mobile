import axios from "axios";
import { REST_ENDPOINT } from "../constants/RestEndpoint";

let axiosFetch = axios.create();

export const UserApi = {
  getStaffListByRole() {
    return axiosFetch.get(`${REST_ENDPOINT}/users/getAllUsers`);
  },
  userLogin(username, password) {
    return axiosFetch.post(
      `${REST_ENDPOINT}/users/userLogin?username=${username}&password=${password}`
    );
  },
  createUser(username, password, firstname, lastname) {
    return axiosFetch.post(
      `${REST_ENDPOINT}/users/createUser?username=${username}&password=${password}&firstname=${firstname}&lastname=${lastname}`
    );
  },
  getUserById(userId) {
    return axiosFetch.get(
      `${REST_ENDPOINT}/users/getUserById?userId=${userId}`
    );
  },
};

export const GardenApi = {
  getStaffListByRole() {
    return axiosFetch.get(`${REST_ENDPOINT}/users/getAllUsers`);
  },
};
export const ShopApi = {
  getAllGardenBuddyPacks() {
    return axiosFetch.get(`${REST_ENDPOINT}/shop/getAllGardenBuddyPacks`);
  },
  getAllAccessories() {
    return axiosFetch.get(`${REST_ENDPOINT}/shop/getAllAccessories`);
  },
  createOrder(requestBody) {
    return axiosFetch.post(`${REST_ENDPOINT}/shop/createOrder`, requestBody);
  },
  getInventoryItem(item_id) {
    return axiosFetch.get(
      `${REST_ENDPOINT}/shop/getInventoryItem?item_id=${item_id}`
    );
  },
};

export const DataApi = {
  getStaffListByRole() {
    return axiosFetch.get(`${REST_ENDPOINT}/users/getAllUsers`);
  },
};

export const OrderApi = {
  getOrdersByUserId(userId) {
    return axiosFetch.get(
    `${REST_ENDPOINT}/users/getOrdersByUserId?userId=${userId}`
    );
  },
  getOrdersByOrderId(orderId) {
    return axiosFetch.get(
    `${REST_ENDPOINT}/users/getOrdersByOrderId?orderId=${orderId}`
    );
  },
}
