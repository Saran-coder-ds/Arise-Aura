import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  db, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'customer' | 'admin';
  phone?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  registerUser: (fullName: string, email: string, phone: string, address?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loginDemoCustomer: () => void;
  loginDemoAdmin: () => void;
  toggleAdminRole: () => void;
}

const ADMIN_EMAILS = ['saranshalini2006@gmail.com'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: User | null) => {
      if (fbUser) {
        const isAdminUser = fbUser.email ? ADMIN_EMAILS.includes(fbUser.email) : false;
        
        // Sync user profile in Firestore
        try {
          const userRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userRef);
          
          let role: 'customer' | 'admin' = isAdminUser ? 'admin' : 'customer';
          if (snap.exists() && snap.data().role) {
            role = snap.data().role;
          } else {
            await setDoc(userRef, {
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName || 'Customer',
              photoURL: fbUser.photoURL || '',
              role,
              createdAt: new Date().toISOString()
            }, { merge: true });
          }

          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || 'Valued Customer',
            photoURL: fbUser.photoURL,
            role: isAdminUser ? 'admin' : role
          });
        } catch (err) {
          console.warn('Could not sync user document to Firestore:', err);
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || 'Valued Customer',
            photoURL: fbUser.photoURL,
            role: isAdminUser ? 'admin' : 'customer'
          });
        }
      } else {
        // Check if there was a saved demo login
        const savedDemo = localStorage.getItem('arise_demo_user');
        if (savedDemo) {
          try {
            setUser(JSON.parse(savedDemo));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      localStorage.removeItem('arise_demo_user');
    } catch (err: unknown) {
      console.error('Google Sign In failed:', err);
      // Fallback gracefully to demo user if popup blocked in iframe
      loginDemoCustomer();
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string) => {
    const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase().trim());
    const loggedUser: AppUser = {
      uid: `user-${Date.now()}`,
      displayName: email.split('@')[0],
      email: email.trim(),
      photoURL: null,
      role: isAdminUser ? 'admin' : 'customer',
      phone: '+91 73586 41670'
    };
    localStorage.setItem('arise_demo_user', JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const registerUser = async (fullName: string, email: string, phone: string, address?: string) => {
    const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase().trim());
    const newUser: AppUser = {
      uid: `user-${Date.now()}`,
      displayName: fullName.trim(),
      email: email.trim(),
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
      role: isAdminUser ? 'admin' : 'customer',
      phone: phone.trim()
    };
    localStorage.setItem('arise_demo_user', JSON.stringify(newUser));
    setUser(newUser);

    try {
      await setDoc(doc(db, 'users', newUser.uid), {
        ...newUser,
        shippingAddress: address || '',
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn('Could not save user to Firestore:', err);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('arise_demo_user');
    setUser(null);
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.warn('Sign out error:', err);
    }
  };

  const loginDemoCustomer = () => {
    const demoUser: AppUser = {
      uid: 'demo-customer-001',
      displayName: 'Saran Shalini',
      email: 'customer@ariseaura.com',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'customer',
      phone: '+91 98765 43210'
    };
    localStorage.setItem('arise_demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const loginDemoAdmin = () => {
    const demoAdmin: AppUser = {
      uid: 'demo-admin-001',
      displayName: 'Admin Manager (Aura HQ)',
      email: 'saranshalini2006@gmail.com',
      photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'admin',
      phone: '+91 90765 43210'
    };
    localStorage.setItem('arise_demo_user', JSON.stringify(demoAdmin));
    setUser(demoAdmin);
  };

  const toggleAdminRole = () => {
    if (!user) {
      loginDemoAdmin();
      return;
    }
    const newRole: 'customer' | 'admin' = user.role === 'admin' ? 'customer' : 'admin';
    const updated = { ...user, role: newRole };
    setUser(updated);
    if (user.uid.startsWith('demo-')) {
      localStorage.setItem('arise_demo_user', JSON.stringify(updated));
    }
  };

  const isAdmin = user?.role === 'admin' || (user?.email ? ADMIN_EMAILS.includes(user.email) : false);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin,
      signInWithGoogle,
      signInWithEmail,
      registerUser,
      signOut,
      loginDemoCustomer,
      loginDemoAdmin,
      toggleAdminRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
