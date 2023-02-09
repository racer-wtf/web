import "./index.css";

interface Props {
  value: string;
  setValue: (value: string) => any;
}

const Input = ({
  value,
  setValue,
  ...props
}: Props & Partial<React.InputHTMLAttributes<HTMLInputElement>>) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input type={props.type} value={value} onChange={onChange} {...props} />
  );
};

export default Input;
