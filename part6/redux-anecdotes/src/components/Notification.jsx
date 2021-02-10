import { useSelector } from 'react-redux';

// component updated for 6.10
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  const display = (notification.length)
    ? <div style={style}>{notification}</div>
    : <div />;
  return (
    <div>
      {display}
    </div>
  );
};

export default Notification;
