import { useRef, useState } from "react";
import Thumbnail from "./Thumbnail";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import style from "../../styles/row.module.scss";

const Row = ({ title, movies, notify }) => {
  const rowParent = useRef();
  const [isScroll, setIsScroll] = useState(false);

  const handelScroll = (dimention) => {
    setIsScroll(true);

    const row = rowParent.current;

    if (dimention === "right") {
      return row.scrollTo(row.scrollLeft + row.clientWidth, 0);
    }

    if (dimention === "left") {
      return row.scrollTo(row.scrollLeft - row.clientWidth, 0);
    }
  };

  return (
    <div className={style.thumbnailsRow}>
      <h2 className="text-light fs-3 mb-3">{title}</h2>
      {isScroll && (
        <div
          onClick={() => handelScroll("left")}
          className={`${style.toLeft} ${style.arrow} flex-center`}
        >
          <BsChevronLeft fill="#fff" />
        </div>
      )}

      <div ref={rowParent} className={`${style.thumbnailsGroup} gap-2`}>
        {movies.map((thumbnailData, key) => (
          <Thumbnail notify={notify} key={key} thumbnailData={thumbnailData} />
        ))}
      </div>
      <div
        onClick={() => handelScroll("right")}
        className={`${style.toRight} ${style.arrow} flex-center`}
      >
        <BsChevronRight fill="#fff" />
      </div>
    </div>
  );
};

export default Row;
