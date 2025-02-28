"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";


import { ALGERIA_WILAYAS, DELIVERY_METHODS } from "./constants";

type CheckoutFormProps = {
  onSubmit: (data: any) => void;
  onBack: () => void;
};

const CheckoutForm = ({ onSubmit, onBack }: CheckoutFormProps) => {
  const form = useForm({
    defaultValues: {
      wilaya: "",
      province: "",
      deliveryMethod: "",
      phoneNumber: "",
      address: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="wilaya"
            rules={{ required: "Wilaya is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wilaya</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a wilaya" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {ALGERIA_WILAYAS.map((wilaya) => (
                      <SelectItem key={wilaya} value={wilaya}>
                        {wilaya}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="province"
            rules={{ required: "Province/City is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province/City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="address"
          rules={{ required: "Detailed address is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deliveryMethod"
            rules={{ required: "Delivery method is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Method</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DELIVERY_METHODS.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phoneNumber"
            rules={{ 
              required: "Phone number is required",
              pattern: {
                value: /^(0|(\+213))[5-7][0-9]{8}$/,
                message: "Please enter a valid Algerian phone number"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 0551234567" {...field} />
                </FormControl>
                <FormMessage className="text-xs">
                  {form.formState.errors.phoneNumber?.message || "Format: 05XXXXXXXX or +2135XXXXXXXX"}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        
        <div className="mt-6 flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            Back to Cart
          </Button>
          <Button
            type="submit"
            className="flex-1"
          >
            Place Order
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;