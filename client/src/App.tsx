import React, { useRef, useState } from 'react';
import Viewer from './components/Viewer';
import './App.css'

const App = () => {
  const viewerRef = useRef<Autodesk.Viewing.GuiViewer3D | null>(null);
  const facilityRef = useRef<Autodesk.Viewing.Private.DtFacility | null>(null);
  const [ facilityURN, setFacilityURN ] = useState<string | null>();

  const onLoadClick = async () => {
    // TODO: set your own urn
    setFacilityURN('urn:adsk.dtt:ZS-qm-sbQWWJnB5tcwBjhQ');
  };

  const onFacilityLoaded = async (facility: Autodesk.Viewing.Private.DtFacility) => {
    console.debug(`onFacilityLoaded`);
    facilityRef.current = facility;
  };

  const onViewerInitialized = async (viewer: Autodesk.Viewing.GuiViewer3D) => {
    console.debug(`onViewerInitialized`);
    viewerRef.current = viewer;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="header-icon"></div>
        <div className="header-title">Tandem Test Application (React)</div>
      </div>
      <div className="main">
        <div className="left-panel">
          <div>
            <button onClick={onLoadClick}>Load</button>
          </div>
        </div>
        <div className="right-panel">
          <Viewer
            onViewerInitialized={onViewerInitialized}
            onFacilityLoaded={onFacilityLoaded}
            facility={facilityURN}></Viewer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
