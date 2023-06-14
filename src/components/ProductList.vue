<script setup>
    import { useProducts } from '@/composable/useProducts';
    import { computed, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import PrimaryButton from './shared/PrimaryButton.vue';
    import ProductLoader from './shared/ProductLoader.vue';
    import RenderPagination from './shared/RenderPagination.vue';

    // router and route
    const router = useRouter();
    const route = useRoute();

    // useProducts composable function
    const { productList, isLoading, fetchProducts, totalProducts } = useProducts();

    // pagination par page and current page
    const parPage = ref(5);
    const page = !isNaN(route.query.page) ? Number(route.query.page) : 1;
    const currentPage = ref(page);
    // skipped items for pagination
    const skipped = computed(() => (currentPage.value - 1) * parPage.value);

    // fetch data on mounted
    fetchProducts(skipped.value);

    // watch currentPage and fetch data again
    watch(currentPage, () => {
        const skip = (currentPage.value - 1) * parPage.value;
        fetchProducts(skip);
    });

    // total page for pagination
    const totalPage = computed(() => Math.ceil(totalProducts.value / parPage.value));

    // update page number and push to router
    const updatePageItem = page => {
        currentPage.value = page;
        router.push({ query: { page } });
    };
</script>

<template>
    <table class="relative w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs uppercase">
            <tr>
                <th scope="col" class="sticky top-0 table-th w-5">SL</th>
                <th scope="col" class="sticky top-0 table-th">Name</th>
                <th scope="col" class="sticky top-0 table-th">Rating</th>
                <th scope="col" class="sticky top-0 table-th text-right">Price</th>
                <th scope="col" class="sticky top-0 table-th text-center">Action</th>
            </tr>
        </thead>

        <tbody>
            <template v-if="isLoading">
                <tr>
                    <td colspan="5">
                        <product-loader />
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr
                    v-for="(product, index) in productList"
                    :key="product.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ skipped + (index + 1) }}
                    </th>
                    <td class="px-6 py-4">{{ product.title }}</td>
                    <td class="px-6 py-4">{{ product.rating }}</td>
                    <td class="px-6 py-4 text-right">{{ product.price }}</td>
                    <td class="px-6 py-4 text-center">
                        <PrimaryButton>Show</PrimaryButton>
                    </td>
                </tr>
            </template>
        </tbody>
        <!-- tfoot fixed  with pagination design-->
        <tfoot v-if="productList.length" class="text-xs uppercase">
            <tr>
                <td colspan="5" class="sticky bottom-0 table-th text-center my-4">
                    <!-- pagination here -->
                    <render-pagination
                        :total-page="totalPage"
                        :current-page="currentPage"
                        @update-page="updatePageItem" />
                </td>
            </tr>
        </tfoot>
    </table>
</template>
