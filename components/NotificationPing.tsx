export default function NotificationPing() {
  return (
    <span className="absolute top-0 right-0 flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange10 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange11"></span>
    </span>
  );
}
