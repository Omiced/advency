const addForm = document.querySelector("#add-form");
const giftListEl = document.querySelector(".regalos-list");
const giftValue = document.querySelector("#regalo");
const giftValueEdit = document.querySelector("#regalo-edit");
const removeAllBtn = document.querySelector(".remove-btn");
const messageEl = document.querySelector("#message");
const giftCantidad = document.querySelector("#num-regalos");
const giftCantidadEditEl = document.querySelector("#num-regalos-edit");
const giftImgEl = document.querySelector("#img-regalo");
const giftImgEditEl = document.querySelector("#img-regalo-edit");
const openModalBtn = document.querySelector(".open-modal");
const modalAddEl = document.querySelector("#modal-add");
const modalEditEl = document.querySelector("#modal-edit");
const destinatarioEl = document.querySelector("#destinatario");
const destinatarioEditEl = document.querySelector("#destinatario-edit");
const editBtnEl = document.querySelector("#edit-btn");
const sorpresaBtnEl = document.querySelector("#sorpresa");
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
          <div class="btns-container">
            <button class="delete-btn btn" data-item="${i}" id="delete">Borrar</button>
            <button class="edit-btn btn" data-item="${i}" id="edit">Editar</button>
          </div>
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

const editGift = function (gift, name, cantidad, imgURL, destinatario) {
  giftsList[gift].name = name;
  giftsList[gift].cantidad = cantidad;
  giftsList[gift].imagen = imgURL;
  giftsList[gift].destinatario = destinatario;
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

const regaloSorpresa = function () {
  const regalos = [
    {
      name: "PlayStation 5",
      imgURL:
        "http://cdn.shopify.com/s/files/1/0257/8812/1137/products/image_55de00df-8570-481e-8716-c04c6e670a08_1200x1200.jpg?v=1657554803",
    },
    {
      name: "Xbox series X",
      imgURL: "https://m.media-amazon.com/images/I/61eYoSqkHnL._AC_SX466_.jpg",
    },
    {
      name: "Carbón",
      imgURL:
        "https://www.foronuclear.org/wp-content/uploads/2010/06/carbon.jpg",
    },
    {
      name: "Calcetines Navideños",
      imgURL:
        "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/mg/gm/3pp/asr/2b8f8872-5032-4e51-a998-9005c77fccb4.869eb95190b2a983f8985172f01dbf82.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff",
    },
    {
      name: "Chocolates",
      imgURL:
        "https://dam.cocinafacil.com.mx/wp-content/uploads/2018/04/chocolate-amargo.jpg",
    },
  ];
  const randomId = Math.floor(Math.random() * regalos.length);
  return regalos[randomId];
};
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
  modalAddEl.close();
});

giftListEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id === "delete") {
    removeGift(e.target.dataset.item);
  }
  if (e.target.id === "edit") {
    modalEditEl.showModal();
    const giftNum = e.target.dataset.item;
    giftImgEditEl.value =
      giftsList[giftNum].imagen === "./images/default_gift.png"
        ? ""
        : giftsList[giftNum].imagen;
    giftValueEdit.value = giftsList[giftNum].name;
    giftCantidadEditEl.value = giftsList[giftNum].cantidad
      ? giftsList[giftNum].cantidad
      : 1;
    destinatarioEditEl.value = giftsList[giftNum].destinatario
      ? giftsList[giftNum].destinatario
      : "Es secreto";
    editBtnEl.addEventListener("click", (e) => {
      e.preventDefault();
      editGift(
        giftNum,
        giftValueEdit.value,
        giftCantidadEditEl.value,
        giftImgEditEl.value ? giftImgEditEl.value : "./images/default_gift.png",
        destinatarioEditEl.value
      );
      modalEditEl.close();
    });
  }
});

removeAllBtn.addEventListener("click", () => {
  removeAllGifts();
});
openModalBtn.addEventListener("click", () => modalAddEl.showModal());

sorpresaBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  const regaloSor = regaloSorpresa();
  giftValue.value = regaloSor.name;
  giftImgEl.value = regaloSor.imgURL;
});

// posible petición de api
// const regaloApi = async function () {
//   const response = await fetch("APi-url");
//   const data = await response.json();
//   return data;
// };
