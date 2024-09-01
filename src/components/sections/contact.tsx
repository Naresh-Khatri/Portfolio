"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <Link href={"#contact"}>
        <h2
          className={cn(
            "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
          )}
        >
          LET&apos;S WORK <br />
          TOGETHER
        </h2>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999]">
        <Card className="min-w-7xl dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-4xl">Contact Form</CardTitle>
            <CardDescription>
              Need to chat? Drop your info here, and I&apos;ll get back to you
              faster than you can swipe through TikTok. No cap, just real talk!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default ContactSection;
