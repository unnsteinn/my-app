import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/app/api/order/route';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const order = Object.values(orders).find((order) => order[params.id]);
    if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
}
