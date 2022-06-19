let productName = "";
let quantity = 1;
let price = 0;

productLists = [];

function formSubmit(event) {
  event.preventDefault();
  productName = document.getElementById("product-name").value;

  quantity = document.getElementById("product-quantity").value;
  price = document.getElementById("product-price").value;
  addItems(productName, quantity, price);
}
const table = document.getElementsByTagName("tbody");

async function addItems(productName, quantity, price) {
  console.log(productName, quantity, price);
  fetch("https://anishproducts.herokuapp.com/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: "cors",
    body: JSON.stringify({
      productName: productName,
      quantity: quantity,
      price: price,
    }),
  })
    .then((response) => {
      let tableRow = document.createElement("tr");
      let nameTableData = document.createElement("td");
      const productNameText = document.createTextNode(productName);
      nameTableData.appendChild(productNameText);
      let quantityTableData = document.createElement("td");
      const quantityText = document.createTextNode(quantity);
      quantityTableData.appendChild(quantityText);
      let priceTableData = document.createElement("td");
      const priceText = document.createTextNode(price);
      priceTableData.appendChild(priceText);

      tableRow.appendChild(nameTableData);
      tableRow.appendChild(quantityTableData);
      tableRow.appendChild(priceTableData);

      table[0].appendChild(tableRow);

      document.getElementById("product-name").value = "";

      document.getElementById("product-quantity").value = "1";
      document.getElementById("product-price").value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

const getData = async () => {
  console.log("asdlfl");
  const response = await fetch("https://anishproducts.herokuapp.com/");
  const data = await response.json();
  productLists = data;

  console.log(data);
  productLists.map((item) => {
    let tableRow = document.createElement("tr");
    let nameTableData = document.createElement("td");
    const productNameText = document.createTextNode(item["productName"]);
    nameTableData.appendChild(productNameText);
    let quantityTableData = document.createElement("td");
    const quantityText = document.createTextNode(item["quantity"]);
    quantityTableData.appendChild(quantityText);
    let priceTableData = document.createElement("td");
    const priceText = document.createTextNode(item["price"]);
    priceTableData.appendChild(priceText);

    tableRow.appendChild(nameTableData);
    tableRow.appendChild(quantityTableData);
    tableRow.appendChild(priceTableData);

    table[0].appendChild(tableRow);
  });
};
getData();
const form = document.getElementById("product-form");
form.onsubmit = formSubmit;
