import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import HomeCover from "../components/HomeCover";
import Row from "../components/Row";
import Head from "next/head";

import axios from "axios";
import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const App = ({ movies, userList }) => {
  const [favList, setFavList] = useState(userList);

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

  const addMovieToFav = (id) => {
    const movie = Object.keys(movies)
      .map((key) => {
        return movies[key].find((movie) => movie.id === id);
      })
      .filter((movie) => movie)[0];

    setFavList((prev) => [...prev, movie]);
  };

  const delMovieFromFav = (id) => {
    const filterdData = favList.filter((movie) => movie.id !== id);

    setFavList(filterdData);
  };

  return (
    <Fragment>
      <Head>
        <title>Netflex - Home</title>
      </Head>
      <Modal
        delMovieFromFav={delMovieFromFav}
        favList={favList}
        addMovieToFav={addMovieToFav}
      />
      <main className="home pb-4">
        <Navbar />
        <HomeCover
          notify={notify}
          netflixOriginals={movies.fetchNetflixOriginals}
        />

        <div className="container rows">
          {/* My List */}
          {favList?.length > 0 && <Row title="My List" movies={favList} />}

          <Row
            notify={notify}
            title="Trending Now"
            movies={movies.fetchTrending}
          />
          <Row
            notify={notify}
            title="Top Rated"
            movies={movies.fetchTopRated}
          />
          <Row
            notify={notify}
            title="Action Thrillers"
            movies={movies.fetchActionMovies}
          />
          <Row
            notify={notify}
            title="Comedies"
            movies={movies.fetchComedyMovies}
          />
          <Row
            notify={notify}
            title="Scary Movies"
            movies={movies.fetchHorrorMovies}
          />
          <Row
            notify={notify}
            title="Documentaries"
            movies={movies.fetchDocumentaries}
          />
        </div>
      </main>
      <ToastContainer />
    </Fragment>
  );
};

export default App;

export const getServerSideProps = async ({ req }) => {
  const { cookies, headers } = req;
  const { host } = headers;
  const { token } = cookies;

  const requests = [
    `http://${host}/api/movies`,
    `http://${host}/api/getuserlist?token=${token}`,
  ];

  const [movies, userList] = await axios.all(
    requests.map((request) => axios(request).then(({ data }) => data))
  );

  return {
    props: { movies, userList },
  };
};
