import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, createPlan, updatePlan, deletePlan } from "./apis/plan.api.js";
import { UserContext } from "./App.jsx";
import "./AdminPlan.css";

const AdminPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: "",
    price: "",
    planType: "monthly",
  });

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Fetch plans on mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getPlans();
      // Handle both array and object responses
      const plansArray = Array.isArray(data) ? data : (data.plans || []);
      setPlans(plansArray);
    } catch (err) {
      setError("Failed to fetch plans");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for creating a new plan
  const openCreateModal = () => {
    setEditingPlan(null);
    setFormData({ 
      name: "", 
      description: "", 
      size: "", 
      price: "", 
      planType: "monthly", 
    });
    setShowModal(true);
  };

  // Open modal for editing a plan
  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      size: plan.size,
      price: plan.price,
      planType: plan.planType,
    });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingPlan(null);
    setFormData({ 
      name: "", 
      description: "", 
      size: "", 
      price: "", 
      planType: "monthly", 
    });
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingPlan) {
        await updatePlan(editingPlan._id, {
          name: formData.name,
          description: formData.description,
          size: Number(formData.size),
          price: Number(formData.price),
          planType: formData.planType,
        });
        setNotification("Plan updated successfully!");
      } else {
        await createPlan({
          name: formData.name,
          description: formData.description,
          size: Number(formData.size),
          price: Number(formData.price),
          planType: formData.planType,
        });
        setNotification("Plan created successfully!");
      }
      closeModal();
      fetchPlans();
    } catch (err) {
      setNotification("Failed to save plan");
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Handle delete plan
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      setLoading(true);
      await deletePlan(id);
      setNotification("Plan deleted successfully!");
      fetchPlans();
    } catch (err) {
      setNotification("Failed to delete plan");
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  if (loading && plans.length === 0) {
    return (
      <div className="admin-plan-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-plan-container">
      <div className="admin-plan-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate("/admin")}>
            ← Back to Admin
          </button>
          <h1>📋 Plan Management</h1>
          <p>Create and manage subscription plans</p>
        </div>
        <button className="create-btn" onClick={openCreateModal}>
          + Create Plan
        </button>
      </div>

      {notification && <div className="notification">{notification}</div>}

      {error && <div className="error-message">{error}</div>}

      <div className="plans-grid">
        {plans.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No plans yet</h3>
            <p>Create your first plan to get started</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div className="plan-card-admin" key={plan._id}>
              <div className="plan-card-header">
                <div className="plan-header-left">
                  <h2>{plan.name}</h2>
                  <span className={`plan-type-badge ${plan.planType}`}>
                    {plan.planType}
                  </span>
                </div>
                <p className="plan-price">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/{plan.planType}</span>
                </p>
              </div>
              <div className="plan-meta">
                <p className="plan-size">💾 {plan.size} GB Storage</p>
                <p className="razorpay-id">🔑 ID: {plan.razorpayPlanId || 'Auto-generated'}</p>
              </div>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-actions">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(plan)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(plan._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPlan ? "Edit Plan" : "Create New Plan"}</h2>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="plan-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Plan Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Starter, Pro, Enterprise"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="planType">Plan Type</label>
                  <select
                    id="planType"
                    name="planType"
                    value={formData.planType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the plan features..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="size">Storage Size (GB)</label>
                  <input
                    type="number"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">
                    Price (₹/{formData.planType === "monthly" ? "month" : "year"})
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 99"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlan;
