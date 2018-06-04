### Запуск проекта на локальном PC

требуемые приложения 
- git
- php7.2
- composer
- virtualbox
- vagrant

склонировать репозитарий в **домашнем каталоге** пользователя в директорию mediastorage.test
```
$ cd mediastorage.test
$ git init
$ git pull https://github.com/domatskiy/mediastorage.test
```  

#### установка зависимостей

```
$ composer install
```

#### запуск виртуфльной машины

```
$ vagrant up
```

подключимся по ssh 
```
$ vagrant ssh
```

для windows прописать в **c:\Windows\System32\drivers\etc\hosts** строку
```
192.168.20.15 mediastorage.test
```

open http://mediastorage.test