import * as React from 'react';
import {useState, useEffect} from 'react';
import { INews, NewsArticle } from './newsArtcle/NewsArticle';
import defaultImage from '../../assets/images/content/demo1 1.png';
import PreviousIcon from '../../assets/images/design/Transfer_long_left_light.svg'
import NextIcon from '../../assets/images/design/Transfer_long_left_right.svg'
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';
import { NewsWrapper } from './newsContainer/NewsWrapper';
import { fetchNews } from '../../api';

const scrollStep = 100;

const newsTestState = [{urlToImage: defaultImage, title: 'Ethereum just pulled off its final test run ahead of one of the most important events in crypto - CN', 
desciption: 'Ethereum is moving closer to adopting a proof-of-stake model for its network, which is less energy i', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}];

export const News: React.FC = () => {

    const [scroll, setScroll] = useState(0);
    const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    let wrapperElement = document.querySelector('#news__desktop-container');
    const [maxWidth, setMaxWidth] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);
    const [isStart, setIsStart] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [newsArray, setNewsArray] = React.useState<Array<INews>>(newsTestState)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        if(wrapperElement && maxWidth == 0) {
            setMaxWidth(wrapperElement.scrollWidth - scrollStep);
            setClientWidth(wrapperElement?.clientWidth);
        }
        if (scroll === 0){
            setIsStart(true);
        } else {
            setIsStart(false);
        }
        if (scroll + scrollStep >= maxWidth && maxWidth > 0) {
            setIsEnd(true);
        } else {
            setIsEnd(false)
        }
    },[scroll])

    useEffect(()=>{
        if(wrapperElement) {
            setMaxWidth(wrapperElement.scrollWidth - scrollStep)
        }
    },[isStart, isEnd])

    const onPrevious = () => {
        if (isEnd) {
            setScroll(maxWidth - clientWidth - scrollStep);
        } else {
            const previousStep = scroll-scrollStep;
            setScroll(previousStep < 0 ? 0 : previousStep);
        }
    }

    useEffect(()=>{
        async function getNewsFromApi() {
            let output: Array<INews> = [];
            let result = await fetchNews();
            result.articles.forEach((element: INews) => {
                let title = element.title;
                let description = element.description;
                let urlToImage = element.urlToImage;
                let url = element.url;
                output.push({title: title, description: description, urlToImage: urlToImage, url: url});
            });
            setNewsArray(output);
            setIsLoaded(true);
        }
        getNewsFromApi();
    },[]);

    const onNext = () => {
        const nextStep = scroll+scrollStep;
        if (isStart) {
            setScroll(scrollStep)
        } else {
            setScroll(nextStep >= maxWidth - clientWidth - scrollStep ? maxWidth : nextStep);
        }
    }



    return (
        <section className="news">
            {isLoaded ? <NewsWrapper scroll={scroll} newsArray={newsArray}/> : ''}
            <div className="news__buttons">
                <ButtonMain className={`news__button`} onClick={onPrevious} isDisabled={isStart}>
                    <figure className="news__button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none" aria-label="Previous news">
                            <path d="M25 17H9.84211V24.3914C9.84211 24.5845 9.59562 24.6655 9.48109 24.5101L1 13L9.48109 1.48994C9.59562 1.33452 9.84211 1.41552 9.84211 1.60858V9H25" />
                        </svg>
                    </figure>
                </ButtonMain>
                <ButtonMain className={`news__button`} onClick={onNext} isDisabled={isEnd}>
                    <figure className="news__button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none" aria-label="Next news">
                            <path d="M0 9H15.1579V1.60858C15.1579 1.41552 15.4044 1.33452 15.5189 1.48994L24 13L15.5189 24.5101C15.4044 24.6655 15.1579 24.5845 15.1579 24.3914V17H0" />
                        </svg>
                    </figure>
                </ButtonMain>
            </div>
        </section>
    )
}