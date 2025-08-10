import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import truckImage from '../../../../assets/image/truck_image.webp';
import quality from '../../../../assets/image/quality.png'
import easy from '../../../../assets/image/compressed_de63e363de5f8fff767022c627573224.webp'


const Carosel = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 30
        }
    };

    const carouselItems = [
        {
            id: 1,
            headline: "EasyShop - Your Shopping Destination",
            description: "Discover amazing products at unbeatable prices",
            image: easy
        },
        {
            id: 2,
            headline: "Quality Products",
            description: "Premium quality items for your daily needs",
            image: quality
        },
        {
            id: 3,
            headline: "Fast Delivery",
            description: "Quick and reliable shipping to your doorstep",
            image: truckImage
        },
    ];

    return (
        <div className="py-8">
            <Carousel
                responsive={responsive}
                autoPlay
                autoPlaySpeed={3000}
                infinite
                arrows
                showDots
                containerClass="container-with-dots"
                itemClass="px-2"
                pauseOnHover
            >
                {carouselItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={item.headline}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">{item.headline}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Carosel;