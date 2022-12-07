const addForm = document.querySelector(".regalos-form");
const giftListEl = document.querySelector(".regalos-list");
const giftValue = document.querySelector("#regalo");
const giftsContainerEl = document.querySelector(".regalos-list");
const removeAllBtn = document.querySelector(".remove-btn");
const messageEl = document.querySelector("#message");
const giftsList = [];
showMessage();

const renderGift = function () {
  if (giftsList.length === 1) giftListEl.innerHTML = "";
  giftsList.forEach((gift, i) => {
    if (gift.render) return;
    gift.render = true;
    giftListEl.insertAdjacentHTML(
      "beforeEnd",
      `
    <li class="regalos-item">
      ${gift.name}
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
};

const pushGift = function (gift) {
  giftsList.push({
    name: gift,
  });
};

const removeGift = function (gift) {
  giftsList.splice(gift, 1);
  updateList();
};

const updateList = function () {
  giftsList.forEach((gift) => delete gift.render);
  if (giftsList.length === 0) {
    giftListEl.innerHTML = "";
    showMessage();
    return;
  }
  giftListEl.innerHTML = "";
  renderGift();
};

const removeAllGifts = function () {
  giftsList.length = 0;
  updateList();
};

function showMessage() {
  if (giftsList.length != 0) return;
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
  pushGift(giftValue.value);
  giftValue.value = "";
  renderGift();
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
