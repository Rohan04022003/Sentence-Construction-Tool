import { Link } from "react-router-dom";
import { buttonProps, ButtonStyleType } from '../types/index'

const Button = ({ text, link, buttonCSS }: buttonProps) => {

  const buttonStyle: ButtonStyleType = {
    first:
      'border border-[#5651E3] text-[#5651E3] hover:bg-[#f5f4ff] px-12 py-[0.6rem] text-lg font-semibold rounded-lg cursor-pointer',
    second:
      'hover:bg-[#5651E3] text-[#fff] bg-[#4742da] px-14 py-[0.6rem] text-lg font-semibold rounded-lg cursor-pointer',
    third:
      'border-[#7C8181] px-3 py-[0.2rem] font-semibold rounded-lg border cursor-pointer text-[#414141]',
  };

  return (
    <Link to={link}>
      <button className={`${buttonStyle[buttonCSS as keyof ButtonStyleType]}`}>{text}</button>
    </Link>
  );
};

export default Button;
