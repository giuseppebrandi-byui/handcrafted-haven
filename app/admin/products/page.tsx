import { getAllProducts} from "@/lib/actions/product.actions";
import { requireAdmin } from "@/lib/auth-guard";
import ProductList from "@/components/admin/product-list";

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>
}) => {
  await requireAdmin();
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    query: searchText,
    page,
    category
  });


  return (
    <ProductList products={products} page={page} />
  );
}
 
export default AdminProductsPage;