import React, { useState } from 'react';
import Slider from 'react-slick';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CardCarousel = ({ cards, customStyles = {} }) => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3, // Adjust this to control the number of cards visible
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Adjust breakpoint for smaller screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative py-6">
      <Slider ref={sliderRef} {...settings}>
        {cards.map((card, index) => (
          <CustomCard
            key={index}
            card={card}
            index={index}
            activeIndex={activeIndex}
            customStyles={customStyles}
            onClick={() => handleClick(index)}
          />
        ))}
      </Slider>

      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 transform justify-between px-4">
        <button
          onClick={handlePrev}
          className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-600"
          aria-label="Previous Slide"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={handleNext}
          className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-600"
          aria-label="Next Slide"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

const CustomCard = ({ card, index, activeIndex, customStyles, onClick }) => {
  const isActive = index === activeIndex;
  const isHovered = index === activeIndex || index === activeIndex + 1;

  return (
    <div className="overflow-hidden rounded-lg border shadow-lg">
      <img src={card.image} alt={card.title} className="rounded-md mb-2" />
      <h3 className={`mb-4 ml-4 text-xl font-semibold ${customStyles.title}`}>
        {card.title}
      </h3>
      <p className={`mb-4 ml-4 text-gray-600 ${customStyles.description}`}>
        {card.description}
      </p>
      
      <div className="button-container"> {/* Container for spacing */}
        <button className={`rounded ml-4 mb-4 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 ${customStyles.button}`}>
          Sewa Sekarang
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;