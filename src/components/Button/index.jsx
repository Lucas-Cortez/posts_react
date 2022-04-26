const Button = ({ text, click, disabled }) => (
  <button onClick={click} disabled={disabled}>
    <p>{text}</p>
  </button>
);

export default Button;
