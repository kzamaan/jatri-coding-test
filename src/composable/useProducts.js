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
    const error = ref(null);

    const totalProducts = ref(0);

    const fetchProducts = async (skip = 0, parPage = 5) => {
        isError.value = false;
        isLoading.value = true;
        error.value = null;
        try {
            const { data } = await http.get(`/products?limit=${parPage}&skip=${skip}`);
            productList.value = data.products || [];
            totalProducts.value = data.total;
        } catch (err) {
            productList.value = [];
            error.value = err.message;
            isError.value = true;
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };

    // product detail
    const productDetail = ref({});

    const fetchProductById = async id => {
        if (!id) {
            productDetail.value = {};
            return;
        }
        isError.value = false;
        isLoading.value = true;
        error.value = null;
        try {
            const { data } = await http.get(`/product/${id}`);
            productDetail.value = data;
        } catch (err) {
            error.value = err.message;
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    return { productList, isLoading, fetchProducts, isError, totalProducts, fetchProductById, productDetail, error };
};
