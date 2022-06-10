import style from "../../styles/login.module.scss";

const Field = ({ placeholder, type, error, register }) => {
  return (
    <div className={`${style.inputGroub} w-100 text-center`}>
      <input type={type} placeholder={placeholder} {...register} />
      {error && <p className="m-0 pt-1 text-danger small">{error}</p>}
    </div>
  );
};

export default Field;
