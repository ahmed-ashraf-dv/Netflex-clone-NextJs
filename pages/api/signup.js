import axios from "axios";

const createToken = () => {
  const result = Math.random().toString(36).substr(2);

  return result;
};

const handelar = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).json({ msg: req.method, error: true });
  }

  const { email, password } = req.body;

  const { data } = await axios(`http://localhost:3005/accounts?email=${email}`);

  if (data.length) {
    return res.status(200).json({ msg: "Email alredy exist", error: true });
  }

  await axios(`http://localhost:3005/accounts`, {
    method: "POST",
    data: {
      email,
      password,
      token: createToken(),
    },
  });

  const token = await axios(
    `http://localhost:3005/accounts?email=${email}&password=${password}`
  ).then(({ data }) => data[0].token);

  res.status(200).json({ token });
};

export default handelar;
