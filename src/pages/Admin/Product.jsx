import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Eye } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const mockSuppliers = [
  'GoldSmiths India',
  'Diamond Traders',
  'Silver Sparkle',
];

const emptyForm = {
  name: '',
  sku: '',
  category_id: '',
  supplier: '',
  price: '',
  status: 'Active',
  description: '',
  image: '',
  stock: 0,
};

const Product = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
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
  const [viewProduct, setViewProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3000);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error('Unable to load products. Please try again.');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      const message =
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please check your connection.'
          : err.message || 'Unable to load products. Please try again.';

      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);

      if (!response.ok) {
        throw new Error('Unable to load categories. Please try again.');
      }

      setCategories(await response.json());
    } catch (err) {
      const message =
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please check your connection.'
          : err.message || 'Unable to load categories. Please try again.';

      setError(message);
      showToast(message, 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
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

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name || '',
      sku: product.sku || '',
      category_id: product.category_id
        ? String(product.category_id)
        : '',
      supplier: product.supplier || '',
      price: product.price ?? '',
      status: product.status || 'Active',
      description: product.description || '',
      image: product.image || '',
      stock: product.stock ?? 0,
    });

    setError('');
    setViewProduct(null);
    setShowForm(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim()) {
      const message = 'Please enter a product name.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    if (
      form.price === '' ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      const message = 'Please enter a valid product price.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    if (!form.category_id) {
      const message = 'Please select a category.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),
        sku: form.sku.trim() || null,
        category_id: Number(form.category_id),
        supplier: form.supplier || null,
        price: Number(form.price),
        status: form.status,
        stock: Number(form.stock) || 0,
        description: form.description || null,
        image: form.image || null,
      };

      const isEditing = editingId !== null;
      const url = isEditing
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
          (isEditing
            ? 'Unable to update the product. Please try again.'
            : 'Unable to add the product. Please try again.')
        );
      }

      resetForm();
      showToast(
        isEditing
          ? 'Product updated successfully!'
          : 'Product added successfully!',
        'success'
      );

      await fetchProducts();
    } catch (err) {
      const message =
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please check your connection.'
          : err.message || 'An error occurred while saving the product.';

      setError(message);
      showToast(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    setDeletingId(product.id);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}/products/${product.id}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || 'Unable to delete the product. Please try again.'
        );
      }

      setProducts((previous) =>
        previous.filter((item) => item.id !== product.id)
      );

      showToast('Product deleted successfully!', 'success');
    } catch (err) {
      const message =
        err.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please check your connection.'
          : err.message || 'An error occurred while deleting the product.';

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
        <h2>Product Management</h2>

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
              <Plus size={18} /> Add Product
            </>
          )}
        </button>
      </div>

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
            {editingId !== null ? 'Edit Product' : 'Add New Product'}
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            <div className="admin-form-group">
              <label>Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="admin-input"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>SKU</label>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                type="text"
                className="admin-input"
                placeholder="e.g. NK-006"
              />
            </div>

            <div className="admin-form-group">
              <label>Category</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="admin-select"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label>Supplier</label>
              <select
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                className="admin-select"
              >
                <option value="">Select Supplier</option>
                {mockSuppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
                {form.supplier &&
                  !mockSuppliers.includes(form.supplier) && (
                    <option value={form.supplier}>
                      {form.supplier}
                    </option>
                  )}
              </select>
            </div>

            <div className="admin-form-group">
              <label>Price (₹)</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                min="0"
                step="0.01"
                className="admin-input"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="admin-select"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Stock</label>
              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                type="number"
                min="0"
                step="1"
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label>Image filename / URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                type="text"
                className="admin-input"
                placeholder="e.g. necklace.jpg"
              />
            </div>

            <div className="admin-form-group">
              <label>Description</label>
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                type="text"
                className="admin-input"
                placeholder="Enter product description"
              />
            </div>
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
                  ? 'Update Product'
                  : 'Save Product'}
            </button>

            <button
              type="button"
              onClick={resetForm}
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

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7">No products found.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td style={{ fontWeight: 600 }}>{product.name}</td>

                  <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {product.sku || '-'}
                  </td>

                  <td>{product.category_name || '-'}</td>
                  <td>{product.supplier || '-'}</td>

                  <td style={{ fontWeight: 600 }}>
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${product.status === 'Active'
                        ? 'status-active'
                        : 'status-inactive'
                        }`}
                    >
                      {product.status || 'Active'}
                    </span>
                  </td>

                  <td>
                    <div className="action-icons">
                      <button
                        type="button"
                        title="View product"
                        aria-label={`View ${product.name}`}
                        className="action-icon"
                        onClick={() => setViewProduct(product)}
                        style={{
                          background: 'none',
                          border: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        title="Edit product"
                        aria-label={`Edit ${product.name}`}
                        className="action-icon"
                        onClick={() => handleEdit(product)}
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
                        title="Delete product"
                        aria-label={`Delete ${product.name}`}
                        className="action-icon delete"
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        style={{
                          background: 'none',
                          border: 0,
                          cursor:
                            deletingId === product.id
                              ? 'not-allowed'
                              : 'pointer',
                          opacity: deletingId === product.id ? 0.5 : 1,
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

      {viewProduct && (
        <div
          onClick={() => setViewProduct(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 9999,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-view-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '480px',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <h3 id="product-view-title" style={{ margin: 0 }}>
                Product Details
              </h3>

              <button
                type="button"
                onClick={() => setViewProduct(null)}
                aria-label="Close product details"
                style={{
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {[
              ['Product Name', viewProduct.name],
              ['SKU', viewProduct.sku],
              ['Category', viewProduct.category_name],
              ['Supplier', viewProduct.supplier],
              [
                'Price',
                `₹${Number(viewProduct.price).toLocaleString('en-IN')}`,
              ],
              ['Status', viewProduct.status],
              ['Stock', viewProduct.stock],
              ['Description', viewProduct.description],
              ['Image', viewProduct.image],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: '1px solid #e2e8f0',
                }}
              >
                <strong>{label}</strong>
                <span style={{ overflowWrap: 'anywhere' }}>
                  {value === null || value === undefined || value === ''
                    ? '-'
                    : value}
                </span>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => handleEdit(viewProduct)}
              >
                <Edit2 size={16} /> Edit Product
              </button>

              <button
                type="button"
                onClick={() => setViewProduct(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid #cbd5e1',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
