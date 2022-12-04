const addForm = document.querySelector(".regalos-form");
const giftListEl = document.querySelector(".regalos-list");
const giftValue = document.querySelector("#regalo");
const giftsContainerEl = document.querySelector(".regalos-list");

const giftsList = [];

const renderGift = function () {
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
  giftListEl.innerHTML = "";
  renderGift();
};

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
