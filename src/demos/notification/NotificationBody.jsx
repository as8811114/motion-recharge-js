import { notificationStyles } from "./notificationStyles";

export default function NotificationBody({ onClose, title = "Changes saved", detail = "Your preferences are up to date." }) {
  return (
    <div style={notificationStyles.body} role="status">
      <span style={notificationStyles.icon} aria-hidden="true">✓</span>
      <span style={notificationStyles.message}>
        <strong style={notificationStyles.title}>{title}</strong>
        <small style={notificationStyles.detail}>{detail}</small>
      </span>
      <button style={notificationStyles.closeButton} type="button" onClick={onClose} aria-label="Close notification">×</button>
    </div>
  );
}
