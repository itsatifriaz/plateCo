# Plates Co Proof of Concept

### HTML

The html contains the structure of the the page. As there were 3 plates so each plate is arranged in a separate card element with the order of R01, G01 and B01. The quantity buttons are there to increase the quantity, below it will show the number of plates on each card. <br />

Card below these plates will show the total amount, delivery charges and discounted amount.

### Script

The plates object has all the plates's prices and quantity. This structured object will eliminate all the need for the switch-case statements.<br />
I have the click event listener to each button. As I am getting these button by className so they are received as an array. There index match the indexes of the key of the object **plates**.<br />
The event listener passes down the index of the each button to its callback. Whatever index it receives, it compares it to the **plates** object and increases its quantity.

### Calculating total cost

To calculate the total price of the basket you have to keep track of the individual price and quantity, the discount of R01 plates and the delivery charges.

#### Total Cost of R01

As there is a discount for the R01 plate that need to calculate separately. First I loop through the entire plates object. The index 0 indicates that its the R01 plate which needs to be discounted for. The way I calculate the discount it that I look for the total number of pairs in the selected quantity. This will indicate the number of plates that will be at a discount and by multiplying it with the half of the price I get the discounted amount. The rest of the quantity will be charged at full price.

#### Total Cost of G01 and B01

This const is just multiply the quantity with the unit price.

### Delivery Cost calculation

I added the guarding condition the if the total cost is equal to or greater than the 90 than just return with 0. After that the `deliveryLimits` array set the provided delivery limit and charges. Based on my total cost I have filtered the object inside the array that meets my delivery limits. This will return the delivery charges that will be added to the total cost.
