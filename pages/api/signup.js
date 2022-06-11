import axios from "axios";

const generateToken = (num = 12) => {
  // Init result
  let result = "";

  // Push the random chr
  while (result.length < num) {
    const randomChr = Math.random().toString(36).substr(2);

    result += randomChr;
  }

  // Slice result to get same num in argument
  result = result.slice(0, num);

  // return result after gnerate it
  return result;
};

const LOCAL_API = process.env.NEXT_PUBLIC_PUBLIC_API;

const handelar = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).json({ msg: req.method, error: true });
  }

  const { email, password } = req.body;

  const { data } = await axios(`${LOCAL_API}/accounts?email=${email}`);

  if (data.length) {
    return res.status(200).json({ msg: "Email alredy exist", error: true });
  }

  await axios(`${LOCAL_API}/accounts`, {
    method: "POST",
    data: {
      email,
      password,
      token: generateToken(16),
    },
  });

  const token = await axios(
    `${LOCAL_API}/accounts?email=${email}&password=${password}`
  ).then(({ data }) => data[0].token);

  res.status(200).json({ token });
};

export default handelar;
