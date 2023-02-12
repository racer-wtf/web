import "./index.css";

const styles = {
  input: {
    backgroundColor: "#222",
  },
} satisfies Record<string, React.CSSProperties>;

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
    <input {...props} value={value} onChange={onChange} style={styles.input} />
  );
};

export default Input;
