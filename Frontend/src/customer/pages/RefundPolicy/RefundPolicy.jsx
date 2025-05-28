import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Refund & Return Policy</h1>

        {/* Returns */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Returns</h2>
          <p className="text-gray-700 leading-relaxed">
            We accept returns within <span className="font-semibold">2–5 days</span> of purchase, provided that the item is unused, in its original packaging, and accompanied by the receipt or proof of purchase.
            Items that have been customized or personalized <span className="font-semibold text-red-500">cannot be returned</span>.
          </p>
        </section>

        {/* Refund Process */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund Process</h2>
          <p className="text-gray-700 leading-relaxed">
            To initiate a return, please contact us at <a href="mailto:example@example.com" className="text-blue-600 underline">example@example.com</a> with your order number and details of the item.
            Once approved, you will receive instructions for shipping the item back to us.
          </p>
        </section>

        {/* Refund Eligibility */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund Eligibility</h2>
          <p className="text-gray-700 leading-relaxed">
            After we receive and inspect your item, we will notify you of the status of your refund. If approved, it will be processed and credited to your original payment method.
            Please allow <span className="font-semibold">2–5 business days</span> for it to appear in your account.
          </p>
        </section>

        {/* Non-Refundable Items */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Non-Refundable Items</h2>
          <ul className=" pl-6 text-gray-700 space-y-1">
            <li>Gift cards</li>
            <li>Sale items (unless defective)</li>
            <li>Customized or personalized products</li>
          </ul>
        </section>

        {/* Exchanges */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Exchanges</h2>
          <p className="text-gray-700 leading-relaxed">
            For exchanges (e.g., different size or color), contact us at <a href="mailto:example@example.com" className="text-blue-600 underline">example@example.com</a>.
            Exchanges are subject to product availability.
          </p>
        </section>

        {/* Shipping Costs */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Shipping Costs</h2>
          <p className="text-gray-700 leading-relaxed">
            Customers are responsible for return/exchange shipping costs unless the item is defective or incorrect.
            In such cases, we will cover the return shipping.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions? Contact us at <a href="mailto:example@example.com" className="text-blue-600 underline">example@example.com</a> or call us at <span className="font-semibold">+1234567890</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
