import axios from "axios";
import { leagueData } from "../data/leaguedata";

const Index = props => {
  console.log(props.teams);
  return (
    <div>
      <p>Hello Next.js</p>
    </div>
  );
};

Index.getInitialProps = async function() {
  const res = await axios.get(
    "http://data.nba.net/prod/v1/current/standings_all.json"
  );

  const {
    data: {
      league: { standard }
    }
  } = res;

  return {
    teams: standard.teams
  };
};

export default Index;
