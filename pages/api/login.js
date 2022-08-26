import axios from "axios";

const LOCAL_API = process.env.NEXT_PUBLIC_JSON;

const handelar = async (req, res) => {
  const { email, password } = req.body;

  axios(`${LOCAL_API}/accounts?email=${email}&password=${password}&_limit=1`)
    .then(({ data }) => {
      res.status(200).json({ token: data?.[0].token });
    })
    .catch(() => {
      res.status(200).json({ msg: "Incorrect email or password", error: true });
    });
};

export default handelar;
