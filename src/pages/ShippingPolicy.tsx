import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ShippingPolicy: React.FC = () => (
  <>
    <SEO title="Shipping Policy - Makario" description="Read our shipping policy for delivery timelines and charges." />
    <Header />
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-heritage">Shipping Policy</h1>
      <div className="prose max-w-2xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-heritage">Delivery Timeline</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Standard Delivery: Orders will be delivered within 5-7 business days</li>
            <li>Express Delivery: Orders will be delivered within 2-3 business days (additional charges apply)</li>
            <li>Same-day Delivery: Available for select locations in Bihar (order before 12 PM)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-heritage">Shipping Information</h2>
          <div className="space-y-3">
            <p>
              The orders for the user are delivered through registered domestic courier companies and/or speed post only.
            </p>
            <p>
              Free shipping is available on orders above ₹999 (standard delivery only).
            </p>
            <p>
              Delivery of all orders will be made to the address provided by the buyer at the time of purchase.
            </p>
            <p>
              You will receive a tracking number via email once your order is shipped.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-heritage">Important Notes</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority</li>
            <li>Delivery confirmation will be sent to your registered email ID</li>
            <li>Any shipping costs levied are non-refundable</li>
            <li>Delivery times may vary for remote locations</li>
          </ul>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default ShippingPolicy;
