const addForm = document.querySelector(".regalos-form");
const giftListEl = document.querySelector(".regalos-list");
const giftValue = document.querySelector("#regalo");
const giftsContainerEl = document.querySelector(".regalos-list");
const removeAllBtn = document.querySelector(".remove-btn");
const messageEl = document.querySelector("#message");
const giftCantidad = document.querySelector("#num-regalos");
const giftImgEl = document.querySelector("#img-regalo");
const openModalBtn = document.querySelector(".open-modal");
const modalEl = document.querySelector(".modal");
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
        <img
            src="${gift.imagen}"
            alt="imagen regalo"
            class="img-regalo"
          />
        <p>${gift.name}</p>
        <span>x ${gift.cantidad ? gift.cantidad : 1}</span>
        <button type="button" class="delete-btn" data-item="${i}">
          <img
            src="images/icons/trash_icon.svg"
            alt="trash can icon"
            class="icon"
            id="delete"
          />
        </button>
    </li>
  `
    );
  });
}

const pushGift = function (gift, cantidad = 1, imagen) {
  giftsList.push({
    name: gift,
    cantidad: cantidad,
    imagen: imagen,
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
  <h2 id="message">
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
  pushGift(giftValue.value, giftCantidad.value, giftImgEl.value);
  giftImgEl.value = "";
  giftValue.value = "";
  giftCantidad.value = "";
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
