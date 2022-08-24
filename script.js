// Plates objects
const plates = {
  R01: {
    price: 32.95,
    quantity: 0,
  },
  G01: {
    price: 24.95,
    quantity: 0,
  },
  B01: {
    price: 7.95,
    quantity: 0,
  },
};

// increase_quantity_button click event listener for each plate element
const increase_quantity_button = document.getElementsByClassName(
  "increase_quantity_button"
);
// quantity_display to display the quantity of each plate
const quantity_display = document.getElementsByClassName("plate_quantity");
// total to display the total price of the order
const total = document.getElementsByClassName("total")[0];
// deliveryChargesElement to display the delivery charges
const deliveryChargesElement =
  document.getElementsByClassName("deliveryCharges")[0];
// discount to display the discount value
const discount = document.getElementsByClassName("discount")[0];

// this foreach loop is to assign the index of the plate to the increaseQuantity function
[...increase_quantity_button].forEach((element, index) => {
  element.addEventListener("click", function () {
    increaseQuantity(this, index);
  });
});

// increaseQuantity function to increase the quantity of the plate when the increase_quantity_button is clicked
const increaseQuantity = (params, index) => {
  plates[Object.keys(plates)[index]].quantity += 1;
  quantity_display[index].innerText =
    plates[Object.keys(plates)[index]].quantity;

  calculateTotal();
};

// calculateTotal function to calculate the total price of the order
const calculateTotal = () => {
  let total_price = 0;

  for (let plate = 0; plate < Object.keys(plates).length; plate++) {
    if (
      // if plate is RO1 and quantity is greater than 1
      Object.keys(plates)[plate] === "R01" &&
      plates[Object.keys(plates)[plate]].quantity > 1
    ) {
      // then discount is applied
      const qty = plates[Object.keys(plates)[plate]].quantity;

      // counting the number of pairs in the quantity
      const numOfDiscountedPlate = parseInt(qty / 2);

      // discount is calculated based on the number of pairs in the quantity
      // discountalue is equal to half of the price of the plate * number of pairs in the quantity
      const discountValue =
        (plates[Object.keys(plates)[plate]].price / 2) * numOfDiscountedPlate;
      // total price is calculated based on the price of the plate * quantity of the plate + discount value
      total_price +=
        plates[Object.keys(plates)[plate]].price *
          (qty - numOfDiscountedPlate) +
        discountValue;

      // discount is displayed based on the discount value
      discount.innerText = discountValue.toFixed(2);
    } else {
      total_price +=
        plates[Object.keys(plates)[plate]].price *
        plates[Object.keys(plates)[plate]].quantity;
    }
  }

  const deliveryCharges = calculateDeliveryCharges(total_price);
  deliveryChargesElement.innerText = deliveryCharges;

  total.innerText = parseFloat(total_price + deliveryCharges).toFixed(2);
};

// calculateDeliveryCharges function to calculate the delivery charges
const calculateDeliveryCharges = (total_price) => {
  // if total price is greater than or equal to 90 then delivery charges is 0
  if (total_price >= 90) {
    // Gaurding condition
    return 0;
  }
  // different delivery charges are applied based on the price of the order
  const deliveryLimits = [
    {
      priceLimit: 50,
      deliveryCharges: 4.95,
    },
    {
      priceLimit: 90,
      deliveryCharges: 2.95,
    },
  ];

  // deliveryLimit filter to get the delivery charges based on the price of the order
  const deliveryLimit = deliveryLimits
    .filter((element) => {
      return element.priceLimit > total_price;
    })
    .shift();

  return deliveryLimit.deliveryCharges;
};
