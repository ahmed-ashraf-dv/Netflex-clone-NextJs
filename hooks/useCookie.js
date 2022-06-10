import { useMemo } from "react";

const getExpiresWithDays = (exDays) => {
  if (!exDays) return "";

  const DAYS = exDays * 24 * 60 * 60 * 1000;
  const date = new Date();
  date.setTime(date.getTime() + DAYS);

  let expires = "expires=" + date.toUTCString();

  return expires;
};

const useCookie = () => {
  const get = (name) => {
    if (typeof window === "undefined") return;

    name = `${name}=`;

    const decodedCookie = decodeURIComponent(window.document.cookie);
    const splitingCookie = decodedCookie.split(";");

    const [currentCookie] = splitingCookie.map((cookie) => {
      cookie.replace(" ", "");

      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    });

    return currentCookie || undefined;
  };

  const set = ({ name, value, exDays = "", path = "/" }) => {
    if (typeof window === "undefined") return;

    const expires = getExpiresWithDays(exDays);

    // setCookie
    document.cookie = `${name}=${value}; ${expires}; path=${path}`;
  };

  const del = (name) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  const cookie = useMemo(
    () => ({
      get,
      set,
      del,
    }),
    []
  );

  return cookie;
};

export default useCookie;
