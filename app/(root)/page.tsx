import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts, getFeaturedProducts } from "@/lib/actions/product.actions";
import DealCountdown from "@/components/deal-countdown";
import ProductCarousel from "@/components/shared/product/product-carousel";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
      <ProductList data={latestProducts} title="Latest Products" limit={4} />
      <DealCountdown />
    </>
  );
}
 
export default Homepage;