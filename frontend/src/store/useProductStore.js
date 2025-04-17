import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create ((set, get) => ({
    // products state
    products: [],
    loading: false, 
    error: null, 
    fetchProducts: async () => {
			set({ loading: true});
			try {
				const res = await axios.get(`${BASE_URL}/api/products`);
				set({ products: res.data.data, error: null})
			}catch (error) {
				if (error.response?.status === 429) { // Use `error.response?.status` to safely access the status
					set({ error: "Rate limit exceeded", products: []});
				} else {
					set({ error: "Something went wrong", products: []});
				}
			} finally {
				set({ loading: false})
			}	
    }
}))