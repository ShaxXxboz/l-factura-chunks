import {
  WARNING,
  WARNING_DARK,
  SIGNED,
  SIGNED_DARK,
  SENT,
  SENT_DARK,
  REJECTED,
  REJECTED_DARK,
  CANCELED,
  CANCELED_DARK,
  SAVED,
  SAVED_DARK,
} from "../styles/colors";
import AsyncStorage from "@react-native-community/async-storage";
import PushNotification from "react-native-push-notification";
import { setDocNotif } from "../redux/slices/docs";

export const getTextByStatus = (status) => {
  switch (status) {
    case "Подтвердить": {
      return "Подписан";
    }
    case "ПодтвердитьОЛ": {
      return "Подтвердить ОЛ";
    }
    case "Отменить": {
      return "Отменен";
    }
    case "Отправить": {
      return "Отправлен";
    }
    case "Отказать": {
      return "Отказан";
    }
    case "ОтказанОЛ": {
      return "Отказан ОЛ";
    }
    case "Черновик": {
      return "Сохранен";
    }
    default: {
      return "Ошибка";
    }
  }
};

export const getColorByStatus = (status) => {
  switch (status) {
    case "Подтвердить": {
      return { color: SIGNED, colorDark: SIGNED_DARK };
    }
    case "ПодтвердитьОЛ": {
      return { color: SIGNED, colorDark: SIGNED_DARK };
    }
    case "Отменить": {
      return { color: CANCELED, colorDark: CANCELED_DARK };
    }
    case "Отправить": {
      return { color: SENT, colorDark: SENT_DARK };
    }
    case "Отказать": {
      return { color: REJECTED, colorDark: REJECTED_DARK };
    }
    case "ОтказанОЛ": {
      return { color: REJECTED, colorDark: REJECTED_DARK };
    }
    case "Черновик": {
      return { color: SAVED, colorDark: SAVED_DARK };
    }
    default: {
      return { color: WARNING, colorDark: WARNING_DARK };
    }
  }
};

export const convertDocType = (docType) => {
  switch (docType) {
    case "Фактура":
      return "Factura";
    case "Доверенность":
      return "Empowerment";
    case "Акт":
      return "Act";
    case "ХТМЛ":
      return "doc";
    case "ПДФ":
      return "doc";
    default:
      break;
  }
};

export const storeDataInAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getDataFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteDataFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    console.log(exception);
  }
};

export const getTinFromSubjectString = (subject) => {
  const arr = subject.split(",");

  for (const item of arr) {
    if (item.includes("UID")) {
      return item.substring(4);
    }
  }

  return null;
};

export const isDev = () => {
  return __DEV__;
};

export const getIdFromString = (query) => {
  if (!query.includes("https://l-factura.uz/check/")) throw new Error();
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          if (value.length >= 20)
            params = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
          return params;
        }, {})
    : {};
};

export const getSettingsValue = async (key) => {
  const profileSettingsFromAsyncStorage = JSON.parse(
    await getDataFromAsyncStorage("@profile_settings")
  );

  if (profileSettingsFromAsyncStorage) {
    return profileSettingsFromAsyncStorage[key];
  } else {
    return null;
  }
};

export async function configurePushNotifications(navigation, dispatch) {
  let profile_settings = await getDataFromAsyncStorage("@profile_settings");

  if (!profile_settings) {
    profile_settings = {
      received: true,
      accepted: true,
      rejected: true,
      token: "",
    };
  } else {
    profile_settings = JSON.parse(profile_settings);
  }

  PushNotification.configure({
    onRegister: async function (token) {
      console.log("TOKEN:", token);
      await storeDataInAsyncStorage(
        "@profile_settings",
        JSON.stringify({
          ...profile_settings,
          token: token.token,
        })
      );
    },

    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      if (notification.userInteraction === false) {
        dispatch(setDocNotif(notification.data.inAppMessage));
      } else {
        navigation.replace("NotifDoc", {
          id: notification.doc_id,
        });
      }
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
}

export const getCurDocAndDir = async (curDoc) => {
  const companySelected = JSON.parse(
    await getDataFromAsyncStorage("@company_selected")
  );
  const doc = { id: curDoc.id, status: curDoc.status, docType: curDoc.docType };

  if (curDoc.reciever === companySelected.tin) {
    if (curDoc.agent) {
      if (curDoc.status === "ПодтвердитьОЛ") {
        doc.dir = "inbox";
      }
    } else {
      doc.dir = "inbox";
    }
  } else if (curDoc.sender === companySelected.tin) {
    if (curDoc.status === "Черновик") {
      doc.dir = "draft";
    } else {
      doc.dir = "outbox";
    }
  } else if (curDoc.agent === companySelected.tin) {
    if (curDoc.status === "Отправить") {
      doc.dir === "inbox";
    }
  } else {
    return doc;
  }

  return doc;
};

export function getDefaultFilters() {
  return {
    docType: "all",
    tinName: "",
    docNo: "",
    contractNo: "",
    status: "all",
    dateType: "document",
    dateFrom: new Date("1970"),
    dateTo: new Date(),
    summType: "k",
    summFrom: 0,
    summTo: 0,
    search: "",
    sort: "updateDate",
    sortType: "desc",
    filterDate: false,
    limit: 8,
  };
}

export const trimString = function (string, length) {
  return string.length > length ? string.substring(0, length) + "..." : string;
};
