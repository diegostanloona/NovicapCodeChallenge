# Novicap Code Challenge
This is a simple Node.js app that solves the Novicap code challenge

To run this project make sure Node.js is installed and use
```
npm i
```
```
npm start
```

## Explanation
In summary the scan function works this way:

1. When the checkout item is created all the discounts are set up, it gets them from a controller as if they were stored in a database
2. An item code is received in the funcion params
3. Controller looks for the item, in this case a plain array but in reality should be a database call
4. For every scan the app checks the discounts, which are functions that filter which items should get the discount.
5. After that the app re-calculates the total price of the order

## Notes
In this example I created the getFilters function in the controller, this should work as a template for the employees to use them without having to write the whole function for every item.
getDiscounts returns the data that would be implemented by the employee, that is why it is a simple JSON object:
```
{
    value: 0.5,
    filterName: 'n number of items',
    code: 'VOUCHER',
    settings: {
        exactQuantity: 2,
    }
}
```
This approach should help for a future version of the app to customize the discounts settings and be user friendly for the employees that would update the discounts

May something not be clear please contact me back at diegomezrd@gmail.com so we can discuss further about the app!
