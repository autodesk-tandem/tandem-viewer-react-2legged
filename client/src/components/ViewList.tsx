import { useCallback, useEffect } from 'react';
import './ViewList.css';

type ViewListProps = {
  views: Autodesk.Tandem.CompactView[];
  onViewChange?: (team: Autodesk.Tandem.CompactView) => void;
};

const ViewList = (props: ViewListProps) => {
  const {
    views,
    onViewChange
  } = props;

  useEffect(() => {
    if (onViewChange && views.length > 0) {
      onViewChange(views[0]);
    }
  }, [ views ]);

  const handleViewChange = useCallback((event: any) => {
    const id = event.target.value;
    const view = views?.find((item) => {
      return item.id === id;
    });

    if (!view) {
      return;
    }
    if (onViewChange) {
      onViewChange(view);
    }
  }, [ views, onViewChange ]);

  const viewItems = props.views?.map((item) => {
    return (
      <option key={item.id} value={item.id}>{item.viewName}</option>
    );
  });

  return (
    <div className="container">
      <label>View:</label>
      <select onChange={handleViewChange}>{viewItems}</select>
    </div>
  );
};

export default ViewList;