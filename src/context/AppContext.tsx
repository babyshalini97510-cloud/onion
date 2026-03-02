import React, { createContext, useContext, useState, useEffect } from 'react';

export enum UserRole {
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
  MARKETING_SALES = 'MARKETING_SALES',
  NONE = 'NONE'
}

interface User {
  name: string;
  email: string;
}

interface AppContextType {
  role: UserRole;
  user: User | null;
  login: (role: UserRole, user?: User) => void;
  logout: () => void;
  inventory: {
    rawOnions: number;
    onionSeeds: number;
    powder: number;
    paste: number;
    tea: number;
    oil: number;
  };
  processingBatches: any[];
  completedBatches: any[];
  addFarmerInput: (data: any) => void;
  advanceBatch: (id: string) => void;
  sellProduct: (type: string, amount: number) => void;
  marketplaceListings: any[];
  pushToMarket: (type: string, amount: number) => void;
  cart: any[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
  orders: any[];
  reviews: any[];
  addReview: (review: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('w2w_role');
    return (saved as UserRole) || UserRole.NONE;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('w2w_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [inventory, setInventory] = useState({
    rawOnions: 400,
    onionSeeds: 150,
    powder: 30.0,
    paste: 20.0,
    tea: 5.0,
    oil: 6.0,
  });

  const [processingBatches, setProcessingBatches] = useState<any[]>([
    { id: '1', type: 'POWDER', input: '100 kg Fresh Onion', output: '15.00 kg', stage: 'Drying', nextStage: 'Grinding' },
    { id: '2', type: 'OIL', input: '50 kg Onion Seeds', output: '1.00 kg', stage: 'Extraction', nextStage: 'Filtration' }
  ]);

  const [completedBatches, setCompletedBatches] = useState<any[]>([]);

  const [marketplaceListings, setMarketplaceListings] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>(() => {
    const saved = localStorage.getItem('w2w_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<any[]>(() => {
    const saved = localStorage.getItem('w2w_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<any[]>(() => {
    const saved = localStorage.getItem('w2w_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('w2w_role', role);
    localStorage.setItem('w2w_user', JSON.stringify(user));
    localStorage.setItem('w2w_inventory', JSON.stringify(inventory));
    localStorage.setItem('w2w_listings', JSON.stringify(marketplaceListings));
    localStorage.setItem('w2w_cart', JSON.stringify(cart));
    localStorage.setItem('w2w_orders', JSON.stringify(orders));
    localStorage.setItem('w2w_reviews', JSON.stringify(reviews));
  }, [role, user, inventory, marketplaceListings, cart, orders, reviews]);

  const login = (newRole: UserRole, userData?: User) => {
    setRole(newRole);
    if (userData) setUser(userData);
  };

  const logout = () => {
    setRole(UserRole.NONE);
    setUser(null);
  };

  const addFarmerInput = (data: any) => {
    setInventory(prev => ({
      ...prev,
      rawOnions: data.type === 'Fresh Onion' ? prev.rawOnions + Number(data.quantity) : prev.rawOnions,
      onionSeeds: data.type === 'Onion Seeds' ? prev.onionSeeds + Number(data.quantity) : prev.onionSeeds,
    }));
  };

  const advanceBatch = (id: string) => {
    setProcessingBatches(prev => {
      const batch = prev.find(b => b.id === id);
      if (!batch) return prev;
      
      if (batch.nextStage === 'Completed') {
        const type = batch.type.toLowerCase();
        const amount = parseFloat(batch.output);
        setInventory(inv => ({
          ...inv,
          [type]: inv[type] + amount
        }));
        setCompletedBatches(comp => [...comp, { ...batch, stage: 'Completed', date: new Date().toLocaleTimeString() }]);
        return prev.filter(b => b.id !== id);
      }

      return prev.map(b => b.id === id ? {
        ...b,
        stage: b.nextStage,
        nextStage: 'Completed'
      } : b);
    });
  };

  const pushToMarket = (type: string, amount: number, name: string, description: string) => {
    if (inventory[type] >= amount) {
      setInventory(prev => ({ ...prev, [type]: prev[type] - amount }));
      setMarketplaceListings(prev => [...prev, { 
        id: Date.now().toString(), 
        type, 
        amount, 
        name,
        description,
        date: new Date().toLocaleDateString() 
      }]);
    }
  };

  const sellProduct = (type: string, amount: number) => {
    // Logic for selling from marketplace or inventory
  };

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleString(),
      status: 'Pending',
      customer: user?.name || 'Guest Customer'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const addReview = (review: any) => {
    setReviews(prev => [review, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      role, user, login, logout, inventory, processingBatches, completedBatches,
      addFarmerInput, advanceBatch, sellProduct, marketplaceListings, pushToMarket,
      cart, addToCart, removeFromCart, clearCart, placeOrder, orders,
      reviews, addReview
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
