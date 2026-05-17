import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBasket, UserPlus, Plus, Edit, Trash2, Check, X, AlertCircle } from 'lucide-react';
import client from '../api/client';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  is_available: number;
}

const AdminDashboard: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-6">
        <nav className="space-y-2">
          <Link 
            to="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === '/admin' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link 
            to="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === '/admin/products' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <ShoppingBasket size={20} />
            Eissorten & mehr
          </Link>
          <Link 
            to="/admin/invite" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === '/admin/invite' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <UserPlus size={20} />
            Admin einladen
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 bg-slate-50/50">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/invite" element={<InviteAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-slate-800 mb-8 italic">Willkommen im Admin-Bereich</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 font-medium mb-2 uppercase tracking-wider text-xs">Aktion erforderlich</h3>
          <p className="text-2xl font-bold text-slate-800">Menü aktualisieren</p>
          <p className="text-slate-500 mt-2">Ändere Preise oder Verfügbarkeiten deiner Sorten.</p>
          <Link to="/admin/products" className="inline-block mt-6 text-blue-600 font-bold hover:underline">Zum Menü →</Link>
        </div>
      </div>
    </div>
  );
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await client.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      if (isAdding) {
        await client.post('/products', editingProduct);
        setMessage({ type: 'success', text: 'Produkt erfolgreich hinzugefügt!' });
      } else {
        await client.put(`/products/${editingProduct.id}`, editingProduct);
        setMessage({ type: 'success', text: 'Produkt erfolgreich aktualisiert!' });
      }
      setEditingProduct(null);
      setIsAdding(false);
      fetchProducts();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Fehler beim Speichern.' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Möchtest du dieses Produkt wirklich löschen?')) return;
    try {
      await client.delete(`/products/${id}`);
      setMessage({ type: 'success', text: 'Produkt gelöscht.' });
      fetchProducts();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Fehler beim Löschen.' });
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsAdding(false);
  };

  const startAdd = () => {
    console.log('Starting add product...');
    setEditingProduct({ 
      name: '', 
      description: '', 
      price: 0, 
      type: 'icecream', 
      is_available: 1 
    });
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-slate-800 italic">Produkte verwalten</h1>
        <button 
          onClick={startAdd}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Plus size={20} />
          Neues Produkt
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-serif font-bold mb-6 italic">{isAdding ? 'Neues Produkt' : 'Produkt bearbeiten'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Beschreibung</label>
                <input 
                  type="text" 
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Preis (€)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Kategorie</label>
                  <select 
                    value={editingProduct.type}
                    onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="icecream">Eissorte</option>
                    <option value="waffle">Waffel</option>
                    <option value="topping">Topping</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="is_available"
                  checked={editingProduct.is_available === 1}
                  onChange={(e) => setEditingProduct({ ...editingProduct, is_available: e.target.checked ? 1 : 0 })}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is_available" className="text-sm font-medium text-slate-700">Verfügbar</label>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 px-6 py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                >
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-600">Name</th>
              <th className="px-6 py-4 font-bold text-slate-600">Typ</th>
              <th className="px-6 py-4 font-bold text-slate-600">Preis</th>
              <th className="px-6 py-4 font-bold text-slate-600">Status</th>
              <th className="px-6 py-4 font-bold text-slate-600 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-800">{product.name}</span>
                  <p className="text-xs text-slate-500 mt-1">{product.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    product.type === 'icecream' ? 'bg-blue-100 text-blue-700' : 
                    product.type === 'waffle' ? 'bg-orange-100 text-orange-700' : 
                    'bg-pink-100 text-pink-700'
                  }`}>
                    {product.type === 'icecream' ? 'Eis' : product.type === 'waffle' ? 'Waffel' : 'Topping'}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">{product.price.toFixed(2)}€</td>
                <td className="px-6 py-4">
                  {product.is_available ? (
                    <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                      <Check size={16} /> Aktiv
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                      <X size={16} /> Inaktiv
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => startEdit(product)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Bearbeiten"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Löschen"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InviteAdmin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await client.post('/users/invite', { username, password });
      setMessage({ type: 'success', text: `Admin "${username}" wurde erfolgreich erstellt!` });
      setUsername('');
      setPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Fehler beim Erstellen des Nutzers.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold text-slate-800 mb-8 italic">Admin einladen</h1>
      
      {message && (
        <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <p className="text-slate-500 mb-8">Erstelle einen neuen Account für einen weiteren Administrator.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Benutzername</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="z.B. Marcel"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Passwort</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-200 disabled:opacity-70"
          >
            {loading ? 'Wird erstellt...' : 'Admin erstellen'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
