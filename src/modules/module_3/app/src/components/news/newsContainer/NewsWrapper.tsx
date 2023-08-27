import React, { useRef, useEffect } from 'react';
import { INews, NewsArticle } from '../newsArtcle/NewsArticle';
import defaultImage from '../../../assets/images/content/demo1 1.png';
import { flilterText } from '../../../utils';

export interface INewsWrapper {
    newsArray?: Array<INews>,
    scroll: number,
}


export const NewsWrapper: React.FC<INewsWrapper> = ({newsArray, scroll = 1069}) => {

    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    React.useEffect(()=> {
        inputRef.current?.scrollTo({
            top: 0,
            left: scroll,
            behavior: 'smooth',
        });
    });

    const newsToRender = newsArray?.map((element, index) => {
        const filteredTitle = flilterText(element.title);
        const filteredDesc = flilterText(element.description || '');
        return (
            <NewsArticle urlToImage={element.urlToImage} title={filteredTitle} description={filteredDesc} url={element.url} key={index}/>
        )
    })
    return (
        <div className="news__articles-wrapper" id="news__desktop-container" ref={inputRef}>
            {newsToRender}
        </div>
    )
}