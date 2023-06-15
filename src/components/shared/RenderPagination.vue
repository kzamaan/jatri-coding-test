<script setup>
    import { computed } from 'vue';

    // receive props from parent
    const props = defineProps({
        currentPage: {
            type: Number,
            required: true,
        },
        totalPage: {
            type: Number,
            required: true,
        },
        keepLength: {
            type: Boolean,
            default: false,
        },
    });

    // emit event to parent
    const emit = defineEmits(['update:page']);

    // update page number
    const updatePage = page => {
        emit('update:page', page);
    };

    // go to previous page
    const previousPage = () => {
        const page = props.currentPage - 1;
        emit('update:page', page);
    };
    // go to next page
    const nextPage = () => {
        if (props.currentPage == props.totalPage) {
            return;
        }
        const page = props.currentPage + 1;
        emit('update:page', page);
    };
    // generate page number based on total page number
    const pageRange = computed(() => {
        const current = props.currentPage;
        const size = props.keepLength;
        const last = props.totalPage;
        const delta = 3;
        const left = current - delta;
        const right = current + delta;
        const leftPad = (delta + 2) * 2;
        const rightPad = (delta + 2) * 2 - 1;
        const range = [];
        const pages = [];
        let l;

        for (let i = 1; i <= last; i++) {
            // Item is first or last
            if (i === 1 || i === last) {
                range.push(i);
            }
            // Item is within the delta
            else if (i >= left && i <= right) {
                range.push(i);
            }
            // Item is before max left padding
            else if (size && i < leftPad && current < leftPad - 2) {
                range.push(i);
            }
            // Item is after max right padding
            else if (size && i > last - rightPad && current > last - rightPad + 2) {
                range.push(i);
            }
        }

        range.forEach(function (i) {
            if (l) {
                if (i - l === 2) {
                    pages.push(l + 1);
                } else if (i - l !== 1) {
                    pages.push('...');
                }
            }
            pages.push(i);
            l = i;
        });

        return pages;
    });
</script>

<template>
    <nav v-if="totalPage > 1" aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
            <li>
                <button type="button" class="previous-page" :disabled="currentPage == 1" @click="previousPage">
                    Previous
                </button>
            </li>

            <template v-for="page in pageRange" :key="page">
                <li>
                    <button type="button" v-if="isNaN(page)" class="pagination-item">
                        {{ page }}
                    </button>
                    <button
                        v-else
                        type="button"
                        @click="updatePage(page)"
                        class="pagination-item"
                        :class="{ 'current-page': currentPage == page }"
                        :disabled="currentPage == page">
                        {{ page }}
                    </button>
                </li>
            </template>

            <li>
                <button type="button" class="next-page" :disabled="currentPage == totalPage" @click="nextPage">
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>
