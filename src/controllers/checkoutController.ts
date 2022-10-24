import { IFilterSettings, IPriceRule } from "../types/checkoutTypes";

export const getItemByCode = (code: string) => { //This should be a database request
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
}

export const getFilters = (): any => {
    return { // This should be in the database
        'Single item': ({ items, code }: IFilterSettings) => {
            return items.filter(item => item.code === code);
        },
        'More than n of the same item': ({ items, settings, code }: IFilterSettings) => {
            const filteredItems = items.filter(item => item.code === code);
            if (filteredItems.length >= settings.minQuantity) {
                return filteredItems;
            }
            return [];
        },
        'n number of items': ({ items, settings, code }: IFilterSettings) => {
            const filteredItems = items.filter(item => item.code === code);
            if (filteredItems.length === settings.exactQuantity) {
                return filteredItems;
            }
            return [];
        },
    };
}

export const getDiscounts = (): IPriceRule[] => {
    return [ // This should be in the database
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
}