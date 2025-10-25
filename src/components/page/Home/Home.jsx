import React from 'react';
import NavBar from './Navbar/NavBar';
import Carosel from './Carosel/Carosel';
import Card from './Card/Card';
import ProductCard from './ProductCard/ProductCard';
import Category from './categeory/Category';
import Footer from './Footer/Footer';
import { Helmet } from 'react-helmet-async';
import RecommendationSection from '../../Recomandation';


const Home = () => {
    return (
        <div className=' '>
            <Helmet>
                <title>Home | E-Commerce Website</title>
                <meta name="description" content="Welcome to our E-Commerce website. Explore a wide range of products and enjoy a seamless shopping experience." />
            </Helmet>
            <NavBar></NavBar>
            <Carosel></Carosel>
            <Card></Card>
         
            <Category></Category>
               <RecommendationSection></RecommendationSection>
            
            <ProductCard></ProductCard>
            
            <Footer></Footer>
            
        </div>
    );
};

export default Home;