"use client";
import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const AddProjectType = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectTypeName = e.target.name.value;

    const projectType = {
      name: projectTypeName,
    };

    try {
      await axios.post(`${getBaseUrl()}/category`, projectType);
      toast.success("Project type added");
      e.target.reset();
    } catch (err) {
      toast.error("Something Error Found");
      // console.log(err);
    }
  };

  return (
    <div className="mx-auto max-w-lg p-8">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-2xl font-semibold">Project Type</h4>
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-lg font-semibold">
              Project Type
            </label>
            <input
              type="text"
              className="border-gray-300 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Project Type Name"
              name="name"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-teal-700 px-4 py-2 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Add Project Type
            </button>
          </div>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddProjectType;
