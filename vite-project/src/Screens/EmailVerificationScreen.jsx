import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function EmailVerificationPage() {
  const { user: userInfo } = useContext(AuthContext);
  
  // Destructure user information
  const { name: userName, email: userEmail } = userInfo;

  return (
    <div className="flex justify-center items-center h-screen bg-violet-200">
      <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-400">
        <span role="img" aria-label="Verified" className="text-4xl mb-4 block">✅</span>
        <h2 className="text-3xl font-bold mb-2">{userName}</h2>
        <p className="text-lg mb-4">{userEmail}</p>
        <p className="text-gray-500">Your email address has been verified successfully.</p>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
