import React from 'react';
import NavBar from './Navbar/NavBar';
import Carosel from './Carosel/Carosel';
import Card from './Card/Card';
import ProductCard from './ProductCard/ProductCard';
import Category from './categeory/Category';
import Footer from './Footer/Footer';

const Home = () => {
    return (
        <div className=' '>
            <NavBar></NavBar>
            <Carosel></Carosel>
            <Card></Card>
            <Category></Category>
            <ProductCard></ProductCard>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;