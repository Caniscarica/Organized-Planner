//Mohan
create table Event (
  EventID INT not null auto_increment,
  Title varchar(50) not null,
  StartDate DATETIME not null,
  EndDate DATETIME not null,
  Reminder DATETIME,
  Notes varchar(100),
  Location varchar(20),
  primary key(EventID)
) engine = innodb;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
