# Используем Node.js образ
FROM node:20-alpine

# Создаем рабочую директорию
WORKDIR /frontend

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN pnpm i

# Копируем остальной код приложения
COPY . .

# Устанавливаем netcat
RUN apk add --no-cache netcat-openbsd

# Собираем приложение
RUN pnpm build

# Открываем порт сервиса
EXPOSE 3050

# Скрипт ожидания RabbitMQ с использованием nc
CMD pnpm start