<script setup>
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import { useProducts } from '@/composable/useProducts';
    import { ref, watch } from 'vue';
    import ProductDetail from './ProductDetail.vue';

    const { fetchProductById, productDetail, isLoading } = useProducts();

    const props = defineProps({
        product: {
            type: Object,
            default: () => ({}),
        },
        skipped: {
            type: Number,
            default: 0,
        },
        iteration: {
            type: Number,
            default: 0,
        },
    });

    watch(productDetail, value => {
        console.log('Product detail', value);
    });

    const isShowDetail = ref(false);

    const showProductDetail = () => {
        isShowDetail.value = !isShowDetail.value;
        if (!productDetail.value.id) {
            fetchProductById(props.product.id);
        }
    };
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 border font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ skipped + (iteration + 1) }}
        </th>
        <td class="px-6 py-4 border">{{ product.title }}</td>
        <td class="px-6 py-4 border">{{ product.rating }}</td>
        <td class="px-6 py-4 border text-right">{{ Math.round(product.price).toLocaleString() }}</td>
        <td class="px-6 py-4 border text-center">
            <PrimaryButton @click="showProductDetail" class="w-20">
                {{ isLoading ? 'Loading...' : isShowDetail ? 'Close' : 'Show' }}
            </PrimaryButton>
        </td>
    </tr>
    <template v-if="isShowDetail">
        <ProductDetail :product-detail="productDetail" :is-loading="isLoading" />
    </template>
</template>
