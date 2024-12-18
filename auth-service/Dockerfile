# Указываем базовый образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /auth-service

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm i

# Копируем весь код
COPY . .

# Устанавливаем netcat
RUN apk add --no-cache netcat-openbsd

# Указываем порт и команду запуска
EXPOSE 3010

# Скрипт ожидания RabbitMQ с использованием nc
# CMD while ! nc -z rabbitmq 5672; do sleep 1; done && node src/app.js

# Скрипт ожидания RabbitMQ с использованием nc
CMD node src/app.js