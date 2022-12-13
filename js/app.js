const addForm = document.querySelector(".regalos-form");
const giftListEl = document.querySelector(".regalos-list");
const giftValue = document.querySelector("#regalo");
const removeAllBtn = document.querySelector(".remove-btn");
const messageEl = document.querySelector("#message");
const giftCantidad = document.querySelector("#num-regalos");
const giftImgEl = document.querySelector("#img-regalo");
const openModalBtn = document.querySelector(".open-modal");
const modalEl = document.querySelector(".modal");
const destinatarioEl = document.querySelector("#destinatario");
const giftsList = [];
init();
function getLocal() {
  if (!localStorage.getItem("gifts")) return;
  const regalos = JSON.parse(localStorage.getItem("gifts"));
  regalos.forEach((regalo) => giftsList.push(regalo));
  updateList();
}

function init() {
  renderGift();
  getLocal();
  showMessage();
}
function renderGift() {
  if (giftsList.length === 1) giftListEl.innerHTML = "";
  giftsList.forEach((gift, i) => {
    if (gift.render) return;
    gift.render = true;
    giftListEl.insertAdjacentHTML(
      "beforeEnd",
      `
      <li class="regalos-item">
        <figure class="card">
          <h3>${gift.name}</h3>
          <img src="${gift.imagen}" class="card-img" alt="">
          <figcaption>${
            gift.destinatario ? "Para " + gift.destinatario : "Es secreto"
          }</figcaption>
          <p>Cantidad ${gift.cantidad ? gift.cantidad : 1}</p>
          <button class="delete-btn" data-item="${i}" id="delete">Borrar</button>
        </figure>
    </li>
  `
    );
  });
}

const pushGift = function (gift, cantidad = 1, imagen, destinatario = "") {
  giftsList.push({
    name: gift,
    cantidad: cantidad,
    imagen: imagen,
    destinatario: destinatario,
  });
  localStorage.setItem("gifts", JSON.stringify(giftsList));
};

const removeGift = function (gift) {
  giftsList.splice(gift, 1);
  localStorage.clear();
  localStorage.setItem("gifts", JSON.stringify(giftsList));
  updateList();
};

function updateList() {
  giftsList.forEach((gift) => delete gift.render);
  if (giftsList.length === 0) {
    giftListEl.innerHTML = "";
    showMessage();
    return;
  }
  giftListEl.innerHTML = "";
  renderGift();
}

const removeAllGifts = function () {
  giftsList.length = 0;
  localStorage.clear();
  updateList();
};

function showMessage() {
  if (giftsList.length != 0) return;
  giftListEl.innerHTML = "";
  giftListEl.insertAdjacentHTML(
    "beforeEnd",
    `
      <h2 class="message" id="message">
        Aún no tienes regalos, agrega algunos rapidos o no tendrás nada para navidad.
      </h2>
  `
  );
}
//eventos
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!giftValue.value) return;
  if (giftsList.some((el) => el.name === giftValue.value)) {
    window.alert("Agregaste el mismo regalo, prueba agregando uno diferente");
    return;
  }
  if (!giftImgEl.value) giftImgEl.value = "./images/default_gift.png";
  pushGift(
    giftValue.value,
    giftCantidad.value,
    giftImgEl.value,
    destinatarioEl.value
  );
  giftImgEl.value = "";
  giftValue.value = "";
  giftCantidad.value = "";
  destinatarioEl.value = "";
  renderGift();
  modalEl.close();
});

giftListEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id === "delete") {
    removeGift(e.target.dataset.item);
  }
});

removeAllBtn.addEventListener("click", () => {
  removeAllGifts();
});
openModalBtn.addEventListener("click", () => modalEl.showModal());
