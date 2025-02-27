/* "use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { ShoppingBag, ChevronDown, CreditCard, Truck } from "lucide-react";
import { useBuy } from "@/Providers/checkoutProvider";

const algerianWilayas = [
  "01 - Adrar",
  "02 - Chlef",
  "03 - Laghouat",
  "04 - Oum El Bouaghi",
  "05 - Batna",
  "06 - Béjaïa",
  "07 - Biskra",
  "08 - Béchar",
  "09 - Blida",
  "10 - Bouira",
  "11 - Tamanrasset",
  "12 - Tébessa",
  "13 - Tlemcen",
  "14 - Tiaret",
  "15 - Tizi Ouzou",
  "16 - Alger",
  "17 - Djelfa",
  "18 - Jijel",
  "19 - Sétif",
  "20 - Saïda",
  "21 - Skikda",
  "22 - Sidi Bel Abbès",
  "23 - Annaba",
  "24 - Guelma",
  "25 - Constantine",
  "26 - Médéa",
  "27 - Mostaganem",
  "28 - M'Sila",
  "29 - Mascara",
  "30 - Ouargla",
  "31 - Oran",
  "32 - El Bayadh",
  "33 - Illizi",
  "34 - Bordj Bou Arréridj",
  "35 - Boumerdès",
  "36 - El Tarf",
  "37 - Tindouf",
  "38 - Tissemsilt",
  "39 - El Oued",
  "40 - Khenchela",
  "41 - Souk Ahras",
  "42 - Tipaza",
  "43 - Mila",
  "44 - Aïn Defla",
  "45 - Naâma",
  "46 - Aïn Témouchent",
  "47 - Ghardaïa",
  "48 - Relizane",
  "49 - El M'Ghair",
  "50 - El Meniaa",
  "51 - Ouled Djellal",
  "52 - Bordj Baji Mokhtar",
  "53 - Béni Abbès",
  "54 - Timimoun",
  "55 - Touggourt",
  "56 - Djanet",
  "57 - In Salah",
  "58 - In Guezzam",
];

export default function Checkout() {
  const { buyItem } = useBuy();
  const cartItems = buyItem ;

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [selectedWilaya, setSelectedWilaya] = useState("16 - Alger");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = shippingMethod === "express" ? 12.99 : 5.99;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Finaliser la commande | YourBrand</title>
        <meta name="description" content="Complétez votre achat" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-indigo-600">YourBrand</div>
            <div className="text-gray-600">Bienvenue, Mohammed</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Finaliser la commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Panier</h2>
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                    {cartItems.length} articles
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex space-x-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <div className="mt-1 flex text-sm text-gray-500">
                        <p>Couleur: {item.color}</p>
                        <span className="mx-2">•</span>
                        <p>Taille: {item.size}</p>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-1">Qté:</span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <p className="text-gray-900 font-medium">
                          {(item.price * item.quantity).toFixed(2)} DA
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium text-gray-900">
                    {subtotal.toFixed(2)} DA
                  </span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium text-gray-900">
                    {shipping.toFixed(2)} DA
                  </span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">TVA (19%)</span>
                  <span className="font-medium text-gray-900">
                    {tax.toFixed(2)} DA
                  </span>
                </div>
                <div className="flex justify-between text-base font-medium py-2 mt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-indigo-600">{total.toFixed(2)} DA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Finaliser votre commande
                </h2>
              </div>

              <form className="px-6 py-4 space-y-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">
                    Adresse de livraison
                  </h3>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        defaultValue="Mohammed"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        defaultValue="Benali"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Adresse
                      </label>
                      <input
                        type="text"
                        id="address"
                        defaultValue="123 Rue Didouche Mourad"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ville
                      </label>
                      <input
                        type="text"
                        id="city"
                        defaultValue="Alger"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="wilaya"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Wilaya
                      </label>
                      <select
                        id="wilaya"
                        value={selectedWilaya}
                        onChange={(e) => setSelectedWilaya(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {algerianWilayas.map((wilaya) => (
                          <option key={wilaya} value={wilaya}>
                            {wilaya}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Code postal
                      </label>
                      <input
                        type="text"
                        id="postal-code"
                        defaultValue="16000"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Téléphone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        defaultValue="0555 12 34 56"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">
                    Mode de livraison
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="shipping-standard"
                        name="shipping-method"
                        type="radio"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label
                        htmlFor="shipping-standard"
                        className="ml-3 flex flex-1 justify-between"
                      >
                        <div>
                          <span className="block text-sm font-medium text-gray-900">
                            Livraison standard
                          </span>
                          <span className="block text-sm text-gray-500">
                            3-5 jours ouvrables
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          600 DA
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="shipping-express"
                        name="shipping-method"
                        type="radio"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label
                        htmlFor="shipping-express"
                        className="ml-3 flex flex-1 justify-between"
                      >
                        <div>
                          <span className="block text-sm font-medium text-gray-900">
                            Livraison express
                          </span>
                          <span className="block text-sm text-gray-500">
                            1-2 jours ouvrables
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          1200 DA
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">
                    Méthode de paiement
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="payment-card"
                        name="payment-method"
                        type="radio"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label
                        htmlFor="payment-card"
                        className="ml-3 flex items-center"
                      >
                        <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="block text-sm font-medium text-gray-900">
                          Carte bancaire (CIB/EDAHABIA)
                        </span>
                      </label>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="mt-4 grid grid-cols-6 gap-4">
                        <div className="col-span-6">
                          <label
                            htmlFor="card-number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Numéro de carte
                          </label>
                          <input
                            type="text"
                            id="card-number"
                            placeholder="•••• •••• •••• ••••"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-4">
                          <label
                            htmlFor="card-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nom sur la carte
                          </label>
                          <input
                            type="text"
                            id="card-name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-1">
                          <label
                            htmlFor="card-expiry-month"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mois
                          </label>
                          <input
                            type="text"
                            id="card-expiry-month"
                            placeholder="MM"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-3 sm:col-span-1">
                          <label
                            htmlFor="card-expiry-year"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Année
                          </label>
                          <input
                            type="text"
                            id="card-expiry-year"
                            placeholder="YY"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        id="payment-cash"
                        name="payment-method"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <label
                        htmlFor="payment-cash"
                        className="ml-3 block text-sm font-medium text-gray-900"
                      >
                        Paiement à la livraison
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Commander - {total.toFixed(2)} DA
                  </button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    En passant votre commande, vous acceptez nos
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}
                      conditions générales de vente
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
 */