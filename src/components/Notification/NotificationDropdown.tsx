import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';  // Import AppDispatch
import { fetchNotifications } from '../../redux/notificationSlice';
import { useEffect } from 'react';
import './Dropdown.css';

const NotificationDropdown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();  // Add <AppDispatch>

  const { list: notifications, loading, error } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());  // Now correctly typed
  }, [dispatch]);

  return (
    <div className="notification-dropdown" style={{ position: 'absolute' }}>
      <div className="notification-dropdown-header">Thông báo</div>
      <div className="notification-dropdown-content">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {notifications.map((item) => (
          <div className="notification-item" key={item.id}>
            <strong>Người dùng: {item.name}</strong><br />
            <span>Thời gian nhận số: {item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
