import { useCallback, useEffect } from 'react';
import './TeamList.css';

type TeamListProps = {
  teams: Autodesk.Tandem.DtTeam[];
  onTeamChange?: (team: Autodesk.Tandem.DtTeam) => void;
};

const TeamList = (props: TeamListProps) => {
  const {
    teams,
    onTeamChange
  } = props;

  useEffect(() => {
    if (onTeamChange && teams.length > 0) {
      onTeamChange(teams[0]);
    }
  }, [ teams ]);

  const handleTeamChange = useCallback((event: any) => {
    const id = event.target.value;
    const team = teams?.find((item) => {
      return item.id === id;
    });

    if (!team) {
      return;
    }
    if (onTeamChange) {
      onTeamChange(team);
    }
  }, [ teams, onTeamChange ]);

  const teamItems = props.teams?.map((item) => {
    return (
      <option key={item.id} value={item.id}>{item.name}</option>
    );
  });

  return (
    <div className="container">
      <label>Team:</label>
      <select onChange={handleTeamChange}>{teamItems}</select>
    </div>
  );
};

export default TeamList;