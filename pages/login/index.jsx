/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Field from "../../components/Field";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Navbar from "../../components/Navbar";

import style from "../../styles/login.module.scss";

import redirectTo from "../../helper/redirectTo";

import { toast, ToastContainer } from "react-toastify";

import { useRouter } from "next/router";
import useCookie from "../../hooks/useCookie";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const Login = () => {
  const cookie = useCookie();
  const router = useRouter();

  const { signIn, signUp } = useAuth();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const notify = (msg) => {
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const loginHandelar = (values) => {
    const onSuccess = (token) => {
      cookie.set({
        name: "token",
        value: token,
        exDays: 7,
      });

      router.push("/");
    };

    const onError = (message) => {
      notify(message);
    };

    signIn({ values, onSuccess, onError });
  };

  const signUpHandelar = (values) => {
    const onSuccess = (token) => {
      cookie.set({
        name: "token",
        value: token,
        exDays: 7,
      });

      router.push("/");
    };

    const onError = (message) => {
      notify(message);
    };

    signUp({ values, onSuccess, onError });
  };

  return (
    <>
      <Head>
        <title>Netflex - Login</title>
      </Head>
      <main className={`${style.loginPage}`}>
        <Navbar second={true} brand={{ width: 150, height: 90 }} />
        <div className="container flex-center min-vh-100">
          <div className={`${style.backdrop}`}>
            <Image layout="fill" src="/login/background-login.jpg" alt="" />
          </div>
          <form
            onSubmit={handleSubmit(loginHandelar)}
            className={`${style.form} text-light flex-center flex-column`}
          >
            <h2>Sign In</h2>
            <Field
              error={errors.email?.message}
              register={register("email", {
                required: "This field is required",
              })}
              type="email"
              placeholder="Email"
            />
            <Field
              error={errors.password?.message}
              register={register("password", {
                required: "This field is required",
                minLength: { value: 8, message: "Min length is 8" },
                maxLength: { value: 16, message: "Max length is 16" },
              })}
              placeholder="Password"
              type="password"
            />
            <button className="btn btn-danger">Sign In</button>
            <p className={`${style.signupMethod} text-muted`}>
              New to Netflix?{" "}
              <span
                onClick={handleSubmit(signUpHandelar)}
                className="text-light"
              >
                Sign up now
              </span>
            </p>
          </form>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default Login;

// Get User Data
const LOCAL_API = process.env.NEXT_PUBLIC_LOCAL_API;

export const getServerSideProps = async ({ req }) => {
  const { cookies } = req;
  const { token } = cookies;

  if (token) {
    const { data } = await axios(`${LOCAL_API}/getuser?token=${token}`);

    if (data.id) return redirectTo("/account");
  }

  return { props: {} };
};
