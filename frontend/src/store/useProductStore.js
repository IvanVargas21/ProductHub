import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:3000";

export const useProductStore = create ((set, get) => ({
    // products state
    products: [],
    loading: false, 
    error: null, 

		formData: {
			name: "",
			price: "",
			image: ""
		},
		setFormData: (formData)=> set({formData}),
		resetForm: set({formData: {name: "", price: "", image: ""}}),

		addProduct: async (e) => {
			// prevent default behaviour in an event in js
			// default behaviour is to refresh the page when a form is submitted
			// this is not what we want in this case
			// allows us to handle the form submission with js
			e.preventDefault();
			set({ loading: true });
	
			try {
				const { formData } = get();
				await axios.post(`${BASE_URL}/api/products`, formData);
				await get().fetchProducts();
				get().resetForm();
				toast.success("Product added successfully");
				document.getElementById("add_product_modal").close();
			} catch (error) {
				console.log("Error in addProduct function", error);
				toast.error("Something went wrong");
			} finally {
				set({ loading: false });
			}
		},

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