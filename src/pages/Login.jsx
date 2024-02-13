import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Error from "../ui/Error";
import { useAuth } from "../auth/AuthContext";
import Loader from "../ui/Loader";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (isSubmitting) clearErrors("auth");
  }, [isSubmitting, clearErrors]);

  async function handleLogin(formData) {
    const { name, password } = formData;
    const { error } = await signIn(name, password);
    if (error) {
      setError("auth", { message: error.message });
    } else {
      navigate("/app", { replace: true });
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-10 flex flex-col gap-6 text-center">
          <h1 className=" text-4xl font-bold">Log In</h1>
          <p className="text-md font-light text-gray-500">Welcome back!</p>
        </div>
        <Input
          type="text"
          label="Email"
          error={formErrors?.name?.message}
          {...register("name", {
            required: "This field is required.",
          })}
        />
        <Input
          type="password"
          label="Password"
          error={formErrors?.password?.message}
          {...register("password", {
            required: "This field is required.",
          })}
        />
        <div className="mt-5 flex flex-col gap-5">
          <Button type="submit" variant="primary">
            <div className="flex justify-center gap-2 ">
              {isSubmitting && <Loader size="sm" color="white" />}
              Login
            </div>
          </Button>
          <div className="flex flex-col gap-5 text-center">
            <p className=" text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <NavLink to="/signup" className="text-sky-500">
                Sign Up
              </NavLink>
            </p>
            <div className="min-h-[25px]">
              {" "}
              {formErrors?.auth && (
                <Error size="md">{formErrors.auth.message}</Error>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
