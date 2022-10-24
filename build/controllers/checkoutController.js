"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscounts = exports.getFilters = exports.getItemByCode = void 0;
const getItemByCode = (code) => {
    const products = [
        {
            code: 'VOUCHER',
            name: 'Voucher',
            initialPrice: 5,
            currentPrice: 5,
        },
        {
            code: 'TSHIRT',
            name: 'T-shirt',
            initialPrice: 20,
            currentPrice: 20,
        },
        {
            code: 'MUG',
            name: 'Coffee mug',
            initialPrice: 7.5,
            currentPrice: 7.5,
        }
    ];
    return products.filter(item => item.code === code)[0];
};
exports.getItemByCode = getItemByCode;
const getFilters = () => {
    return {
        'Single item': ({ items, code }) => {
            return items.filter(item => item.code === code);
        },
        'More than n of the same item': ({ items, settings, code }) => {
            const filteredItems = items.filter(item => item.code === code);
            if (filteredItems.length >= settings.minQuantity) {
                return filteredItems;
            }
            return [];
        },
        'n number of items': ({ items, settings, code }) => {
            const filteredItems = items.filter(item => item.code === code);
            if (filteredItems.length === settings.exactQuantity) {
                return filteredItems;
            }
            return [];
        },
    };
};
exports.getFilters = getFilters;
const getDiscounts = () => {
    return [
        {
            value: 0.5,
            filterName: 'n number of items',
            code: 'VOUCHER',
            settings: {
                exactQuantity: 2,
            }
        },
        {
            value: 0.9,
            filterName: 'Single item',
            code: 'TSHIRT',
        },
    ];
};
exports.getDiscounts = getDiscounts;
