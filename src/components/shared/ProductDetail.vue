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
            <div v-if="isLoading">Loading...</div>
            <!-- added slide down transition -->
            <transition name="slide-fade">
                <div v-if="productDetail.id" class="card mb-2 rounded-xl">
                    <div class="card-header">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white text-center">Product Detail</h3>
                    </div>
                    <div class="card-body">
                        <table class="w-full">
                            <tr>
                                <td class="font-bold w-30">Name:</td>
                                <td>{{ productDetail.title }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold w-30">Price:</td>
                                <td>{{ productDetail.price }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold w-30">Rating:</td>
                                <td>{{ productDetail.rating }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold w-30">Description:</td>
                                <td>{{ productDetail.description }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold w-30">Brand:</td>
                                <td>{{ productDetail.brand }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold w-30">Category:</td>
                                <td>{{ productDetail.category }}</td>
                            </tr>
                            <tr>
                                <td class="font-bold w-30">Image:</td>
                                <td>
                                    <img
                                        :src="productDetail.thumbnail"
                                        alt="product image"
                                        class="w-20 h-20 object-cover" />
                                </td>
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
