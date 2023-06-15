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
                },
                isLoading: false,
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
