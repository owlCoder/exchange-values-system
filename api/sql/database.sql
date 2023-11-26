-- Active: 1698963933767@@127.0.0.1@3306@proddb

-- Drop all tables if they exist
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS current_account;
DROP TABLE IF EXISTS credit_cards;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;

-- Reset auto-increment values for tables (if needed)
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE tokens AUTO_INCREMENT = 1;
ALTER TABLE credit_cards AUTO_INCREMENT = 1;
ALTER TABLE current_account AUTO_INCREMENT = 1;
ALTER TABLE transactions AUTO_INCREMENT = 1;

CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL,
    verified BOOLEAN NOT NULL
);

-- Sample users
INSERT INTO users (first_name, surname, address, city, country, phone_number, email, password, admin, verified)
VALUES
    ('Ana', 'Popović', 'Kneza Miloša 1', 'Belgrade', 'Serbia', '+381641112233', 'ana.popovic@mailinator.com', 'fdac810d0c09f25c5ddcee9976ab1f1ae1973dba7c65152d95b0937bc2a6c883', true, false),
    ('Marko', 'Jovanović', 'Narodnog Fronta 12', 'Novi Sad', 'Serbia', '+381641223344', 'marko.jovanovic@mailinator.com', '6a934b45144e3758911efa29ed68fb2d420fa7bd568739cdcda9251fa9609b1e', false, false),
    ('Jovana', 'Nikolić', 'Cara Dušana 45', 'Niš', 'Serbia', '+381641334455', 'jovana.nikolic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', false, false),
    ('Stefan', 'Petrović', 'Kralja Petra 78', 'Kragujevac', 'Serbia', '+381641445566', 'stefan.petrovic@mailinator.com', 'eda15ce4834ac303532bc6973df5ff8a5deb75d7dfceb9fc2cdf1bb450a01cf5', false, false),
    ('Milica', 'Đorđević', 'Vuka Karadžića 101', 'Subotica', 'Serbia', '+381641556677', 'milica.djordjevic@mailinator.com', 'f6a6a6c083de1ff2340fd5b25c1ea69e5bbde48a2200f64c47db77bdce5594a6', false, false),
    ('Nikola', 'Ilić', 'Cara Lazara 202', 'Čačak', 'Serbia', '+381641667788', 'nikola.ilic@mailinator.com', '25f43b1486ad95a1398e3eeb3d83bc4010015fcc9bedb35b432e00298d5021f7', true, false),
    ('Teodora', 'Stojanović', 'Svetog Save 303', 'Zrenjanin', 'Serbia', '+381641778899', 'teodora.stojanovic@mailinator.com', '1c142b2d01aa34e9a36bde480645a57fd69e14155dacfab5a3f9257b77fdc8d8', true, false);

-- Table for user tokens and auth (only FLASK API has access to it)
CREATE TABLE tokens (
    token VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    uid INT NOT NULL,
    FOREIGN KEY (email) REFERENCES users (email),
    FOREIGN KEY (uid) REFERENCES users (uid)
);

-- Table for credit cards
CREATE TABLE credit_cards (
    card_number VARCHAR(19) PRIMARY KEY NOT NULL,
    cardholder_name VARCHAR(40) NOT NULL,
    expiry_date VARCHAR(5) NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    verified BOOLEAN NOT NULL,
    uid INTEGER NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(uid)
);

-- Table for currents account
CREATE TABLE current_account (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20),
    balance DECIMAL(15, 4) DEFAULT 0.00,
    currency VARCHAR(5),
    card_number VARCHAR(19) NOT NULL,
    uid INTEGER NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(uid),
    FOREIGN KEY (card_number) REFERENCES credit_cards(card_number)
);

-- Transactions table
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_uid INT NOT NULL,
    sender_account_id INT NOT NULL,
    amount DECIMAL NOT NULL,
    receiver_account_number VARCHAR(255) NOT NULL,
    receiver_email VARCHAR(255) NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    receiver_surname VARCHAR(255) NOT NULL,
    approved VARCHAR(16) CHECK (approved IN ('ON HOLD', 'APPROVED', 'DENIED')),
    FOREIGN KEY (sender_uid) REFERENCES users(uid),
    FOREIGN KEY (sender_account_id) REFERENCES current_account(account_id)
);
