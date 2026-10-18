export default function NotificationBody({ onClose }) {
  return (
    <div className="notification-body" role="status">
      <span className="notification-icon" aria-hidden="true">✓</span>
      <span><strong>Changes saved</strong><small>Your preferences are up to date.</small></span>
      <button type="button" onClick={onClose} aria-label="Close notification">×</button>
    </div>
  );
}
