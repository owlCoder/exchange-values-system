-- Active: 1698963933767@@127.0.0.1@3306@proddb
-- Drop all tables if they exist
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS current_account;
DROP TABLE IF EXISTS credit_cards;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL CHECK (LENGTH(first_name) >= 1),
    surname VARCHAR(255) NOT NULL CHECK (LENGTH(surname) >= 1),
    address VARCHAR(255) NOT NULL CHECK (LENGTH(address) >= 1),
    city VARCHAR(255) NOT NULL CHECK (LENGTH(city) >= 1),
    country VARCHAR(255) NOT NULL CHECK (LENGTH(country) >= 1),
    phone_number VARCHAR(20) NOT NULL CHECK (LENGTH(phone_number) >= 6),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (LENGTH(email) >= 3),
    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 6),
    admin BOOLEAN NOT NULL CHECK (admin IN (0, 1)),
    verified BOOLEAN NOT NULL CHECK (verified IN (0, 1))
);

-- Sample users
INSERT INTO users (first_name, surname, address, city, country, phone_number, email, password, admin, verified)
VALUES
    ('Ana', 'Popović', 'Kneza Miloša 1', 'Belgrade', 'Serbia', '+381641112233', 'ana.popovic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', true, false),
    ('Marko', 'Jovanović', 'Narodnog Fronta 12', 'Novi Sad', 'Serbia', '+381641223344', 'marko.jovanovic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', false, false),
    ('Jovana', 'Nikolić', 'Cara Dušana 45', 'Niš', 'Serbia', '+381641334455', 'jovana.nikolic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', false, false),
    ('Stefan', 'Petrović', 'Kralja Petra 78', 'Kragujevac', 'Serbia', '+381641445566', 'stefan.petrovic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', false, false),
    ('Milica', 'Đorđević', 'Vuka Karadžića 101', 'Subotica', 'Serbia', '+381641556677', 'milica.djordjevic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', false, false),
    ('Nikola', 'Ilić', 'Cara Lazara 202', 'Čačak', 'Serbia', '+381641667788', 'nikola.ilic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', true, false),
    ('Teodora', 'Stojanović', 'Svetog Save 303', 'Zrenjanin', 'Serbia', '+381641778899', 'teodora.stojanovic@mailinator.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', true, false);

-- Table for user tokens and auth (only FLASK API has access to it)
CREATE TABLE tokens (
    token VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    uid INT NOT NULL,
    FOREIGN KEY (uid) REFERENCES users (uid)
);

-- Table for credit cards
CREATE TABLE credit_cards (
    card_number CHAR(19) PRIMARY KEY NOT NULL CHECK (LENGTH(card_number) = 19),
    cardholder_name VARCHAR(40) NOT NULL CHECK (LENGTH(cardholder_name) >= 1),
    expiry_date CHAR(5) NOT NULL CHECK (LENGTH(expiry_date) = 5),
    cvv CHAR(3) NOT NULL CHECK (LENGTH(cvv) = 3),
    verified BOOLEAN NOT NULL,
    uid INTEGER NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(uid)
);

-- Table for currents account
CREATE TABLE current_account (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    account_number CHAR(17) CHECK (LENGTH(account_number) = 17),
    balance DECIMAL(15, 4) DEFAULT 0.00 CHECK (balance >= 0.00),
    currency CHAR(3) CHECK (LENGTH(currency) = 3),
    card_number CHAR(19) NOT NULL CHECK (LENGTH(card_number) = 19),
    uid INTEGER NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(uid),
    FOREIGN KEY (card_number) REFERENCES credit_cards(card_number),
    CONSTRAINT uc_account_currency UNIQUE (account_number, currency)
);

-- Transactions table
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_uid INT NOT NULL,
    sender_account_id INT NOT NULL,
    amount DECIMAL(15, 4) NOT NULL CHECK (amount > 0.00),
    receiver_account_number VARCHAR(255) NOT NULL CHECK (LENGTH(receiver_account_number) = 20),
    receiver_email VARCHAR(255) NOT NULL CHECK (LENGTH(receiver_email) >= 3),
    receiver_name VARCHAR(255) NOT NULL CHECK (LENGTH(receiver_name) >= 1),
    receiver_surname VARCHAR(255) NOT NULL CHECK (LENGTH(receiver_surname) >= 1),
    approved VARCHAR(16) NOT NULL CHECK (approved IN ('ON HOLD', 'APPROVED', 'DENIED')),
    FOREIGN KEY (sender_uid) REFERENCES users(uid),
    FOREIGN KEY (sender_account_id) REFERENCES current_account(account_id)
);

