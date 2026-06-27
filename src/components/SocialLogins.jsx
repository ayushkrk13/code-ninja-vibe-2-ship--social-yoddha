import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTH_URLS = {
  Google: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=demo_client_id&redirect_uri=http://localhost:5173/callback&response_type=token&scope=email',
  Facebook: 'https://www.facebook.com/v13.0/dialog/oauth?client_id=demo_client_id&redirect_uri=http://localhost:5173/callback',
  Instagram: 'https://api.instagram.com/oauth/authorize?client_id=demo_client_id&redirect_uri=http://localhost:5173/callback&scope=user_profile&response_type=code',
  Outlook: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=demo_client_id&response_type=token&redirect_uri=http://localhost:5173/callback'
};

export function SocialLogins() {
  const navigate = useNavigate();
  const [redirectingTo, setRedirectingTo] = useState(null);

  const handleLogin = (provider) => {
    setRedirectingTo(provider);
    
    // Open official popup to simulate taking access
    const url = AUTH_URLS[provider];
    const width = 500;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      url, 
      'oauth_popup', 
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes`
    );

    // Simulate the OAuth callback delay and then redirect
    setTimeout(() => {
      if (popup && !popup.closed) {
        popup.close();
      }
      navigate('/dashboard');
    }, 4000);
  };

  return (
    <div className="space-y-4 w-full mt-6">
      {redirectingTo && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 border-4 border-gray-100 border-t-primary rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-heading font-bold text-dark mb-2 text-center">Connecting to {redirectingTo}...</h2>
          <p className="text-gray-500 text-sm text-center">Securely authenticating your account via official portal.</p>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            End-to-end encrypted
          </div>
        </div>
      )}
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">Or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => handleLogin('Google')} type="button" className="flex items-center justify-center gap-2 w-full p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-semibold text-gray-700">Google</span>
        </button>
        
        <button onClick={() => handleLogin('Facebook')} type="button" className="flex items-center justify-center gap-2 w-full p-2.5 border border-gray-200 rounded-xl hover:bg-[#1877F2]/5 hover:border-[#1877F2]/30 transition-all shadow-sm active:scale-95">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.969h-1.515c-1.491 0-1.956.93-1.956 1.886v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-700">Facebook</span>
        </button>
        
        <button onClick={() => handleLogin('Instagram')} type="button" className="flex items-center justify-center gap-2 w-full p-2.5 border border-gray-200 rounded-xl hover:bg-[#E1306C]/5 hover:border-[#E1306C]/30 transition-all shadow-sm active:scale-95">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f09433" />
                <stop offset="0.25" stopColor="#e6683c" />
                <stop offset="0.5" stopColor="#dc2743" />
                <stop offset="0.75" stopColor="#cc2366" />
                <stop offset="1" stopColor="#bc1888" />
              </linearGradient>
            </defs>
            <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.395a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-700">Instagram</span>
        </button>
        
        <button onClick={() => handleLogin('Outlook')} type="button" className="flex items-center justify-center gap-2 w-full p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.175 1.175h10.25v10.25H1.175z" fill="#f25022"/>
            <path d="M12.575 1.175h10.25v10.25h-10.25z" fill="#7fba00"/>
            <path d="M1.175 12.575h10.25v10.25H1.175z" fill="#00a4ef"/>
            <path d="M12.575 12.575h10.25v10.25h-10.25z" fill="#ffb900"/>
          </svg>
          <span className="text-sm font-semibold text-gray-700">Microsoft</span>
        </button>
      </div>
    </div>
  );
}
