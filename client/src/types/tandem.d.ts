declare namespace Autodesk {
  namespace Viewing {
    namespace Private {
      class DtApp {
        constructor(options?: Object);

        currentFacility: DtFacility;

        displayFacility(facility: any, visibleModelsForView: any, viewer: Autodesk.Viewing.GuiViewer3D, forceReload?: boolean): Promise<DtFacility>;
        getFacility(urn: string): Promise<DtFacility>;
        removeCachedFacility(urn: string): void;
      }

      class DtFacility {
        unloadModels(): void;
        urn(): string;
      }
    }
  }
}
