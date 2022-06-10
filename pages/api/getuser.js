import axios from "axios";

const handelar = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(200).json({ msg: "user not found" });

  const { data } = await axios(`http://localhost:3005/accounts?token=${token}`);

  if (!data.length) return res.status(200).json({ msg: "user not found" });

  res.status(200).json(data[0]);
};

export default handelar;
