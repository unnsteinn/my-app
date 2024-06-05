// pages/api/bookings/route.tsx

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

type Booking = {
    id: string;
    dob: string;
    time: string;
    name: string;
    email: string;
    guests: number;
};

export const bookings: Record<string, Booking> = {};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json(
                { message: 'Bad request: Request body is missing or empty' },
                { status: 400 }
            );
        }

        const { dob, time, name, email, guests } = body;

        if (!dob || !time || !name || !email || !guests) {
            return NextResponse.json(
                { message: 'Bad request: dob, time, name, email, and guests are required' },
                { status: 400 }
            );
        }

        const bookingId = uuidv4();
        const newBooking = {
            id: bookingId,
            dob,
            time,
            name,
            email,
            guests,
        };

        bookings[bookingId] = newBooking;

        return NextResponse.json(newBooking, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { message: 'Bad request: email is required' },
                { status: 400 }
            );
        }

        const userBookings = Object.values(bookings).filter((booking) => booking.email === email);

        return NextResponse.json(userBookings, { status: 200 });
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: (error as Error).message },
            { status: 500 }
        );
    }
}
