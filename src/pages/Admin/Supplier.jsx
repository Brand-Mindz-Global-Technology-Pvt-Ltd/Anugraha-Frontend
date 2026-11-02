import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Mail, Phone, X } from 'lucide-react';
const API_URL = 'http://localhost:5000/api';
const emptyForm = {
  supplier_name: '',
  contact_person: '',
  email: '',
  phone: '',
  rating: '0',
  status: 'Active',
  address: ''
};

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3000);
  };

  const getErrorMessage = (err) =>
    err.message === 'Failed to fetch'
      ? 'Unable to connect to the server. Please check your connection.'
      : err.message || 'Something went wrong. Please try again.';

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${API_URL}/suppliers`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to load suppliers.');
      }

      setSuppliers(data);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const openAddForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const handleEdit = (supplier) => {
    setForm({
      supplier_name: supplier.supplier_name || '',
      contact_person: supplier.contact_person || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      rating: String(supplier.rating ?? 0),
      status: supplier.status || 'Active',
      address: supplier.address || ''
    });
    setEditingId(supplier.id);
    setError('');
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.supplier_name.trim()) {
      const message = 'Please enter a supplier name.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    const rating = Number(form.rating);

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      const message = 'Rating must be between 0 and 5.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    try {
      setSaving(true);

      const isEditing = editingId !== null;
      const url = isEditing
        ? `${API_URL}/suppliers/${editingId}`
        : `${API_URL}/suppliers`;

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          supplier_name: form.supplier_name.trim(),
          rating
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to save supplier. Please try again.'
        );
      }

      resetForm();
      showToast(
        isEditing
          ? 'Supplier updated successfully!'
          : 'Supplier added successfully!'
      );

      await fetchSuppliers();
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      showToast(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (supplier) => {
    setError('');

    try {
      setDeletingId(supplier.id);

      const response = await fetch(
        `${API_URL}/suppliers/${supplier.id}`,
        { method: 'DELETE' }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to delete supplier. Please try again.'
        );
      }

      setSuppliers((previous) =>
        previous.filter((item) => item.id !== supplier.id)
      );

      showToast('Supplier deleted successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      showToast(message, 'error');
    } finally {
      setDeletingId(null);
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
            backgroundColor:
              toast.type === 'success' ? '#15803d' : '#dc2626',
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
        <h2>Supplier Management</h2>

        <button
          type="button"
          className="admin-btn-primary"
          onClick={() => {
            if (showForm) resetForm();
            else openAddForm();
          }}
          disabled={saving}
        >
          {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Supplier</>}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSave}
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '24px',
            marginBottom: '28px'
          }}
        >
          <h3 style={{ margin: '0 0 20px', color: '#0f172a' }}>
            {editingId !== null ? 'Edit Supplier' : 'Add New Supplier'}
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}
          >
            <div className="admin-form-group">
              <label htmlFor="supplier-name">Supplier Name *</label>
              <input
                id="supplier-name"
                className="admin-input"
                name="supplier_name"
                value={form.supplier_name}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="contact-person">Contact Person</label>
              <input
                id="contact-person"
                className="admin-input"
                name="contact_person"
                value={form.contact_person}
                onChange={handleChange}
                placeholder="Enter contact person"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="supplier-email">Email</label>
              <input
                id="supplier-email"
                className="admin-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="supplier-phone">Phone</label>
              <input
                id="supplier-phone"
                className="admin-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="supplier-rating">Rating (0–5)</label>
              <input
                id="supplier-rating"
                className="admin-input"
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="supplier-status">Status</label>
              <select
                id="supplier-status"
                className="admin-input"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="supplier-address">Address</label>
              <textarea
                id="supplier-address"
                className="admin-input"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={3}
              />
            </div>
          </div>

          {error && (
            <p role="alert" style={{ color: '#dc2626', marginTop: '16px' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : editingId !== null
                  ? 'Update Supplier'
                  : 'Save Supplier'}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              style={{
                background: 'transparent',
                border: '1px solid #cbd5e1',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#64748b'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!showForm && error && (
        <p role="alert" style={{ color: '#dc2626' }}>{error}</p>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Email &amp; Phone</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading suppliers...</td></tr>
            ) : suppliers.length === 0 ? (
              <tr><td colSpan="6">No suppliers found.</td></tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td style={{ fontWeight: 600 }}>{supplier.supplier_name}</td>
                  <td>{supplier.contact_person || '—'}</td>

                  <td>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} />
                        {supplier.email || '—'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} />
                        {supplier.phone || '—'}
                      </span>
                    </div>
                  </td>

                  <td>⭐ {Number(supplier.rating ?? 0).toFixed(1)}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        supplier.status === 'Active'
                          ? 'status-active'
                          : 'status-inactive'
                      }`}
                    >
                      {supplier.status || 'Active'}
                    </span>
                  </td>

                  <td>
                    <div className="action-icons">
                      <button
                        type="button"
                        title="Edit supplier"
                        aria-label={`Edit ${supplier.supplier_name}`}
                        className="action-icon"
                        onClick={() => handleEdit(supplier)}
                        disabled={saving || deletingId !== null}
                        style={{ background: 'none', border: 0, cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        type="button"
                        title="Delete supplier"
                        aria-label={`Delete ${supplier.supplier_name}`}
                        className="action-icon delete"
                        onClick={() => handleDelete(supplier)}
                        disabled={saving || deletingId === supplier.id}
                        style={{
                          background: 'none',
                          border: 0,
                          cursor: deletingId === supplier.id ? 'not-allowed' : 'pointer',
                          opacity: deletingId === supplier.id ? 0.5 : 1
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Supplier;
