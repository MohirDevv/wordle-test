export default function auth({ next, store }) {
  if (store.state.isAuth) {
    return next();
  } else {
    return next({ name: "Login" });
  }
}
