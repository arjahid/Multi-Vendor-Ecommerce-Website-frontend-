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
            partialVisibilityGutter: 20
        }
    };

    const carouselItems = [
        {
            id: 1,
            headline: "Welcome to EasyShop",
            subtitle: "Your Ultimate Shopping Destination",
            description: "Discover amazing products at unbeatable prices with fast delivery",
            image: easy,
            bgColor: "from-blue-600 to-purple-700",
            buttonText: "Shop Now"
        },
        {
            id: 2,
            headline: "Premium Quality",
            subtitle: "Excellence You Can Trust",
            description: "Handpicked products from trusted brands with guaranteed satisfaction and warranty",
            image: quality,
            bgColor: "from-emerald-600 to-green-700",
            buttonText: "View Collection"
        },
        {
            id: 3,
            headline: "Fast & Free Delivery",
            subtitle: "Right to Your Doorstep",
            description: "Quick and reliable shipping with real-time tracking",
            image: truckImage,
            bgColor: "from-orange-600 to-red-700",
            buttonText: "Track Order"
        },
    ];

    return (
        <div className="relative overflow-hidden mt-2">
            <Carousel
                responsive={responsive}
                autoPlay
                autoPlaySpeed={5000}
                infinite
                arrows={true}
                showDots={false}
                containerClass="carousel-container"
                itemClass="carousel-item px-2"
                pauseOnHover
            >
                {carouselItems.map(item => (
                    <div key={item.id} className={`h-96 bg-gradient-to-r ${item.bgColor} overflow-hidden rounded-2xl shadow-lg`}>
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
                        </div>
                        
                        <div className="container mx-auto px-4 h-full flex items-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
                                {/* Text Content */}
                                <div className="text-white z-10 space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-sm md:text-base font-medium opacity-90 tracking-wider uppercase">
                                            {item.subtitle}
                                        </p>
                                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                            {item.headline}
                                        </h1>
                                    </div>
                                    
                                    <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-md">
                                        {item.description}
                                    </p>
                                    
                                    <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        {item.buttonText} &rarr;
                                    </button>
                                </div>
                                
                                {/* Image */}
                                <div className="relative flex justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-white rounded-3xl opacity-20 transform rotate-6"></div>
                                        <img 
                                            src={item.image} 
                                            alt={item.headline}
                                            className="relative w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            
            <style jsx>{`
                .custom-dot-list {
                    bottom: 30px !important;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

// Custom Dot Component
const CustomDot = ({ onClick, active }) => (
    <button
        className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
            active ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
        }`}
        onClick={() => onClick()}
    />
);

export default Carosel;