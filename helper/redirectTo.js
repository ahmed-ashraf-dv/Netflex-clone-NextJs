const redirectTo = (route) => {
  return {
    redirect: {
      permanent: false,
      destination: route,
    },
  };
};

export default redirectTo;
