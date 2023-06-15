<script setup>
    const emit = defineEmits(['update:sort-by-price', 'update:sort-by-rating']);
</script>

<template>
    <div class="mb-2">
        <!-- sorting dropdown -->
        <div class="flex justify-end space-x-4">
            <div class="relative flex items-center">
                <label class="block mr-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
                <select class="form-select text-center" @change="emit('update:sort-by-price', $event.target.value)">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div class="relative flex items-center">
                <label class="block mr-2 text-sm font-medium text-gray-900 dark:text-white">Rating:</label>
                <select class="form-select text-center" @change="emit('update:sort-by-rating', $event.target.value)">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
    </div>
</template>
