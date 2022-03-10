INSERT INTO users (name, email, password)
VALUES ('Ryan MacEachern', 'ryan.m@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kat Kierans', 'kat.k@unbound.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Michael Myers', 'halloween@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jonsi Ros', 'sigur.lead@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Brandon Boyd', 'alias@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Liz Steel', 'rock.on@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Fefe Dobson', 'bigdobbers@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Lisa Johnson', 'lisa.j@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, 
parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'Lands End', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 
'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 1082.80, 6, 3, 4, 'Canada', '262 Halfway Rd', 'Muskoka', 'Ontario', 'V1J4U3'
),
(2, 'Harps Landing', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 
'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 965.05, 3, 2, 2, 'Canada', '651 Nami Road', 'Gladway', 'Alberta', 'V5J4L3'
),
(3, 'The Brickyard', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 
'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 180.55, 1, 1, 1, 'Canada', '1650 Hejto Center', 'Hinkerton', 'Manitoba', 'V1P8U9'
),
(4, 'Swallows Tail', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 
'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 355.30, 4, 4, 6, 'Canada', '513 Powov Grove', 'Prince Geroge', 'British Columbia', 'V7J4U1'
),
(5, 'Half-Moon Plateau', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 
'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 490.40, 6, 3, 4, 'Canada', '1392 Gaza Junction', 'Lillerton', 'Saskatchewan', 'V0D8I2'
),
(6, 'The Jerrymanderers', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 
'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 650.17, 5, 3, 6, 'Canada', ' 340 Dokto Park', 'Port Hood', 'Nova Scotia', 'V7F5K3'
);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ('2018-09-11', '2018-09-26', 2, 3),
  ('2019-01-04', '2019-02-01', 2, 7),
  ('2021-10-01', '2021-10-14', 1, 4),
  ('2014-10-21', '2014-10-21', 3, 5),
  ('2016-07-17', '2016-08-01', 3, 4),
  ('2018-05-01', '2018-05-27', 4, 8),
  ('2022-10-04', '2022-10-23', 5, 1),
  ('2015-09-13', '2015-09-30', 6, 8),
  ('2023-05-27', '2023-05-28', 4, 2),
  ('2023-04-23', '2023-05-02', 1, 7);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES (2, 5, 10, 3, 'messages'),
  (1, 4, 1, 4, 'messages'),
  (8, 1, 2, 5, 'messages'),
  (3, 5, 5, 4, 'messages'),
  (4, 2, 7, 5, 'messages'),
  (4, 3, 4, 4, 'messages'),
  (5, 6, 3, 5, 'messages');
