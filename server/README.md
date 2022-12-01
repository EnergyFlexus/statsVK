API USAGE
=========

	[обязательный параметр] (опциональный параметр) ? query параметры

Messages:
---------

	# ВСЕ сообщения (аккуратно, данных может быть много)
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию message_id
	/api/MessagesAll ? (order=desc/asc)

	# пример:
	/api/MessagesAll?order=desc

	[{"message_id":9,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1},
	{"message_id":8,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1}]


	# сообщение по его id
	/api/MessageById/[id]

	# пример:
	/api/MessageById/8

	{"message_id":8,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1}


	# все сообщения из чата
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию message_id
	/api/MessagesByChatId/[id] ? (order=desc,asc)

	# пример
	/api/MessagesByChatId/2?order=asc

	[{"message_id":1,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1},
	{"message_id":2,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1}]


	# все сообщения конкретного пользователя во всех чатах
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию message_id
	/api/MessagesByUserId/[id] ? (order=desc,asc)

	# пример
	/api/MessagesByUserId/1?order=asc

	[{"message_id":1,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1},
	{"message_id":2,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1}]


	# все сообщения пользователя в конкретном чате
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию message_id
	/api/MessagesByIds/[chat_id]/[user_id] ? (order=desc,asc)

	# пример
	/api/MessagesByIds/2/1?order=desc

	[{"message_id":9,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1},
	{"message_id":8,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1}]


	# сообщения в чате, грузим count сообщений начиная по убыванию не включительно с start_msg_id (т.е от новых к старым)
	# если start_id == 0 или его нет, то грузим с самого нового сообщения
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию message_id
	/api/MessagesByChatIdOffset/[chat_id]/[count]/(start_msg_id) ? (order=desc,asc)

	# пример
	/api/MessagesByChatIdOffset/2/2/4?order=desc

	[{"message_id":3,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1},
	{"message_id":2,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1}]


	# сообщения в чате, грузим сообщения с датами date1 <= date < date2
	# даты в UNIX формате
	# если date2 == 0 или его нет, то загрузит сообщения до самого нового
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию date
	/api/MessagesByChatIdDate/[id]/[date1]/(date2) ? (order=desc, asc)

	# пример
	/api/MessagesByChatIdDate/2/1668623544?order=asc

	[{"message_id":1,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1},
	{"message_id":2,"text":"asd asd","date":1668623544,"chat_id":2,"user_id":1}]

	# выдаст csv файл с сообщениями беседы ("messages.csv", UTF-8, разделение через табуляцию)
	/api/MessagesByChatIdCsv/[id]

	# пример
	/api/MessagesByChatIdCsv/8

	(начнется загрузка файлика)
	

	# кол-во вообще всех сообщений
	/api/MessagesCount

	#пример
	/api/MessagesCount

	592


	# кол-во сообщений в чатах
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию кол-ва сообещний в чате
	/api/MessagesCountsInChatsAll ? (order=desc,asc)

	# пример
	/api/MessagesCountsInChatsAll?order=desc

	[{"chat_id":3,"messages_count":14},
	{"chat_id":2,"messages_count":9}]

	
	# кол-во сообщений в конкретном чате
	/api/MessagesCountsByChatId/[id]

	# пример
	/api/MessagesCountsByChatId/2

	23


	# кол-во сообщений в чате за промежуток времени date1 <= date < date2
	# даты в UNIX формате
	# если date2 == 0 или его нет, то считает сообщения до самого нового
	/api/MessagesCountsByChatIdDate/[id]/[date1]/(date2)

	# пример
	/api/MessagesCountsByChatIdDate/2/1668623542/1668623544

	8

	# сообщения в чате по датам, сгруппированные по интервалам
	# даты в UNIX формате
	# date1 = 01.11.2022 (в unix формате) если указано значение меньше
	# если date2 == 0 или его нет, то загрузит сообщения до самого нового
	/api/MessagesCountsByChatIdDateIntervals/[id]/[interval]/[date1]/(date2)

	#пример
	/api/MessagesCountsByChatIdDateIntervals/1/3600/123

	[0,0,1,0,0,0,0,1,4,14]

Chats:
------

	# все чаты
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию last_message_date
	/api/ChatsAll ? (order=desc,asc)

	# пример
	/api/ChatsAll?order=desc

	[{"chat_id":2,"last_message_date":1668623544},
	{"chat_id":3,"last_message_date":123}]


	# чат по chat_id
	/api/ChatById/[id]

	# пример
	/api/ChatById/2

	{"chat_id":2,"last_message_date":1668623544}


	# кол-во всех чатов
	/api/ChatsCount

	#пример
	/api/ChatsCount

	3


ChatUsers: (один и тот же пользователь в разных чатах - разные ChatUser)
------------------------------------------------------------------------

	# все чат-юзеры (аккуратно, данных может быть много)
	/api/ChatUsersAll

	# пример
	/api/ChatUsersAll

	[{"chat_id":2,"user_id":1,"messages_count":9},
	{"chat_id":3,"user_id":2,"messages_count":14}]

	
	# все чат-юзеры в чате
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию messages_count
	/api/ChatUsersByChatId/[chat_id] ? (order=desc,asc)

	# пример (чат-юзер только 1 получился)
	/api/ChatUsersByChatId/2?oder=asc

	[{"chat_id":2,"user_id":1,"messages_count":9}]


	# все чат-юзеры по user_id (т.е один и тот же пользователь в разных чатах)
	# order (необязательно) отвечает за порядок, либо по возрастанию, либо по убыванию messages_count
	/api/ChatUsersByUserId/[user_id] ? (order=desc,asc)

	# пример
	/api/ChatUsersByUserId/1?oder=asc

	[{"chat_id":2,"user_id":1,"messages_count":9},
	{"chat_id":3,"user_id":1,"messages_count":9}]


	# чат-юзер по chat_id и user_id
	/api/ChatUserByIds/[chat_id]/[user_id]

	# пример
	/api/ChatUserByIds/2/1

	{"chat_id":2,"user_id":1,"messages_count":9}

	
	# кол-во всех чат-юзеров
	/api/ChatUsersCount

	# пример
	/api/ChatUsersCount

	6


VkApi methods: (методы, которые через бота обращаются к Vk API)
---------------------------------------------------------------

	# возвращает данные по профилям людей в беседе
	/api/vk/UsersInfoByChatId/[id]

	# пример
	/api/vk/UsersInfoByChatId/8

	[{"id":123,"photo_50":"(url)","first_name":"Футбольный","last_name":"Мячик","can_access_closed":true,"is_closed":true},
	{"id":321,"photo_50":"(url)","first_name":"Жак","last_name":"Фреско","can_access_closed":true,"is_closed":true}]

	
	# возвращает инфо о беседе (название, ава и тд)
	/api/vk/ChatInfoById ? [chat_ids=[id1],(id2),(id...)]

	# пример
	/api/vk/ChatInfoById?chat_ids=8

	[{"title":"name","members_count":5,"owner_id":123,"state":"in","photo":{"photo_50":"url","photo_100":"url","photo_200":"url","is_default_photo":false,"is_default_call_photo":false},"active_ids":[321,212,111,2242],"is_disappearing":false,"is_service":false, "id":8}]









	



