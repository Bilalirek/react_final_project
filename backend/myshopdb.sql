-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 02:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myshopdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartdetails`
--

CREATE TABLE `cartdetails` (
  `CartDetailID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL CHECK (`Quantity` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `ContactID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Subject` varchar(255) DEFAULT NULL,
  `Message` text NOT NULL,
  `SubmittedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`ContactID`, `Name`, `Email`, `Subject`, `Message`, `SubmittedAt`) VALUES
(4, 'Bilal irek', 'bilal.1998.196@gmail.com', 'food ', 'the food was so nice', '2024-11-29 10:50:59'),
(5, 'bilal', 'bilal@gmail.com', 'drinks', 'very nice drinks', '2024-11-29 15:14:07');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `CustomerID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`CustomerID`, `Username`, `Email`, `Password`, `Location`) VALUES
(36, 'bbb', 'Bilal.bi444@outlook.com', '1111', 'KL'),
(59, 'bilal', 'bilal.1998.196@gmail.com', '11111111111', 'ampang ');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetailID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`OrderDetailID`, `OrderID`, `ProductID`, `Quantity`, `Price`) VALUES
(68, 34, 41, 1, 46.40),
(69, 34, 28, 1, 13.50),
(70, 34, 6, 1, 11.90);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  `OrderDate` datetime DEFAULT current_timestamp(),
  `TotalAmount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `CustomerID`, `OrderDate`, `TotalAmount`) VALUES
(34, 59, '2024-11-29 10:49:24', 71.80);

-- --------------------------------------------------------

--
-- Table structure for table `passwordresettokens`
--

CREATE TABLE `passwordresettokens` (
  `TokenID` int(11) NOT NULL,
  `Token` varchar(255) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL,
  `ImageLink` varchar(255) DEFAULT NULL,
  `Category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `Description`, `Price`, `Stock`, `ImageLink`, `Category`) VALUES
