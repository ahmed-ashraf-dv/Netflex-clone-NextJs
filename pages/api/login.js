import axios from "axios";

const handelar = async (req, res) => {
  const { email, password } = req.body;

  axios(
    `http://localhost:3005/accounts?email=${email}&password=${password}&_limit=1`
  )
    .then(({ data }) => {
      res.status(200).json({ token: data?.[0].token });
    })
    .catch(() => {
      res.status(200).json({ msg: "Incorrect email or password", error: true });
    });
};

export default handelar;
