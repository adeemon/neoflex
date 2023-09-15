import * as React from 'react';


export interface IImageFigured extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const ImageFigured: React.FC<IImageFigured> = ({ className, alt, src }) =>
  (
    <figure className={ className }>
      <img src={ src } alt={ alt } />
    </figure>
  );
