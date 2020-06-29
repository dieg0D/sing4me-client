import { store } from "react-notifications-component";

export const notification = (title: string, message: string, type: any) => {
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