(1, 'Chocolate Banana Cake', 'Cocoa banana sponge layered with fresh caramelized banana slices and coated with dark chocolate.', 12.90, 98, './photos/Chocolate Banana Cake.jpg', 'Cakes'),
(2, 'Chocolate Odyssey Cake', 'Chocolate mud cake base with Belgian chocolate praline cream topped with caramelized hazelnuts and cocoa crumbles.', 12.90, 98, './photos/Chocolate Odyssey Cake.jpg', 'Cakes'),
(3, 'Chocolate Brulee Cake', 'Silky smooth vanilla brulée and Swiss dark chocolate on chocolate mud cake over a crispy croquantine base.', 12.90, 100, './photos/Chocolate Brulee cake.png', 'Cakes'),
(4, 'Chocolate Indulgence Cake', 'Cocoa sponge with layers of Belgian white and dark chocolate, coated with melted chocolate.', 10.90, 100, './photos/Chocolate indulgence.png', 'Cakes'),
(5, 'Moist Chocolate Cake', 'Moist chocolate cake baked with smooth coffee filling, topped with melted chocolate.', 11.90, 100, './photos/moist chocolate cake.jpg', 'Cakes'),
(6, 'Decadent Tiramisu Cake', 'A unique twist of the classic tiramisu dessert with coffee sponge, layered with mascarpone cheese and espresso cream', 11.90, 98, './photos/Decadent Tiramisu Cake.jpg', 'Cakes'),
(7, 'Chocolat Au Lait Cake', 'Layers of moist cocoa sponge and Swiss milk chocolate mousse coated with melted Belgian and Swiss milk chocolate.', 10.90, 100, './photos/Chocolat Au Lait Cake.jpg', 'Cakes'),
(8, 'Choc Cheese Berries Cake', 'An ultimate fusion of cream cheese, Belgian dark chocolate and summer berries.', 11.90, 100, './photos/Choc Cheese Berries Cake.jpg', 'Cakes'),
(9, 'Lotus Biscoff Cheese', 'Creamy chilled cheese combined with a ganache and cookie base made with Biscoff.', 12.90, 100, './photos/Lotus Biscoff Cheese.jpg', 'Cakes'),
(10, 'Marble Cheesecake', 'Perfect mix of white chocolate and rich cream cheese over an oat and nut base.', 12.90, 100, './photos/Marble Cheesecake.jpg', 'Cakes'),
(11, 'Chocolate Ice Cream Plate', 'Decadent chocolate ice cream made with real cocoa.', 15.00, 100, './photos/Chocolate plate.jpg', 'Ice Creams'),
(12, 'Strawberry Ice Cream Plate', 'Fresh and fruity strawberry ice cream with real fruit pieces.', 15.00, 100, './photos/Strawberry plate.jpg', 'Ice Creams'),
(13, 'Vanila Ice Cream Plate', 'Vanilia ice cream made with fresh milk.', 15.00, 100, './photos/vanila plate.jpg', 'Ice Creams'),
(14, 'Mango Ice Cream Plate', 'Fresh and fruity Mango ice cream with real fruit pieces.', 15.00, 100, './photos/mango plate2.jpg', 'Ice Creams'),
(15, 'Chocolate Ice Cream Cone', 'Decadent chocolate ice cream cone made with real cocoa.', 5.00, 100, './photos/chocolate-cone.jpg', 'Ice Creams'),
(16, 'Strawberry Ice Cream Cone', 'Fresh and fruity strawberry ice cream cone with real fruit pieces.', 5.00, 100, './photos/Strawberry cone.jpg', 'Ice Creams'),
(17, 'Vanila Ice Cream Cone', 'Vanilia ice cream cone made with fresh milk.', 5.00, 100, './photos/Vanila cone.jpg', 'Ice Creams'),
(18, 'Mango Ice Cream Cone', 'Fresh and fruity Mango ice cream cone with real fruit pieces.', 5.00, 100, './photos/Mango cone.jpg', 'Ice Creams'),
(19, 'Country Fried Chicken', 'A golden crispy chicken served with a side of fries and garden salad, topped with rich creamy mushroom sauce.', 27.90, 100, './photos/Country Fried Chicken.jpg', 'Food'),
(20, 'Chicken Cordon Bleu', 'Boneless chicken chop stuffed with chicken square and cheese', 29.90, 100, './photos/Chicken Cordon Bleu.jpg', 'Food'),
(21, 'French Fries', 'French Fries', 10.90, 100, './photos/Frensh fries.jpg', 'Food'),
(22, 'Citrus Salad', 'A refreshing and colourful mix of fruits, vegetables and silvered almonds, drizzled with citrus sauce.', 10.90, 100, './photos/Citrus Salad.jpg', 'Food'),
(23, 'Chicken Satay', 'Skewers of chicken marinated in our special sauce and grilled to perfection. Served with slices of sweet onions,', 18.90, 100, './photos/Chicken Satay.jpg', 'Food'),
(24, 'Chicken Parmigiana', 'Tender chicken thigh topped with mozzarella cheese and tomato basil sauce, served with potato wedges and garden salad.', 24.90, 100, './photos/Chicken Parmigiana.jpg', 'Food'),
(25, 'Golden Crispy Chicken', 'Golden crumbed crispy chicken thigh topped with a swirl of Japanese mayonnaise. Served with french fries and garden salad.', 25.90, 100, './photos/Golden Crispy Chicken.jpg', 'Food'),
(26, 'Grilled Mushroom Chicken', 'Grilled chicken with special mushroom sauce. Served with herb rice and garden salad.', 26.90, 100, './photos/Grilled Mushroom Chicken.jpg', 'Food'),
(27, 'Tropical Green Tea', 'Signature Drinks - Specially crafted to refresh your senses.', 9.50, 100, './photos/Tropical Green Tea.jpg', 'Drinks'),
(28, 'Strawberry Punch', 'Signature Drinks - Specially crafted to refresh your senses.', 13.50, 99, './photos/Strawberry Punch.jpg', 'Drinks'),
(29, 'Fresh Watermelon', 'Fresh Juice', 10.50, 100, './photos/Fresh Watermelon.jpg', 'Drinks'),
(30, 'Freshly Squeezed Orange', 'Fresh Juice', 9.50, 100, './photos/Freshly Squeezed Orange.jpg', 'Drinks'),
(31, 'Fresh Green Apple', 'Fresh Juice', 8.50, 100, './photos/Fresh Green Apple.jpg', 'Drinks'),
(32, 'Caffe Latte', 'Coffee', 12.50, 100, './photos/Caffe Latte.jpg', 'Drinks'),
(33, 'Hazelnut Latte', 'Coffee', 14.50, 100, './photos/Hazelnut Latte.jpg', 'Drinks'),
(34, 'Caramel Latte', 'Coffee', 13.50, 100, './photos/Caramel Latte.jpg', 'Drinks'),
(35, 'Salted Caramel Latte', 'Coffee', 13.50, 100, './photos/Salted Caramel Latte.jpg', 'Drinks'),
(36, 'Ice Blended Cappuccino', 'Coffee', 14.00, 100, './photos/Ice Blended Cappuccino.jpg', 'Drinks'),
(37, 'Strawberry White Chocolate', 'Ice Blended', 13.50, 100, './photos/Strawberry White Chocolate.jpg', 'Drinks'),
(38, 'Vanilla Mocha', 'Ice Blended', 14.50, 100, './photos/Vanilla Mocha.jpg', 'Drinks'),
(39, 'Blazing Seafood', 'with spicy sweet sour sauce, tuna, crabsticks, pineapples, capsicums, onions, mozzarella cheese.', 40.80, 100, './photos/Blazing Seafood.jpeg', 'Pizza'),
(40, 'Chicken Supreme', 'with tomato sauce, chicken meat, chicken salami, chicken loaf, mushrooms, capsicums, onions, mozzarella cheese, tomatoes.', 44.80, 99, './photos/Chicken Supreme.jpeg', 'Pizza'),
(41, 'Island Supreme', 'with thousand island sauce, crabsticks, tuna, pineapples, onions, mozzarella cheese.', 46.40, 99, './photos/Island Supreme.jpeg', 'Pizza'),
(42, 'Triple Chicken', 'with thousand island sauce, chicken rolls, chicken meat, chicken salami, mushrooms, tomatoes, onions, mozzarella cheese.', 43.60, 100, './photos/Triple Chicken.jpeg', 'Pizza'),
(43, 'Super Supreme', 'with tomato sauce, ground beef, beef pepperoni, beef cabanossi, chicken loaf, mushrooms, pineapples, capsicums, olives, mozzarella cheese.', 41.60, 100, './photos/Super Supreme.jpeg', 'Pizza'),
(44, 'Veggie Lover', 'with tomato sauce, mushrooms, pineapples, tomatoes, capsicums, onions, mozzarella cheese. Contains garlic, onions, and cheese which may not be suitable for vegetarians.', 34.90, 100, './photos/Veggie Lover.jpeg', 'Pizza'),
(45, 'Chicken Delight', 'with BBQ sauce, chicken meat, mushrooms, onions, mozzarella cheese.', 37.80, 100, './photos/Chicken Delight.jpeg', 'Pizza'),
(46, 'Chicken Sensation', 'with spicy sweet sour sauce, chicken meat, pineapples, onions, mozzarella cheese.', 39.90, 100, './photos/Chicken Sensation.jpeg', 'Pizza'),
(47, 'Deluxe Cheese', 'with tomato sauce, mozzarella cheese.', 24.40, 100, './photos/Deluxe Cheese.jpeg', 'Pizza');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD PRIMARY KEY (`CartDetailID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`ContactID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetailID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  ADD PRIMARY KEY (`TokenID`),
  ADD UNIQUE KEY `Token` (`Token`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cartdetails`
--
ALTER TABLE `cartdetails`
  MODIFY `CartDetailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `ContactID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `OrderDetailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  MODIFY `TokenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD CONSTRAINT `cartdetails_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`),
  ADD CONSTRAINT `cartdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);

--
-- Constraints for table `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  ADD CONSTRAINT `passwordresettokens_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
