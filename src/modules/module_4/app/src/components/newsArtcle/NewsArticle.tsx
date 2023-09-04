import * as React from 'react';
import defaultImage from '../../assets/images/content/demo1 1.png';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';


export interface INews {
    urlToImage: string;
    title: string;
    description?: string;
    url: string;
}

export const NewsArticle: React.FC<INews> = ({ urlToImage, title, description, url }) => (
    <a rel="noreferrer" href={url} target="_blank">
        <article className="news-article">
            <ImageFigured src={urlToImage?.length > 1 ? urlToImage : defaultImage} className="news-article__image" />
            <p className="news-article__title">{title}</p>
            <p className="news-article__body">{description}</p>
        </article>
    </a>
);
