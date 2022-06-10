/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import style from "../../styles/mainHeader.module.scss";

const RightSide = ({ accountFlag }) => {
  const router = useRouter();

  return accountFlag ? (
    <div className="rightSide flex-justify-start gap-3">
      <div
        onClick={() => router.push("/account")}
        className="myProfile cu-pointer"
      >
        <img src="https://rb.gy/g1pwyx" alt="" />
      </div>
    </div>
  ) : (
    <div className="rightSide flex-justify-start gap-3">
      <div className="search">
        <SearchIcon fill="#fff" width={25} className="cu-pointer" />
      </div>
      <div className="notfacition">
        <BellIcon fill="#fff" width={25} className="cu-pointer" />
      </div>
      <div
        onClick={() => router.push("/account")}
        className="myProfile cu-pointer"
      >
        <img src="https://rb.gy/g1pwyx" alt="" />
      </div>
    </div>
  );
};

const Navbar = ({ second = false, brand, accountFlag }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSmNavOpen, setIsSmNavOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 0) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.onclick = (e) => {
      if (!e.target.classList.contains("browse-btn")) {
        return setIsSmNavOpen(false);
      }
    };
  }, []);

  const hadelSmNav = () => {};

  return (
    <header className={`${style.mainHeader} ${isActive ? style.active : ""}`}>
      <div className="container flex-between">
        <div className="leftSide flex-justify-start">
          <div className="brand">
            <div className="img">
              <img
                width={second ? brand.width : 80}
                height={second ? brand.height : 70}
                alt="brand"
                src="https://rb.gy/ulxxee"
                className="cu-pointer"
                onClick={() => router.push("/")}
              />
            </div>
          </div>
          {!second && (
            <>
              <nav className={`pt-3 ps-4 ${style.smScreen}`}>
                <button
                  onClick={() => setIsSmNavOpen((prev) => !prev)}
                  className="btn browse-btn text-light m-0 fw-bold"
                >
                  Browse
                </button>
                <ul
                  className={`${
                    isSmNavOpen ? style.active : ""
                  } flex-center flex-column bg-dark text-center m-0 text-muted small`}
                >
                  <li
                    className={`cu-pointer py-2 ${style.hoverNavigate} ${style.active}`}
                  >
                    Home
                  </li>
                  <li className={`cu-pointer py-2 ${style.hoverNavigate}`}>
                    TV Shows
                  </li>
                  <li className={`cu-pointer py-2 ${style.hoverNavigate}`}>
                    Movies
                  </li>
                  <li className={`cu-pointer py-2 ${style.hoverNavigate}`}>
                    New & Popular
                  </li>
                  <li className={`cu-pointer py-2 ${style.hoverNavigate}`}>
                    My List
                  </li>
                </ul>
              </nav>
              <nav className={`${style.lgScreen}`}>
                <ul
                  className={`flex-justify-start align-items-center h-100 m-0 gap-3 text-muted small`}
                >
                  <li
                    className={`cu-pointer ${style.hoverNavigate} ${style.active}`}
                  >
                    Home
                  </li>
                  <li className={`cu-pointer ${style.hoverNavigate}`}>
                    TV Shows
                  </li>
                  <li className={`cu-pointer ${style.hoverNavigate}`}>
                    Movies
                  </li>
                  <li className={`cu-pointer ${style.hoverNavigate}`}>
                    New & Popular
                  </li>
                  <li className={`cu-pointer ${style.hoverNavigate}`}>
                    My List
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
        {!second ? (
          <RightSide />
        ) : (
          accountFlag && <RightSide accountFlag={accountFlag} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
