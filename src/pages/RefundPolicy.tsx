import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const RefundPolicy: React.FC = () => (
  <>
    <SEO title="Refund and Return Policy - Makario" description="Read our refund and return policy for purchases made on Makario." />
    <Header />
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-heritage">Refund and Return Policy</h1>
      <div className="prose max-w-2xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-heritage">Return Policy</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
              <p className="font-medium text-gray-900">
                We have a 7-day return policy from the date of delivery.
              </p>
            </div>
            <p>
              To be eligible for a return:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>The item must be unused and in original condition</li>
              <li>Original packaging must be intact</li>
              <li>Sale items might have different return conditions</li>
              <li>Return request must be initiated within 7 days of delivery</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-heritage">Refund Policy</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
              <p className="font-medium text-gray-900">
                Refunds will be credited to the original payment method within 5-7 business days after approval.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Refund process begins after we receive and inspect the returned item</li>
              <li>You will receive an email notification about your refund status</li>
              <li>Processing time may vary based on your payment method</li>
              <li>Shipping charges are non-refundable</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-heritage">Replacement Policy</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
              <p className="font-medium text-gray-900">
                Replacement/Exchange orders will be delivered within 7-10 business days of approval.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Replacements are available for damaged or defective products</li>
              <li>The replacement item will be of the same variant and value</li>
              <li>Exchange requests must be made within the 7-day return window</li>
              <li>Shipping charges may apply for exchanges to different variants</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-heritage">How to Initiate a Return/Replacement</h2>
          <div className="space-y-4">
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Log in to your account and go to Order History</li>
              <li>Select the order and item you want to return</li>
              <li>Choose between return, refund, or replacement</li>
              <li>Print the return shipping label (if provided)</li>
              <li>Pack the item securely with all original packaging</li>
              <li>Drop off the package at the nearest courier partner location</li>
            </ol>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default RefundPolicy;
