import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import Layout from "../layouts/Layout";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const registerOptions = {
    firstName: {
      required: "First name is required.",
    },
    lastName: {
      required: "Last name is required.",
    },
    email: {
      required: "Email is required.",
    },
    password: {
      required: "Password is required.",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters.",
      },
    },
    confirmPassword: {
      validate: (value: string) => {
        if (!value) {
          return "This field is required.";
        } else if (watch("password") !== value) {
          return "Your passwords do not match.";
        }
      },
    },
  };

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration successful!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  return (
    <Layout>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              autoComplete="given-name"
              className="border rounded w-full py-1 px-2 font-normal"
              type="text"
              {...register("firstName", registerOptions.firstName)}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              autoComplete="family-name"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastName", registerOptions.lastName)}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            autoComplete="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", registerOptions.email)}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            autoComplete="new-password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", registerOptions.password)}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            autoComplete="new-password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", registerOptions.confirmPassword)}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Create Account
          </button>
        </span>
      </form>
    </Layout>
  );
};

export default Register;
