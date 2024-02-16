--  Crear base de datos
-- CREATE DATABASE `petshop`; 

USE `petshop`; 

--  users
CREATE  TABLE  `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `admin` BOOLEAN NOT NULL,
PRIMARY KEY (`id`) );

--  orders
CREATE  TABLE  `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `order_date` DATE NOT NULL,
  `ammount` DOUBLE NOT NULL,
  foreign key (`user_id`) references `users`(`id`) on delete cascade on update cascade,
PRIMARY KEY (`id`) );

--  products
CREATE  TABLE  `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `price` DOUBLE NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `category` VARCHAR(30) NOT NULL,
  `create_date` DATE NOT NULL,
  `units_stock` INT NOT NULL,
PRIMARY KEY (`id`) );


--  order details
CREATE  TABLE  `order_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `quantity` INT NOT NULL,
  foreign key (`order_id`) references `orders`(`id`) on delete cascade on update cascade,
  foreign key (`products_id`) references `products`(`id`) on delete cascade on update cascade,
PRIMARY KEY (`id`) );

--  categories
CREATE  TABLE  `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
PRIMARY KEY (`id`) );

--  products categories
CREATE  TABLE  `products_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `products_id` INT NOT NULL,
  `categories_id` INT NOT NULL,
  foreign key (`products_id`) references `products`(`id`) on delete cascade on update cascade,
  foreign key (`categories_id`) references `categories`(`id`) on delete cascade on update cascade,
PRIMARY KEY (`id`) );


INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `role`) VALUES
(1, 'Viviana', 'Sanchez', 'Viviendo', '1234', 'yady.sanchez@gmail.com', 0),
(2, 'Sol', 'Guerra', 'Soles', '12345', 'sol.guerra@gmail.com', 0),
(3, 'Juan', 'Murillo', 'Juanis', '7891', 'juan.murillo@gmail.com', 0),
(4, 'Laudy', 'Navarrete', 'Lau', '1234', 'laudy.navarrete@gmail.com', 1),
(5, 'Nikole', 'Guerra', 'nikiwi', '12345', 'nikole.guerra@gmail.com', 0),
(6, 'Alejandro', 'Cartes', 'Huesva', 'pixil', 'ale.cuartas@gmail.com', 0);

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `ammount`) VALUES
(1, 1, '2024-02-14', 1),
(2, 2, '2024-02-15', 2),
(3, 3, '2024-02-15', 2);
--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `category`, `create_date`, `units_stock`) VALUES
(1, 'Puppy Food Dry, Kibble', 69.98, 'Formulated to support an appropriate growth rate for large breed puppies. Size: 15KG bag', '', 'Dog', '2024-02-14', 30),
(2, 'Imagine cat kitten, Dry Kibble', 44.55, 'natural food for kittens (2 to 12 months old) made in Spain with high quality local ingredients.Size:8 KG.', '', 'Cat', '2024-02-14', 20),
(3, 'Beaphar care  HÁMSTER', 5.19, 'Extruded food for hamsters of all ages, it has high palatability and is rich in fiber, low in fat and a source of omega 3 and 6 and spirulina, benefits dental health, and is easy to digest. 250 G.', '', 'Rodent', '2024-02-14', 10),
(4, 'Tetra Goldfish Flakes', 12.99, 'With Clean & Clear Water formula: improves feed conversion and reduces fish excretion for clean, clear aquarium water. 200G', '', 'Fish', '2024-02-14', 10),
(5, 'Hill´s Science Adult Sensitive', 55.99, 'Contains prebiotic fiber to help feed your small buddy’s microbiome for optimal digestive health.', '', 'Dog', '2024-02-15', 20),
(6, 'Gourmet gold fondant', 2.55, 'quality food for your cat. 85 G.', '', 'Cat', '2024-02-15', 15),
(7, 'Versele laga nature ', 5.55, 'Versele-Laga Nature for hamsters is the food that covers all their nutritional needs and ensures their nutritional well-being.', '', 'Rodent', '2024-02-15', 10),
(8, 'Tetra Pond Sticks', 33.4, 'Complete and balanced diet for daily feeding of all pond fish.', '', 'Fish', '2024-02-15', 6);

-- --------------------------------------------------------
INSERT INTO `order_details` (`id`, `order_id`, `products_id`, `price`, `quantity`) VALUES
(1, 1, 1, 209.94, 3);

INSERT INTO `categories` (`id`,`name`, `description`) VALUES
(1, 'Dog','articles for dogs'),
(2, 'Cat', 'articles for cats'),
(3, 'Rodent', 'article for rodents'),
(4,'Fish', 'article for fish');

INSERT INTO `products_categories` (`id`, `products_id`, `categories_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4);