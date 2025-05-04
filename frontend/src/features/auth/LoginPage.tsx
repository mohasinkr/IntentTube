import React from 'react';
// import { Button } from 'shadcn-ui'; // Uncomment when Shadcn UI is set up

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in to IntentTube</h1>
      {/* TODO: Replace with Shadcn UI Button and Google OAuth logic */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in with Google</button>
    </div>
  );
};

export default LoginPage; 