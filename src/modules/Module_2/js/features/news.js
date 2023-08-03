import { fetchNews } from "../api";
import { GigachadSlider } from "../libs/gigachadSlider";
import { flilterText, preloadImage } from "../utils";

export async function newsHandler(amountOfNews) {
    const nextButtonId = '#news__next';
    const previousButtonID = '#news__previous';
    const articlesWrapperId = '#news__desktop-container';
    const slider = new GigachadSlider(await getNewsHTMLArray(amountOfNews), getAmountRenderedNews(), previousButtonID, nextButtonId, articlesWrapperId);
    slider.render();
    window.onresize = (() => {
        slider.setNewAmountToShow(getAmountRenderedNews());
        slider.render();
    });
}


export function getNewsFromNewsFetch(newsFetchResult) {
    let result = [];
    newsFetchResult.forEach((element) => {
        let news = {
            urlToImage: element.urlToImage,
            title: element.title,
            url: element.url,
            description: element.description,
        }
        result.push(news);
    })
    return result;
}

export async function getNewsHTMLArray(amountOfNews) {
    let fetchedNews = await fetchNews(amountOfNews);
    preloadNewsImages(fetchedNews.articles);
    let output = getNewsFromNewsFetch(fetchedNews.articles);
    output = output.map((element) => mapNewsToHTMLItem(element));
    return output;
}

export function mapNewsToHTMLItem(news) {
    const filteredTitle = flilterText(news.title);
    const filteredDescription = flilterText(news.description)
    let output = `
    <a href="${news.url}" target="_blank"
        <artice class="news-article">
            <figure class="news-article__image">
                <img src="${news.urlToImage}" alt="${news.title} image">
            </figure>
            <p class="news-article__title">${filteredTitle}</p>
            <p class="news-article__body">${filteredDescription}</p>
        </artice>
    </a>`
    return output;
}

export function getNewsArray(arrayToRender) {
    try {
        const newsContainer = document.querySelector('#news__desktop-container');
        newsContainer.innerHTML = arrayToRender;
    } catch {
        console.error('Ошибка в отрисовке новостей')
    }
}

export function getAmountRenderedNews() {
    const mobileWidth = 500;
    const tabletWidth = 920;
    const desktopWidth = 1300;
    const currentSize = window.screen.width;
    if (currentSize <= mobileWidth) {
        return 1;
    } else if (currentSize > tabletWidth) {
        return 4;
    } else if (currentSize > desktopWidth) {
        return 6;
    }
    return 2
}

export async function preloadNewsImages(newsArray) {
    let arrayToPreload = await newsArray;
    arrayToPreload.forEach((news) => {
        news.urlToImage && preloadImage(news.urlToImage);
    })
}