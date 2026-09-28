/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { SearchModal } from './components/common/SearchModal';
import { HeroBanner } from './components/home/HeroBanner';
import { CategorySlider } from './components/home/CategorySlider';
import { BestSellersSection } from './components/home/BestSellersSection';
import { TeamJerseysBanner } from './components/home/TeamJerseysBanner';
import { CustomDesignSection } from './components/home/CustomDesignSection';
import { RecentlyOrderedSection } from './components/home/RecentlyOrderedSection';
import { SpecialOffersSection } from './components/home/SpecialOffersSection';
import { CustomerReviewsSection } from './components/home/CustomerReviewsSection';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';
import { CustomStudioPage } from './components/custom/CustomStudioPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { TrackOrderPage } from './components/track/TrackOrderPage';
import { AccountPage } from './components/account/AccountPage';
import { ContactPage } from './components/common/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { INITIAL_PRODUCTS } from './data/mockData';
import { 
  dbService, 
  INITIAL_ORDERS, 
  INITIAL_BULK_JERSEYS, 
  INITIAL_BULK_POSTERS, 
  INITIAL_CUSTOM_DESIGNS 
} from './data/dbService';
import { 
  Product, 
  Order, 
  OrderStatus, 
  BulkTeamQuote, 
  BulkTeamPosterOrder, 
  CustomDesignOrder 
} from './types';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [studioPrefill, setStudioPrefill] = useState<any>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('PL123456');
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [accountTab, setAccountTab] = useState<'orders' | 'designs' | 'wishlist' | 'addresses' | 'profile'>('orders');

  // Shared Application States (Kept synchronized with Firestore and LocalStorage)
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [ordersList, setOrdersList] = useState<Order[]>(INITIAL_ORDERS);
  const [bulkJerseysList, setBulkJerseysList] = useState<BulkTeamQuote[]>(INITIAL_BULK_JERSEYS);
  const [bulkPostersList, setBulkPostersList] = useState<BulkTeamPosterOrder[]>(INITIAL_BULK_POSTERS);
  const [customDesignsList, setCustomDesignsList] = useState<CustomDesignOrder[]>(INITIAL_CUSTOM_DESIGNS);

  // Initialize data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [prods, ords, jerseys, posters, designs] = await Promise.all([
          dbService.getProducts(),
          dbService.getOrders(),
          dbService.getBulkJerseys(),
          dbService.getBulkPosters(),
          dbService.getCustomDesigns()
        ]);
        if (prods && prods.length > 0) setProductsList(prods);
        if (ords && ords.length > 0) setOrdersList(ords);
        if (jerseys && jerseys.length > 0) setBulkJerseysList(jerseys);
        if (posters && posters.length > 0) setBulkPostersList(posters);
        if (designs && designs.length > 0) setCustomDesignsList(designs);
      } catch (err) {
        console.warn('Error loading synchronized database state:', err);
      }
    }
    loadData();
  }, []);

  const navigateTo = (page: string, params?: any) => {
    if (params?.category) setSelectedCategory(params.category);
    if (params?.tab) setAccountTab(params.tab);
    if (params?.orderId) setTrackingOrderId(params.orderId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStudio = (prefill?: any) => {
    if (prefill) setStudioPrefill(prefill);
    setCurrentPage('custom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // PRODUCT HANDLERS
  const handleAddProduct = async (newProd: Product) => {
    setProductsList(prev => [newProd, ...prev]);
    await dbService.saveProduct(newProd);
  };

  const handleUpdateProduct = async (updated: Product) => {
    setProductsList(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    if (selectedProduct.id === updated.id) {
      setSelectedProduct(updated);
    }
    await dbService.saveProduct(updated);
  };

  const handleDeleteProduct = async (id: string) => {
    setProductsList(prev => prev.filter(p => p.id !== id));
    await dbService.deleteProduct(id);
  };

  // ORDER HANDLERS (Order Fulfillment flow)
  const handleOrderPlaced = async (order: Order) => {
    setOrdersList(prev => [order, ...prev.filter(o => o.id !== order.id)]);
    setTrackingOrderId(order.id);
    await dbService.createOrder(order);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const updated = await dbService.updateOrderStatus(orderId, newStatus);
    setOrdersList(updated);
  };

  // BULK ORDER HANDLERS
  const handleSubmitBulkJersey = async (quote: BulkTeamQuote) => {
    setBulkJerseysList(prev => [quote, ...prev.filter(q => q.id !== quote.id)]);
    await dbService.createBulkJersey(quote);
  };

  const handleUpdateBulkJerseyStatus = async (id: string, status: any) => {
    const updated = await dbService.updateBulkJerseyStatus(id, status);
    setBulkJerseysList(updated);
  };

  const handleSubmitBulkPoster = async (poster: BulkTeamPosterOrder) => {
    setBulkPostersList(prev => [poster, ...prev.filter(p => p.id !== poster.id)]);
    await dbService.createBulkPoster(poster);
  };

  const handleUpdateBulkPosterStatus = async (id: string, status: any) => {
    const updated = await dbService.updateBulkPosterStatus(id, status);
    setBulkPostersList(updated);
  };

  const handleSaveCustomDesign = async (design: CustomDesignOrder) => {
    setCustomDesignsList(prev => [design, ...prev.filter(d => d.id !== design.id)]);
    await dbService.createCustomDesign(design);
  };

  const handleUpdateCustomDesignStatus = async (id: string, status: any) => {
    const updated = await dbService.updateCustomDesignStatus(id, status);
    setCustomDesignsList(updated);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        onProceedToCheckout={() => navigateTo('checkout')}
        onContinueShopping={() => navigateTo('shop')}
      />

      {/* Floating WhatsApp Support Button */}
      <WhatsAppButton />

      {/* Navbar (Hidden in admin view to match dedicated SaaS look) */}
      {currentPage !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={(page, params) => navigateTo(page, params)}
          onOpenSearch={() => setSearchModalOpen(true)}
        />
      )}

      {/* Content Rendering based on currentPage */}
      <div className="flex-1">
        {currentPage === 'home' && (
          <main>
            <HeroBanner
              onShopNow={() => navigateTo('shop')}
              onUploadDesign={() => handleOpenStudio()}
            />

            <CategorySlider
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                navigateTo('shop', { category: cat });
              }}
            />

            <BestSellersSection
              products={productsList}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => navigateTo('shop')}
            />

            <TeamJerseysBanner
              onGetStarted={() => navigateTo('team-jerseys')}
            />

            <CustomDesignSection
              onOpenStudio={handleOpenStudio}
            />

            <RecentlyOrderedSection
              products={productsList}
              onSelectProduct={handleSelectProduct}
            />

            <SpecialOffersSection
              onShopCategory={(cat) => {
                setSelectedCategory(cat);
                navigateTo('shop', { category: cat });
              }}
              onOpenTeamJerseys={() => navigateTo('team-jerseys')}
            />

            <CustomerReviewsSection />
          </main>
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={productsList}
            selectedCategoryInitial={selectedCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'collections' && (
          <ShopPage
            products={productsList}
            selectedCategoryInitial="All"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'offers' && (
          <ShopPage
            products={productsList.filter(p => p.discountPercent >= 30)}
            selectedCategoryInitial="All"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            relatedProducts={productsList.filter(p => p.id !== selectedProduct.id)}
            onSelectProduct={handleSelectProduct}
            onNavigateToCheckout={() => navigateTo('checkout')}
            onBackToShop={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'custom' && (
          <CustomStudioPage
            initialData={studioPrefill}
            onNavigateToCart={() => navigateTo('checkout')}
            onSubmitBulkJersey={handleSubmitBulkJersey}
            onSubmitBulkPoster={handleSubmitBulkPoster}
            onSaveCustomDesign={handleSaveCustomDesign}
          />
        )}

        {currentPage === 'team-jerseys' && (
          <CustomStudioPage
            initialData={{ productType: 'football-jersey', tab: 'bulk-jerseys' }}
            onNavigateToCart={() => navigateTo('checkout')}
            onSubmitBulkJersey={handleSubmitBulkJersey}
            onSubmitBulkPoster={handleSubmitBulkPoster}
            onSaveCustomDesign={handleSaveCustomDesign}
          />
        )}

        {currentPage === 'track' && (
          <TrackOrderPage
            initialOrderId={trackingOrderId}
            orders={ordersList}
            onBackToShop={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onOrderPlaced={handleOrderPlaced}
            onTrackOrder={(orderId) => navigateTo('track', { orderId })}
            onBackToShop={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'account' && (
          <AccountPage
            initialTab={accountTab}
            orders={ordersList}
            onNavigateToShop={() => navigateTo('shop')}
            onNavigateToTrack={(orderId) => navigateTo('track', { orderId })}
            onOpenStudio={handleOpenStudio}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigateToShop={() => navigateTo('shop')}
            onNavigateToCustom={() => navigateTo('custom')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            products={productsList}
            orders={ordersList}
            bulkJerseys={bulkJerseysList}
            bulkPosters={bulkPostersList}
            customDesigns={customDesignsList}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateBulkJerseyStatus={handleUpdateBulkJerseyStatus}
            onUpdateBulkPosterStatus={handleUpdateBulkPosterStatus}
            onUpdateCustomDesignStatus={handleUpdateCustomDesignStatus}
            onExitAdmin={() => navigateTo('home')}
          />
        )}
      </div>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <Footer onNavigate={(page) => navigateTo(page)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
