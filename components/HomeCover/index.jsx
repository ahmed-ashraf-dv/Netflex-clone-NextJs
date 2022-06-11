/* eslint-disable @next/next/no-img-element */
import style from "../../styles/posterHome.module.scss";

import Image from "next/image";

import { useDispatch } from "react-redux";
import { openModal } from "../../store/ModalSlice";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { IMG_BASE_URL } from "../../utils/requests";
import axios from "axios";

const HomeCover = ({ reandomMovie, notify }) => {
  const dispatch = useDispatch();

  const openModalTrailer = (videoId) => {
    axios(`/api/trailer?videoId=${videoId}`)
      .then(({ data }) => {
        if (!data.youtubeId) {
          return notify("error in server test another video");
        }

        dispatch(openModal({ currentVideoId: data.youtubeId, id: videoId }));
      })
      .catch((err) => {
        notify(err.message);
      });
  };

  return (
    <section className={`${style.homeCoverSection}`}>
      <div className={`${style.imgBox} position-absolute w-100`}>
        <Image
          layout="fill"
          alt="error"
          priority={Math.random()}
          src={
            IMG_BASE_URL + reandomMovie.backdrop_path ||
            reandomMovie.poster_path
          }
        />
      </div>
      <div className="container h-100">
        <div className={`${style.data} h-100`}>
          <div className={`${style.info} h-100`}>
            <h2 className={`text-light ${style.title}`}>
              {reandomMovie.title}
            </h2>
            <p className="text-light">{reandomMovie.overview}</p>

            <div className={`${style.btns} flex-align-start gap-2`}>
              <button
                onClick={() => openModalTrailer(reandomMovie.id)}
                className="btn btn-light flex-center p-2 ps-3 pe-3"
              >
                <FaPlay
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                  }}
                  fill="#000"
                />
                Play
              </button>
              <button
                onClick={() => openModalTrailer(reandomMovie.id)}
                className="btn btn-secondary flex-center p-2 ps-3 pe-3"
              >
                <AiOutlineExclamationCircle
                  fill="#fff"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "8px",
                  }}
                />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCover;
