import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const emptyForm = {
  name: '',
};

const Category = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({
    message: '',
    type: 'success',
  });
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3000);
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);

      if (!response.ok) {
        throw new Error('Unable to load categories. Please try again.');
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      const message =
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please check your connection.'
          : err.message || 'Unable to load categories. Please try again.';

      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  // Open form for editing
  const handleEdit = (category) => {
    setEditingId(category.id);
    setForm({
      name: category.name || '',
    });
    setError('');
    setShowForm(true);
  };

  // Add or update category
  const handleSave = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim()) {
      const message = 'Please enter a category name.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    try {
      setSaving(true);

      const isEditing = editingId !== null;
      const url = isEditing
        ? `${API_URL}/categories/${editingId}`
        : `${API_URL}/categories`;

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
          (isEditing
            ? 'Unable to update the category. Please try again.'
            : 'Unable to add the category. Please try again.')
        );
      }

      resetForm();

      showToast(
        isEditing
          ? 'Category updated successfully!'
          : 'Category added successfully!',
        'success'
      );

      await fetchCategories();
    } catch (err) {
      const message =
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please check your connection.'
          : err.message || 'An error occurred while saving the category.';

      setError(message);
      showToast(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete category
  const handleDelete = async (category) => {
    setDeletingId(category.id);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}/categories/${category.id}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
          'Unable to delete the category. Please try again.'
        );
      }

      setCategories((previous) =>
        previous.filter((item) => item.id !== category.id)
      );

      showToast('Category deleted successfully!', 'success');
    } catch (err) {
      const message =
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please check your connection.'
          : err.message || 'An error occurred while deleting the category.';

      setError(message);
      showToast(message, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-page-content">
      {/* Bottom-right toast - same pattern as Product page */}
      {toast.message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            top: 'auto',
            maxWidth: 'min(420px, calc(100vw - 40px))',
            padding: '14px 20px',
            borderRadius: '8px',
            color: '#fff',
            backgroundColor:
              toast.type === 'success' ? '#15803d' : '#dc2626',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            zIndex: 10000,
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {toast.message}
        </div>
      )}

      <div className="admin-header-row">
        <h2>Category Management</h2>

        <button
          className="admin-btn-primary"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setForm(emptyForm);
              setEditingId(null);
              setError('');
              setShowForm(true);
            }
          }}
        >
          {showForm ? (
            <>
              <X size={18} /> Cancel
            </>
          ) : (
            <>
              <Plus size={18} /> Add Category
            </>
          )}
        </button>
      </div>

      {/* Add/Edit form - same pattern as Product page */}
      {showForm && (
        <form
          onSubmit={handleSave}
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '28px',
            marginBottom: '28px',
          }}
        >
          <h3
            style={{
              margin: '0 0 20px',
              color: '#0f172a',
              fontSize: '1.1rem',
            }}
          >
            {editingId !== null ? 'Edit Category' : 'Add New Category'}
          </h3>

          <div className="admin-form-group">
            <label htmlFor="category-name">Category Name</label>
            <input
              id="category-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              className="admin-input"
              placeholder="Enter category name"
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              style={{ color: '#dc2626', marginTop: '16px' }}
            >
              {error}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : editingId !== null
                  ? 'Update Category'
                  : 'Save Category'}
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
                color: '#64748b',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!showForm && error && (
        <p role="alert" style={{ color: '#dc2626' }}>
          {error}
        </p>
      )}

      {/* Categories table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading categories...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="4">No categories found.</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td style={{ fontWeight: 600 }}>{category.name}</td>

                  <td>—</td>

                  <td>
                    <span className="status-badge status-active">
                      Active
                    </span>
                  </td>

                  <td>
                    <div className="action-icons">
                      <button
                        type="button"
                        title="Edit category"
                        aria-label={`Edit ${category.name}`}
                        className="action-icon"
                        onClick={() => handleEdit(category)}
                        disabled={saving || deletingId !== null}
                        style={{
                          background: 'none',
                          border: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        type="button"
                        title="Delete category"
                        aria-label={`Delete ${category.name}`}
                        className="action-icon delete"
                        onClick={() => handleDelete(category)}
                        disabled={
                          saving || deletingId === category.id
                        }
                        style={{
                          background: 'none',
                          border: 0,
                          cursor:
                            deletingId === category.id
                              ? 'not-allowed'
                              : 'pointer',
                          opacity:
                            deletingId === category.id ? 0.5 : 1,
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

export default Category;
