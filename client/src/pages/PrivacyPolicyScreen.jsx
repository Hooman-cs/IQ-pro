// client/src/pages/PrivacyPolicyScreen.jsx

import React from 'react';

const PrivacyPolicyScreen = () => {
  const supportEmail = 'support@iqscaler.com'; // Using a variable for easy updates

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed">
      <h1 className="text-4xl font-bold text-blue-700 border-b-2 border-gray-200 pb-3 mb-8 text-center">
        Privacy Policy for IQScaler.com
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last Updated: <b>December 2025</b>
      </p>

      <p className="mb-6">
        At <b>IQScaler.com</b>, we value your privacy and are committed to protecting your personal data. This policy explains what information we collect, how we use it, and your rights concerning that information.
      </p>

      {/* --- Section 1: Information We Collect --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We only collect the information necessary to provide our IQ testing service and certificate fulfillment.
      </p>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Data Points Collected
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Account Data</td>
              <td className="px-6 py-4">Name, Unique ID (for result retrieval), Email Address, Password (encrypted)</td>
              <td className="px-6 py-4">To register your account, store your test results securely, and enable password recovery.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Test Data</td>
              <td className="px-6 py-4">Your answers and final score</td>
              <td className="px-6 py-4">To calculate your IQ result and, if purchased, generate your certificate.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Transaction Data</td>
              <td className="px-6 py-4">Payment information (handled by a secure third-party processor—we do not store your credit card details)</td>
              <td className="px-6 py-4">To process payments for certificate purchases.</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Technical Data</td>
              <td className="px-6 py-4">IP address, browser type, device information</td>
              <td className="px-6 py-4">To maintain site security, diagnose technical issues, and prevent fraud.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Section 2: How We Use Your Information --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside space-y-2 pl-4 mb-6">
        <li><b>To Provide Services:</b> Calculating and displaying your IQ test results.</li>
        <li><b>To Communicate:</b> Sending you essential updates regarding your account, test results, or certificate status.</li>
        <li><b>To Process Payments:</b> Facilitating the purchase of your official IQ certificate.</li>
        <li><b>To Improve Our Services:</b> Analyzing aggregate, anonymous test data to refine test design and accuracy.</li>
      </ul>

      {/* --- Section 3: Data Storage and Security --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        3. Data Storage and Security
      </h2>
      <ul className="list-disc list-inside space-y-2 pl-4 mb-6">
        <li><b>Secure Storage:</b> Your personal information and test results are stored on secure servers and protected using industry-standard security measures.</li>
        <li><b>Payment Security:</b> All payment processing is outsourced to reputable and secure third-party payment processors. We do not store or have direct access to your full credit card details.</li>
        <li><b>Data Retention:</b> We retain your account data and test results for as long as your account is active to allow you access to your historical results and certificates.</li>
      </ul>

      {/* --- Section 4: Data Sharing and Disclosure --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        4. Data Sharing and Disclosure
      </h2>
      <p className="mb-4">
        We do not sell, rent, or trade your personal information to third parties. We will only disclose your data under the following circumstances:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4 mb-6">
        <li><b>Payment Processors:</b> Sharing necessary transaction details with our third-party payment vendor to complete your certificate purchase.</li>
        <li><b>Legal Compliance:</b> When required by law, such as in response to a court order or subpoena.</li>
      </ul>

      {/* --- Section 5: International Users and Data Rights --- */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-100 pb-2 mt-8 mb-4">
        5. International Users and Data Rights
      </h2>
      <p className="mb-4">
        As a global platform, we are committed to respecting data protection laws worldwide. You have the right to:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4 mb-6">
        <li><b>Access:</b> Request a copy of the personal data we hold about you.</li>
        <li><b>Rectification:</b> Request correction of any incomplete or inaccurate data we hold about you.</li>
        <li><b>Erasure (Right to be Forgotten):</b> Request the deletion of your personal data.</li>
      </ul>
      <p className="bg-blue-50 border-l-4 border-blue-500 p-4 italic">
        To exercise any of these rights, please contact us at <a href={`mailto:${supportEmail}`} className="text-blue-600 hover:text-blue-800 font-semibold">{supportEmail}</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicyScreen;