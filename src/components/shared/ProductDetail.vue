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
            <!-- added slide down transition -->
            <transition name="slide-fade">
                <div v-if="productDetail.id" class="card mb-2">
                    <div class="card-header">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white text-center">Product Detail</h3>
                    </div>
                    <div class="card-body">
                        <table class="w-full">
                            <tr>
                                <td class="font-bold">Product Name:</td>
                                <td>{{ productDetail.title }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold">Product Price:</td>
                                <td>{{ productDetail.price }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold">Product Rating:</td>
                                <td>{{ productDetail.rating }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold">Product Description:</td>
                                <td>{{ productDetail.description }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </transition>
        </td>
    </tr>
</template>
<style scoped>
    /*
  Enter and leave animations can use different
  durations and timing functions.
*/
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>
