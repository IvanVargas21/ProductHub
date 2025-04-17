import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
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
    },

		deleteProduct: async (id)=>{
			console.log("deleteProduct function called", id);
			set({ loading: true });
			try {
				await axios.delete(`${BASE_URL}/api/products/${id}`);
				set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
				toast.success("Product deleted successfully");
			} catch (error) {
				console.log("Error in deleteProduct function", error);
				toast.error("Something went wrong");
			} finally {
				set({ loading: false });
			}
		}
}))