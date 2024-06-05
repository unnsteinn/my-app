'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';

export default function ThanksForOrdering() {
    const router = useRouter();

    const handleBackToHomepage = () => {
        router.push('/');
    };

    const handleBookATable = () => {
        router.push('/my-booking');
    };

    return (
        <div className="flex justify-center">
            <Card className="p-2 w-full lg:w-1/2">
                <CardTitle className="flex justify-center p-10">
                    We look forward to see you!
                </CardTitle>
                <CardFooter className="flex justify-evenly">
                    <Button variant="secondary" onClick={handleBackToHomepage}>
                        Back to Homepage
                    </Button>
                    <Button variant="secondary" onClick={handleBookATable}>
                        Find my bookings
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
