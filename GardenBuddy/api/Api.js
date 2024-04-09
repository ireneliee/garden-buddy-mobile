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
};

export const DataApi = {
  getStaffListByRole() {
    return axiosFetch.get(`${REST_ENDPOINT}/users/getAllUsers`);
  },
};
