const styles = {
  rewardsIndicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#238823",
    color: "#fff",
    padding: "0 1rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
} satisfies Record<string, React.CSSProperties>;

const RewardsIndicator = () => {
  return (
    <a href="/rewards" style={styles.rewardsIndicator}>
      1
    </a>
  );
};

export default RewardsIndicator;
