import axios from "axios";
import { PageHeader } from "antd";
import { leagueData } from "../data/leaguedata";
import Pool from "../components/Pool";

const Index = props => {
  return (
    <div>
      <PageHeader
        title="Really Real NBA Wins Pool"
        subTitle="Yes, I really did this..."
      />
      <Pool teams={props.teams} owners={leagueData} />
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
