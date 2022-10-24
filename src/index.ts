import { getDiscounts } from "./controllers/checkoutController";
import { Checkout } from "./model/Checkout"

const price_rules = getDiscounts();

const checkout = new Checkout(price_rules);
checkout.scan("VOUCHER");
checkout.scan("VOUCHER");
checkout.scan("TSHIRT");
const price = checkout.total;

console.log(price);
