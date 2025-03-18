"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({cart,  item }: {cart?: Cart, item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => { 
    const res = await addItemToCart(item);

    if (!res.success) {
      toast(res.message);
      return;
    }

    //Handle success add to cart 
    toast.success(`${item.name} added to cart`, {
        action: {
          label: "Go to Cart",
          onClick: () => {
            router.push('/cart')
          },
        },
        className: "bg-primary text-white hover:bg-gray-800",
      });
    })
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => { 
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

     if (!res.success) {
      toast(res.message);
      return;
    }
    
    toast.success(`${item.name} removed from cart`, {
        action: {
          label: "Go to Cart",
          onClick: () => {
            router.push('/cart')
          },
        },
        className: "bg-primary text-white hover:bg-gray-800",
      });

    return;
    })
  }

  // Check if item is in cart
  const existItem = cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}> 
        {isPending ? (<Loader className="w-4 h-4 animate-spin "/>) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}> 
        {isPending ? (<Loader className="w-4 h-4 animate-spin"  />) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ): (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (<Loader className="w-4 h-4 animate-spin"  />) : (
          <Plus className="h-4 w-4" />
        )} Add To Cart
    </Button>
  )
};


export default AddToCart;