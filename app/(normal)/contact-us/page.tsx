"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function Page() {
    return (
        <div className=" py-16 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                {/* Contact Info */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
                    <p className="text-gray-600">
                        Planning your next adventure? Get in touch with us for customized tour
                        packages, bookings, and travel assistance.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Phone className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-gray-700">+91 98765 43210</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-gray-700">info@travelworld.com</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-gray-700">Mumbai, India</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Send a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input placeholder="Enter first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input placeholder="Enter last name" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input type="email" placeholder="Enter email" />
                            </div>

                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Input placeholder="Enter subject" />
                            </div>

                            <div className="space-y-2">
                                <label>Message</label>
                                <Textarea placeholder="Write your message..." rows={5} />
                            </div>

                            <Button className="w-full ">Submit</Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
