import { ElementType } from 'react';

type Props = {
  text?: string;
  Icon?: ElementType;
  disabled?: boolean;
  onChange?: () => void;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  className?: string;
};

const Button = ({
  text,
  Icon,
  disabled = true,
  onChange,
  onClick,
  className,
  type = 'submit',
}: Props) => {
  return (
    <button
      disabled={disabled}
      onChange={onChange}
      type={type}
      onClick={onClick}
      className={className}
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
