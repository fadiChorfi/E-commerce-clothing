"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Truck,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function CheckoutAlgeria() {
  const [checkoutStep, setCheckoutStep] = useState("information");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const [orderComplete, setOrderComplete] = useState(false);

  const cartItems = [
    {
      id: "1",
      name: "Premium Cotton Hoodie",
      color: "Black",
      size: "M",
      price: 5999,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: "Jogger Pants",
      color: "Burgundy",
      size: "L",
      price: 3999,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = shippingMethod === "express" ? 1200 : 600;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;

  const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M&aposSila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "El M&aposGhair",
    "El Meniaa",
    "Ouled Djellal",
    "Bordj Baji Mokhtar",
    "Béni Abbès",
    "Timimoun",
    "Touggourt",
    "Djanet",
    "In Salah",
    "In Guezzam",
  ];

  const handleContinueToShipping = () => {
    setCheckoutStep("shipping");
  };

  const handleContinueToPayment = () => {
    setCheckoutStep("payment");
  };

  const handleContinueToReview = () => {
    setCheckoutStep("review");
  };

  const handlePlaceOrder = () => {
    setOrderComplete(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase!
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Order Number:</span>
                <span className="font-medium">
                  #LX{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Order Date:</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString("fr-DZ")}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total:</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-medium">
                  {paymentMethod === "cash-on-delivery"
                    ? "Paiement à la livraison"
                    : paymentMethod === "credit-card"
                    ? "Carte bancaire"
                    : paymentMethod === "edahabia"
                    ? "Carte Edahabia"
                    : "CIB"}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/account/orders">View Order Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep === "information" ||
                  checkoutStep === "shipping" ||
                  checkoutStep === "payment" ||
                  checkoutStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="text-xs mt-1">information</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep === "shipping" ||
                  checkoutStep === "payment" ||
                  checkoutStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="text-xs mt-1">shipping</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep === "payment" || checkoutStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="text-xs mt-1">payment</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200"
                }`}
              >
                4
              </div>
              <span className="text-xs mt-1">review</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6 flex items-center">
                <Link
                  href="/"
                  className="text-sm flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  returnToStore
                </Link>
              </div>

              {/* Information Step */}
              {checkoutStep === "information" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">contactInfo</h2>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor="email">email</Label>
                      <span className="text-sm text-muted-foreground">
                        alreadyHaveAccount
                        <Link
                          href="/login"
                          className="text-primary hover:underline"
                        >
                          login
                        </Link>
                      </span>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>

                  <h2 className="text-xl font-semibold mb-6">
                    shippingAddress
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">firstName</Label>
                      <Input id="firstName" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">lastName</Label>
                      <Input id="lastName" className="mt-1" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="address">address</Label>
                    <Input id="address" className="mt-1" />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="apartment">apartment</Label>
                    <Input id="apartment" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="wilaya">wilaya</Label>
                      <Select defaultValue="alger">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Sélectionner une wilaya" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {wilayas.map((wilaya) => (
                            <SelectItem
                              key={wilaya.toLowerCase()}
                              value={wilaya.toLowerCase()}
                            >
                              {wilaya}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">city</Label>
                      <Input id="city" className="mt-1" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="postalCode">postalCode</Label>
                    <Input id="postalCode" className="mt-1" />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="phone">phone</Label>
                    <Input
                      id="phone"
                      className="mt-1"
                      placeholder="05 XX XX XX XX"
                    />
                  </div>

                  <div className="flex items-center mb-6">
                    <Checkbox id="saveInfo" />
                    <Label htmlFor="saveInfo" className="ml-2 text-sm">
                      saveInfo
                    </Label>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleContinueToShipping}>
                      continueToShipping
                    </Button>
                  </div>
                </div>
              )}

              {/* Shipping Step */}
              {checkoutStep === "shipping" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">shippingMethod</h2>

                  <div className="mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">Contact:</span>{" "}
                          john.doe@example.com
                        </div>
                        <button
                          className="text-primary hover:underline"
                          onClick={() => setCheckoutStep("information")}
                        >
                          Modifier
                        </button>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">Adresse:</span> 123 Rue
                          Didouche Mourad, Alger Centre, Alger, 16000
                        </div>
                        <button
                          className="text-primary hover:underline"
                          onClick={() => setCheckoutStep("information")}
                        >
                          Modifier
                        </button>
                      </div>
                    </div>

                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-3"
                    >
                      <div
                        className={`border rounded-lg p-4 ${
                          shippingMethod === "standard" ? "border-primary" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <div>
                              <Label htmlFor="standard" className="font-medium">
                                standardShipping
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Livraison en 3-5 jours ouvrables
                              </p>
                            </div>
                          </div>
                          <div className="font-medium">{formatPrice(600)}</div>
                        </div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 ${
                          shippingMethod === "express" ? "border-primary" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <div>
                              <Label htmlFor="express" className="font-medium">
                                expressShipping
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Livraison en 1-2 jours ouvrables
                              </p>
                            </div>
                          </div>
                          <div className="font-medium">{formatPrice(1200)}</div>
                        </div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 ${
                          shippingMethod === "yassir" ? "border-primary" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yassir" id="yassir" />
                            <div>
                              <Label htmlFor="yassir" className="font-medium">
                                Yassir Express
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Livraison le jour même (Alger uniquement)
                              </p>
                            </div>
                          </div>
                          <div className="font-medium">{formatPrice(1500)}</div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCheckoutStep("information")}
                    >
                      returnToInformation
                    </Button>
                    <Button onClick={handleContinueToPayment}>
                      continueToPayment
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {checkoutStep === "payment" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">paymentMethod</h2>

                  <div className="mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">Contact:</span>{" "}
                          john.doe@example.com
                        </div>
                        <button
                          className="text-primary hover:underline"
                          onClick={() => setCheckoutStep("information")}
                        >
                          Modifier
                        </button>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">Adresse:</span> 123 Rue
                          Didouche Mourad, Alger Centre, Alger, 16000
                        </div>
                        <button
                          className="text-primary hover:underline"
                          onClick={() => setCheckoutStep("information")}
                        >
                          Modifier
                        </button>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">Méthode:</span>{" "}
                          {shippingMethod === "express"
                            ? "Livraison express (1 200 DA)"
                            : shippingMethod === "yassir"
                            ? "Yassir Express (1 500 DA)"
                            : "Livraison standard (600 DA)"}
                        </div>
                        <button
                          className="text-primary hover:underline"
                          onClick={() => setCheckoutStep("shipping")}
                        >
                          Modifier
                        </button>
                      </div>
                    </div>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "cash-on-delivery"
                            ? "border-primary"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="cash-on-delivery"
                            id="cash-on-delivery"
                          />
                          <Label
                            htmlFor="cash-on-delivery"
                            className="font-medium"
                          >
                            cashOnDelivery
                          </Label>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "credit-card"
                            ? "border-primary"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-4">
                          <RadioGroupItem
                            value="credit-card"
                            id="credit-card"
                          />
                          <Label htmlFor="credit-card" className="font-medium">
                            creditCard
                          </Label>
                          <div className="flex ml-auto space-x-1">
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                          </div>
                        </div>

                        {paymentMethod === "credit-card" && (
                          <div className="space-y-4 pl-6">
                            <div>
                              <Label htmlFor="cardNumber">
                                Numéro de carte
                              </Label>
                              <div className="relative">
                                <Input
                                  id="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  className="mt-1 pr-10"
                                />
                                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiration">
                                  Date d&aposexpiration (MM/AA)
                                </Label>
                                <Input
                                  id="expiration"
                                  placeholder="MM / AA"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="securityCode">
                                  Code de sécurité
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="securityCode"
                                    placeholder="CVC"
                                    className="mt-1 pr-10"
                                  />
                                  <Info className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="nameOnCard">
                                Nom sur la carte
                              </Label>
                              <Input id="nameOnCard" className="mt-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "edahabia" ? "border-primary" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="edahabia" id="edahabia" />
                          <Label htmlFor="edahabia" className="font-medium">
                            edahabiaCarte
                          </Label>
                          <div className="w-12 h-5 bg-gray-200 rounded ml-auto"></div>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "cib" ? "border-primary" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cib" id="cib" />
                          <Label htmlFor="cib" className="font-medium">
                            cib
                          </Label>
                          <div className="w-12 h-5 bg-gray-200 rounded ml-auto"></div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCheckoutStep("shipping")}
                    >
                      return To Shipping
                    </Button>
                    <Button onClick={handleContinueToReview}>
                      continue To Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {checkoutStep === "review" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">reviewOrder</h2>

                  <div className="mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">
                            Informations de contact
                          </h3>
                          <p className="text-sm mb-1">Mohammed Amine</p>
                          <p className="text-sm mb-1">m.amine@example.com</p>
                          <p className="text-sm">0555 12 34 56</p>
                          <button
                            className="text-primary hover:underline text-sm mt-2"
                            onClick={() => setCheckoutStep("information")}
                          >
                            Modifier
                          </button>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">
                            Adresse de livraison
                          </h3>
                          <p className="text-sm mb-1">
                            123 Rue Didouche Mourad
                          </p>
                          <p className="text-sm mb-1">
                            Alger Centre, Alger 16000
                          </p>
                          <p className="text-sm">Algérie</p>
                          <button
                            className="text-primary hover:underline text-sm mt-2"
                            onClick={() => setCheckoutStep("information")}
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">
                            Méthode de livraison
                          </h3>
                          <p className="text-sm">
                            {shippingMethod === "express"
                              ? "Livraison express (1 200 DA)"
                              : shippingMethod === "yassir"
                              ? "Yassir Express (1 500 DA)"
                              : "Livraison standard (600 DA)"}
                          </p>
                          <button
                            className="text-primary hover:underline text-sm mt-2"
                            onClick={() => setCheckoutStep("shipping")}
                          >
                            Modifier
                          </button>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">
                            Méthode de paiement
                          </h3>
                          <p className="text-sm">
                            {paymentMethod === "cash-on-delivery"
                              ? "Paiement à la livraison"
                              : paymentMethod === "credit-card"
                              ? "Carte bancaire"
                              : paymentMethod === "edahabia"
                              ? "Carte Edahabia"
                              : "CIB"}
                          </p>
                          <button
                            className="text-primary hover:underline text-sm mt-2"
                            onClick={() => setCheckoutStep("paymen")}
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden mb-6">
                      <h3 className="font-medium p-4 bg-gray-50 border-b">
                        Articles commandés
                      </h3>
                      <div className="divide-y">
                        {cartItems.map((item) => (
                          <div key={item.id} className="p-4 flex items-center">
                            <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 mr-4">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.color} / {item.size} / Qté:{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="font-medium">
                              {formatPrice(item.price)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg mb-6">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2 text-primary" />
                        <p className="text-sm">
                          Vos informations de paiement sont cryptées et
                          sécurisées. Nous ne stockons jamais vos coordonnées
                          bancaires complètes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center mb-6">
                      <Checkbox id="termsAndConditions" />
                      <Label
                        htmlFor="termsAndConditions"
                        className="ml-2 text-sm"
                      >
                        J&apos;accepte les{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          Conditions Générales de Vente
                        </Link>{" "}
                        et la{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Politique de Confidentialité
                        </Link>
                      </Label>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCheckoutStep("payment")}
                      >
                        returnToPayment
                      </Button>
                      <Button onClick={handlePlaceOrder}>placeOrder</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <Accordion
                type="single"
                collapsible
                defaultValue="summary"
                className="mb-4"
              >
                <AccordionItem value="summary" className="border-none">
                  <AccordionTrigger className="py-2 px-0">
                    <h2 className="text-lg font-semibold">orderSummary</h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 mb-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 mr-3">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute -top-1 -right-1 bg-gray-200 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.color} / {item.size}
                            </p>
                          </div>
                          <div className="font-medium text-sm ml-2">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-between font-bold mb-6">
                <span>total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-8 mt-8 border-t min-w-full">
        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-sm">Livraison Nationale</h3>
              <p className="text-xs text-muted-foreground">
                Partout en Algérie
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-sm">Paiement Sécurisé</h3>
              <p className="text-xs text-muted-foreground">
                Plusieurs options disponibles
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Lock className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-sm">Service Client</h3>
              <p className="text-xs text-muted-foreground">7j/7 de 9h à 20h</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
