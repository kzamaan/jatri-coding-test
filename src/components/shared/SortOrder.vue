<script setup>
    import { ref, watch } from 'vue';

    const emit = defineEmits(['update:sort', 'update:rating']);
    // sort order
    const sortOrder = ref('asc');
    const ratingCount = ref(1);

    // watch sortOrder and emit event
    watch(sortOrder, () => {
        emit('update:sort', sortOrder.value);
    });
    // watch ratingCount and emit event
    watch(ratingCount, () => {
        emit('update:rating', ratingCount.value);
    });
</script>

<template>
    <div class="mb-2">
        <!-- sorting dropdown -->
        <div class="flex justify-end space-x-4">
            <div class="relative flex items-center">
                <label class="block mr-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
                <select v-model="sortOrder" class="form-select text-center">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div class="relative flex items-center">
                <label class="block mr-2 text-sm font-medium text-gray-900 dark:text-white">Rating:</label>
                <select v-model="ratingCount" class="form-select text-center w-20">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
    </div>
</template>
