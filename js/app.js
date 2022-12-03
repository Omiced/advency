const addForm = document.querySelector(".regalos-form");
const giftList = document.querySelector(".regalos-list");
const giftValue = document.querySelector("#regalo");

const addGift = function (gift) {
  const giftMarkup = `
  <li class="regalos-item">${gift}</li>
`;
  giftList.insertAdjacentHTML("beforeEnd", giftMarkup);
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const gift = giftValue.value;
  if (!giftValue.value) return;
  addGift(gift);
});
