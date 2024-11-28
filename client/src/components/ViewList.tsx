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
    const team = views?.find((item) => {
      return item.id === id;
    });

    if (!team) {
      return;
    }
    if (onViewChange) {
      onViewChange(team);
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