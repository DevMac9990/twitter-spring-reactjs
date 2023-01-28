create sequence chat_messages_seq start 100 increment 1;
create sequence chats_participants_seq start 100 increment 1;
create sequence chats_seq start 100 increment 1;

create table chat_messages
(
    id        int8 not null,
    author_id int8,
    date      timestamp,
    text      varchar(255),
    tweet_id  int8,
    chat_id   int8,
    is_unread boolean default true,
    primary key (id)
);
create table chats
(
    id            int8 not null,
    creation_date timestamp,
    primary key (id)
);
create table chats_participants
(
    id        int8 not null,
    left_chat boolean default false,
    user_id   int8,
    chat_id   int8,
    primary key (id)
);
alter table chat_messages
    add constraint FKt56nsqjwt7t4sian6vts9wg3t foreign key (chat_id) references chats;
alter table chats_participants
    add constraint FKjrfpltus8r643670taov8pana foreign key (chat_id) references chats;
