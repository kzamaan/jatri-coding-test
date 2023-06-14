<script setup>
    import ProductList from '@/components/ProductList.vue';
</script>

<template>
    <!-- component -->
    <div class="card max-w-5xl mx-auto border my-4">
        <div class="card-header">
            <h1 class="text-2xl font-bold text-gray-700 dark:text-white">Product List</h1>
        </div>
        <div class="card-body">
            <product-list />
        </div>
    </div>
</template>
