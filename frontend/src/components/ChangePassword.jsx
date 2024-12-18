import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi"

import api from "../libs/apiCall";
import Button from "./Button";
import InputField from "./TextField";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const submitPasswordHandler = async (data) => {
    try {
      setLoading(true);

      const { data: res } = await api.put(`/user/change-password`, data);

      if (res?.status === "success") {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-20'>
      <form onSubmit={handleSubmit(submitPasswordHandler)}>
        <div className=''>
          <p className='text-xl font-bold text-black dark:text-white mb-1'>
            Change Password
          </p>
          <span className='labelStyles'>
            This will be used to log into your account and complete high
            severity actions.
          </span>

          <div className='mt-6'>
            <InputField
              type='password'
              name='currentPassword'
              label='Current Password'
              register={register("currentPassword", {
                required: "Current Password is required!",
              })}
              error={
                errors.currentPassword ? errors.currentPassword.message : ""
              }
            />
            <InputField
              type='password'
              name='newPassword'
              label='New Password'
              register={register("newPassword", {
                required: "New Password is required!",
              })}
              error={errors.newPassword ? errors.newPassword.message : ""}
            />
            <InputField
              type='password'
              name='confirmPassword'
              label='Confirm Password'
              register={register(
                "confirmPassword",

                {
                  required: "Confirm Password is required!",
                  validate: (val) => {
                    const { newPassword } = getValues();

                    return newPassword === val || "Passwords does not match!";
                  },
                }
              )}
              error={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <Button
            disabled={loading}
            type='submit'
            className='bg-blue-600 text-white px-8'
          >
            {loading ? (
                  <BiLoader className="text-2xl text-white animate-spin" />
                ) : (
                  "Save"
                )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
