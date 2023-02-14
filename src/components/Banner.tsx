import { useBreakpoint } from "../hooks/useBreakpoint";

const styles = {
  description: {
    marginBottom: "1rem",
  },
} satisfies Record<string, React.CSSProperties>;

const Banner = () => {
  const isMobile = useBreakpoint();

  return (
    <p
      style={{
        ...styles.description,
        ...(isMobile ? { textAlign: "center" } : {}),
      }}
    >
      Ethereum's first hype market - <em>Emoji Racer</em>. Learn more about
      racing <a href="/about">here</a>.
    </p>
  );
};

export default Banner;
