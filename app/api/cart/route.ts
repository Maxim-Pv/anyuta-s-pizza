import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "@/shared/lib/calc-cart-item-total-price";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json({ message: "Не удалось получить корзину" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const data = (await req.json()) as CreateCartItemValues;
    const ingredientsIds = Array.isArray(data.ingredients) ? data.ingredients : [];
    console.time("POST /api/cart");

    const includeCart = {
      items: {
        orderBy: { createdAt: "desc" as const },
        include: {
          productItem: {
            include: { product: true },
          },
          ingredients: true,
        },
      },
    };

    const result = await prisma.$transaction(async (tx) => {
      // Ищем корзину по токену (token не уникальный в схеме)
      const existingCart = await tx.cart.findFirst({ where: { token } });
      const cart = existingCart ?? (await tx.cart.create({ data: { token } }));

      // Ищем совпадающий товар по productItemId и набору ингредиентов
      const sameProductItems = await tx.cartItem.findMany({
        where: {
          cartId: cart.id,
          productItemId: data.productItemId,
        },
        include: { ingredients: { select: { id: true } } },
      });

      const normalizeIds = (arr: Array<{ id: number } | number>) => {
        const ids = Array.isArray(arr) ? arr : [];
        return new Set(ids.map((item) => (typeof item === "number" ? item : item.id)));
      };

      const desired = normalizeIds(ingredientsIds);
      const findCartItem = sameProductItems.find((item) => {
        const current = normalizeIds(item.ingredients);
        if (current.size !== desired.size) return false;
        for (const id of desired) {
          if (!current.has(id)) return false;
        }
        return true;
      });

      if (findCartItem) {
        await tx.cartItem.update({
          where: { id: findCartItem.id },
          data: { quantity: { increment: 1 } },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productItemId: data.productItemId,
            quantity: 1,
            ...(ingredientsIds.length
              ? {
                  ingredients: { connect: ingredientsIds.map((id) => ({ id })) },
                }
              : {}),
          },
        });
      }

      // Получаем обновленную корзину и считаем totalAmount без дополнительного запроса
      const cartWithItems = await tx.cart.findUniqueOrThrow({
        where: { id: cart.id },
        include: includeCart,
      });

      const totalAmount = cartWithItems.items.reduce((sum, item) => sum + calcCartItemTotalPrice(item), 0);

      await tx.cart.update({
        where: { id: cart.id },
        data: { totalAmount },
      });

      // Возвращаем корзину с актуальным totalAmount и items
      return await tx.cart.findUniqueOrThrow({
        where: { id: cart.id },
        include: includeCart,
      });
    });

    const resp = NextResponse.json(result);
    resp.cookies.set("cartToken", token);

    console.timeEnd("POST /api/cart");

    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500 });
  }
}
