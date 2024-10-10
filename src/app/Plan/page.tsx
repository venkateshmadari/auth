'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Plan {
  id: number;
  name: string;
  price: number;
}

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null);
  
  console.log(plans);
  
  const { register, handleSubmit, reset } = useForm<Plan>();

  const handleAddEditModalOpen = (plan?: Plan) => {
    if (plan) {
      setCurrentPlanId(plan.id);
      reset(plan); // Populate form with existing plan data
    } else {
      setCurrentPlanId(null);
      reset(); // Reset form for new plan
    }
    setIsAddEditModalOpen(true);
  };

  const handleDeleteModalOpen = (planId: number) => {
    setCurrentPlanId(planId);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = (data: Plan) => {
    if (currentPlanId !== null) {
      // Edit existing plan
      setPlans((prev) =>
        prev.map((p) =>
          p.id === currentPlanId ? { ...p, name: data.name, price: data.price } : p
        )
      );
    } else {
      // Add new plan
      const newPlan: Plan = {
        ...data,
      };
      setPlans((prev) => [...prev, newPlan]);
    }
    setIsAddEditModalOpen(false);
  };

  const handleDeletePlan = () => {
    if (currentPlanId !== null) {
      setPlans((prev) => prev.filter((p) => p.id !== currentPlanId));
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Plans</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => handleAddEditModalOpen()}
      >
        Add Plan
      </button>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2 text-red-600">Name</th>
            <th className="border-b-2 border-gray-300 px-4 py-2 text-red-600">Price</th>
            <th className="border-b-2 border-gray-300 px-4 py-2 text-red-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="border-b border-gray-300 px-4 py-2 text-red-600">{plan.name}</td>
              <td className="border-b border-gray-300 px-4 py-2 text-red-600">${plan.price}</td>
              <td className="border-b border-gray-300 px-4 py-2 text-red-600">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleAddEditModalOpen(plan)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteModalOpen(plan.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {isAddEditModalOpen && (
        <AddEditPlanModal
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          onSubmit={handleSubmit(onSubmit)}
          register={register}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeletePlan}
          planName={plans.find(plan => plan.id === currentPlanId)?.name}
        />
      )}
    </div>
  );
};

interface AddEditPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  register: any;
}

const AddEditPlanModal: React.FC<AddEditPlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  register,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">{'Add/Edit Plan'}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              {...register('price', { required: true, valueAsNumber: true })}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 text-black py-1 px-3 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  planName?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  planName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Delete Plan</h2>
        <p>Are you sure you want to delete the plan "{planName}"?</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="mr-2 bg-gray-300 text-black py-1 px-3 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button onClick={onDelete} className="bg-red-500 text-white py-1 px-3 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
