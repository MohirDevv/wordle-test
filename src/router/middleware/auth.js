import store from "../../store/index";
import { useCookies } from "@vueuse/integrations/useCookies";

export default function auth({ to, next, store }) {
  var isValid = false;
  const cookies = useCookies();
  const token = cookies.get("token");
  var websocket = null;
  var mode;

  function onSocketOpen(evt) {
    console.log("Valid token");
  }
  function onSocketMessage(evt) {
    var res = JSON.parse(evt.data);
    console.log(res);

    if (Array.isArray(res.message)) {
      res.message.map((el, index) => {
        for (var key in el) {
          const word = key;
          const color = el[key];
          const payload = {
            word: word,
            colors: color,
            i: index,
          };
          store.commit("initializeValue", payload);
        }
      });
    }
    if (res.error) {
      isValid = false;
    } else {
      isValid = true;
    }
    redirect();
  }
  function onSocketError(evt) {
    isValid = false;
    console.log("Invalid token");
    redirect();
  }

  function redirect() {
    if (isValid) {
      return next();
    } else {
      return next({ name: "Login" });
    }
  }

  if (token) {
    if (to.name == "Game") {
      mode = "daily";
    } else if (to.name == "Unlimited") {
      mode = "unlim";
    }

    var sockets_bay_url = `ws://cp.wordle.uz:8000/ws/game/${mode}?token=${token}`;
    websocket = new WebSocket(sockets_bay_url);
    store.state.useWebsocket = websocket;
    console.log(store.state.useWebsocket);
    websocket.onopen = onSocketOpen;
    websocket.onmessage = onSocketMessage;
    websocket.onerror = onSocketError;
  } else {
    return next({ name: "Login" });
  }
}
