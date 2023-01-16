import './style.css';
import fetchImages from './fetch-images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const endCollectionText = document.querySelector('.end-collection-text');


// const galleryFull = fetchImages.map(element => {
//     return `<li><img src=${element} alt=${element} width="100px" height="100px"></li>`;
// });
// const galleryString = galleryFull.join("");
// console.log(galleryString);

// const galleryMarkup = document.querySelector('.gallery');
// galleryMarkup.insertAdjacentHTML('afterbegin', galleryFull.join(""));


function renderCardImg(arr) {
    const markup = arr.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    }) => {
        return `<div class='photo-card'>
                    <a href='${largeImageURL}'>
                        <img src=${webformatURL}' alt='${tags}' loading='lazy' />
                    </a>
                    <div class='info'>
                        <p class='info-item'>
                             <b>Likes</b>
                                ${likes}
                        </p>
                        <p class='info-item'>
                            <b>Views</b>
                             ${views}
                        </p>
                        <p class='info-item'>
                             <b>Comments</b>
                                ${comments}
                        </p>
                        <p class='info-item'>
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                    </div>
                </div>`;
    }).join('');
    return markup;
}

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
    evt.preventDefault();
    searchQuery = evt.currentTarget.searchQuery.value;
    currentPage = 1;

    if (searchQuery === '') {
        return;
    }

    const response = await fetchImages(searchQuery, currentPage);
    currentHits = response.hits.length;

    if (response.totalHits > 40) {
        loadMoreBtn.classList.remove('is-hidden');
    } else {
        loadMoreBtn.classList.add('is-hidden');
    }

    try {
        if (response.totalHits > 0) {
            Notify.success(`Hooray! We found ${response.totalHits} images.`);
            gallery.innerHTML = '';
            renderCardImg(response.hits);
          
            endCollectionText.classList.add('is-hidden');
        }
        if (response.totalHits === 0) {
            gallery.innerHTML = '';
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.');
                loadMoreBtn.classList.add('is-hidden');
                endCollectionText.classList.add('is-hidden');
        }
    } catch (error) {
        console.log(error);
    }
}

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  currentPage += 1;
  const response = await fetchImages(searchQuery, currentPage);
  renderCardImg(response.hits);
  
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    endCollectionText.classList.remove('is-hidden');
  }
}

    


