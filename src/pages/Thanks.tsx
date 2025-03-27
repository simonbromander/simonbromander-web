import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAnalytics from '@/hooks/useAnalytics';

export default function ThanksPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { trackEvent } = useAnalytics();
  const email = searchParams.get('email');
  const source = searchParams.get('source') || 'direct';

  useEffect(() => {
    // Track the successful newsletter signup
    trackEvent('newsletter_signup_success', { 
      source: source,
      has_email: !!email 
    });
  }, [trackEvent, email, source]);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-white/20 dark:border-neutral-700/20">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackClick}
            className="mb-6 text-neutral-600 dark:text-neutral-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              Subscription Confirmed!
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-6">
              {email ? (
                <>Thanks for subscribing with <span className="font-medium">{email}</span>!</>
              ) : (
                <>Thanks for subscribing to the newsletter!</>
              )}
            </p>
            
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-4">
              You'll receive updates about product design, development, and technology directly in your inbox.
            </p>
            
            <p className="text-yellow-600 dark:text-yellow-400 max-w-md mx-auto mb-8 font-medium">
              Please don't forget to confirm your subscription using the link sent to your inbox.
            </p>
            
            <Button onClick={handleBackClick}>
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
} 