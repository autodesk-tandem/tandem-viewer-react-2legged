import React, { useEffect, useState } from 'react';
import Viewer from './components/Viewer';
import './App.css'
import { initializeViewer } from './utils/viewerUtils';

const App = () => {
  const [ isViewerInitialized, setIsViewerInitialized ] = useState<boolean>(false);
  const [ facilityList, setFacilityList ] = useState<Autodesk.Tandem.DtFacility[]>([]);
  const [ selectedFacilityId, setSelectedFacilityId ] = useState<string>();
  const [ selectedFacility, setSelectedFacility ] = useState<any>(null);

  const onFacilityChange = (event: any) => {
    setSelectedFacilityId(event.target.value);
  };

  const onLoad = async () => {
    const facility = facilityList?.find(f => {
      return f.twinId === selectedFacilityId;
    });

    if (!facility) {
      return;
    }
    setSelectedFacility(facility);
  };

  // when app is initialized get list of available facilities for current service
  // and remember id of first facility
  const onAppInitialized = async (app: Autodesk.Tandem.DtApp) => {
    console.log(`app initialized`);
    const result = await app.getUsersFacilities();

    setFacilityList(result);
    if (result.length > 0) {
      setSelectedFacilityId(result[0].twinId);
    }
  };

  // called when component is mounted
  // we initialize viewer and wait for user to select facility
  useEffect(() => {
    initializeViewer().then(() => {
      setIsViewerInitialized(true);
    });
  }, []);

  const facilityItems = facilityList?.map((item) => {
    console.log(item);
    let name = item.settings.props['Identity Data']['Project Name'];

    if (name.length === 0) {
      // if project name is empty then use building name
      name = item.settings.props['Identity Data']['Building Name'];
    }
    return (
      <option key={item.twinId} value={item.twinId}>{name}</option>
    );
  });

  return (
    <React.Fragment>
      <div className="header">
        <div className="header-icon"></div>
        <div className="header-title">Tandem React Sample</div>
      </div>
      <div className="main">
        <div className="left">
          <select onChange={onFacilityChange}>{facilityItems}</select>
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
