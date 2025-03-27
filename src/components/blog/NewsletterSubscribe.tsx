import React, { useEffect, useState } from 'react';
import { Mail } from "lucide-react";

interface NewsletterSubscribeProps {
  title?: string;
  description?: string;
}

export function NewsletterSubscribe({
  title = "Subscribe to my newsletter",
  description = "Signing up is free, unsubscribe anytime."
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    // Load ConvertKit script
    const script = document.createElement('script');
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  // Add CSS to hide the "Built with Kit" attribution
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .formkit-powered-by-convertkit-container {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      .formkit-form .formkit-input {
        font-size: 16px !important;
        padding: 12px 16px !important;
        width: 100% !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 8px !important;
      }
      
      .formkit-form .formkit-submit {
        background-color: rgb(29, 78, 216) !important; /* This is the blue-700 color to match the Mail icon */
        padding: 12px 24px !important;
        border-radius: 8px !important;
        cursor: pointer !important;
        font-weight: 600 !important;
        transition: all 0.2s ease-in-out !important;
        color: white !important;
      }
      
      .formkit-form .formkit-submit:hover {
        background-color: rgb(30, 64, 175) !important;
        transform: translateY(-1px) !important;
      }
      
      .formkit-form .seva-fields {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
      }
      
      @media (min-width: 640px) {
        .formkit-form .seva-fields {
          flex-direction: row !important;
        }
        
        .formkit-form .formkit-field {
          flex: 1 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Submit the form data to Kit.com via fetch
    fetch('https://app.kit.com/forms/7847447/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email_address=${encodeURIComponent(email)}`,
    })
    .then(response => {
      // Redirect to thanks page regardless of success/failure
      window.location.href = `${window.location.origin}/#/thanks?source=${encodeURIComponent(window.location.pathname)}&email=${encodeURIComponent(email)}`;
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      // Still redirect to thanks page on error
      window.location.href = `${window.location.origin}/#/thanks?source=${encodeURIComponent(window.location.pathname)}&email=${encodeURIComponent(email)}`;
    });
  };

  return (
    <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20 space-y-6 w-full mt-12 mb-6 max-w-full">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
          <Mail className="w-5 h-5 text-blue-700 dark:text-blue-300" />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
          {description}
        </p>
        
        <div className="text-neutral-600 dark:text-neutral-400 text-sm">
          <p className="font-medium mb-2">What you'll get:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Practical UX & product design techniques</li>
            <li>Time-saving AI design workflows</li>
            <li>Product strategy frameworks for startups</li>
          </ul>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Subscribe
            </button>
          </div>
          
          <p className="text-neutral-500 dark:text-neutral-500 text-xs italic">
            No spam, unsubscribe anytime. I typically send 1-2 emails per month with high-value content only.
          </p>
        </div>
      </form>
    </div>
  );
} 