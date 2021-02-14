import { connect } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

// updated for 6.20
const Filter = ({ updateFilter }) => {
  const handleChange = (event) => {
    updateFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter:
      {' '}
      <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  updateFilter,
};

const ConnectedFilter = connect(
  null,
  mapDispatchToProps,
)(Filter);
export default ConnectedFilter;
