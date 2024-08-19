"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import ContactForm from "../ContactForm";
const Contact = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 z-[9999]">
      {/* <h1 className="text-3xl font-bold">LET'S WORK TOGETHER</h1> */}
      <Card className="min-w-7xl dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
        <CardHeader>
          <CardTitle className="text-4xl">Contact Form</CardTitle>
          <CardDescription>
            Need to chat? Drop your info here, and I&apos;ll get back to you faster
            than you can swipe through TikTok. No cap, just real talk!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default Contact;
