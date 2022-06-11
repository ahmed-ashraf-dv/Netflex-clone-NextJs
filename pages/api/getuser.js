import axios from "axios";

const LOCAL_API = process.env.NEXT_PUBLIC_PUBLIC_API;

const handelar = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(200).json({ msg: "user not found" });

  const { data } = await axios(`${LOCAL_API}/accounts?token=${token}`);

  if (!data.length) return res.status(200).json({ msg: "user not found" });

  res.status(200).json(data[0]);
};

export default handelar;
