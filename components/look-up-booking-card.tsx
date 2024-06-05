'use client';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

type Booking = {
    id: string;
    dob: string;
    time: string;
    name: string;
    email: string;
    guests: number;
};

export default function LookupBookingCard() {
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState<Booking[]>([]);

    const handleLookup = async () => {
        if (!email) {
            toast({
                title: 'Invalid Email',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">Please enter a valid email address.</code>
                    </pre>
                ),
            });
            return;
        }

        try {
            console.log(`Looking up bookings for email: ${email}`);
            const response = await axios.get<Booking[]>(`/api/bookings?email=${email}`);
            console.log(`API response data:`, response.data);

            if (response.data.length === 0) {
                toast({
                    title: 'No Bookings Found',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                No bookings found for the provided email.
                            </code>
                        </pre>
                    ),
                });
            } else {
                setBookings(response.data);
            }
        } catch (error: any) {
            console.error('Error fetching bookings:', error);
            toast({
                title: 'Lookup Failed',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {error.response?.data.message || error.message}
                        </code>
                    </pre>
                ),
            });
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="w-full p-4 lg:w-1/2">
                <CardTitle className="flex justify-center mt-4 mb-4">Your Bookings</CardTitle>
                <CardContent className="flex justify-center">
                    <div>
                        <div>
                            {bookings.map((booking) => (
                                <div key={booking.id}>
                                    <h4 className="flex gap-2 pb-2 font-bold">
                                        Date: <p className="font-normal">{booking.dob}</p>
                                    </h4>
                                    <h4 className="flex gap-2 pb-2 font-bold">
                                        Time:<p className="font-normal"> {booking.time}</p>
                                    </h4>
                                    <h4 className="flex gap-2 pb-2 font-bold">
                                        Name: <p className="font-normal">{booking.name}</p>
                                    </h4>
                                    <h4 className="flex gap-2 pb-2 font-bold">
                                        Email: <p className="font-normal">{booking.email}</p>
                                    </h4>
                                    <h4 className="flex gap-2 pb-2 font-bold">
                                        Guests: <p className="font-normal">{booking.guests}</p>
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-evenly">
                    <Input
                        className="w-48 text-black"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <Button variant="secondary" onClick={handleLookup}>
                        Look Up Bookings
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
