/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import style from "../../styles/posterHome.module.scss";

import { useDispatch } from "react-redux";
import { openModal } from "../../store/ModalSlice";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { IMG_BASE_URL } from "../../utils/requests";
import axios from "axios";

const HomeCover = ({ netflixOriginals, notify }) => {
  const dispatch = useDispatch();
  const [randomSelected, setRandomSelected] = useState(null);

  const openModalTrailer = (videoId) => {
    axios(`http://localhost:3000/api/trailer?videoId=${videoId}`)
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

  useEffect(() => {
    const idx = Math.ceil(Math.random() * netflixOriginals.length);
    const randomSelected = netflixOriginals[idx];

    setRandomSelected(randomSelected);
  }, [setRandomSelected, netflixOriginals]);

  return (
    <section className={`${style.homeCoverSection}`}>
      {randomSelected && (
        <>
          <div className={`${style.imgBox} position-absolute`}>
            <img
              src={
                IMG_BASE_URL + randomSelected.backdrop_path ||
                randomSelected.poster_path
              }
              className="h-100 w-100"
              alt="error"
            />
          </div>
          <div className="container h-100">
            <div className={`${style.data} h-100`}>
              <div className={`${style.info} h-100`}>
                <h2 className={`text-light ${style.title}`}>
                  {randomSelected.title}
                </h2>
                <p className="text-light">{randomSelected.overview}</p>

                <div className={`${style.btns} flex-align-start gap-2`}>
                  <button
                    onClick={() => openModalTrailer(randomSelected.id)}
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
                    onClick={() => openModalTrailer(randomSelected.id)}
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
        </>
      )}
    </section>
  );
};

export default HomeCover;
