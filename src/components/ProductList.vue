<script setup>
    import { useProducts } from '@/composable/useProducts';
    import { computed, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    // local components
    import ErrorMessage from './shared/ErrorMessage.vue';
    import ProductLoader from './shared/ProductLoader.vue';
    import ProductSorting from './shared/ProductSorting.vue';
    import RenderPagination from './shared/RenderPagination.vue';
    import THead from './shared/THead.vue';
    import TableRow from './shared/TableRow.vue';

    // router and route
    const router = useRouter();
    const route = useRoute();

    // useProducts composable function
    const { productList, isLoading, fetchProducts, totalProducts, error } = useProducts();

    // pagination par page and current page
    const parPage = ref(5);
    const page = !isNaN(route.query.page) ? Number(route.query.page) : 1;
    const currentPage = ref(page);
    // skipped items for pagination
    const skipped = computed(() => (currentPage.value - 1) * parPage.value);

    // sort order
    const sortByPrice = ref(null);
    const sortByRating = ref(null);

    // fetch data on mounted
    fetchProducts(skipped.value, parPage.value);

    // watch currentPage and fetch data again
    watch(currentPage, () => {
        fetchProducts(skipped.value);
    });

    // total page for pagination
    const totalPage = computed(() => Math.ceil(totalProducts.value / parPage.value));

    // update page number and push to router
    const updatePageItem = page => {
        currentPage.value = page;
        router.push({ query: { page } });
    };

    // update sort by price
    const updateSortByPrice = value => {
        sortByRating.value = null;
        sortByPrice.value = value;
    };

    // update sort by rating
    const updateSortByRating = value => {
        sortByPrice.value = null;
        sortByRating.value = value;
    };

    // sort product list based on price and rating
    const sortedProductList = computed(() => {
        let products = [...productList.value];
        const sortFunc = (value, column) => (a, b) => {
            if (value === 'asc') {
                return a[column] - b[column];
            } else {
                return b[column] - a[column];
            }
        };
        if (sortByPrice.value) {
            products = products.sort(sortFunc(sortByPrice.value, 'price'));
        }
        if (sortByRating.value) {
            products = products.sort(sortFunc(sortByRating.value, 'rating'));
        }
        return products;
    });
</script>

<template>
    <product-sorting @update:sort-by-price="updateSortByPrice" @update:sort-by-rating="updateSortByRating" />
    <table class="relative w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <t-head />
        <tbody>
            <product-loader v-if="isLoading" />
            <template v-else>
                <table-row
                    v-for="(product, index) in sortedProductList"
                    :key="product.id"
                    :iteration="index"
                    :skipped="skipped"
                    :product="product" />
            </template>
            <error-message :errorMessage="error" />
        </tbody>
    </table>

    <render-pagination
        :total-page="totalPage"
        :current-page="currentPage"
        @update:page="updatePageItem"
        class="flex justify-center pt-4" />
</template>
