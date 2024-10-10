"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface ProfileData {
  name: string;
  email: string;
  mobile: string;
  address: string;
}

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    address: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileData>();

  const handleEditClick = () => {
    reset(profile); 
    setIsModalOpen(true);
  };

  const onSubmit = (data: ProfileData) => {
    setProfile(data); 
    setIsModalOpen(false); 
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Mobile:</strong> {profile.mobile}
      </p>
      <p>
        <strong>address:</strong> {profile?.address}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleEditClick}
      >
        Edit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className={`border rounded w-full bg-black text-white p-2 `}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  className={`border rounded bg-black text-white w-full p-2 `}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Mobile</label>
                <input
                  type="tel"
                  {...register("mobile")}
                  className={`border rounded bg-black text-white w-full p-2 `}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">address</label>
                <input
                  type="text"
                  {...register("address")}
                  className={`border rounded bg-black text-white w-full p-2 `}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
