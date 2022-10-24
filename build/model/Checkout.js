"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkout = void 0;
const uuid_1 = require("uuid");
const checkoutController_1 = require("../controllers/checkoutController");
class Checkout {
    constructor(price_rules) {
        this.initializeDiscounts = (price_rules) => {
            const filters = (0, checkoutController_1.getFilters)();
            return price_rules.map(item => (Object.assign(Object.assign({}, item), { filter: (code) => filters[item.filterName]({ items: this.checkedItems, code, settings: item.settings }) })));
        };
        this.recalculateDiscounts = () => {
            const discountedItems = [];
            /**
             * Checks if there are any items to apply a discount on
             * and adds them to the discountedItems
             */
            this.checkedItems.forEach(item => {
                this.discounts.forEach(discount => {
                    if (discount.filter(item.code).length > 0) {
                        discountedItems.push(Object.assign(Object.assign({}, item), { currentPrice: item.initialPrice * discount.value }));
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
        this.recalculateTotal = () => {
            this.total = 0;
            this.checkedItems.forEach(item => {
                this.total += item.currentPrice;
            });
        };
        this.scan = (itemCode) => {
            const item = (0, checkoutController_1.getItemByCode)(itemCode);
            this.checkedItems.push(Object.assign({ id: (0, uuid_1.v4)() }, item));
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
        this.discounts = this.initializeDiscounts(price_rules);
        this.checkedItems = [];
        this.total = 0;
    }
}
exports.Checkout = Checkout;
