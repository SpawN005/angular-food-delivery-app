create table client (
username varchar(20) primary key,
prenom varchar(45),
email varchar(45),
password varchar(45),
adresse varchar(45)
);
create table categorie (
categorie_id varchar(45) primary key,
nom varchar(45)
);
create table food (
food_id int primary key,
name varchar(45),
price float,
categorie_id int,
foreign key (categorie_id) references categorie(categorie_id)
);
create table panier (
username varchar(20),
food_id int,
panier_id int primary key,
quantity int,
payment float,
foreign key (username) references client(username),
foreign key (food_id) references food(food_id)
);