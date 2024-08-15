import React, { useEffect, useState } from 'react';
import { initializeViewer } from './utils/viewerUtils';
import TeamList from './components/TeamList';
import FacilityList from './components/FacilityList';
import Viewer from './components/Viewer';
import './App.css'


const App = () => {
  const [ isViewerInitialized, setIsViewerInitialized ] = useState<boolean>(false);
  const [ teamList, setTeamList ] = useState<Autodesk.Tandem.DtTeam[]>([]);
  const [ facilityList, setFacilityList ] = useState<Autodesk.Tandem.DtFacility[]>([]);
  const [ selectedFacilityId, setSelectedFacilityId ] = useState<string>();
  const [ selectedTeam, setSelectedTeam ] = useState<any>(null);
  const [ selectedFacility, setSelectedFacility ] = useState<any>(null);

  const onTeamChange = async (team: Autodesk.Tandem.DtTeam) => {
    if (!team.facilities) {
      await team.getFacilities();
    }
    setSelectedTeam(team);
  };

  // remember id of selected facility when user changes selection
  const onFacilityChange = (facility: Autodesk.Tandem.DtFacility) => {
    setSelectedFacilityId(facility.twinId);
  };

  // set selected facility based on selected id
  const onLoad = async () => {
    const facility = facilityList?.find(f => {
      return f.twinId === selectedFacilityId;
    });

    if (!facility) {
      return;
    }
    setSelectedFacility(facility);
  };

  // when app is initialized get list of teams
  const onAppInitialized = async (app: Autodesk.Tandem.DtApp) => {
    console.log(`app initialized`);
    const teams = await app.getTeams();
    const sortedTeams = teams.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    const sharedFacilities = await app.getUsersFacilities();

    if (sharedFacilities?.length > 0) {
      const dummyTeam = {
        id: 'shared',
        name: '** Shared directly **',
        owner: '',
        facilities: sharedFacilities
      };

      // @ts-ignore
      sortedTeams.unshift(dummyTeam);
    }

    setTeamList(sortedTeams);
  };

  useEffect(() => {
    initializeViewer().then(() => {
      setIsViewerInitialized(true);
    });
  }, []);

   // called when team selection changes
   useEffect(() => {
    if (!selectedTeam) {
      return;
    }
    setFacilityList(selectedTeam.facilities);
  }, [ selectedTeam ]);

  return (
    <React.Fragment>
      <div className="header">
        <div className="header-icon"></div>
        <div className="header-title">Tandem React Sample</div>
      </div>
      <div className="main">
        <div className="left">
          <TeamList
            teams={teamList}
            onTeamChange={onTeamChange} />
          <FacilityList
            facilities={facilityList}
            onFacilityChange={onFacilityChange} />
          <button onClick={onLoad}>Load</button>
        </div>
        <div className="right">
          {isViewerInitialized &&
            <div className="viewer-container">
              <Viewer
                onAppInitialized={onAppInitialized}
                facility={selectedFacility} />
            </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
