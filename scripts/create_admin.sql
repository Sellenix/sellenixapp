INSERT INTO User (id, email, password, role, createdAt, updatedAt)
VALUES (
  UUID(),
  'admin@sellenix.com',
  '$2b$10$YourHashedPasswordHere',  -- Replace with a bcrypt hashed password
  'SUPERADMIN',
  NOW(),
  NOW()
);

