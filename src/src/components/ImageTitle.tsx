import React from 'react';

interface TitleProps {
    title: string;
}

function ImageTitle({ title }: TitleProps) {
    return (
        <h2>{title}</h2>
    )
}

export default ImageTitle;