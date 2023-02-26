## Установка

Создать файл .env в /packages/server
```
JWT_REFRESH_SECRET = <key>
JWT_ACCESS_SECRET = <key>
```

В корне запустить

```
npm ci
```

Выполнить миграцию
```
npm run migrate:up
```

База будет создана через секунд 30 после выполнения команды

Запустить сервер и клиент

```
npm run server:dev

npm run start:ui

```

## Устанока пакетов

Выполнить команду из корня:

```
npm i --workspace=packages/client --save <package>
 or
npm i --workspace=packages/server --save <package>
```

## Коммит

Новая ветка

```
git checkout main
git pull
git checkout -b feature/ID_TASK:MSG

```
Пуш

```
npm run format:fix
npm run format:check

git add .
git commit -m"<MSG"
git pull origin main
git push
```



