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

const increase_quantity_button = document.getElementsByClassName(
  "increase_quantity_button"
);

const quantity_display = document.getElementsByClassName("plate_quantity");
const total = document.getElementsByClassName("total")[0];
const deliveryChargesElement =
  document.getElementsByClassName("deliveryCharges")[0];
const discount = document.getElementsByClassName("discount")[0];

[...increase_quantity_button].forEach((element, index) => {
  element.addEventListener("click", function () {
    increaseQuantity(this, index);
  });
});

const increaseQuantity = (params, index) => {
  plates[Object.keys(plates)[index]].quantity += 1;
  quantity_display[index].innerText =
    plates[Object.keys(plates)[index]].quantity;

  calculateTotal();
};

const calculateTotal = () => {
  let total_price = 0;

  for (let plate = 0; plate < Object.keys(plates).length; plate++) {
    if (
      Object.keys(plates)[plate] === "R01" &&
      plates[Object.keys(plates)[plate]].quantity > 1
    ) {
      const qty = plates[Object.keys(plates)[plate]].quantity;
      const numOfDiscountedPlate = parseInt(qty / 2);
      const discountValue =
        (plates[Object.keys(plates)[plate]].price / 2) * numOfDiscountedPlate;
      total_price +=
        plates[Object.keys(plates)[plate]].price *
          (qty - numOfDiscountedPlate) +
        discountValue;

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

const calculateDeliveryCharges = (total_price) => {
  if (total_price >= 90) {
    return 0;
  }
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

  const deliveryLimit = deliveryLimits
    .filter((element) => {
      return element.priceLimit > total_price;
    })
    .shift();

  return deliveryLimit.deliveryCharges;
};
