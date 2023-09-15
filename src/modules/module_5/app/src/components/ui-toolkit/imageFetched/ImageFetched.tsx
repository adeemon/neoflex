import * as React from 'react';
import { useState, useEffect } from 'react';

export interface IImageFigured extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src: string;
}

export const ImageFigured: React.FC<IImageFigured> = ({ alt, src }) => {
  const [img, setImg] = useState('');

  const fetchImage = async () => {
    const res = await fetch(src);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <ImageFigured src={ img } alt={ alt } />
  );
};
