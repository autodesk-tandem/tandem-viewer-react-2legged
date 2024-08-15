declare namespace Autodesk {
  namespace Tandem {
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
      systemsManager: any;
      twinId: string;

      getSavedViewsList(): Promise<CompactView[]>;
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
      getPropertiesDt(dbIds: number[], options?: { classificationId?: string; history: boolean?; includeDeleted?: boolean; intersect?: boolean; wantTimeSeries?: boolean; }): Promise<any[]>;
      getRooms(): Promise<{ [key: string]: any; }>;
      getTaggedAssets(): Promise<{ cols: any[]; rows: any[]; }>;
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

      fetchFacilityViews(facility: DtFacility): Promise<CompactView[]>;
      setCurrentView(facility: DtFacility, view: View): Promise<void>;
    }

    class FacetsManager {
      applyTheme(facetId: string, colorMap: { [key: string]: any; }): void;
      generateColorMap(colorMaps: { [key: string]: any; }): { [key: string]: any;};
    }
  }
}