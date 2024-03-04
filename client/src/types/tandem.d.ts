declare namespace Autodesk {
  namespace Tandem {
    interface CompactView {
      id: string;
      viewName: string;
      dashboardName: string;
      label: string;
      default: boolean;
    }

    interface View extends CompactView {
      camera?: any;
      camera?: cutPlanes;
      dashboard?: any;
      createTime?: string;
    }

    class DtApp {
      constructor(options?: any);

      views: DtViews;

      displayFacility(facility: DtFacility, visibleModelsForView: Set<string> | undefined, viewer: Autodesk.Viewing.GuiViewer3D, forceReload?: boolean): Promise<DtFacility>;
      getCurrentTeamsFacilities(): Promise<DtFacility[]>;
      getUsersFacilities(): Promise<DtFacility[]>;
    }

    class DtFacility {
      modelsList: DtModel[];
      settings: {
        dateCreated: string;
        dateModified: string;
        links: any[];
        props: { [key: string]: { [key: string]: string; }};
      };
      twinId: string;

      getSavedViewsList(): Promise<CompactView[]>;
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

    class DtViews {
      fetchFacilityViews(facility: DtFacility): Promise<CompactView[]>;
      setCurrentView(facility: DtFacility, view: View): Promise<void>;
    }
  }
}