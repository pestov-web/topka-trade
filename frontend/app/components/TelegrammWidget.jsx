"use client";
import { useEffect } from "react";

const TelegramLogin = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.setAttribute(
      "data-telegram-login",
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME
    ); // имя бота
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", `https://devapi.pestov-web.ru/login`);
    script.setAttribute("data-request-access", "write"); // Запрос прав (опционально)
    document.getElementById("telegram-login").appendChild(script);
  }, []);

  return <div id="telegram-login"></div>;
};

export default TelegramLogin;
