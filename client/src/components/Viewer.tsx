import { useEffect, useRef } from 'react';
import './Viewer.css'

type ViewerProps = {
    onViewerInitialized?: (viewer: any) => void;
    onViewerUninitialized?: () => void;
    onFacilityLoaded?: (facility: any) => void;
    facility?: string | null;
};

const Viewer = (props: ViewerProps) => {
    const {
        facility
    } = props;
    const viewerRef = useRef<any>(null);
    const viewerDOMRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<any>(null);

    const handleViewerInitialized = (viewer: any) => {
        if (props.onViewerInitialized) {
            props.onViewerInitialized(viewer.target);
        }
    }

    const handleViewerUninitialized = () => {
        if (props.onViewerUninitialized) {
            props.onViewerUninitialized();
        }
    }

    const handleFacilityLoaded = (facility: any) => {
        if (props.onFacilityLoaded) {
            props.onFacilityLoaded(facility);
        }
    }

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
            viewer.start();
        }
        return () => {
          // Remove listeners at cleanup
          if (viewerRef.current) {
            const viewer = viewerRef.current;

            viewer.removeEventListener(Autodesk.Viewing.VIEWER_INITIALIZED, handleViewerInitialized);
            viewer.removeEventListener(Autodesk.Viewing.VIEWER_UNINITIALIZED, handleViewerUninitialized);
          }
        }
    });

    useEffect(() => {
        console.debug(`facility: ${facility}`);
        async function loadFacility(app: any, viewer: any, urn: string) {
            const facility = await app.getFacility(urn);
            const res = await app.displayFacility(facility, false, viewer);

            handleFacilityLoaded(res);
        }

        if (facility) {
            if (!appRef.current) {
                // @ts-ignore
                const app = new Autodesk.Viewing.Private.DtApp();

                appRef.current = app;
            }
            loadFacility(appRef.current, viewerRef.current, facility);
        } else {
            if (appRef.current) {
                appRef.current.removeCurrentFacility();
            }
        }
    }, [ facility ]);

    return (
        <div className="viewer" ref={viewerDOMRef}></div>
    );
};

export default Viewer;
