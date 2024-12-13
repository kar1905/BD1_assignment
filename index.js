const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per 1$

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//Endpoint 1 --> Done
function getCartTotal(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getCartTotal(newItemPrice, cartTotal).toString());
});

//Endpoint 2 --> Done
function getMembershipDiscount(cartTotal, isMember) {
  if (isMember) {
    cartTotal = cartTotal - (cartTotal * discountPercentage) / 100;
  }
  return cartTotal;
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(getMembershipDiscount(cartTotal, isMember).toString());
});

//Endpoint 3 --> Done
function calculateTax(cartTotal) {
  return (cartTotal * taxRate) / 100;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

//Endpoint 4 --> Done
function getDeliveryTime(shippingMethod, distance) {
  let deliveryTime;
  if (shippingMethod === 'express') {
    deliveryTime = Math.ceil(distance / 100);
  } else {
    deliveryTime = Math.ceil(distance / 50);
  }
  return deliveryTime;
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(getDeliveryTime(shippingMethod, distance).toString());
});

//Endpoint 5 --> Done
function getShippingCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(getShippingCost(weight, distance).toString());
});

//Endpoint 6 --> Done
function getLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(getLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
