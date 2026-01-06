
DELETE FROM product;

INSERT INTO product (title, description, price, mood, image_url) VALUES ('The Peaceful Zen Kit', 'Includes: Lofi Mixtape, Retro Walkman, and 3 Scented Zen Candles.', 125.00, 'peaceful', '/images/peaceful_kit.png');
INSERT INTO product (title, description, price, mood, image_url) VALUES ('Midnight Loneliness Kit', 'Includes: Jazz Cassette, Walkman, and a cozy Blanket.', 110.00, 'lonely', '/images/lonely_kit.png');
INSERT INTO product (title, description, price, mood, image_url) VALUES ('Extreme Motivation Kit', 'Includes: 80s Rock Tape, Walkman, and Running Gear Poster.', 145.00, 'motivated', '/images/motivated_kit.png');
INSERT INTO product (title, description, price, mood, image_url) VALUES ('Broken Heart Recovery Kit', 'Includes: Sad Love Songs Tape, Soft Tissues, and Rose Candles.', 105.00, 'heartbroken', '/images/heartbroken_kit.png');
INSERT INTO product (title, description, price, mood, image_url) VALUES ('Ultimate Energy Boost Kit', 'Turn up the volume! Includes: Synthwave Tape and Neon Lights.', 150.00, 'energetic', '/images/energetic.png');
INSERT INTO product (title, description, price, mood, image_url) VALUES ('Deep Thinker Kit', 'Includes: Nature Ambience Tape and a Pensive Window Poster.', 130.00, 'pensive', '/images/pensive_kit.png');
INSERT INTO product (title, description, price, mood, image_url) VALUES ('Morning Hope Kit', 'Includes: Birdsong Acoustic Tape and Sunrise Poster.', 118.00, 'hopeful', '/images/hopeful_kit.png');
INSERT INTO product (title, description, price, mood, image_url) VALUES ('Festival Excited Kit', 'Includes: Upbeat Pop Mixtape and Sparkling Candles.', 155.00, 'excited', '/images/excited_kit.png');


-- Add default Admin account
INSERT INTO users (email, password, role) VALUES ('admin@moodmart.com', 'admin123', 'admin');