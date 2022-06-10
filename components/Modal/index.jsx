import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/ModalSlice";
import style from "../../styles/modal.module.scss";

import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as SolidBookMark } from "@heroicons/react/solid";

const YOUTUBE_URL = "https://www.youtube.com/embed/";

const Modal = ({ addMovieToFav, favList, delMovieFromFav }) => {
  const dispatch = useDispatch();

  const { isOpen, id, currentVideoId } = useSelector(
    (reducer) => reducer.ModalSlice
  );

  const closeModalHandelar = () => {
    dispatch(closeModal());
  };

  const checkClicked = (e) => {
    if (e.target.classList.contains("bd-example-modal-lg")) {
      closeModalHandelar();
    }
  };

  const isFilmInFav = () => {
    const idx = favList.findIndex((movie) => movie.id === id);

    return idx >= 0;
  };

  return (
    isOpen && (
      <div
        onClick={checkClicked}
        className={`${style.trailerModal} ${
          isOpen ? "show" : ""
        } modal fade bd-example-modal-lg`}
        style={
          isOpen
            ? { display: "block", paddingRight: "17px" }
            : { display: "none" }
        }
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-lg ${style.backdrop}`}>
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Trailer Movie</h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModalHandelar}
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <iframe
                src={YOUTUBE_URL + currentVideoId}
                width="100%"
                height="380"
              />

              {!isFilmInFav() ? (
                <div
                  className="bookmarks ms-auto cu-pointer w-fit"
                  onClick={() => addMovieToFav(id)}
                >
                  <BookmarkIcon color="#fff" width={50} />
                </div>
              ) : (
                <div
                  className="bookmarks ms-auto cu-pointer w-fit"
                  onClick={() => delMovieFromFav(id)}
                >
                  <SolidBookMark color="#dc2626" width={50} />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger m-auto"
                data-dismiss="modal"
                onClick={closeModalHandelar}
              >
                Good !
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
