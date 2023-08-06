import "./Button.css";

const Button = ({ type, title, onClick, disable }) => {
  return (
    <div
      className={`btn ${
        (type === "add" && "add") ||
        (type === "remove" && "remove") ||
        (type === "checkout" && "checkout")
      } ${disable && "disable"}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Button;
