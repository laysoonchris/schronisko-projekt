const db = require('better-sqlite3')('dev.db');
db.exec('PRAGMA foreign_keys = ON;');

const createTablePeople = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS People (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        verified BOOLEAN NOT NULL DEFAULT false
    );
    `;
    db.prepare(sql).run();
};

const createTableDogs = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS Dogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        breed TEXT NOT NULL,
        age INTEGER NOT NULL
    );
    `;
    db.prepare(sql).run();
};

const createTableAdoptions = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS Adoptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        person_id INTEGER,
        dog_id INTEGER NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('zaadoptowany', 'wolny', 'w trakcie')),
        description TEXT,
        adoption_date TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (person_id) REFERENCES People(id) ON DELETE SET NULL,
        FOREIGN KEY (dog_id) REFERENCES Dogs(id) ON DELETE CASCADE
    );
    `;
    db.prepare(sql).run();
};
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const updateAdmin = () => {
    const sql = `
        UPDATE People
        SET role = 'admin'
        WHERE email = 'test@wp.pl';
    `;
    db.prepare(sql).run();
};

createTablePeople();
createTableDogs();
createTableAdoptions();
updateAdmin();

const People = {

    create: (p) => {
        return db.prepare(`
            INSERT INTO People (first_name, last_name, phone_number, email, password_hash, role)
            VALUES (?, ?, ?, ?, ?, ?);
        `).run(
            p.first_name,
            p.last_name,
            p.phone_number,
            p.email,
            p.password_hash,
            p.role ?? 'user'
        );
    },

    getAll: () => {
        return db.prepare(`
            SELECT id, first_name, last_name, phone_number, email, role, verified
            FROM People;
        `).all();
    },

    getById: (id) => {
        return db.prepare(`
            SELECT id, first_name, last_name, phone_number, email, role, verified
            FROM People
            WHERE id = ?;
        `).get(id);
    },

    getByEmail: (email) => {
        return db.prepare(`SELECT * FROM People WHERE email = ?;`).all(email);
    },

    update: (id, p) => {
        return db.prepare(`
<<<<<<< Updated upstream
            UPDATE People
            SET first_name = ?, last_name = ?, phone_number = ?, email = ?, role = ?
            WHERE id = ?;
        `).run(
            p.first_name,
            p.last_name,
            p.phone_number,
            p.email,
            p.role,
            id
        );
=======
        UPDATE People
        SET first_name = ?, last_name = ?, phone_number = ?, email = ?, role = ?
        WHERE id = ?;
        `).run(p.first_name, p.last_name, p.phone_number, p.email, p.role, id);
>>>>>>> Stashed changes
    },

    updatePassword: (id, hash) => {
        return db.prepare(`
            UPDATE People SET password_hash = ? WHERE id = ?;
        `).run(hash, id);
    },

    delete: (id) => {
        return db.prepare(`
            DELETE FROM People WHERE id = ?;
        `).run(id);
    }
};

const Dogs = {

    create: (d) => {
        const dog = db.prepare(`
            INSERT INTO Dogs (name, breed, age)
            VALUES (?, ?, ?);
        `).run(d.name, d.breed, d.age);

        // rekord adopcji = pies wolny
        db.prepare(`
            INSERT INTO Adoptions (person_id, dog_id, status)
            VALUES (NULL, ?, 'wolny');
        `).run(dog.lastInsertRowid);

        return dog;
    },

    getAll: () => {
        return db.prepare(`
            SELECT id, name, breed, age FROM Dogs;
        `).all();
    },

    getById: (id) => {
        return db.prepare(`
            SELECT id, name, breed, age FROM Dogs WHERE id = ?;
        `).get(id);
    },

    update: (id, d) => {
        return db.prepare(`
            UPDATE Dogs
            SET name = ?, breed = ?, age = ?
            WHERE id = ?;
        `).run(d.name, d.breed, d.age, id);
    },

    delete: (id) => {
        return db.prepare(`
            DELETE FROM Dogs WHERE id = ?;
        `).run(id);
    }
};

const Adoptions = {

    create: (a) => {
        return db.prepare(`
            INSERT INTO Adoptions (person_id, dog_id, status, description)
            VALUES (?, ?, 'w trakcie', ?);
        `).run(a.person_id, a.dog_id, a.description);
    },

    getAll: () => {
        const sql = `
            SELECT 
                a.id,
                p.first_name,
                p.last_name,
                d.name AS dog_name,
                a.status,
                a.description,
                a.adoption_date,
                a.person_id,
                a.dog_id
            FROM Adoptions a
            LEFT JOIN People p ON p.id = a.person_id
            JOIN Dogs d ON d.id = a.dog_id;
        `;
        return db.prepare(sql).all();
    },

    getById: (id) => {
        return db.prepare(`
            SELECT * FROM Adoptions WHERE id = ?;
        `).get(id);
    },

    updateStatus: (id, status) => {
        return db.prepare(`
            UPDATE Adoptions
            SET status = ?, adoption_date = CURRENT_TIMESTAMP
            WHERE id = ?;
        `).run(status, id);
    },
    updateStatus: (id, status) => {
        return db.prepare(`
        UPDATE Adoptions
        SET status = ?,
            adoption_date = CURRENT_TIMESTAMP
        WHERE id = ?;
    `).run(status, id);
    },

    delete: (id) => {
        return db.prepare(`
            DELETE FROM Adoptions WHERE id = ?;
        `).run(id);
    },

    getFreeDogs: () => {
        const sql = `
            SELECT d.*
            FROM Dogs d
            JOIN Adoptions a ON a.dog_id = d.id
            WHERE a.status = 'wolny';
        `;
        return db.prepare(sql).all();
    },

    getByDogId: (dogId) => {
        return db.prepare(`
            SELECT * FROM Adoptions WHERE dog_id = ?;
        `).all(dogId);
    },

    getByPersonId: (personId) => {
        return db.prepare(`
            SELECT d.*
            FROM Adoptions a
            JOIN Dogs d ON d.id = a.dog_id
            WHERE a.person_id = ? AND a.status = 'zaadoptowany';
        `).all(personId);
    },

    adoptDog: (personId, dogId, description) => {
        const result = db.prepare(`
            UPDATE Adoptions
            SET person_id = ?,
                status = 'zaadoptowany',
                description = ?,
                adoption_date = CURRENT_TIMESTAMP
            WHERE dog_id = ? AND status = 'wolny';
        `).run(personId, description, dogId);

        if (result.changes === 0) {
            throw new Error('Dog is not available for adoption');
        }

        return result;
    },

    returnDog: (dogId) => {
        const result = db.prepare(`
            UPDATE Adoptions
            SET person_id = NULL,
                status = 'wolny',
                adoption_date = CURRENT_TIMESTAMP
            WHERE dog_id = ? AND status = 'zaadoptowany';
        `).run(dogId);

        if (result.changes === 0) {
            throw new Error('Ten pies nie jest zaadoptowany');
        }

        return result;
    },

    changeOwner: (dogId, newPersonId) => {
        const result = db.prepare(`
            UPDATE Adoptions
            SET person_id = ?, adoption_date = CURRENT_TIMESTAMP
            WHERE dog_id = ? AND status = 'zaadoptowany';
        `).run(newPersonId, dogId);

        if (result.changes === 0) {
            throw new Error('Brak zaadoptowanego psa');
        }

        return result;
<<<<<<< Updated upstream
    }
=======
    },

>>>>>>> Stashed changes
};

module.exports = {
    People,
    Dogs,
    Adoptions
};