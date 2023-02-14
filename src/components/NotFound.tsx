const styles = {
  notFound: { display: "flex", flexDirection: "column", gap: "1rem" },
} satisfies Record<string, React.CSSProperties>;

const NotFound = () => {
  return (
    <div style={styles.notFound}>
      <h2>Page not found.</h2>
      <p>
        Sorry, anon. This route no longer exists or never existed in the first
        place. Check your docbot settings or{" "}
        <a href="/">return to the matrix</a>.
      </p>
    </div>
  );
};

export default NotFound;
