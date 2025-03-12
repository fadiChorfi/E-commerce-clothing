"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Subscribe to get special offers, free giveaways, and
          once-in-a-lifetime deals.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-1"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
