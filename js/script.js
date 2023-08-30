let pname = document.getElementById("pname");
let price = document.getElementById("price");
let device = document.getElementById("device");
let disc = document.getElementById("disc");
let search = document.getElementById("search");
let productContainer = [];
let currentIndex;

if (localStorage.getItem("data") != null) {
  productContainer = JSON.parse(localStorage.getItem("data"));
  displayProduct(productContainer);
}

function addproduct() {
  let product = {
    productname: pname.value,
    productprice: price.value,
    productdevice: device.value,
    productdisc: disc.value,
  };
  console.log(product);
  productContainer.push(product);
  localStorage.setItem("data", JSON.stringify(productContainer));
  reset();
  displayProduct(productContainer);
}

function reset() {
  pname.value = "";
  price.value = "";
  device.value = "";
  disc.value = "";

  document.getElementById("updatebtn").classList.add("d-none");
  document.getElementById("addbtn").classList.remove("d-none");
}

function displayProduct(productContainer) {
  let container = ``;

  for (let index = 0; index < productContainer.length; index++) {
    container += `<tr>
    <td>${index}</td>
    <td>${productContainer[index].productname}</td>
    <td>${productContainer[index].productprice}</td>
    <td>${productContainer[index].productdevice}</td>
    <td>${productContainer[index].productdisc}</td>
    <td><button onclick='updateProduct(${index})' class="btn btn-outline-warning">Update</button></td>
    <td><button onclick='deleteProduct(${index})' class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
  }
  document.getElementById("mytable").innerHTML = container;
}

function deleteProduct(indexNumber) {
  productContainer.splice(indexNumber, 1);
  localStorage.setItem("data", JSON.stringify(productContainer));
  displayProduct(productContainer);
}

function deleteAllProducts(indexNumber) {
  productContainer.splice(indexNumber);
  localStorage.setItem("data", JSON.stringify(productContainer));

  displayProduct(productContainer);
}

function updateProduct(indexNumber) {
  currentIndex = indexNumber;
  console.log(productContainer);
  pname.value = productContainer[indexNumber].productname;
  price.value = productContainer[indexNumber].productprice;
  device.value = productContainer[indexNumber].productdevice;
  disc.value = productContainer[indexNumber].productdisc;

  document.getElementById("my-alert-update").classList.remove("d-none");

  document.getElementById("updatebtn").classList.remove("d-none");
  document.getElementById("addbtn").classList.add("d-none");

  setTimeout(() => {
    document.getElementById("my-alert-update").classList.add("d-none");
  }, 3000);
  // console.log(indexNumber);
}

function updateConfirmation() {
  let product = {
    productname: pname.value,
    productprice: price.value,
    productdevice: device.value,
    productdisc: disc.value,
  };
  productContainer.splice(currentIndex, 1, product);
  localStorage.setItem("data", JSON.stringify(productContainer));
  reset();
  displayProduct(productContainer);

  document.getElementById("updatebtn").classList.add("d-none");
  document.getElementById("addbtn").classList.remove("d-none");
}

function searchProduct(term) {
  let container = ``;

  for (let index = 0; index < productContainer.length; index++) {
    if (
      productContainer[index].productname
        .toLowerCase()
        .includes(term.toLowerCase())
    ) {
      container += `<tr>
    <td>${index}</td>
    <td>${productContainer[index].productname}</td>
    <td>${productContainer[index].productprice}</td>
    <td>${productContainer[index].productdevice}</td>
    <td>${productContainer[index].productdisc}</td>
    <td><button onclick='updateProduct(${index})' class="btn btn-outline-warning">Update</button></td>
    <td><button onclick='deleteProduct(${index})' class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
    }
  }
  document.getElementById("mytable").innerHTML = container;
}

function checkingEmpty() {
  if (pname.value == "" || price.value == "" || device.value == "") {
    document.getElementById("my-alert-empty").classList.remove("d-none");
    setTimeout(() => {
      document.getElementById("my-alert-empty").classList.add("d-none");
    }, 2000);
  } else {
    addproduct();
    document.getElementById("my-alert-success").classList.remove("d-none");
    setTimeout(() => {
      document.getElementById("my-alert-success").classList.add("d-none");
    }, 2000);
  }
}
