CREATE TABLE IF NOT EXISTS People (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS Dogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    breed TEXT NOT NULL DEFAULT 'nieznana',
    age INT
);

CREATE TABLE IF NOT EXISTS Adoptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER,
    dog_id INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('zaadoptowany', 'wolny')),
    adoption_date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (person_id) REFERENCES People(id) ON DELETE CASCADE,
    FOREIGN KEY (dog_id) REFERENCES Dogs(id) ON DELETE CASCADE
);

INSERT INTO People (first_name, last_name, phone_number, email, password_hash, role) VALUES
('Jan', 'Kowalski', '666-666-666', 'admin@example.com', 'hashed_password_here', 'admin'),
('Huang', 'Tao', '555-555-555', 'admin1@example.com', 'hashed_password_here', 'admin'),
('Varian', 'Wrynn', '999-999-999', 'user1@example.com', 'hashed_password_here', 'user'),
('Jan', 'Ciasto', '777-777-777', 'user2@example.com', 'hashed_password_here', 'user'),
('Edyta', 'Górniak', '111-111-111', 'user3@example.com', 'hashed_password_here', 'user')
ON CONFLICT(email) DO NOTHING;

INSERT INTO Dogs (name, breed, age) VALUES
('Bobik', 'Yorkshire Terrier', 4),
('Buddy', 'Golden Retriever', 3),
('Max', 'Beagle', 5),
('Bella', 'Labrador', 2),
('Mafi', 'Yorkshire Terrier Biewer', 8);

INSERT INTO Adoptions (person_id, dog_id, status) VALUES
(3, 2, 'zaadoptowany'),
(NULL, 5, 'wolny'),
(5, 1, 'zaadoptowany'),
(NULL, 3, 'wolny'),
(3, 4, 'zaadoptowany');
