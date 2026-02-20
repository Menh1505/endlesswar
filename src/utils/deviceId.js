// ============================================================================
// DEVICE ID - Persistent anonymous identifier stored in localStorage
// ============================================================================

const DEVICE_ID_KEY = 'ew_device_id';

export function getDeviceId() {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}
