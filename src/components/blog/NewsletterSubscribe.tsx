import React, { useEffect } from 'react';
import { Mail } from "lucide-react";

interface NewsletterSubscribeProps {
  title?: string;
  description?: string;
}

export function NewsletterSubscribe({
  title = "Subscribe to my newsletter",
  description = "Signing up is free, unsubscribe anytime."
}: NewsletterSubscribeProps) {
  
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
      
      <form 
        action="https://app.kit.com/forms/7847447/subscriptions" 
        className="seva-form formkit-form" 
        method="post" 
        data-sv-form="7847447" 
        data-uid="9a8fa90635" 
        data-format="inline" 
        data-version="5" 
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
      >
        <div data-style="clean">
          <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
          <label className="text-sm text-neutral-700 dark:text-neutral-300 mb-1 block hidden">Your email:</label>
          <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
            <div className="formkit-field">
              <input 
                className="formkit-input" 
                name="email_address" 
                aria-label="Email Address" 
                placeholder="Email Address" 
                required 
                type="email"
              />
            </div>
            <button 
              data-element="submit" 
              className="formkit-submit formkit-submit"
            >
              <div className="formkit-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span>Subscribe</span>
            </button>
          </div>
          <div className="formkit-powered-by-convertkit-container" style={{ display: 'none' }}>
            <a 
              href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic" 
              data-element="powered-by" 
              className="formkit-powered-by-convertkit" 
              data-variant="dark" 
              target="_blank" 
              rel="nofollow"
            >
              Built with Kit
            </a>
          </div>
        </div>
      </form>
      <p className="text-neutral-500 dark:text-neutral-500 text-xs italic">
          No spam, unsubscribe anytime. I typically send 1-2 emails per month with high-value content only.
        </p>
    </div>
  );
} 