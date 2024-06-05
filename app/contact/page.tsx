import { Card, CardContent, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function Contact() {
    return (
        <div className="flex justify-center">
            <Card className="flex-col p-10 w-full md:w-2/3 lg:w-1/2">
                <CardTitle className="flex justify-center pb-10">Contact Lil Bits</CardTitle>
                <CardContent>
                    <h4 className="pb-4">Operating Hours: 16:00 - 22:00</h4>
                    <h4 className="pb-4">Phone: +1 800 LIL BITS</h4>
                    <h4>Email: lilbits@lilbits.com</h4>
                </CardContent>
            </Card>
        </div>
    );
}
