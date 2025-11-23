import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-temapltes/order-success";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";
    const nextStatus = isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED;

    // Если статус уже был обработан раньше, просто подтверждаем получение, чтобы не слать письма повторно
    if (order.status === nextStatus) {
      return NextResponse.json({ ok: true });
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: nextStatus,
      },
    });

    // items хранится в JSON-колонке. Поддержим и старые записи, где лежит строка.
    const items = Array.isArray(order.items)
      ? (order.items as unknown as CartItemDTO[])
      : (JSON.parse(String(order.items)) as CartItemDTO[]);

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Next Pizza / Ваш заказ успешно оформлен 🎉",
        createElement(OrderSuccessTemplate, { orderId: order.id, items })
      );
    } else {
      // Письмо о неуспешной оплате
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("[Checkout Callback] Error:", error);
    return NextResponse.json({ error: "Server error" });
  }
}
