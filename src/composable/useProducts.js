import axios from 'axios';
import { ref } from 'vue';

// create axios instance
const http = axios.create({
    baseURL: 'https://dummyjson.com',
});

// create custom hook
export const useProducts = () => {
    const productList = ref([]);
    const isLoading = ref(false);
    const isError = ref(false);

    const totalProducts = ref(0);

    const fetchProducts = async (skip = 0, parPage = 5) => {
        isError.value = false;
        isLoading.value = true;
        try {
            const { data } = await http.get(`/products?limit=${parPage}&skip=${skip}`);
            productList.value = data.products;
            totalProducts.value = data.total;
        } catch (error) {
            console.log(error);
            isError.value = true;
        }
        isLoading.value = false;
    };

    return { productList, isLoading, fetchProducts, isError, totalProducts };
};
