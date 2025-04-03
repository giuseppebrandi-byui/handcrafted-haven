"use client";
// import { toast } from "sonner";
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from 'react-hook-form';
// import { SubmitHandler } from 'react-hook-form';
import { z } from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// import { Textarea } from '../ui/textarea';
// import { createProduct, updateProduct } from '@/lib/actions/product.actions';
// import { UploadButton } from '@/lib/uploadthing';
// import { Card, CardContent } from '../ui/card';
// import Image from 'next/image';
// import { Checkbox } from '../ui/checkbox';


const ProductForm = ({
  type,
  product,
  // productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  //const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  return <Form {...form}>
    <form className="space-y-8">
      <div className='flex flex-col md:flex-row gap-5'>
          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'name'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name='slug'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'slug'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input placeholder='Enter slug' {...field} />
                    <Button
                      type='button'
                      className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
                      onClick={() => {
                        form.setValue(
                          'slug',
                          slugify(form.getValues('name'), { lower: true })
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

      <div className="flex flex-col md:flex-row gap-5">
        { /*Category*/}
        
        { /*Brand*/ }
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        { /*Price*/ }
        { /*Stock*/ }
      </div>

      <div className="upload-field flex flex-col md:flex-row gap-5">
        { /*Images*/ }
      </div>
      <div className="upload-field">
        { /*isFeatured*/ }
      </div>
      <div>
        { /*Description*/ }
      </div>
      <div>
        { /*Submit*/ }
      </div>
    </form>
  </Form>;
}
 
export default ProductForm;