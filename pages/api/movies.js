import axios from "axios";
import requests from "../../utils/requests";

const handelar = async (_, res) => {
  const requestsArray = Object.keys(requests).map((key) => requests[key]);

  const [
    fetchTrending,
    fetchNetflixOriginals,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchDocumentaries,
  ] = await axios.all(
    requestsArray.map((request) =>
      axios(request)
        .then(({ data }) => data.results)
        .then((data) => data.filter((movie) => !movie.adult))
    )
  );

  const filters = res.status(200).json({
    fetchTrending,
    fetchNetflixOriginals,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchDocumentaries,
  });
};

export default handelar;
