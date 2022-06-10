import axios from "axios";
import { getVideoById } from "../../utils/requests";

const handelar = async (req, res) => {
  const { videoId } = req.query;

  if (videoId) {
    const { data } = await axios(getVideoById(videoId));

    const youtubeId = data.results.filter(
      (result) => result.site === "YouTube"
    )[0].key;

    return res.status(200).json({ youtubeId });
  }

  res.status(404).json({ msg: "videoId Not Found" });
};

export default handelar;
