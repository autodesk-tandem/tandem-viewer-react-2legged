import { useEffect } from 'react';
import './FacilityList.css';

type FacilityListProps = {
  facilities: Autodesk.Tandem.DtFacility[];
  onFacilityChange?: (team: Autodesk.Tandem.DtFacility) => void;
};

const FacilityList = (props: FacilityListProps) => {
  const {
    facilities,
    onFacilityChange
  } = props;

  useEffect(() => {
    if (onFacilityChange && facilities.length > 0) {
      onFacilityChange(facilities[0]);
    }
  }, [ facilities ]);

  const handleFacilityChange = (event: any) => {
    const id = event.target.value;
    const facility = facilities?.find((item) => {
      return item.twinId === id;
    });

    if (!facility) {
      return;
    }
    if (onFacilityChange) {
      onFacilityChange(facility);
    }
  };

  const facilityItems = props.facilities?.map((item) => {
    let name = item.settings.props['Identity Data']['Building Name'];

    if (!name || name.length === 0) {
      // if building name is empty then use project name
      name = item.settings.props['Identity Data']['Project Name'];
    }
    return (
      <option key={item.twinId} value={item.twinId}>{name}</option>
    );
  });

  return (
    <div className="container">
      <label>Facility:</label>
      <select onChange={handleFacilityChange}>{facilityItems}</select>
    </div>
  );
};

export default FacilityList;