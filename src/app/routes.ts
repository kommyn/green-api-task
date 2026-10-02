import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/HomeRedirect.tsx"),
  layout("pages/chats/ui/ChatsLayout.tsx", [
    route("chats", "pages/chats/ui/ChatsPage.tsx"),
  ]),
  layout("pages/sign-in/layout.tsx", [
    route("sign-in", "pages/sign-in/index.tsx"),
  ]),
  route("*", "pages/not-found/NotFound.tsx"),
] satisfies RouteConfig;
