import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import TableRow from '../shared/TableRow.vue';

describe('TableRow', () => {
    it('renders table row properly', () => {
        const wrapper = mount(TableRow, {
            props: {
                product: {
                    id: 1,
                    title: 'iPhone 9',
                    description: 'An apple mobile which is nothing like apple',
                    price: 549,
                    discountPercentage: 12.96,
                    rating: 4.69,
                },
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
