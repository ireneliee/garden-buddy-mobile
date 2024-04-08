import axios from "axios";
import { REST_ENDPOINT } from "../constants/RestEndpoint";

let axiosFetch = axios.create();

export const UserApi = {
  getStaffListByRole() {
    return axiosFetch.get(`${REST_ENDPOINT}/users/getAllUsers`);
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
    return axiosFetch.get(`${REST_ENDPOINT}/shop/createOrder`, requestBody);
  },
};

export const DataApi = {
  getStaffListByRole() {
    return axiosFetch.get(`${REST_ENDPOINT}/users/getAllUsers`);
  },
};
