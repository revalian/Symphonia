import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Mengimpor ikon panah
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Mengimpor FontAwesomeIcon
import { useRef } from 'react';
import Slider from 'react-slick'; // Mengimpor react-slick untuk carousel
import 'slick-carousel/slick/slick-theme.css'; // Mengimpor CSS dari slick-carousel
import 'slick-carousel/slick/slick.css';

const CardItem = ({ image, title, description }) => {
    return (
        <div className="overflow-hidden rounded-lg border shadow-lg">
            {/* Gambar dengan ukuran yang proporsional */}
            <img src={image} alt={title} className="h-60 w-full object-cover" />
            <div className="p-4">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">{title}</h2>
                <p className="mb-4 text-gray-600">{description}</p>
                <div className="flex items-center justify-between">
                    <button className="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-orange-600 hover:shadow-lg">
                        Sewa Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
};

const CardItemCarousel = ({ cards }) => {
    const sliderRef = useRef(null); // Menggunakan useRef untuk mengakses slider

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Jumlah card yang ditampilkan dalam satu slide
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Fungsi untuk menggerakkan slider ke depan
    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    // Fungsi untuk menggerakkan slider ke belakang
    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <div className="relative py-6">
            <Slider ref={sliderRef} {...settings}>
                {cards.map((card, index) => (
                    <div key={index}>
                        <CardItem image={card.image} title={card.title} description={card.description} />
                    </div>
                ))}
            </Slider>

            {/* Tombol navigasi dengan ikon panah */}
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

export default CardItemCarousel;
