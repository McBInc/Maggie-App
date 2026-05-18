import React, { createContext, useContext, useEffect, useState } from 'react';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { Platform } from 'react-native';

interface RevenueCatContextType {
  isPremium: boolean;
  offerings: PurchasesOffering | null;
  purchasePackage: (packageToPurchase: any) => Promise<boolean>;
  restorePurchases: () => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

export const RevenueCatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);

  useEffect(() => {
    const setup = async () => {
      // Configuration for RevenueCat
      // Note: In a real app, you'd use different keys for iOS and Android
      const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY || 'goog_placeholder';
      
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Purchases.configure({ apiKey });
        
        try {
          const offerings = await Purchases.getOfferings();
          if (offerings.current !== null) {
            setOfferings(offerings.current);
          }
          
          const customerInfo = await Purchases.getCustomerInfo();
          // Check for 'Premium' or 'premium' to match RevenueCat dashboard
          const hasPremium = customerInfo.entitlements.active['Premium'] !== undefined || 
                             customerInfo.entitlements.active['premium'] !== undefined;
          setIsPremium(hasPremium);
        } catch (e) {
          console.error('Error fetching offerings or customer info', e);
        }
      } else {
        // Mock for web preview
        console.log('RevenueCat is not supported on web. Using mock values.');
        setIsPremium(false); 
      }
    };

    setup();
  }, []);

  const purchasePackage = async (packageToPurchase: any) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      const hasPremium = customerInfo.entitlements.active['Premium'] !== undefined || 
                         customerInfo.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
      return hasPremium;
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error('Error purchasing package', e);
      }
      return false;
    }
  };

  const restorePurchases = async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();
      const hasPremium = customerInfo.entitlements.active['Premium'] !== undefined || 
                         customerInfo.entitlements.active['premium'] !== undefined;
      setIsPremium(hasPremium);
    } catch (e) {
      console.error('Error restoring purchases', e);
    }
  };

  return (
    <RevenueCatContext.Provider value={{ isPremium, offerings, purchasePackage, restorePurchases }}>
      {children}
    </RevenueCatContext.Provider>
  );
};

export const useRevenueCat = () => {
  const context = useContext(RevenueCatContext);
  if (context === undefined) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider');
  }
  return context;
};
