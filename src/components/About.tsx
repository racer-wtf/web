import BarChart from "./BarChart";

const styles = {
  about: { display: "flex", flexDirection: "column", gap: "1rem" },
  player1: {
    color: "#d2222d",
  },
  player2: {
    color: "#005ad9",
  },
  player3: {
    color: "#ffbe00",
  },
  player4: {
    color: "#238823",
  },
} satisfies Record<string, React.CSSProperties>;

const About = () => {
  return (
    <div style={styles.about}>
      <h2>Hype Markets 🔥</h2>
      <p>
        Hype Markets reward voters on predicting outcomes early. Two factors
        play into this: popularity and timeliness.
      </p>
      <p>
        Popularity means a voter was correct in predicting which symbol would be
        the most voted for. The more votes a symbol has at the end of the cycle,
        the more the voter is rewarded.
      </p>
      <p>
        Timeliness is a result of how early the vote was placed in relation to
        other votes for the same symbol.
      </p>

      <h2>Rewards 🤑</h2>
      <p>
        Once a voting cycle has ended, the player who voted for the most popular
        symbol <em>first</em> will be rewarded most. The player who voted for
        the least popular symbol <em>last</em> will gain minimal rewards.
      </p>
      <p>
        The hype market is completely independent and self-funding, so any money
        lost as a result of a bad bet will be rewarded to voters with good bets.
      </p>

      <h2>Example Race 🏎️</h2>
      <p>
        Imagine the following race takes place in chronological order. Votes
        cost 0.01 ETH each and the reward multiplier is 10x.
      </p>
      <p>
        <span style={styles.player1}>Player 1</span> places two votes for 🔥.{" "}
      </p>
      <BarChart
        data={[
          {
            emoji: "🔥",
            label: "Fire",
            value: 2,
          },
        ]}
      />
      <p>
        <span style={styles.player2}>Player 2</span> then places two votes for
        ❄️.
      </p>
      <BarChart
        data={[
          {
            emoji: "🔥",
            label: "Fire",
            value: 2,
          },
          {
            emoji: "❄️",
            label: "Snowflake",
            value: 2,
          },
        ]}
      />
      <p>
        <span style={styles.player3}>Player 3</span> places two votes for ❄️.
      </p>
      <BarChart
        data={[
          {
            emoji: "❄️",
            label: "Snowflake",
            value: 4,
          },
          {
            emoji: "🔥",
            label: "Fire",
            value: 2,
          },
        ]}
      />
      <p>
        <span style={styles.player4}>Player 4</span> finally places six votes
        for 🔥.
      </p>
      <BarChart
        data={[
          {
            emoji: "🔥",
            label: "Fire",
            value: 8,
          },
          {
            emoji: "❄️",
            label: "Snowflake",
            value: 4,
          },
        ]}
      />
      <p>
        The voting cycle ends and players are no longer allowed to place more
        votes. In total, 0.12 ETH was spent on votes.
      </p>
    </div>
  );
};

export default About;
