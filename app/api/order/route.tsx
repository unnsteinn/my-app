import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { OrderItem } from '@/lib/utils';

type OrderRequestBody = {
    email: string;
    items: OrderItem[];
    date: Date;
};

export const orders: Record<string, Record<string, OrderRequestBody>> = {};

export async function POST(req: NextRequest) {
    try {
        const body: OrderRequestBody = await req.json();
        const { email, items, date } = body;

        if (!email || !items || !date) {
            return NextResponse.json(
                { message: 'Bad request: email, items, and date are required' },
                { status: 400 }
            );
        }

        orders[email] = { ...orders[email], [uuid()]: body };

        return NextResponse.json(orders[email], { status: 200 });
    } catch (error) {
        console.error('Error storing order:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        if (!email) {
            return NextResponse.json(
                { message: 'Bad request: email is required' },
                { status: 400 }
            );
        }

        return NextResponse.json(orders[email] ?? {}, { status: 200 });
    } catch (error) {
        console.error('Error storing order:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: (error as Error).message },
            { status: 500 }
        );
    }
}
