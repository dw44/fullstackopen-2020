const Notification = ({ text, type }) => (
  <div
    style={{
      backgroundColor: (type === 0) ? 'red' : 'green',
      padding: '10px',
      marginBottom: '10px',
      fontSize: '1.5em',
      color: '#fff',
      borderRadius: '10px',
    }}
  >
    {text}
  </div>
);

export default Notification;
