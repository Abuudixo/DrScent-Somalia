import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  TrendingUp, 
  Droplet, 
  Clock, 
  Check, 
  X,
  Activity,
  ChevronRight,
  Sparkles,
  Upload,
  Image
} from 'lucide-react';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Mock initial orders
const initialOrders = [
  { id: 'ORD-9821', customer: 'Marcus Sterling', date: '2026-05-18', items: 'Lobby Signature Bundle (1)', total: 595.00, status: 'Pending' },
  { id: 'ORD-9783', customer: 'Elena Rostova', date: '2026-05-19', items: 'Aura Elite Cold-Air Diffuser (1)', total: 450.00, status: 'Shipped' },
  { id: 'ORD-9642', customer: 'Sarah Al-Mansoori', date: '2026-05-19', items: 'Grand Oasis Signature Oil (2)', total: 170.00, status: 'Delivered' }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  
  // Dynamic State for catalog and orders
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  // Form Modals states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form Input States
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState<'diffusers' | 'oils' | 'portable' | 'bundles'>('oils');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImg, setProdImg] = useState('');
  const [prodImages, setProdImages] = useState<string[]>([]);
  const [prodDetails, setProdDetails] = useState('');
  const [prodSizes, setProdSizes] = useState('');

  // Image Upload Interactive States
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [dragActive, setDragActive] = useState(false);

  // Local File Upload Handlers (Handles single or multiple files)
  const handleMultipleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultBase64 = reader.result as string;
        setProdImages(prev => {
          if (prev.includes(resultBase64)) return prev;
          return [...prev, resultBase64];
        });
        
        // Auto-set the first uploaded file as the main product image if none is set
        setProdImg(current => current || resultBase64);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleMultipleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleMultipleFiles(e.target.files);
    }
  };

  const handleRemoveImage = (imgToRemove: string) => {
    setProdImages(prev => {
      const next = prev.filter(img => img !== imgToRemove);
      if (prodImg === imgToRemove) {
        setProdImg(next[0] || '');
      }
      return next;
    });
  };

  // Handle opening Product Modal for CREATE
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdPrice('');
    setProdCategory('oils');
    setProdDesc('');
    setProdImg(''); // Clear so user can upload/drag local photo directly
    setProdImages([]); // Reset images gallery
    setProdDetails('');
    setProdSizes('120ml');
    setUploadMode('file');
    setDragActive(false);
    setIsProductModalOpen(true);
  };

  // Handle opening Product Modal for EDIT
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdPrice(product.price.toString());
    setProdCategory(product.category);
    setProdDesc(product.description);
    setProdImg(product.image);
    setProdImages(product.images || [product.image]); // Load images gallery, fallback to single image
    setProdDetails(product.details);
    setProdSizes(product.sizes.join(', '));
    
    // Auto-detect if image is Base64 data or standard URL
    const isBase64 = product.image ? product.image.startsWith('data:') : false;
    setUploadMode(isBase64 ? 'file' : 'url');
    setDragActive(false);
    setIsProductModalOpen(true);
  };

  // Save Product (Handles both Add and Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prodImg) {
      alert('Please upload a product photo from your computer or supply an image URL.');
      return;
    }

    const priceNum = parseFloat(prodPrice) || 0;
    const sizesArray = prodSizes.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProduct) {
      // Edit mode
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        name: prodName,
        price: priceNum,
        category: prodCategory,
        description: prodDesc,
        image: prodImg,
        images: prodImages.length > 0 ? prodImages : [prodImg],
        details: prodDetails,
        sizes: sizesArray
      } : p));
    } else {
      // Add mode
      const newProduct: Product = {
        id: (products.length + 1).toString(),
        name: prodName.toUpperCase(),
        slug: prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: prodDesc,
        price: priceNum,
        rating: 5.0,
        reviewsCount: 1,
        image: prodImg,
        images: prodImages.length > 0 ? prodImages : [prodImg],
        category: prodCategory,
        details: prodDetails,
        benefits: ['100% pure organic concentrate', 'Formulated in Canada'],
        specs: [{ label: 'Capacity', value: '120ml' }],
        sizes: sizesArray
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setIsProductModalOpen(false);
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to retire this product from the atelier archive?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'Pending' | 'Shipped' | 'Delivered') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  // Calculate aggregates
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 12480; // include historical

  return (
    <div 
      style={{ backgroundColor: '#FFFFFF', color: '#0E0E0E', minHeight: '100vh' }}
      className="font-sans flex flex-col md:flex-row overflow-x-hidden bg-white text-matte-black"
    >
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col p-6 space-y-8 bg-white">
        <div className="flex items-center justify-between bg-white">
          <div className="flex flex-col bg-white gap-2">
            <img 
              src="/drscent-logo-removebg-preview.png" 
              alt="Dr Scent Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain self-start" 
            />
            <span className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase bg-white">
              EXECUTIVE ATELIER
            </span>
          </div>
          <Link to="/" className="text-zinc-500 hover:text-[#C5A059] transition-colors p-1.5 border border-zinc-200 rounded-sm bg-white">
            <ArrowLeft className="w-4 h-4 bg-white" />
          </Link>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none border-b border-zinc-200 md:border-b-0 bg-white">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3.5 px-4 py-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-300 w-full whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'bg-[#C5A059] text-black shadow-md font-extrabold' 
                : 'text-zinc-500 hover:bg-zinc-50 hover:text-black border border-transparent hover:border-zinc-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 flex-shrink-0 bg-transparent" />
            <span>OVERVIEW & TELEMETRY</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-3.5 px-4 py-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-300 w-full whitespace-nowrap ${
              activeTab === 'products' 
                ? 'bg-[#C5A059] text-black shadow-md font-extrabold' 
                : 'text-zinc-500 hover:bg-zinc-50 hover:text-black border border-transparent hover:border-zinc-200'
            }`}
          >
            <Package className="w-4 h-4 flex-shrink-0 bg-transparent" />
            <span>PRODUCTS CATALOG</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3.5 px-4 py-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-300 w-full whitespace-nowrap ${
              activeTab === 'orders' 
                ? 'bg-[#C5A059] text-black shadow-md font-extrabold' 
                : 'text-zinc-500 hover:bg-zinc-50 hover:text-black border border-transparent hover:border-zinc-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 flex-shrink-0 bg-transparent" />
            <span>ORDERS QUEUE</span>
          </button>

        </nav>

        {/* Quick Brand Info removed */}
      </aside>

      {/* Main Workspace Panel */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-7xl">
        <AnimatePresence mode="wait">
          
          {/* VIEW: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-10 bg-white"
            >
              <div className="flex justify-between items-end border-b border-zinc-200 pb-5">
                <div>
                  <span className="text-[9px] text-[#C5A059] font-bold tracking-[0.3em] uppercase block">
                    TELEMETRY REPORT
                  </span>
                  <h1 className="font-serif text-3xl font-semibold tracking-widest text-[#0E0E0E] uppercase mt-1">
                    OVERVIEW
                  </h1>
                </div>
              </div>

              {/* KPI Widgets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Gross Sales */}
                <div className="p-6 border border-zinc-200 bg-white relative overflow-hidden group shadow-[0_4px_20px_0_rgba(0,0,0,0.02)] transition-all hover:shadow-md hover:border-zinc-300">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
                  <div className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase flex justify-between items-center">
                    <span>ESTIMATED SALES</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#C5A059]" />
                  </div>
                  <h2 className="font-mono text-2xl font-bold text-[#0E0E0E] mt-3">
                    ${totalRevenue.toFixed(2)}
                  </h2>
                  <p className="text-[9px] text-[#C5A059] font-bold tracking-wide mt-2">
                    +14.8% FROM LAST SESSION
                  </p>
                </div>

                {/* Orders count */}
                <div className="p-6 border border-zinc-200 bg-white relative overflow-hidden group shadow-[0_4px_20px_0_rgba(0,0,0,0.02)] transition-all hover:shadow-md hover:border-zinc-300">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
                  <div className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase flex justify-between items-center">
                    <span>ACTIVE ORDERS QUEUE</span>
                    <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <h2 className="font-mono text-2xl font-bold text-[#0E0E0E] mt-3">
                    {orders.length}
                  </h2>
                  <p className="text-[9px] text-zinc-500 font-bold tracking-wide mt-2">
                    {orders.filter(o => o.status === 'Pending').length} AWAITING DISPATCH
                  </p>
                </div>

                {/* Scent dispersion index */}
                <div className="p-6 border border-zinc-200 bg-white relative overflow-hidden group shadow-[0_4px_20px_0_rgba(0,0,0,0.02)] transition-all hover:shadow-md hover:border-zinc-300">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
                  <div className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase flex justify-between items-center">
                    <span>SCENT DISPERSION AREA</span>
                    <Droplet className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <h2 className="font-mono text-2xl font-bold text-[#0E0E0E] mt-3">
                    6,150 <span className="text-xs text-zinc-400">SQFT</span>
                  </h2>
                  <p className="text-[9px] text-green-600 font-bold tracking-wide mt-2">
                    100% HEALTHY Nebulizers
                  </p>
                </div>
              </div>

              {/* Graphic SVG Chart & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Sales Chart Card */}
                <div className="p-6 border border-zinc-200 bg-white lg:col-span-2 space-y-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.02)]">
                  <h3 className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">
                    WEEKLY REVENUE SENSORY FLOW
                  </h3>
                  
                  {/* Styled Luxury SVG Chart */}
                  <div className="relative h-60 w-full pt-4">
                    <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C5A059" stopOpacity="0.12" />
                          <stop offset="100%" stopColor="#C5A059" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="50" x2="500" y2="50" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="5,5" />
                      
                      {/* Area Under Curve */}
                      <path 
                        d="M 0 200 L 0 140 Q 80 160 160 110 T 320 80 T 500 40 L 500 200 Z" 
                        fill="url(#chartGrad)" 
                      />

                      {/* Curve Stroke */}
                      <path 
                        d="M 0 140 Q 80 160 160 110 T 320 80 T 500 40" 
                        fill="none" 
                        stroke="#C5A059" 
                        strokeWidth="2.5" 
                      />

                      {/* Dots on peak values */}
                      <circle cx="160" cy="110" r="4.5" fill="#FFFFFF" stroke="#C5A059" strokeWidth="2" />
                      <circle cx="320" cy="80" r="4.5" fill="#FFFFFF" stroke="#C5A059" strokeWidth="2" />
                      <circle cx="500" cy="40" r="4.5" fill="#FFFFFF" stroke="#C5A059" strokeWidth="2" />
                    </svg>

                    {/* Chart Labels */}
                    <div className="absolute bottom-1 left-0 w-full flex justify-between px-1 text-[8px] text-zinc-400 font-mono tracking-widest">
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                      <span>SAT</span>
                      <span>SUN</span>
                    </div>
                  </div>
                </div>

                {/* Scent Alert Feed */}
                <div className="p-6 border border-zinc-200 bg-white space-y-4 shadow-[0_4px_20px_0_rgba(0,0,0,0.02)]">
                  <h3 className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">
                    SYSTEM STATUS FEED
                  </h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                    
                    {/* Premium Inventory Stock Warning */}
                    <div className="flex gap-3 p-3 border border-red-200 bg-red-50/50 rounded-sm">
                      <Droplet className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-red-600 tracking-wider uppercase block">
                          WARNING: LOW FRAGRANCE STOCK
                        </span>
                        <p className="text-[10px] text-red-800 mt-0.5 leading-relaxed">
                          AURA SIGNATURE BUNDLE stock is down to <span className="font-bold text-red-600">3 units</span> in Toronto archive. Reorder recommended.
                        </p>
                      </div>
                    </div>

                    {/* VIP Client Event */}
                    <div className="flex gap-3 p-3 border border-zinc-200 bg-zinc-50/50 rounded-sm">
                      <Clock className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase block">
                          VIP MEMBER SIGNUP
                        </span>
                        <p className="text-[10px] text-zinc-655 mt-0.5 leading-relaxed">
                          New luxury account established by Victoria Thorne (Toronto, ON). Scent profile matching enabled.
                        </p>
                      </div>
                    </div>

                    {/* Order check */}
                    <div className="flex gap-3 p-3 border border-zinc-200 bg-zinc-50/50 rounded-sm">
                      <Activity className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase block">
                          TRANSACTION RESOLVED
                        </span>
                        <p className="text-[10px] text-zinc-650 mt-0.5 leading-relaxed">
                          New order ORD-9821 processed successfully. SECURE Checkout verified.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* VIEW: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 bg-white"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-200 pb-5">
                <div>
                  <span className="text-[9px] text-[#C5A059] font-bold tracking-[0.3em] uppercase block">
                    ARCHIVE RECORD MANAGER
                  </span>
                  <h1 className="font-serif text-3xl font-semibold tracking-widest text-[#0E0E0E] uppercase mt-1">
                    PRODUCTS CATALOG ({products.length})
                  </h1>
                </div>
                <Button
                  onClick={handleOpenAddModal}
                  className="bg-[#C5A059] hover:bg-[#A88544] text-black font-semibold rounded-none tracking-widest text-[10px] py-5 px-5 uppercase flex items-center gap-2 transform active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD NEW SCENT PRODUCT</span>
                </Button>
              </div>

              {/* Products Table */}
              <div className="border border-zinc-200 overflow-x-auto rounded-none bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.02)]">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[9px] text-zinc-500 font-bold tracking-widest uppercase bg-zinc-50/75">
                      <th className="p-4 pl-6">IMAGE</th>
                      <th className="p-4">PRODUCT Scent TITLE</th>
                      <th className="p-4">CATEGORY</th>
                      <th className="p-4">BASE PRICE</th>
                      <th className="p-4">SIZES</th>
                      <th className="p-4 pr-6 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-xs">
                     {products.map((product) => (
                      <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="w-12 h-14 bg-zinc-50 border border-zinc-200 overflow-hidden relative">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-serif font-semibold text-[#0E0E0E] tracking-wider uppercase line-clamp-1">
                              {product.name}
                            </span>
                            <span className="text-[9px] text-zinc-500 tracking-wide mt-0.5 line-clamp-1 max-w-sm">
                              {product.description}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-[9px] bg-zinc-50 border border-zinc-200 text-zinc-600 font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-[#C5A059] font-bold">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="p-4 text-zinc-500 font-mono">
                          {product.sizes.join(' / ')}
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleOpenEditModal(product)}
                              className="p-2 border border-zinc-200 text-zinc-500 hover:text-[#C5A059] hover:border-[#C5A059] hover:bg-zinc-50 transition-all duration-300"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 border border-zinc-200 text-zinc-500 hover:text-red-500 hover:border-red-500 hover:bg-zinc-50 transition-all duration-300"
                              title="Retire product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* VIEW: ORDERS QUEUE */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 bg-white"
            >
              <div className="flex justify-between items-end border-b border-zinc-200 pb-5">
                <div>
                  <span className="text-[9px] text-[#C5A059] font-bold tracking-[0.3em] uppercase block">
                    ORDER FULFILLMENT QUEUE
                  </span>
                  <h1 className="font-serif text-3xl font-semibold tracking-widest text-[#0E0E0E] uppercase mt-1">
                    ORDERS LIST
                  </h1>
                </div>
              </div>

              {/* Orders Table */}
              <div className="border border-zinc-200 overflow-x-auto bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.02)]">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[9px] text-zinc-500 font-bold tracking-widest uppercase bg-zinc-50/75">
                      <th className="p-4 pl-6">ORDER ID</th>
                      <th className="p-4">CLIENT NAME</th>
                      <th className="p-4">ORDER DATE</th>
                      <th className="p-4">ITEMS CONFIGURED</th>
                      <th className="p-4">ESTIMATED TOTAL</th>
                      <th className="p-4">LOGISTICS STATUS</th>
                      <th className="p-4 pr-6 text-right">MANAGE STATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-xs">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-4 pl-6 font-mono text-[#C5A059] font-semibold">
                          {order.id}
                        </td>
                        <td className="p-4 font-semibold text-[#0E0E0E]">
                          {order.customer}
                        </td>
                        <td className="p-4 text-zinc-500 font-mono">
                          {order.date}
                        </td>
                        <td className="p-4 text-zinc-700 font-serif tracking-wide uppercase line-clamp-1 max-w-[200px]">
                          {order.items}
                        </td>
                        <td className="p-4 font-mono font-bold text-[#C5A059]">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <span className={`text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase rounded-sm border ${
                            order.status === 'Pending' 
                              ? 'bg-amber-50 text-amber-600 border-amber-250' 
                              : order.status === 'Shipped'
                                ? 'bg-blue-50 text-blue-600 border-blue-250'
                                : 'bg-green-50 text-green-600 border-green-250'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex gap-1.5 justify-end">
                            {order.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
                                className="px-3 py-1.5 border border-zinc-200 text-zinc-500 hover:text-blue-600 hover:border-blue-500 hover:bg-zinc-50 text-[8px] font-bold tracking-wider uppercase transition-all duration-300"
                              >
                                DISPATCH SHIPMENT
                              </button>
                            )}
                            {order.status === 'Shipped' && (
                              <button
                                onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                                className="px-3 py-1.5 border border-zinc-200 text-zinc-500 hover:text-green-600 hover:border-green-500 hover:bg-zinc-50 text-[8px] font-bold tracking-wider uppercase transition-all duration-300"
                              >
                                CONFIRM DELIVERY
                              </button>
                            )}
                            {order.status === 'Delivered' && (
                              <div className="flex items-center gap-1.5 text-zinc-500 text-[9px] font-bold tracking-widest uppercase pr-2">
                                <Check className="w-3.5 h-3.5 text-green-600" />
                                <span>FULFILLED</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}



        </AnimatePresence>
      </main>

      {/* CREATE & EDIT PRODUCT MODAL DRAWER */}
      <AnimatePresence>
        {isProductModalOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-lg bg-white text-matte-black border-l border-zinc-200 p-6 md:p-8 z-50 overflow-y-auto flex flex-col justify-start shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-zinc-200 pb-5 mb-6">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="font-serif text-lg tracking-wider uppercase font-semibold text-[#0E0E0E]">
                    {editingProduct ? 'EDIT ATELIER FORMULA' : 'ADD NEW LUXURY PRODUCT'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 hover:text-black text-zinc-400 hover:bg-zinc-50 transition-colors border border-zinc-200 rounded-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSaveProduct} className="space-y-5 flex-1 flex flex-col">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. AURA COMPACT DIFFUSER"
                    className="w-full bg-white border border-zinc-200 focus:border-[#C5A059] p-3 text-xs tracking-wider outline-none text-matte-black rounded-none placeholder-zinc-400 focus:ring-1 focus:ring-[#C5A059]/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">
                      Base Price ($)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.01"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      placeholder="e.g. 150"
                      className="w-full bg-white border border-zinc-200 focus:border-[#C5A059] p-3 text-xs tracking-wider font-mono outline-none text-matte-black rounded-none placeholder-zinc-400 focus:ring-1 focus:ring-[#C5A059]/20 transition-all"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">
                      Category
                    </label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as any)}
                      className="w-full bg-white border border-zinc-200 focus:border-[#C5A059] p-3 text-xs tracking-wider outline-none text-matte-black rounded-none focus:ring-1 focus:ring-[#C5A059]/20 transition-all"
                    >
                      <option value="diffusers">DIFFUSERS</option>
                      <option value="oils">AROMA OILS</option>
                      <option value="portable">PORTABLE</option>
                      <option value="bundles">LUXURY BUNDLES</option>
                    </select>
                  </div>

                </div>

                {/* Product Image Section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">
                      Product Scent Image
                    </label>
                    <div className="flex gap-3 text-[8px] font-bold tracking-widest uppercase">
                      <button
                        type="button"
                        onClick={() => setUploadMode('file')}
                        className={`pb-0.5 border-b transition-all ${
                          uploadMode === 'file' 
                            ? 'text-[#C5A059] border-[#C5A059]' 
                            : 'text-zinc-400 border-transparent hover:text-zinc-600'
                        }`}
                      >
                        BROWSE COMPUTER
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMode('url')}
                        className={`pb-0.5 border-b transition-all ${
                          uploadMode === 'url' 
                            ? 'text-[#C5A059] border-[#C5A059]' 
                            : 'text-zinc-400 border-transparent hover:text-zinc-600'
                        }`}
                      >
                        IMAGE URL
                      </button>
                    </div>
                  </div>

                  {uploadMode === 'file' ? (
                    <div className="space-y-4">
                      {/* Hidden Input for multiple files */}
                      <input
                        id="file-upload-input"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {prodImages.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[9px] font-bold tracking-widest text-[#C5A059] uppercase">
                            <span>Scent Photo Collection ({prodImages.length})</span>
                            <span className="text-zinc-400 font-normal">Click thumbnail to set as main cover</span>
                          </div>

                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 border border-zinc-200">
                            {prodImages.map((img, index) => {
                              const isPrimary = prodImg === img;
                              return (
                                <div 
                                  key={index}
                                  onClick={() => setProdImg(img)}
                                  className={`relative aspect-[3/4] bg-white border cursor-pointer group overflow-hidden transition-all duration-300 ${
                                    isPrimary 
                                      ? 'border-[#C5A059] ring-1 ring-[#C5A059]/40 shadow-lg shadow-[#C5A059]/5' 
                                      : 'border-zinc-200 hover:border-zinc-400'
                                  }`}
                                >
                                  <img 
                                    src={img} 
                                    alt={`Preview ${index + 1}`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  
                                  {/* Badges/Overlays */}
                                  {isPrimary && (
                                    <div className="absolute top-1 left-1 bg-[#C5A059] text-black text-[7px] font-extrabold tracking-widest px-1.5 py-0.5 uppercase">
                                      MAIN
                                    </div>
                                  )}

                                  {/* Hover Indicator to Set Primary */}
                                  {!isPrimary && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                      <span className="text-[8px] text-[#C5A059] font-bold tracking-widest uppercase text-center px-1">
                                        SET MAIN
                                      </span>
                                    </div>
                                  )}

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveImage(img);
                                    }}
                                    className="absolute top-1 right-1 p-1 bg-white hover:bg-red-50 text-zinc-500 hover:text-red-655 border border-zinc-200 hover:border-red-200 transition-colors shadow-sm"
                                    title="Remove this photo"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              );
                            })}

                            {/* Add More card inside the grid */}
                            <div 
                              onClick={() => document.getElementById('file-upload-input')?.click()}
                              className="border border-dashed border-zinc-200 hover:border-[#C5A059] bg-white aspect-[3/4] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50/50 transition-all duration-300"
                            >
                              <Plus className="w-5 h-5 text-zinc-400 mb-1" />
                              <span className="text-[8px] text-zinc-500 font-bold tracking-widest uppercase">
                                ADD MORE
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => document.getElementById('file-upload-input')?.click()}
                          className={`w-full min-h-[145px] border border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                            dragActive 
                              ? 'border-[#C5A059] bg-[#C5A059]/5' 
                              : 'border-zinc-200 bg-zinc-50/30 hover:border-[#C5A059]'
                          }`}
                        >
                          <Upload className={`w-6 h-6 mb-2.5 transition-colors ${dragActive ? 'text-[#C5A059]' : 'text-zinc-400 hover:text-zinc-500'}`} />
                          <span className="text-[9px] text-zinc-600 font-bold tracking-widest uppercase block">
                            {dragActive ? 'DROP TO UPLOAD FILES' : 'BROWSE COMPUTER IMAGES'}
                          </span>
                          <span className="text-[8px] text-zinc-450 tracking-wider mt-1.5 uppercase block">
                            Supports browsing multiple pictures at once
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="url"
                        value={prodImg}
                        onChange={(e) => setProdImg(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-white border border-zinc-200 focus:border-[#C5A059] p-3 text-xs tracking-wide outline-none text-matte-black rounded-none placeholder-zinc-400 font-mono"
                      />
                      {prodImg && (
                        <div className="relative border border-zinc-200 bg-zinc-50/50 p-4 flex gap-4 items-center">
                          <div className="w-20 h-24 bg-white border border-zinc-200 overflow-hidden relative flex-shrink-0">
                            <img 
                              src={prodImg} 
                              alt="URL Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback for invalid image urls
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[8px] text-[#C5A059] font-bold tracking-widest uppercase block">
                              URL PHOTO LINKED
                            </span>
                            <p className="text-[10px] text-zinc-500 mt-1 truncate">
                              {prodImg}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Scent sizes */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">
                    Supported Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={prodSizes}
                    onChange={(e) => setProdSizes(e.target.value)}
                    placeholder="e.g. 120ml, 500ml or Standard"
                    className="w-full bg-white border border-zinc-200 focus:border-[#C5A059] p-3 text-xs tracking-wider outline-none text-matte-black rounded-none placeholder-zinc-400 focus:ring-1 focus:ring-[#C5A059]/20 transition-all"
                  />
                </div>

                {/* Scent overview Description */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">
                    Aroma Brief Description
                  </label>
                  <textarea
                    required
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    rows={3}
                    placeholder="Brief description showing under item name..."
                    className="w-full bg-white border border-zinc-200 focus:border-[#C5A059] p-3 text-xs tracking-wider outline-none text-matte-black rounded-none placeholder-zinc-400 resize-none leading-relaxed focus:ring-1 focus:ring-[#C5A059]/20 transition-all"
                  />
                </div>

                {/* Premium Details */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">
                    Atelier Formula Full Details
                  </label>
                  <textarea
                    required
                    value={prodDetails}
                    onChange={(e) => setProdDetails(e.target.value)}
                    rows={4}
                    placeholder="Comprehensive formula specs, scent base notes, or tech details..."
                    className="w-full bg-white border border-zinc-200 focus:border-[#C5A059] p-3 text-xs tracking-wider outline-none text-matte-black rounded-none placeholder-zinc-400 resize-none leading-relaxed focus:ring-1 focus:ring-[#C5A059]/20 transition-all"
                  />
                </div>

                <div className="pt-6 mt-auto">
                  <button
                    type="submit"
                    className="w-full bg-[#C5A059] hover:bg-[#A88544] text-black font-semibold tracking-widest text-[10px] py-4 uppercase transition-all duration-300 transform active:scale-[0.98]"
                  >
                    {editingProduct ? 'UPDATE ARCHIVE LISTING' : 'COMMIT ARCHIVE LISTING'}
                  </button>
                </div>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
