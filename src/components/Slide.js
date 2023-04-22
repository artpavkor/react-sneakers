import React from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';




function Slide({ images }) {
    const options = {
        type: 'loop',
        gap: '1rem',
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        height: '17rem',
    };

    return (
        <div className="wrapper">
            <Splide
                options={options}
                aria-labelledby="autoplay-example-heading"
                hasTrack={false}
            >
                <div style={{ position: 'relative' }}>
                    <SplideTrack>
                        {images.map((slide, index) => {
                            return (
                                <SplideSlide key={index}>
                                    <img src={slide} alt={slide} />                                </SplideSlide>
                            )
                        })}
                    </SplideTrack>
                </div>
                <div className="splide__progress">
                    <div className="splide__progress__bar" />
                </div>
            </Splide>
        </div>
    );
}

export default Slide;