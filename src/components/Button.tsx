import Color from "color";

const styles = {
  button: {
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
} satisfies Record<string, React.CSSProperties>;

interface Props {
  color?: string;
  onClick: () => any;
  children: React.ReactNode;
}

const Button = ({
  color = "#fff",
  onClick,
  children,
  ...props
}: Props & Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const textColor = Color(color).mix(Color("#fff")).string();
  const backgroundColor = Color(textColor).alpha(0.2).string();

  return (
    <button
      {...props}
      style={{
        ...props.style,
        ...styles.button,
        color: textColor,
        backgroundColor,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
