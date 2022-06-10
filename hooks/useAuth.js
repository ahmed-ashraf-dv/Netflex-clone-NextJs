import axios from "axios";
const useAuth = () => {
  const signIn = async ({ values, onSuccess, onError }) => {
    const { data } = await axios("/api/login", {
      method: "POST",
      data: values,
    });

    if (data.error) return onError(data.msg);

    onSuccess(data.token);
  };

  const signUp = async ({ values, onSuccess, onError }) => {
    const { data } = await axios("/api/signup", {
      method: "POST",
      data: values,
    });

    if (data.error) return onError(data.msg);

    onSuccess(data.token);
  };

  return { signIn, signUp };
};

export default useAuth;
