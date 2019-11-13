import { Table } from "antd";

const columns = [
  {
    title: "Team Name",
    dataIndex: "teamName",
    key: "teamName"
  },
  {
    title: "Wins",
    dataIndex: "wins",
    key: "wins"
  },
  {
    title: "Losses",
    dataIndex: "losses",
    key: "losses"
  }
];

const Standings = props => {
  const normalizedTeams = props.teams.map(team => ({
    key: team.teamId,
    teamName: `${team.teamSitesOnly.teamName} ${team.teamSitesOnly.teamNickname}`,
    wins: team.win,
    losses: team.loss
  }));
  return (
    <div>
      <Table
        dataSource={normalizedTeams}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Standings;
