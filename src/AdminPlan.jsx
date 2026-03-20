import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, createPlan, updatePlan, deletePlan } from "./apis/plan.api.js";
import { UserContext } from "./App.jsx";

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
      <div className="min-h-screen p-[30px] bg-[#f8fafc] text-[#1e293b] max-md:p-5">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-[3px] border-[#e2e8f0] border-t-[#3b82f6] rounded-full animate-spin"></div>
          <p>Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-[30px] bg-[#f8fafc] text-[#1e293b] max-md:p-5">
      <div className="flex justify-between items-start mb-[30px] flex-wrap gap-5 max-md:flex-col">
        <div className="flex flex-col gap-2">
          <button className="bg-[#f1f5f9] border border-[#e2e8f0] text-[#3b82f6] p-[8px_16px] rounded-lg cursor-pointer text-[0.9rem] transition-all duration-200 w-fit font-medium hover:bg-[#3b82f6] hover:text-white" onClick={() => navigate("/admin")}>
            ← Back to Admin
          </button>
          <h1 className="text-[2rem] m-0 text-[#1e293b] font-bold">📋 Plan Management</h1>
          <p className="text-[#64748b] m-0 text-[1rem]">Create and manage subscription plans</p>
        </div>
        <button className="bg-[#3b82f6] text-white border-none p-[14px_28px] rounded-lg text-[1rem] font-semibold cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(59,130,246,0.2)] hover:bg-[#2563eb] hover:-translate-y-[1px] hover:shadow-[0_4px_8px_rgba(59,130,246,0.3)] max-md:w-full" onClick={openCreateModal}>
          + Create Plan
        </button>
      </div>

      {notification && <div className="bg-[#10b981] text-white p-[14px_20px] rounded-lg mb-5 text-center animate-in slide-in-from-top-2 duration-300">{notification}</div>}

      {error && <div className="bg-[#ef4444] text-white p-[14px_20px] rounded-lg mb-5 text-center">{error}</div>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
        {plans.length === 0 ? (
          <div className="col-span-full text-center py-[60px] px-5 bg-white border-2 border-dashed border-[#e2e8f0] rounded-2xl">
            <div className="text-[4rem] mb-4 opacity-60">📭</div>
            <h3 className="m-[0_0_8px_0] text-[1.4rem] text-[#1e293b]">No plans yet</h3>
            <p className="text-[#64748b] m-0">Create your first plan to get started</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:border-[#3b82f6] hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] hover:-translate-y-[2px]" key={plan._id}>
              <div className="flex justify-between items-start mb-4 flex-wrap gap-3 max-md:flex-col max-md:items-start">
                <div className="flex flex-col gap-2">
                  <h2 className="m-0 text-[1.4rem] text-[#1e293b] font-semibold">{plan.name}</h2>
                  <span className={`inline-block py-1 px-3 rounded-md text-[0.75rem] font-semibold uppercase tracking-[0.5px] ${plan.planType === 'monthly' ? 'bg-[#dbeafe] text-[#1d4ed8]' : 'bg-[#dcfce7] text-[#166534]'}`}>
                    {plan.planType}
                  </span>
                </div>
                <p className="flex items-baseline gap-[2px] m-0">
                  <span className="text-[1rem] text-[#64748b] font-medium">₹</span>
                  <span className="text-[1.5rem] text-[#1e293b] font-bold">{plan.price}</span>
                  <span className="text-[0.875rem] text-[#64748b]">/{plan.planType}</span>
                </p>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3 mb-4 border border-[#f1f5f9]">
                <p className="text-[#3b82f6] text-[0.875rem] font-semibold m-[0_0_8px_0]">💾 {plan.size} GB Storage</p>
                <p className="text-[#64748b] text-[0.75rem] font-mono m-0 break-all">🔑 ID: {plan.razorpayPlanId || 'Auto-generated'}</p>
              </div>
              <p className="text-[#64748b] text-[0.875rem] leading-[1.5] mb-5">{plan.description}</p>
              <div className="flex gap-3">
                <button
                  className="flex-1 py-2.5 px-4 rounded-lg text-[0.875rem] font-medium cursor-pointer transition-all duration-200 border bg-[#f1f5f9] text-[#3b82f6] border-[#e2e8f0] hover:bg-[#e0f2fe] hover:border-[#0ea5e9] hover:text-[#0369a1]"
                  onClick={() => openEditModal(plan)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="flex-1 py-2.5 px-4 rounded-lg text-[0.875rem] font-medium cursor-pointer transition-all duration-200 border bg-[#fef2f2] text-[#dc2626] border-[#fecaca] hover:bg-[#fee2e2] hover:border-[#f87171]"
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-5" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center py-6 px-7 border-b border-[#e2e8f0]">
              <h2 className="m-0 text-[1.5rem] text-[#1e293b] font-semibold">{editingPlan ? "Edit Plan" : "Create New Plan"}</h2>
              <button className="bg-transparent border-none text-[#64748b] text-[2rem] cursor-pointer leading-none transition-colors hover:text-[#1e293b]" onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-7">
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 mb-5">
                <div className="mb-0">
                  <label htmlFor="name" className="block mb-2 font-medium text-[#374151] text-[0.875rem]">Plan Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Starter, Pro, Enterprise"
                    required
                    className="w-full p-[12px_16px] border border-[#d1d5db] rounded-lg bg-white text-[#1f2937] text-[0.875rem] transition-all duration-200 box-border focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                  />
                </div>
                <div className="mb-0">
                  <label htmlFor="planType" className="block mb-2 font-medium text-[#374151] text-[0.875rem]">Plan Type</label>
                  <select
                    id="planType"
                    name="planType"
                    value={formData.planType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-[12px_16px] border border-[#d1d5db] rounded-lg bg-white text-[#1f2937] text-[0.875rem] transition-all duration-200 box-border focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] cursor-pointer"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 font-medium text-[#374151] text-[0.875rem]">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the plan features..."
                  rows={3}
                  required
                  className="w-full p-[12px_16px] border border-[#d1d5db] rounded-lg bg-white text-[#1f2937] text-[0.875rem] transition-all duration-200 box-border focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] resizer-y min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 mb-5">
                <div className="mb-0">
                  <label htmlFor="size" className="block mb-2 font-medium text-[#374151] text-[0.875rem]">Storage Size (GB)</label>
                  <input
                    type="number"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    min="1"
                    required
                    className="w-full p-[12px_16px] border border-[#d1d5db] rounded-lg bg-white text-[#1f2937] text-[0.875rem] transition-all duration-200 box-border focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                  />
                </div>
                <div className="mb-0">
                  <label htmlFor="price" className="block mb-2 font-medium text-[#374151] text-[0.875rem]">
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
                    className="w-full p-[12px_16px] border border-[#d1d5db] rounded-lg bg-white text-[#1f2937] text-[0.875rem] transition-all duration-200 box-border focus:outline-none focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-5 border-t border-[#f3f4f6] max-md:flex-col">
                <button type="button" className="py-3 px-6 rounded-lg text-[0.875rem] font-medium cursor-pointer transition-all duration-200 border border-[#d1d5db] text-[#374151] bg-[#f9fafb] hover:bg-[#f3f4f6] max-md:w-full" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="py-3 px-6 rounded-lg text-[0.875rem] font-medium cursor-pointer transition-all duration-200 border-none bg-[#3b82f6] text-white hover:bg-[#2563eb] disabled:bg-[#9ca3af] disabled:cursor-not-allowed max-md:w-full" disabled={loading}>
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
