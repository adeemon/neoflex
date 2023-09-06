import * as React from 'react';

export interface ITitleDescTextBlockProps {
  title: string;
  desc: string;
}

export const TitleDescTextBlock: React.FC<ITitleDescTextBlockProps> = ({
  title,
  desc,
}) =>
(
  <div className="title-desc">
    <p className="title-desc__title">{ title }</p>
    <p className="title-desc__desc">{ desc }</p>
  </div>
);
