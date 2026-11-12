import api from "./api";

/**
 * Get the customer's MongoDB ObjectId (_id)
 */
export const getCustomerMongoId = () => {
  try {
    const directId = localStorage.getItem("customerMongoId");
    if (directId) return directId;

    const userStr = localStorage.getItem("customerUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.id || user._id || null;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Check if a customer is currently logged in with a valid token
 */
export const isCustomerLoggedIn = () => {
  return Boolean(localStorage.getItem("customerToken") && getCustomerMongoId());
};


export const fetchCustomerWishlist = async () => {
  const customerId = getCustomerMongoId();
  if (!customerId) {
    try {
      return JSON.parse(localStorage.getItem("customerWishlist") || "[]");
    } catch {
      return [];
    }
  }

  try {
    const res = await api.get(
      `/customers/wishlist/get-wishlist?customerId=${customerId}`
    );
    const products = (res.data?.data?.products || []).filter(
      (p) => p && (p._id || p.id)
    );
    localStorage.setItem("customerWishlist", JSON.stringify(products));
    window.dispatchEvent(new Event("wishlistUpdated"));
    return products;
  } catch (error) {
    console.warn("Failed to fetch customer wishlist from API:", error);
    try {
      return JSON.parse(localStorage.getItem("customerWishlist") || "[]");
    } catch {
      return [];
    }
  }
};

/**
 * Toggle a product in the customer's backend wishlist.
 * Uses the existing backend API: POST /customers/wishlist/add-wishlist
 */
export const toggleWishlistItem = async (product) => {
  const customerId = getCustomerMongoId();
  const productId = product._id || product.id;

  if (!productId) {
    return { success: false, message: "Invalid product" };
  }

  if (!customerId) {
    return { success: false, requireLogin: true };
  }

  try {
    const res = await api.post("/customers/wishlist/add-wishlist", {
      customerId,
      productId,
    });

    await fetchCustomerWishlist();
    return {
      success: true,
      message: res.data?.message || "Wishlist updated",
    };
  } catch (error) {
    console.error("Toggle wishlist error:", error);
    throw error;
  }
};

/**
 * Remove a product from the customer's backend wishlist.
 * Uses the existing backend API: DELETE /customers/wishlist/remove-product
 */
export const removeWishlistItem = async (productId) => {
  const customerId = getCustomerMongoId();

  if (!customerId) {
    try {
      const current = JSON.parse(
        localStorage.getItem("customerWishlist") || "[]"
      );
      const updated = current.filter(
        (item) => (item._id || item.id) !== productId
      );
      localStorage.setItem("customerWishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlistUpdated"));
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  try {
    const res = await api.delete("/customers/wishlist/remove-product", {
      data: { customerId, productId },
    });

    await fetchCustomerWishlist();
    return {
      success: true,
      message: res.data?.message || "Removed from wishlist",
    };
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    throw error;
  }
};

