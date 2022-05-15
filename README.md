![RusichTv](https://github.com/elli-yes/rusIT/blob/main/Client/src/favicon.png)
# RusichTv  http://77.223.96.53:3000/  
Русич это онлайн стриминговый сервис, созданный как отечественная альтернатива twitch. 


## Server layer kluev96@box.com
>Серверная часть состоит из двух слоев: API и RTMP.  

>RTMP (Real Time Messaging Protocol) используется как основное средство передачи потока с устройства пользователя на сервер. В качестве rtmp сервера был испорльзован nginx/rtmp-server. Он развернут в докер контейнере и выполняет функции приема сигнала, превращения потока в hls плейлист, а также получение потока на клиенте.

>API сервер использует FASTAPI, SQL и Crud. Использование API сервера осуществляется по следующим эндпоинтам:  
>- /login - авторизация post{username,password}
>- /logout - выход из системы post{}
>- /refresh_token - обновление токена post{}
>- /users - создание пользователя post{username,password}
>- /users/me - "мой" профиль get{}
>- /users/:name - информация о пользователе get{username}
>- /streams - список стримов get{}
>- /stream/:name - смотреть стрим get{title}
>- /setTitle - смена информации в канале post{string}
>- /setDescription - смена информации в канале post{string}

>API сервер осущетсвляет свзь клиента, БД и RTMP сервера


## Client layer tru.elli.yes@box.com  achrameshinas@box.com

>Клиентская часть напсина с помощью библиотек React, Redux tool kit, RTKQuerry.
>Клиент состоит из нескольких страниц:
>- Стримы
>- Стрим
>- Аккаунт
>- Канал 


## DevOps achrameshinas@box.com

>В качестве DevOps инструмента использованы Github action и Docker hub. Воркфлоу выглядит следующим образом:  
>- Push/merge в main ветку
>- Проверка кода
>- Build изменений в контейнеры
>- Push в docker hub
>- Удаленно runner подключается в серверу
>- Загружаются обновления
>- Запускаются изменения

>  
