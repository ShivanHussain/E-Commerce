import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-6 text-center">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information
          when you use our e-stationary site.
        </p>

        {/* Sections */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Information We Collect</h2>
          <ul className=" list-inside text-gray-600 space-y-1">
            <li>Your name and contact details, including email address.</li>
            <li>Demographic information such as postal code, preferences, and interests.</li>
            <li>Other information relevant to customer surveys and/or offers.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">2. How We Use Your Information</h2>
          <ul className=" list-inside text-gray-600 space-y-1">
            <li>Process orders and provide services.</li>
            <li>Improve our products and services.</li>
            <li>Send promotional emails about new products, special offers, or other information you may find interesting.</li>
            <li>Contact you for market research purposes.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Security</h2>
          <p className="text-gray-600">
            We are committed to ensuring that your information is secure. To prevent unauthorized access, we have implemented
            suitable physical, electronic, and managerial procedures to safeguard your data.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Cookies</h2>
          <p className="text-gray-600">
            Our website uses cookies to enhance your browsing experience. A cookie is a small file that helps analyze web traffic
            or lets you know when you visit a site. You can choose to accept or decline cookies in your browser settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Third-Party Sharing</h2>
          <p className="text-gray-600">
            We do not sell, distribute, or lease your personal information to third parties unless we have your permission
            or are required by law to do so.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to request details of personal information that we hold about you. If you believe any information is
            incorrect or incomplete, please contact us to correct it.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">7. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t pt-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at
            <a href="mailto:example@example.com" className="text-blue-600 hover:underline"> example@example.com</a> or call us at <strong>+1234567890</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
