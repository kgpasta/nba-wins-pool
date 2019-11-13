import { Table } from "antd";
import Standings from "./Standings";

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank"
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner"
  },
  {
    title: "Total Wins",
    dataIndex: "wins",
    key: "wins",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
      return a.wins - b.wins;
    }
  }
];

const Pool = props => {
  const normalizedTeams = props.teams.map(team => ({
    name: team.teamSitesOnly.teamNickname,
    wins: parseInt(team.win)
  }));

  const normalizedOwners = Object.entries(props.owners).map(([id, data]) => {
    return {
      key: id,
      owner: data.owner,
      teams: props.teams.filter(team =>
        data.teams.includes(team.teamSitesOnly.teamNickname)
      ),
      wins: normalizedTeams
        .filter(team => data.teams.includes(team.name))
        .map(team => team.wins)
        .reduce((a, b) => a + b, 0)
    };
  });

  const rankedOwners = normalizedOwners.map(owner => {
    const sortedOwners = [...normalizedOwners].sort((a, b) => b.wins - a.wins);
    return {
      ...owner,
      rank: sortedOwners.findIndex(o => owner.key === o.key) + 1
    };
  });

  return (
    <div>
      <Table
        dataSource={rankedOwners}
        columns={columns}
        pagination={false}
        expandedRowRender={record => <Standings teams={record.teams} />}
      />
    </div>
  );
};

export default Pool;
