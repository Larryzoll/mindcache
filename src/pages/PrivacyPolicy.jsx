import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
        >
          ← Back to Login
        </Link>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>Effective Date:</strong> November 8, 2025
          </p>

          <p className="mb-6">
            MindCache ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you use our web and mobile application 
            (the "Service"). By using MindCache, you agree to the practices described in this Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. Information You Provide</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Account Information:</strong> When you create an account, we collect your email address and password.</li>
            <li><strong>User Content:</strong> We store the notes, tasks, tags, and other content you create within the Service.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Device Information:</strong> We may collect information about the device you use to access MindCache, including device type, operating system, and browser type.</li>
            <li><strong>Usage Data:</strong> We collect data about how you interact with the Service, such as features used, timestamps, and frequency of use.</li>
            <li><strong>IP Address:</strong> Your IP address may be logged for security and troubleshooting purposes.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Cookies and Tracking Technologies</h3>
          <p className="mb-4">
            We use cookies and similar technologies to enhance your experience, maintain your session, and analyze usage patterns.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-2">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve the Service.</li>
            <li>Authenticate your account and enable secure access.</li>
            <li>Store and synchronize your notes, tasks, and preferences across devices.</li>
            <li>Respond to your inquiries, support requests, and feedback.</li>
            <li>Monitor and analyze usage trends to enhance functionality.</li>
            <li>Detect, prevent, and address technical issues or security threats.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Share Your Information</h2>
          <p className="mb-4">
            We do not sell, rent, or trade your personal information to third parties. However, we may share your information in the following circumstances:
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. Service Providers</h3>
          <p className="mb-4">
            We use third-party services to help operate MindCache, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Supabase:</strong> For authentication and database management.</li>
            <li><strong>Vercel:</strong> For hosting and deployment.</li>
          </ul>
          <p className="mb-4">
            These providers have access to your information only to perform tasks on our behalf and are obligated to protect it.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Legal Requirements</h3>
          <p className="mb-4">
            We may disclose your information if required by law or in response to valid legal requests, such as court orders or government inquiries.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Business Transfers</h3>
          <p className="mb-4">
            If MindCache is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Retention</h2>
          <p className="mb-4">
            We retain your information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete your personal information within a reasonable timeframe, unless retention is required by law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights and Choices</h2>
          <p className="mb-2">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Access:</strong> Request access to the personal information we hold about you.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data.</li>
            <li><strong>Opt-Out:</strong> Opt out of certain data collection practices, such as cookies (via browser settings).</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us at larry@teamzoll.com.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
          <p className="mb-4">
            MindCache is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will take steps to delete it promptly.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be stored and processed in the United States or other countries where our service providers operate. By using MindCache, you consent to the transfer of your information to jurisdictions that may have different data protection laws than your country of residence.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Third-Party Links</h2>
          <p className="mb-4">
            The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we do, we will post the updated policy on this page and update the "Effective Date" at the top. We encourage you to review this policy periodically.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
          <p className="mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="mb-4">
            <strong>Email:</strong> larry@teamzoll.com
          </p>

          <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
            By using MindCache, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
