import './sass/main.scss';


const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const imagesContainer = document.querySelector(".js-gallery");

const cardsMarkup = createGalleryItems(galleryItems);


imagesContainer.insertAdjacentHTML("beforeend", cardsMarkup);

imagesContainer.addEventListener("click", onImagesContainerClick);


function createGalleryItems(galleryItems) {
  return galleryItems
  
  .map(({ preview, original, description }) => {

    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join("");
}


function onImagesContainerClick(evt) {

evt.preventDefault();


  const isGalleryImage = evt.target.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }

//   /*для открытия модального окна*/

  onOpenModalWindow();

  refs.lightboxImage.src = evt.target.dataset.source;
  refs.lightboxImage.alt = evt.target.alt;
  
  console.log(evt.target);

}

/*Модальное окно*/

const refs = {
  lightbox: document.querySelector(".js-lightbox"),
  closeModalWindow: document.querySelector('[data-action="close-lightbox"]'),
  lightboxImage: document.querySelector(".lightbox__image"),
}
 
refs.lightboxImage.addEventListener ("click", onOpenModalWindow);

function onOpenModalWindow () {
  
  window.addEventListener("keydown", onKeyPressEsc);
  refs.lightbox.classList.add("is-open");
}


refs.closeModalWindow.addEventListener("click", onCloseModalWindow);

function onCloseModalWindow() {
  window.removeEventListener("keydown", onKeyPressEsc);
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
  
}

/*Закрытие модального окна по клику на div.lightbox__overlay */

refs.lightbox.addEventListener("click", onModalWindowClick);

function onModalWindowClick(evt) {
  if (evt.target !== refs.lightboxImage) {
    onCloseModalWindow();
  }
}

/*Закрытие модального окна по нажатию клавиши ESC. */

function onKeyPressEsc (evt) {
  if (evt.code === "Escape") {
    onCloseModalWindow();
  }
}

/*Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */

window.addEventListener("keydown", flippingPictures);

const originImage = galleryItems.map((item) => item.original);


function flippingPictures(evt) {

  let index = originImage.indexOf(refs.lightboxImage.src);

  if(evt.code === "ArrowRight") {
    if (index < originImage.length - 1) {
      refs.lightboxImage.setAttribute("src", originImage[index + 1]);
    }
     else {
       index = -1;
       refs.lightboxImage.setAttribute("src", originImage[index + 1]);
     }
  }
  if (evt.code === "ArrowLeft") {
    if (index === 0) {
      index = originImage.length;
      refs.lightboxImage.setAttribute("src", originImage[index - 1]);
    } 
    else refs.lightboxImage.setAttribute("src", originImage[index - 1]);
  }
}