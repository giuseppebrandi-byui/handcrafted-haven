// "use client";

import Link from "next/link";
import { deleteProduct } from "@/lib/actions/product.actions";
import { formatCurrency, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";
import { auth } from "@/auth";


type Product = {
  id: string;
  name: string;
  username: string;
  slug: string;
  category: string;
  brand: string;
  description: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  banner: string | null;
  createdAt: Date;
  numReviews: number;
  price: string;
  rating: string;
};

type ProductListProps = {
  products: {
    data: Product[];
    totalPages: number;
  }, page: number;
};

const ProductList: React.FC<ProductListProps> = async ({ products, page }) => {
  const session = await auth();
  return (
      <>
      <div className="space-y-2">
        <div className="flex-between">
          <div className="flex items-center gap-3">
            <h1 className="h2-bold">Products</h1>
            {/* {searchText && (
              <div>
                Filtered by <i>&quot;{ searchText }&quot;</i>
                <Link href="/admin/products">
                  <Button variant="outline" size="sm">Remove Filter</Button>
                </Link>
              </div>
            )} */}
          </div>
          {session!.user.role === "admin" &&  <Button asChild variant="default">
            <Link href="/admin/products/create">
            Create Product
            </Link>
          </Button>}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-1">

                  {session!.user.role === "admin" && 
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  </Button>}
                  
                  {session!.user.role === "artisan" && 
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/user/products/${product.id}`}>Edit</Link>
                  </Button>}
                  
                  <DeleteDialog id={product.id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* {products?.totalPages && products.totalPages > 1 && ( */}
        {products.totalPages > 1 && (
          <Pagination page={page} totalPages={products.totalPages} />
        )}
      </div>
    </>
  )
}
 
export default ProductList;