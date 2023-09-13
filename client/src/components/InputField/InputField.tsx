import { ChangeEvent, KeyboardEvent } from 'react';

type Props = {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required: boolean;
  className?: string;
  autofocus?: boolean;
  refId?: React.RefObject<HTMLInputElement>;
  name?: string;
  minLength?: number;
};

const InputField = ({
  type,
  value,
  onChange,
  onKeyDown,
  required,
  placeholder,
  className,
  autofocus = true,
  refId,
  name,
  minLength,
}: Props) => {
  return (
    <>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        autoFocus={autofocus}
        ref={refId}
        name={name}
        minLength={minLength}
      />
    </>
  );
};

export default InputField;
