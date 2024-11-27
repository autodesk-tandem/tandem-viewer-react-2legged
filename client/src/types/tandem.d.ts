declare namespace Autodesk {
  namespace Tandem {
    // events
    const DT_CURRENT_VIEW_CHANGED_EVENT = 'dtCurrentViewChanged';
    const DT_FACETS_LOADED = 'dtFacetsLoaded';
    const DT_STREAM_MARKER_MOUSE_OVER = 'dtStreamMarkerMouseOver';
    const DT_STREAM_MARKER_MOUSE_OUT = 'dtStreamMarkerMouseOut';
    const DT_STREAM_MARKER_CHANGED_EVENT = 'dtStreamMarkerChanged'

    interface CompactView {
      id: string;
      dashboardName: string;
      default: boolean;
      facets?: any;
      label: string;
      viewName: string;
    }

    interface View extends CompactView {
      camera?: any;
      createTime?: string;
      dashboard?: any;
    }

    class DtApp {
      constructor(options?: any);

      currentFacility: DtFacility;
      views: DtViews;

      addEventListener(event: string, callback: (event: any) => void): void;

      displayFacility(facility: DtFacility, visibleModelsForView: Set<string> | undefined, viewer: Autodesk.Viewing.GuiViewer3D, forceReload?: boolean): Promise<DtFacility>;
      getCurrentTeamsFacilities(): Promise<DtFacility[]>;
      getFacility(urn: string): Promise<DtFacility>;
      getTeams(): Promise<DtTeam[]>;
      getUsersFacilities(): Promise<DtFacility[]>;
    }

    class DtFacility {
      app: DtApp;
      facetsManager: FacetsManager;
      modelsList: DtModel[];
      settings: {
        dateCreated: string;
        dateModified: string;
        links: any[];
        props: { [key: string]: { [key: string]: string; }};
      };
      twinId: string;
      viewer: Autodesk.Viewing.GuiViewer3D;

      getModels(skipDefault?: boolean): DtModel[];
      getSavedViewsList(): Promise<CompactView[]>;
      getVisibleElementsByURN(skipDefault?: boolean): { [key: string]: number[]; };
      unloadModels(): void;
      urn(): string;
      waitForAllModels(): Promise<void>;
    }

    class DtModel {
      id: number;

      getDbIdsFromElementIds(elementIds: string[]): Promise<number[]>;
      getData(): any;
      getElementIdsFromDbIds(dbIds: number[]): Promise<string[]>;
      getLevels(): Promise<{ [key: string]: any; }>;
      getPropertiesDt(dbIds: number[], options?: { classificationId?: string; history?: boolean; includeDeleted?: boolean; intersect?: boolean; wantTimeSeries?: boolean; }): Promise<any[]>;
      getRooms(): Promise<{ [key: string]: any; }>;
      getTaggedAssets(): Promise<{ cols: any[]; rows: any[]; }>;
      getVisibleDbIds(): number[];
      waitForLoad(waitForFragments: boolean, waitForInstanceTree: boolean): Promise<void>;
    }

    class DtTeam {
      id: string;
      name: string;
      owner: string;
      facilities: DtFacility[];

      getFacilities(): Promise<DtFacility[]>;
    }

    class DtViews {
      currentView: CompactView;

      addEventListener(event: string, callback: (event: any) => void): void;

      fetchFacilityViews(facility: DtFacility): Promise<CompactView[]>;
      setCurrentView(facility: DtFacility, view: View): Promise<void>;
    }

    class FacetsManager {
      applyTheme(facetId: string, colorMap: { [key: string]: any; }): void;
      generateColorMap(colorMaps: { [key: string]: any; }): { [key: string]: any;};
    }
  }
}