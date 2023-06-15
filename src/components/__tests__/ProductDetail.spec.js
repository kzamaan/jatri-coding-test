import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import ProductDetail from '../shared/ProductDetail.vue';

describe('ProductDetail', () => {
    it('renders product detail properly', () => {
        const wrapper = mount(ProductDetail, {
            props: {
                productDetail: {
                    id: 1,
                    title: 'iPhone 9',
                    description: 'An apple mobile which is nothing like apple',
                    price: 549,
                    discountPercentage: 12.96,
                    rating: 4.69,
                    stock: 94,
                    brand: 'Apple',
                    category: 'smartphones',
                    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                    images: [
                        'https://i.dummyjson.com/data/products/1/1.jpg',
                        'https://i.dummyjson.com/data/products/1/2.jpg',
                        'https://i.dummyjson.com/data/products/1/3.jpg',
                        'https://i.dummyjson.com/data/products/1/4.jpg',
                        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                    ],
                },
                isLoading: false,
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
