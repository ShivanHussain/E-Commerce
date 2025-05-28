import React from 'react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Shipping Policy</h1>

        {/* Processing Time */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Processing Time</h2>
          <p className="text-gray-600 leading-relaxed">
            All orders are processed within <strong>1-2 business days</strong> (excluding weekends and holidays) after
            receiving your order confirmation email. You will receive another notification when your order has shipped.
          </p>
        </section>

        {/* Shipping Rates and Estimates */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipping Rates and Estimates</h2>
          <p className="text-gray-600 mb-4">
            Shipping charges for your order will be calculated and displayed at checkout. We offer the following options:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Standard Shipping:</strong> 5-7 business days</li>
            <li><strong>Expedited Shipping:</strong> 2-3 business days</li>
            <li><strong>Overnight Shipping:</strong> 1-2 business days</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Shipping costs depend on the total weight of the items and the shipping method chosen.
          </p>
        </section>

        {/* Order Tracking */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Tracking</h2>
          <p className="text-gray-600 leading-relaxed">
            Once your order has shipped, you will receive a tracking number via email that you can use to check the status of your shipment.
          </p>
        </section>

        {/* Delays */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Delays</h2>
          <p className="text-gray-600 leading-relaxed">
            Please note that delays may occur due to unforeseen circumstances such as severe weather, holidays, or carrier-related issues.
            If your shipment is delayed, please contact us at 
            <a href="mailto:example@example.com" className="text-blue-600 hover:underline"> example@example.com</a> for assistance.
          </p>
        </section>

        {/* Lost or Damaged Shipments */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Lost or Damaged Shipments</h2>
          <p className="text-gray-600 leading-relaxed">
            If your order arrives damaged or is lost during transit, please contact us immediately at 
            <a href="mailto:example@example.com" className="text-blue-600 hover:underline"> example@example.com</a>. 
            We will work with the shipping provider to resolve the issue and offer a replacement or refund where applicable.
          </p>
        </section>

        {/* Contact Us */}
        <section className="border-t pt-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions regarding our shipping policy, feel free to reach out to us at 
            <a href="mailto:example@example.com" className="text-blue-600 hover:underline"> example@example.com</a> 
            or call us at <span className="font-semibold">+1234567890</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
