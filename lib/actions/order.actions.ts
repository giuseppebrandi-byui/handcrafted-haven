'use server'

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { CartItem } from "@/types";
import { prisma } from "@/db/prisma";
import {PAGE_SIZE} from '../constants';
import {Prisma} from '@prisma/client'
import { revalidatePath } from "next/cache";

//Create order and create the order items

export async function createOrder () {
    try {

        const session = await auth();
        if (!session) throw new Error('User is not authenticated');

        const cart = await getMyCart()
        const userId = await session?.user?.id;

        if (!userId) throw new Error('User not found')

        const user = await getUserById(userId)

        if(!cart || cart.items.length === 0) {
            return {success: false, message: 'Your cart is empty', redirectTo: '/cart'}
        }

        if (!user.address) {
            return {success: false, message: 'No shipping address', redirectTo: '/shipping-address'}
        }

        if(!user.paymentMethod) {
            return {success: false, message: 'No payment method', redirectTo: '/payment-method'}
        }

        //Create the order object

        const order = insertOrderSchema.parse({ 
            userId : user.id,
            shippingAddress: user.address,
            paymentMethod: user.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        })

        //Create a transaction to create order and order items in database

       const insertedOrderId = await prisma.$transaction(async (tx) => {
            //create order
            const insertedOrder = await tx.order.create({data: order})
            // crate order items from the cart items
            for(const item of cart.items as CartItem[]) {
                await tx.orderItem.create({
                    data: {
                        ...item, 
                        price: item.price,
                        orderId: insertedOrder.id
                    }
                })
            }

            //Clear cart
            await tx.cart.update ({
                where: {id: cart.id},
                data: {
                    items: [],
                    totalPrice: 0,
                    taxPrice: 0,
                    itemsPrice: 0,
                }
            })
         return insertedOrder.id;
        } )

    if(!insertedOrderId)  throw new Error('Order not created')
        
    
    return {success: true, message: 'Order created', redirectTo: `/order/${insertedOrderId}`}


        
    } catch (error) {

        if (isRedirectError(error)) throw error;
        return {success: false, message: formatError(error)}


    }
}

//Get order by id

export async function getOrderById(orderId: string) {
    const data = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        include: {
            orderitems: true,
            user: {select: {name: true, email: true}},
        }
    })

    return convertToPlainObject(data)
}
//Get usersr orders
export async function getMyOrders({
    limit = PAGE_SIZE,
    page
}: {
    limit?: number;
    page: number;
} ) {
    const session = await auth();
    if (!session) throw new Error('User is not authorized')
    
    const data = await prisma.order.findMany({
        where: {userId: session?.user?.id},
        orderBy: {createdAt: 'desc'},
        take: limit,
        skip: (page -1) * limit
    });

    const dataCount = await prisma.order.count({
        where: {userId: session?.user?.id}
    });
    return{
        data,
        totalPages: Math.ceil(dataCount / limit),
    };
}




type SalesDataType = {
    month: string;
    totalSales: number;
}[];

// Get sales data and order summary 
export async function getOrderSummary(){
    // Get accounts for each resource 
    const ordersCount = await prisma.order.count();
    const productsCount = await prisma.order.count();
    const usersCount = await prisma.order.count();
    // Calculate total Sales 
    const totalSales = await prisma.order.aggregate({
        _sum: {totalPrice: true,}
    });
    // Get monthly sales 
    const salesDataRaw = await prisma.$queryRaw<Array<{month: string; totalSales: Prisma.Decimal }>
    >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" 
    FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;
    const salesData:SalesDataType = salesDataRaw.map((entry) => ({
        month: entry.month,
        totalSales: Number(entry.totalSales),
    }));

    // Get latest orders 
    const latestSales = await prisma.order.findMany({
        orderBy: {createdAt: 'desc'},
        include:{
            user: {select: {name:true}},
        },
        take: 6,
    });
    return{
        ordersCount,
        productsCount,
        usersCount,
        totalSales,
        latestSales,
        salesData
    };
}

export async function getAllOrders({
    limit = PAGE_SIZE, page ,
}:{
    limit?:number;
    page: number;
}) {
    const data = await prisma.order.findMany({
        orderBy: {createdAt: 'desc'},
        take: limit,
        skip: (page -1 ) * limit,
        include: {user: {select: {name:true}}}, 
    });

    const dataCount = await prisma.order.count();

    return{
        data,
        totalPages : Math.ceil(dataCount / limit),
    };
}

export async function deleteOrder(id: string){
    try{
        await prisma.order.delete({where:{id}});
        revalidatePath('/admin/orders')
        return{
            sucess: true, 
            message: 'Order deleted Successfully'
        }
    } catch(error){
        return {success: false, message: formatError(error)}
    }
}



