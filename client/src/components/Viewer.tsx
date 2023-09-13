import { useEffect, useRef} from 'react';
import './Viewer.css';

type ViewerProps = {
  facility?: Autodesk.Viewing.Private.DtFacility;
  onAppInitialized?: (app: Autodesk.Viewing.Private.DtApp) => void;
  onFacilityLoaded?: (facility: Autodesk.Viewing.Private.DtFacility) => void;
  onViewerInitialized?: (viewer: Autodesk.Viewing.GuiViewer3D) => void;
  onViewerUninitialized?: (viewer: Autodesk.Viewing.GuiViewer3D) => void;
};

const Viewer = (props: ViewerProps) => {
  const {
    facility
  } = props;
  const viewerDOMRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const appRef = useRef<any>(null);

  const handleAppInitialized = (app: Autodesk.Viewing.Private.DtApp) => {
    if (props.onAppInitialized) {
      props.onAppInitialized(app);
    }
  };

  const handleFacilityLoaded = (facility: Autodesk.Viewing.Private.DtFacility) => {
    if (props.onFacilityLoaded) {
      props.onFacilityLoaded(facility);
    }
  };

  const handleViewerInitialized = (event: any) => {
    if (props.onViewerInitialized) {
      props.onViewerInitialized(event.target);
    }
  };

  const handleViewerUninitialized = (event: any) => {
    if (props.onViewerUninitialized) {
      props.onViewerUninitialized(event.target);
    }
  };

  useEffect(() => {
    if (!viewerRef.current && viewerDOMRef.current) {
      const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDOMRef.current, {
        extensions: [ 'Autodesk.BoxSelection' ],
        screenModeDelegate: Autodesk.Viewing.NullScreenModeDelegate,
        theme: 'light-theme'
      });

      viewerRef.current = viewer;
      viewer.addEventListener(Autodesk.Viewing.VIEWER_INITIALIZED, handleViewerInitialized);
      viewer.addEventListener(Autodesk.Viewing.VIEWER_UNINITIALIZED, handleViewerUninitialized);
      viewer.addEventListener('toolbarCreated', (event) => {
        console.log(`toolbarCreated`);
        event.target.toolbar.addClass('adsk-toolbar-vertical');
        event.target.toolbar.container.style['justify-content'] = 'unset';
        event.target.toolbar.container.style['top'] = '175px';
      });
      viewer.start();
      // create Tandem application
      const app = new Autodesk.Viewing.Private.DtApp();
      
      appRef.current = app;
      handleAppInitialized(app);
    }
  }, []);

  // called when facility is updated
  useEffect(() => {
    async function loadFacility(app: Autodesk.Viewing.Private.DtApp, viewer: Autodesk.Viewing.GuiViewer3D, facility: Autodesk.Viewing.Private.DtFacility) {
      const views = await app.views.fetchFacilityViews(facility);
      const view = views.find((v: any) => {
        return v.default;
      });

      let models = undefined;
      
      if (view) {
        // @ts-ignore
        models = new Set<string>(view?.facets?.filters?.models);
      }
      
      const res = await app.displayFacility(facility, models, viewer);
      
      if (view) {
        await app.views.setCurrentView(facility, view);
      }
      handleFacilityLoaded(res);
    }

    if (!facility) {
      return;
    }
    if (appRef.current && viewerRef.current) {
      loadFacility(appRef.current, viewerRef.current, facility);
    }
  }, [ facility] );

  return (
    <div className="viewer" ref={viewerDOMRef}></div>
  );
};

export default Viewer;