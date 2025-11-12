import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            <strong>Effective Date:</strong> November 8, 2025
          </p>

          <p className="mb-6">
            Welcome to MindCache! These Terms of Service ("Terms") govern your use of MindCache (the "Service"), 
            a web and mobile application designed for note-taking and task management. By accessing or using the 
            Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By creating an account or using MindCache, you acknowledge that you have read, understood, and agree 
            to comply with these Terms, as well as our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-4">
            MindCache provides users with tools to create, organize, and manage notes and to-do lists. The Service 
            includes features such as tagging, filtering, formatting, and synchronization across devices.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>
          <p className="mb-2"><strong>Account Creation:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>To use MindCache, you must create an account using a valid email address and password.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          </ul>
          <p className="mb-2"><strong>Account Responsibilities:</strong></p>
          <ul className="list-disc pl-6 mb-4">
            <li>You agree to provide accurate and up-to-date information during account registration.</li>
            <li>You are solely responsible for all activities that occur under your account.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Acceptable Use</h2>
          <p className="mb-2">You agree to use MindCache only for lawful purposes. Specifically, you agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Service to store, share, or distribute illegal, harmful, or offensive content.</li>
            <li>Attempt to gain unauthorized access to the Service, other user accounts, or associated systems.</li>
            <li>Use the Service to transmit viruses, malware, or other harmful code.</li>
            <li>Engage in activities that disrupt, damage, or interfere with the Service or its users.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. User Content</h2>
          <p className="mb-2"><strong>Ownership:</strong></p>
          <p className="mb-4">
            You retain full ownership of all content (notes, tasks, tags, etc.) you create or upload to MindCache.
          </p>
          <p className="mb-2"><strong>License to Use:</strong></p>
          <p className="mb-4">
            By using the Service, you grant MindCache a limited, non-exclusive license to store, process, and 
            display your content solely for the purpose of providing the Service to you.
          </p>
          <p className="mb-2"><strong>Content Removal:</strong></p>
          <p className="mb-4">
            We reserve the right to remove content that violates these Terms or applicable laws.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Privacy</h2>
          <p className="mb-4">
            Your use of MindCache is also governed by our Privacy Policy, which explains how we collect, use, and 
            protect your personal information. Please review the Privacy Policy for more details.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Service Availability</h2>
          <p className="mb-2">We strive to provide reliable access to MindCache, but we do not guarantee:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Uninterrupted or error-free access to the Service.</li>
            <li>That the Service will meet your specific requirements.</li>
          </ul>
          <p className="mb-4">
            MindCache may be temporarily unavailable due to maintenance, updates, or unforeseen technical issues.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Third-Party Services</h2>
          <p className="mb-4">
            MindCache may integrate with third-party services (e.g., authentication providers like Supabase). Your 
            use of such services is subject to their respective terms and policies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Termination</h2>
          <p className="mb-2"><strong>By You:</strong></p>
          <p className="mb-4">
            You may terminate your account at any time by contacting us or using the account deletion feature in 
            the app.
          </p>
          <p className="mb-2"><strong>By Us:</strong></p>
          <p className="mb-4">
            We reserve the right to suspend or terminate your account if you violate these Terms or engage in 
            activities that harm the Service or other users.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">10. Disclaimer of Warranties</h2>
          <p className="mb-4">
            MindCache is provided "as is" and "as available" without warranties of any kind, whether express or 
            implied. We do not warrant that the Service will be error-free, secure, or meet your expectations.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">11. Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by law, MindCache and its developers shall not be liable for any 
            indirect, incidental, special, or consequential damages arising from your use of the Service, including 
            but not limited to loss of data, profits, or business opportunities.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">12. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify and hold harmless MindCache and its developers from any claims, damages, or 
            expenses arising from your use of the Service or violation of these Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">13. Changes to Terms</h2>
          <p className="mb-4">
            We may update these Terms from time to time. When we do, we will notify you via the Service or email. 
            Continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">14. Governing Law</h2>
          <p className="mb-4">
            These Terms are governed by and construed in accordance with the laws of the State of Colorado, United 
            States, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">15. Contact Information</h2>
          <p className="mb-4">
            If you have any questions or concerns about these Terms, please contact us at:
          </p>

          <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
            By using MindCache, you acknowledge that you have read and agree to these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
