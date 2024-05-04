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
  getGardenBuddiesByUserId(userId) {
    return axiosFetch.get(
      `${REST_ENDPOINT}/garden/getGardenBuddiesByUserId?userId=${userId}`
    );
  },
  getGardenByGardenBuddyId(gardenBuddyId) {
    return axiosFetch.get(
      `${REST_ENDPOINT}/garden/getGardenByGardenBuddyId?gardenBuddyId=${gardenBuddyId}`
    );
  },
  registerGardenBuddy(userId, serialId) {
    return axiosFetch.post(
      `${REST_ENDPOINT}/garden/createGardenBuddy?userId=${userId}&serialId=${serialId}`
    );
  },
  getAllGardenTypes() {
    return axiosFetch.get(`${REST_ENDPOINT}/garden/getAllGardenTypes`);
  },
  createGarden(gardenBuddyId, gardenTypeId) {
    return axiosFetch.post(
      `${REST_ENDPOINT}/garden/createGarden?gardenBuddyId=${gardenBuddyId}&gardenTypeId=${gardenTypeId}`
    );
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

  getUserGardenData(gardenId) {
    return axiosFetch.get(
      `${REST_ENDPOINT}/data/getUserGardenData?garden_id=${gardenId}`
    );
  },
  getPhByGardenId(gardenId) {
    return axiosFetch.get(
      `${REST_ENDPOINT}/data/getPhByGardenId?garden_id=${gardenId}`
    );
  }
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
};
