import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import DealCountdown from "@/components/deal-countdown";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title="Latest Products" limit={4} />
      <DealCountdown />
    </>
  );
}
 
export default Homepage;