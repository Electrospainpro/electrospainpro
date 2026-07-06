import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedComparisons from "@/components/home/FeaturedComparisons";
import Brands from "@/components/home/Brands";
import Advantages from "@/components/home/Advantages";
import SearchBar from "@/components/home/SearchBar";
export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <Categories />
      <FeaturedProducts />
      <FeaturedComparisons />
      <Brands />
      <Advantages />
    </main>
  );
}