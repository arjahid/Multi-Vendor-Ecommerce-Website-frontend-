import React from "react";
import NavBar from "./Navbar/NavBar";
import Carosel from "./Carosel/Carosel";
import Card from "./Card/Card";
import ProductCard from "./ProductCard/ProductCard";
import Category from "./categeory/Category";
import Footer from "./Footer/Footer";
import { Helmet } from "react-helmet-async";
import RecommendationSection from "../../Recomandation";
import Testimonials from "../../TestoMonial";
import BlogSection from "../../Blog";

const Home = () => {
  return (
    <div className="space-y-6">
  <NavBar />
  <Carosel className="py-8" />
  <div className="px-4 sm:px-8 md:px-16">
    <Card />
  </div>
  <div className="px-4 sm:px-8 md:px-16">
    <Category />
  </div>
  <RecommendationSection />
  <div className="px-4 sm:px-8 ">
    <ProductCard />
  </div>
  <Testimonials></Testimonials>
  <BlogSection></BlogSection>
  <Footer />
</div>

  );
};

export default Home;
