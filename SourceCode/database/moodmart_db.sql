-- src/main/resources/import.sql

-- Clear existing data before inserting new records
DELETE FROM product;
DELETE FROM users;

-- Resetting sequences might be required depending on your DB config,
-- but DELETE is sufficient for standard 'import.sql' execution.

-- Product Data: Mood-based Survival Kits
-- Using numeric precision for price as requested in project standards
INSERT INTO product (title, description, price, mood, image_url) VALUES
            ('The Peaceful Zen Kit', 'Includes: Lofi Mixtape, Retro Walkman, and 3 Scented Zen Candles.', 43.00, 'peaceful', '/images/peaceful_kit.png'),
            ('Midnight Loneliness Kit', 'Includes: Jazz Mixtape, Walkman, and a cozy Blanket.', 40.00, 'lonely', '/images/lonely_kit.png'),
            ('Extreme Motivation Kit', 'Includes: 80s Rock Mixape, Walkman, and Running Gear Poster.', 35.00, 'motivated', '/images/motivated_kit.png'),
            ('Broken Heart Recovery Kit', 'Includes: Sad Love Songs Mixtape, Walkman, Soft Tissues, and Rose Candles.', 25.00, 'heartbroken', '/images/heartbroken_kit.png'),
            ('Ultimate Energy Boost Kit', 'Includes: Synthwave Mixtape, Walkman, and Neon Lights.', 40.00, 'energetic', '/images/energetic.png'),
            ('Deep Thinker Kit', 'Includes: Nature Ambience Mixtape, Walkman, and a Pensive Window Poster.', 38.00, 'pensive', '/images/pensive_kit.png'),
            ('Morning Hope Kit', 'Includes: Birdsong Acoustic Tape, Walkman and Sunrise Poster.', 30.00, 'hopeful', '/images/hopeful_kit.png'),
            ('Festival Excited Kit', 'Includes: Upbeat Pop Mixtape, Walkman, and Sparkling Candles.', 45.00, 'excited', '/images/excited_kit.png');

-- User Data: Admin and Standard User accounts
-- Roles follow the ROLE_ prefix convention for Spring Security integration
INSERT INTO users (email, username, password, role) VALUES
            ('admin@moodmart.com', 'admin', 'admin123', 'ROLE_ADMIN'),
            ('tonbaligi@moodmart.com', 'tonbaligi', '123', 'ROLE_USER');