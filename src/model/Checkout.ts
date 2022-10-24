import { v4 as uuidv4 } from 'uuid';

import { getFilters, getItemByCode } from '../controllers/checkoutController';
import { ICheckedItem, IDiscountSettings, IPriceRule } from '../types/checkoutTypes';

export class Checkout {
    private checkedItems: ICheckedItem[];
    private discounts: IDiscountSettings[];
    public total: number;

    private initializeDiscounts = (price_rules: IPriceRule[]): IDiscountSettings[] => {
        const filters = getFilters();
        return price_rules.map(item => ({
            ...item,
            filter: (code: string) => filters[item.filterName]({ items: this.checkedItems, code, settings: item.settings }),
        }));
    }

    public constructor(price_rules: IPriceRule[]) {
        this.discounts = this.initializeDiscounts(price_rules);
        this.checkedItems = [];
        this.total = 0;
    }

    private recalculateDiscounts = () => {
        const discountedItems: ICheckedItem[] = [];

        /**
         * Checks if there are any items to apply a discount on
         * and adds them to the discountedItems
         */
        this.checkedItems.forEach(item => {
            this.discounts.forEach(discount => {
                if (discount.filter(item.code).length > 0) {
                    discountedItems.push({
                        ...item,
                    currentPrice: item.initialPrice * discount.value,
                    });
                }
            });
        });

        /**
         * Re-writes the checkedItems array but adding every item discounted version
         * if it does exist
         */
        this.checkedItems = this.checkedItems.map(item => {
            const discItem = discountedItems.filter(discItem => discItem.id === item.id);
            if (discItem.length > 0) {
                return discItem[0];
            }
            return item;
        });
    };

    private recalculateTotal = () => {
        this.total = 0;
        this.checkedItems.forEach(item => {
            this.total += item.currentPrice;
        })
    };

    public scan = (itemCode: string) => {
        const item = getItemByCode(itemCode);
        this.checkedItems.push({
            id: uuidv4(),
            ...item,
        });
        /**
         * This could be calculated at the end of the checkout operation but I assume
         * it may update constantly to show the user if the discount was made after every
         * item gets scanned
         */
        this.recalculateDiscounts();

        /**
         * I would rather calculate the total with a getTotal function, but since the example
         * requires to get the total from this.total we need to store the value in that variable
         * everytime we scan
         */
        this.recalculateTotal();
    };
}
