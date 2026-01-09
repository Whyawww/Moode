export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("Browser tidak support notifikasi");
    return false;
  }

  if (Notification.permission === "granted") return true;

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title: string, body: string) => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          body,
          icon: "/icon.png",
          vibrate: [200, 100, 200],
          tag: "focus-complete",
        } as NotificationOptions & { vibrate?: number[] });
      });
    } else {
      new Notification(title, {
        body,
        icon: "/icon.png",
      });
    }
  }
};
