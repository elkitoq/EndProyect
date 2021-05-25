import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';


const items = [
    {
        src: '/assets/busca.png',
        altText: 'Busca',
        caption: 'Busca',
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, cupiditate earum!'
    },
    {
        src: '/assets/postulate.png',
        altText: 'Postulate',
        caption: 'Postulate',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, sequi corrupti.'
    },
    {
        src: '/assets/trabaja.png',
        altText: 'Comenza a trabajar',
        caption: 'Comienza a trabajar',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, sequi corrupti.'
    }
];

export const SlideShow = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img className="img-carousel" src={item.src} alt={item.altText} />
                <CarouselCaption className="caption-carousel" captionText={item.text} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText=" " onClickHandler={previous} />
            <CarouselControl direction="next" directionText=" " onClickHandler={next} />
        </Carousel>
    );
}


