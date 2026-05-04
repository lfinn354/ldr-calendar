import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // This "listener" keeps the UI in sync even if you refresh the page
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleLogout = () => signOut(auth);

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={user.photoURL || ""} 
          referrerPolicy="no-referrer"
          alt="profile" 
          style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #ccc' }} 
        />
        <button 
          onClick={handleLogout}
          style={{ 
            fontSize: '12px', 
            background: 'none', 
            border: '1px solid #ff4444', 
            color: '#ff4444',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleLogin} style={{ padding: '8px 16px', cursor: 'pointer' }}>
      Sign in with Google
    </button>
  );
}