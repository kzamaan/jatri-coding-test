<script setup>
    defineProps({
        productDetail: {
            type: Object,
            default: () => ({}),
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    });
</script>

<template>
    <tr>
        <td colspan="5">
            <div v-if="isLoading">Loading</div>
            <div>Product Detail</div>
        </td>
    </tr>
</template>
