import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/HomeRedirect.tsx"),
  layout("pages/chats/ui/ChatsLayout/ChatsLayout.tsx", [
    route("chats", "pages/chats/ui/EmptyChatPage/EmptyChatPage.tsx"),
    route("chats/:chatId", "pages/chat/ui/ChatPage.tsx"),
  ]),
  layout("pages/sign-in/ui/SignInLayout.tsx", [
    route("sign-in", "pages/sign-in/ui/SignInPage.tsx"),
  ]),
  route("*", "pages/not-found/NotFound.tsx"),
] satisfies RouteConfig;
