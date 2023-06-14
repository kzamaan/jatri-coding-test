<script setup>
    import { useProducts } from '@/composable/useProducts';
    import { computed, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import ProductLoader from './shared/ProductLoader.vue';
    import RenderPagination from './shared/RenderPagination.vue';
    import TableRow from './shared/TableRow.vue';

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
    fetchProducts(skipped.value, parPage.value);

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
                <TableRow
                    v-for="(product, index) in productList"
                    :key="product.id"
                    :iteration="index"
                    :skipped="skipped"
                    :product="product" />
            </template>
        </tbody>
    </table>
    <div class="flex justify-center pt-4">
        <render-pagination :total-page="totalPage" :current-page="currentPage" @update-page="updatePageItem" />
    </div>
</template>
