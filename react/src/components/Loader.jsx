
import { Circles } from 'react-loader-spinner';

// eslint-disable-next-line react/prop-types
const Loader = ({ visible }) => {
  return (
    visible && (
      <div className="loader-container">
        <Circles
          height="80"
          width="80"
          color="#3498db"
          ariaLabel="loading"
          visible={true}
        />
      </div>
    )
  );
};

export default Loader;
