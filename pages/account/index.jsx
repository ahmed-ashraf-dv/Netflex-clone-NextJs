import Navbar from "../../components/Navbar";
import Head from "next/head";

import style from "../../styles/account.module.scss";
import redirectTo from "../../helper/redirectTo";
import axios from "axios";

import useCookie from "../../hooks/useCookie";
import { useRouter } from "next/router";

const Account = ({ userDetails }) => {
  const cookie = useCookie();
  const router = useRouter();

  const logout = () => {
    cookie.del("token");

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Netflex - My Account</title>
      </Head>
      <main className={style.accountPage}>
        <Navbar second accountFlag brand={{ width: 120, height: 85 }} />
        <section className="main pt-5 mt-5 text-light pb-5">
          <div className={`container ${style.detailsParent}`}>
            <h2 className="fs-1">Account</h2>

            <div className="info">
              <p className="m-0 p-0 m-0 text-muted fw-bold mb-3">
                Membership & Billing
              </p>

              <div className="email-row flex-between">
                <p className="m-0 p-0 m-0 email">{userDetails.email}</p>
                <p className="m-0 p-0 m-0 btn btn-link text-decoration-none">
                  Change email
                </p>
              </div>
              <div className="password-row flex-between">
                <p className="m-0 p-0 m-0 password text-muted">
                  <span className="text-light">Password:</span> ********
                </p>
                <p className="m-0 p-0 m-0 btn btn-link text-decoration-none">
                  Change password
                </p>
              </div>
              <hr />

              <div className="paymend-row flex-between">
                <p className="m-0 p-0 m-0 text-muted fw-bold">
                  Paymend Details
                </p>
                <div className="text-end d-flex flex-column align-items-end">
                  <p className="m-0 p-0 m-0 btn btn-link text-decoration-none">
                    Manage payment info
                  </p>
                  <p className="m-0 p-0 m-0 btn btn-link text-decoration-none">
                    Add backup payment method
                  </p>
                  <p className="m-0 p-0 m-0 btn btn-link text-decoration-none">
                    Billing Details
                  </p>
                  <p className="m-0 p-0 m-0 btn btn-link text-decoration-none">
                    Change billing day
                  </p>
                </div>
              </div>
            </div>

            <div className="planDetails">
              <div className="plan-row flex-between">
                <p className="m-0 p-0 m-0 text-muted fw-bold">Plan Details</p>
                <p className="m-0 p-0 m-0 btn btn-link text-decoration-none">
                  Change plan
                </p>
              </div>
            </div>

            <div className="settings">
              <div className={`${style.settingsRow} flex-between`}>
                <p className="m-0 p-0 m-0 text-muted fw-bold">Settings</p>
                <p
                  onClick={logout}
                  className="m-0 p-0 m-0 btn btn-link text-decoration-none"
                >
                  Sign out of all devices
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Account;

// Get User Data
export const getServerSideProps = async ({ req }) => {
  const { cookies, headers } = req;
  const { host } = headers;
  const { token } = cookies;

  if (!token) return redirectTo("/login");

  const { data } = await axios(`http://${host}/api/getuser?token=${token}`);

  if (!data.id) return redirectTo("/login");

  return {
    props: {
      userDetails: data,
    },
  };
};
