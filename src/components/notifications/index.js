import { store } from "react-notifications-component";

export const notification = (title, message, type) => {
  return store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-left",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
