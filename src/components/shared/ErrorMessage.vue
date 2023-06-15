<script setup>
    // define props
    defineProps({
        errorMessage: {
            type: [String, null],
            required: true,
        },
    });
</script>

<template>
    <tr v-if="errorMessage">
        <td colspan="5" class="text-center py-4">
            <p class="text-red-500 dark:text-red-400">{{ errorMessage }}</p>
        </td>
    </tr>
</template>
