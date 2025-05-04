import React from 'react';
import { AuthService } from './auth.service';
// import { Button } from 'shadcn-ui'; // Uncomment if Shadcn UI is set up

const LoginPage: React.FC = () => {
  const handleSignIn = () => {
    AuthService.loginWithGoogle();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in to IntentTube</h1>
      {/* TODO: Replace with Shadcn UI Button if available */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage; 