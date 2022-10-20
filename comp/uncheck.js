export default function uncheck() {
  localStorage.removeItem(currentSession);
  location.reload();
}
