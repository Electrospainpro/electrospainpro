import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedComparisons from "@/components/home/FeaturedComparisons";

import LatestComparisons from "@/components/home/LatestComparisons";
import LatestGuides from "@/components/home/LatestGuides";
import FeaturedTools from "@/components/home/FeaturedTools";
import FeaturedBrands from "@/components/home/FeaturedBrands";

import Brands from "@/components/home/Brands";
import Advantages from "@/components/home/Advantages";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />

      <SearchBar />

      <Categories />

      <FeaturedProducts />

      <FeaturedComparisons />

      <LatestComparisons />

      <LatestGuides />

      <FeaturedTools />

      <FeaturedBrands />

      <Brands />

      <Advantages />

      <Newsletter />
    </main>
  );
}