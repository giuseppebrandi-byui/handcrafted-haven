import {getProductsByUsername, getStoriesByUsername} from "@/lib/actions/product.actions";
// import { notFound } from "next/navigation";
import ProductList from "@/components/shared/product/product-list";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>
}) => {
  const {slug} = await props.params;

  const products = await getProductsByUsername(slug);
  const blogs = await getStoriesByUsername(slug);

  return <>
    <section>
      <ProductList data={products} title={slug + "'s products"} limit={4}/>
      {blogs.length>0  &&
          <>
      <h2 className="h2-bold mb-4">stories</h2>

      <div style={{overflowX: "auto", padding: "20px"}}>
        <table style={{width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif"}}>
          <thead>
          <tr style={{backgroundColor: "#f4f4f4"}}>
            <th style={{border: "1px solid #ddd", padding: "10px", textAlign: "left"}}>Title</th>
            <th style={{border: "1px solid #ddd", padding: "10px", textAlign: "left"}}>Date</th>
            <th style={{border: "1px solid #ddd", padding: "10px", textAlign: "left"}}>Content</th>
          </tr>
          </thead>
          <tbody>
          {blogs.map((blog, index) => (
              <tr key={index}>
                <td style={{border: "1px solid #ddd", padding: "10px"}}>{blog.title}</td>
                <td style={{border: "1px solid #ddd", padding: "10px"}}>{blog.date.toString()}</td>
                <td style={{border: "1px solid #ddd", padding: "10px"}}>{blog.content}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
          </>}
    </section>
  </>;
};

export default ProductDetailsPage;