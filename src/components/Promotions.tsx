import React, { useState, useMemo } from 'react';
import { useNotification } from '../context/NotificationContext';
import { PageHeader } from './common/PageHeader';
import { Table, Column } from './common/Table';

interface Promotion {
  id: string;
  local: string;
  description: string;
  percentage: number;
  expirationDate: string;
  code: string;
  minPurchase: number;
  maxDiscount: number;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}

interface PromotionFormData {
  local: string;
  description: string;
  percentage: number;
  expirationDate: string;
  code: string;
  minPurchase: number;
  maxDiscount: number;
  usageLimit: number;
  isActive: boolean;
}

const generatePromoCode = (prefix: string = '') => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding similar looking characters
  const length = 8;
  let code = '';
  
  // Add random characters
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  // Insert prefix if provided
  return prefix ? `${prefix}-${code}` : code;
};

const PromotionForm: React.FC<{
  onSubmit: (data: PromotionFormData) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<PromotionFormData>({
    local: '',
    description: '',
    percentage: 10,
    expirationDate: '',
    code: generatePromoCode(),
    minPurchase: 0,
    maxDiscount: 0,
    usageLimit: 100,
    isActive: true,
  });

  const [prefix, setPrefix] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const regenerateCode = () => {
    setFormData(prev => ({
      ...prev,
      code: generatePromoCode(prefix.trim())
    }));
  };

  const handlePercentageChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      percentage: value,
      maxDiscount: Math.round(prev.minPurchase * (value / 100))
    }));
  };

  const handleMinPurchaseChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      minPurchase: value,
      maxDiscount: Math.round(value * (prev.percentage / 100))
    }));
  };

  // Set minimum expiration date to tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dark-text">Create New Promotion</h2>
          <button
            onClick={onClose}
            className="text-dark-text-secondary hover:text-dark-text"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Local Selection */}
            <div>
              <label className="block text-dark-text mb-2">Local</label>
              <select
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                required
              >
                <option value="">Select a venue</option>
                <option value="All Venues">All Venues</option>
                <option value="Central Park Venue">Central Park Venue</option>
                <option value="City Theater">City Theater</option>
                <option value="Sports Complex">Sports Complex</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-dark-text mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                required
              />
            </div>

            {/* Percentage */}
            <div>
              <label className="block text-dark-text mb-2">Discount Percentage</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) => handlePercentageChange(Number(e.target.value))}
                  className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                  required
                />
                <span className="text-dark-text-secondary">%</span>
              </div>
            </div>

            {/* Expiration Date */}
            <div>
              <label className="block text-dark-text mb-2">Expiration Date</label>
              <input
                type="date"
                min={minDateString}
                value={formData.expirationDate}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                required
              />
            </div>

            {/* Promo Code Generation */}
            <div className="md:col-span-2">
              <label className="block text-dark-text mb-2">Promotion Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Prefix (optional)"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                  className="w-1/3 bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                />
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={formData.code}
                    readOnly
                    className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 font-mono"
                  />
                  <button
                    type="button"
                    onClick={regenerateCode}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-dark-text-secondary hover:text-dashboard-accent"
                  >
                    🔄
                  </button>
                </div>
              </div>
            </div>

            {/* Min Purchase */}
            <div>
              <label className="block text-dark-text mb-2">Minimum Purchase</label>
              <div className="flex items-center gap-2">
                <span className="text-dark-text-secondary">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.minPurchase}
                  onChange={(e) => handleMinPurchaseChange(Number(e.target.value))}
                  className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                  required
                />
              </div>
            </div>

            {/* Max Discount */}
            <div>
              <label className="block text-dark-text mb-2">Maximum Discount</label>
              <div className="flex items-center gap-2">
                <span className="text-dark-text-secondary">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                  className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                  required
                />
              </div>
            </div>

            {/* Usage Limit */}
            <div>
              <label className="block text-dark-text mb-2">Usage Limit</label>
              <input
                type="number"
                min="1"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
                required
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-dark-text-secondary"
              />
              <label className="text-dark-text">Active</label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-dark-text-secondary hover:text-dark-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-dashboard-accent hover:bg-dashboard-light text-white rounded-lg"
            >
              Create Promotion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Promotions = () => {
  const { showNotification } = useNotification();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      local: 'Central Park Venue',
      description: 'Summer Special Discount',
      percentage: 15,
      expirationDate: '2024-08-31',
      code: 'SUMMER2024',
      minPurchase: 50,
      maxDiscount: 100,
      usageLimit: 1000,
      usageCount: 234,
      isActive: true,
    },
    {
      id: '2',
      local: 'City Theater',
      description: 'Early Bird Theater Tickets',
      percentage: 20,
      expirationDate: '2024-07-15',
      code: 'EARLYBIRD',
      minPurchase: 75,
      maxDiscount: 150,
      usageLimit: 500,
      usageCount: 123,
      isActive: true,
    },
    {
      id: '3',
      local: 'All Venues',
      description: 'New Year Special',
      percentage: 25,
      expirationDate: '2024-12-31',
      code: 'NYE2024',
      minPurchase: 100,
      maxDiscount: 200,
      usageLimit: 2000,
      usageCount: 0,
      isActive: false,
    },
  ]);

  const handleDelete = (id: string) => {
    const promoToDelete = promotions.find(promo => promo.id === id);
    if (promoToDelete && promoToDelete.usageCount > 0) {
      showNotification('warning', `This promotion has been used ${promoToDelete.usageCount} times. Deleting it may affect reporting.`);
    }
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id: string) => {
    const promoToDelete = promotions.find(promo => promo.id === id);
    setPromotions(promotions.filter(promo => promo.id !== id));
    setShowDeleteConfirm(null);
    showNotification('error', `Promotion "${promoToDelete?.code}" has been deleted`);
  };

  const headerActions = useMemo(() => [
    {
      label: 'Create Promotion',
      icon: '➕',
      onClick: () => setShowForm(true),
      variant: 'primary' as const,
    }
  ], []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (date: string) => {
    const today = new Date();
    const expirationDate = new Date(date);
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const columns = useMemo<Column<Promotion>[]>(() => [
    {
      header: 'Local',
      key: 'local',
      className: 'text-dark-text font-medium'
    },
    {
      header: 'Description',
      key: 'description',
      className: 'text-dark-text-secondary'
    },
    {
      header: 'Discount',
      key: 'percentage',
      render: (promotion) => (
        <div className="flex flex-col">
          <span className="text-dark-text font-medium">{promotion.percentage}%</span>
          <span className="text-xs text-dark-text-secondary">
            Max: {formatCurrency(promotion.maxDiscount)}
          </span>
        </div>
      )
    },
    {
      header: 'Code',
      key: 'code',
      render: (promotion) => (
        <span className="font-mono bg-dark-primary px-2 py-1 rounded text-dashboard-accent">
          {promotion.code}
        </span>
      )
    },
    {
      header: 'Expiration',
      key: 'expirationDate',
      render: (promotion) => {
        const daysRemaining = getDaysRemaining(promotion.expirationDate);
        return (
          <div className="flex flex-col">
            <span className="text-dark-text">{formatDate(promotion.expirationDate)}</span>
            <span className={`text-xs ${
              daysRemaining < 7 ? 'text-red-500' :
              daysRemaining < 30 ? 'text-orange-500' :
              'text-dark-text-secondary'
            }`}>
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Expired'}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Usage',
      key: 'usageCount',
      render: (promotion) => (
        <div className="flex flex-col">
          <span className="text-dark-text">{promotion.usageCount} / {promotion.usageLimit}</span>
          <div className="w-24 h-1.5 bg-dark-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-dashboard-accent"
              style={{
                width: `${(promotion.usageCount / promotion.usageLimit) * 100}%`
              }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'isActive',
      render: (promotion) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            promotion.isActive
              ? 'bg-green-500/20 text-green-500'
              : 'bg-red-500/20 text-red-500'
          }`}
        >
          {promotion.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (promotion) => (
        <div className="flex items-center gap-3 text-dark-text-secondary">
          <button className="hover:text-dashboard-light transition-colors">✏️</button>
          <button className="hover:text-dashboard-light transition-colors">📊</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(promotion.id);
            }}
            className="hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
      )
    }
  ], []);

  const handleCreate = (formData: PromotionFormData) => {
    const newPromotion: Promotion = {
      id: Date.now().toString(),
      ...formData,
      usageCount: 0,
    };
    setPromotions([...promotions, newPromotion]);
    setShowForm(false);
    showNotification('success', `Promotion "${formData.code}" created successfully`);
  };

  return (
    <div className="p-8">
      <PageHeader 
        title="Promotions"
        actions={headerActions}
      />

      {showForm && (
        <PromotionForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-dark-text mb-4">Confirm Delete</h2>
            <p className="text-dark-text-secondary mb-6">
              Are you sure you want to delete this promotion? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-dark-text-secondary hover:text-dark-text"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Table
        data={promotions}
        columns={columns}
        onRowClick={(promotion) => console.log('Clicked promotion:', promotion)}
      />
    </div>
  );
};

export default Promotions; 