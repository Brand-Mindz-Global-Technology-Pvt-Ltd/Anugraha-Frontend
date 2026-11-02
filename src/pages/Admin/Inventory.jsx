
import React, { useEffect, useState } from 'react';
import { Edit2, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/v1';

const getStockStatus = (stock, reorderLevel) => {
  if (Number(stock) <= 0) return 'Out of Stock';
  if (Number(stock) <= Number(reorderLevel)) return 'Low Stock';
  return 'In Stock';
};

const statusIcon = (status) => {
  if (status === 'In Stock') {
    return <CheckCircle size={14} style={{ marginRight: 4 }} />;
  }
  if (status === 'Low Stock') {
    return <AlertTriangle size={14} style={{ marginRight: 4 }} />;
  }
  return <XCircle size={14} style={{ marginRight: 4 }} />;
};

const statusClass = (status) => {
  if (status === 'In Stock') return 'status-instock';
  if (status === 'Low Stock') return 'status-lowstock';
  return 'status-outstock';
};

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [editingItem, setEditingItem] = useState(null);
  const [stockValue, setStockValue] = useState('');
  const [saving, setSaving] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3000);
  };

  const fetchInventory = async () => {
    try {
     const response = await fetch(`${API_URL}/inventory/products`);
const result = await response.json();

if (!response.ok) {
  throw new Error(result.message || 'Unable to load inventory.');
}

setInventory(
  (result.data || []).map((product) => ({
    ...product,
    id: product._id,
    sku: product.productId,
    reorder_level: product.reorderLevel ?? 10,
  }))
);
      setError('');
    } catch (err) {
      const message = err.message === 'Failed to fetch'
        ? 'Unable to connect to the server.'
        : err.message || 'Unable to load inventory.';

      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const inStockCount = inventory.filter(
    item => getStockStatus(item.stock, item.reorder_level) === 'In Stock'
  ).length;

  const lowStockCount = inventory.filter(
    item => getStockStatus(item.stock, item.reorder_level) === 'Low Stock'
  ).length;

  const outOfStockCount = inventory.filter(
    item => getStockStatus(item.stock, item.reorder_level) === 'Out of Stock'
  ).length;

  const openStockForm = (item) => {
    setEditingItem(item);
    setStockValue(String(item.stock ?? 0));
  };

  const handleStockUpdate = async (event) => {
    event.preventDefault();

    const newStock = Number(stockValue);

    if (
      stockValue.trim() === '' ||
      !Number.isInteger(newStock) ||
      newStock < 0
    ) {
      showToast('Enter a valid stock quantity.', 'error');
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/inventory/${editingItem.id}/stock`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: newStock })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to update stock.');
      }

      setInventory(previous =>
        previous.map(item =>
          item.id === editingItem.id
            ? { ...item, stock: newStock }
            : item
        )
      );

      setEditingItem(null);
      showToast('Stock updated successfully!');
    } catch (err) {
      showToast(
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server.'
          : err.message || 'Unable to update stock.',
        'error'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page-content">
      {toast.message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            maxWidth: 'min(420px, calc(100vw - 40px))',
            padding: '14px 20px',
            borderRadius: '8px',
            color: '#fff',
            backgroundColor: toast.type === 'success' ? '#15803d' : '#dc2626',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            zIndex: 10000,
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          {toast.message}
        </div>
      )}

      <div className="admin-header-row">
        <h2>Inventory Management</h2>
      </div>

      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '1 1 180px',
          padding: '16px 20px',
          borderRadius: '10px',
          background: '#dcfce7',
          border: '1px solid #bbf7d0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CheckCircle size={22} color="#166534" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>
              In Stock
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#166534' }}>
              {inStockCount}
            </div>
          </div>
        </div>

        <div style={{
          flex: '1 1 180px',
          padding: '16px 20px',
          borderRadius: '10px',
          background: '#fef3c7',
          border: '1px solid #fde68a',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertTriangle size={22} color="#92400e" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 500 }}>
              Low Stock
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#92400e' }}>
              {lowStockCount}
            </div>
          </div>
        </div>

        <div style={{
          flex: '1 1 180px',
          padding: '16px 20px',
          borderRadius: '10px',
          background: '#fee2e2',
          border: '1px solid #fecaca',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <XCircle size={22} color="#991b1b" />
          <div>
            <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 500 }}>
              Out of Stock
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#991b1b' }}>
              {outOfStockCount}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" style={{ color: '#dc2626', marginBottom: '16px' }}>
          {error}
        </p>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading inventory...</td></tr>
            ) : inventory.length === 0 ? (
              <tr><td colSpan="6">No products found.</td></tr>
            ) : (
              inventory.map(item => {
                const status = getStockStatus(item.stock, item.reorder_level);

                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      {item.sku || '—'}
                    </td>
                    <td style={{ fontWeight: 600, fontSize: '1.05rem' }}>
                      {item.stock}
                    </td>
                    <td>{item.reorder_level}</td>
                    <td>
                      <span
                        className={`status-badge ${statusClass(status)}`}
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        {statusIcon(status)}
                        {status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openStockForm(item)}
                        disabled={saving}
                        style={{
                          background: 'var(--primary-gold, #d4af37)',
                          color: '#111',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Edit2 size={13} /> Update Stock
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999
        }}>
          <form
            onSubmit={handleStockUpdate}
            style={{
              background: '#fff',
              padding: '24px',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '420px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0 }}>Update Stock</h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setEditingItem(null)}
                disabled={saving}
                style={{ background: 'none', border: 0, cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ marginBottom: '16px' }}>{editingItem.name}</p>

            <div className="admin-form-group">
              <label htmlFor="stock-quantity">Current Stock Quantity</label>
              <input
                id="stock-quantity"
                className="admin-input"
                type="number"
                min="0"
                step="1"
                value={stockValue}
                onChange={event => setStockValue(event.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                type="submit"
                className="admin-btn-primary"
                disabled={saving}
              >
                {saving ? 'Updating...' : 'Save Stock'}
              </button>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                disabled={saving}
                style={{
                  background: 'transparent',
                  border: '1px solid #cbd5e1',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Inventory;
