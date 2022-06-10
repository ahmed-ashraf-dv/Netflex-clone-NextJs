import Image from "next/image";
import style from "../../styles/row.module.scss";

import { useDispatch } from "react-redux";
import { openModal } from "../../store/ModalSlice";
import { IMG_BASE_URL } from "../../utils/requests";

import axios from "axios";

const Thumbnail = ({ thumbnailData, notify }) => {
  const dispatch = useDispatch();

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

  return (
    <article
      onClick={() => openModalTrailer(thumbnailData.id)}
      className={`flex-center ${style.thumbnail}`}
    >
      <Image
        layout="fill"
        src={IMG_BASE_URL + thumbnailData.poster_path}
        alt=""
        width={260}
        height={144}
        objectFit="cover"
      />
    </article>
  );
};

export default Thumbnail;
