import CalendarForm from '@/components/booking-form';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

export default function Booking() {
    return (
        <main className="flex justify-center">
            <Card>
                <CardContent className="p-10">
                    <CalendarForm />
                </CardContent>
            </Card>
        </main>
    );
}
