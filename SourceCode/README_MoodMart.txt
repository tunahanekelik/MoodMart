==================================================
MOODMART - Mood-Based E-Commerce Platform
==================================================
Final Project Submission > Course: Web Design and Programming (CEN301)
==================================================
Developer: Tunahan Ferramuz Ekelik
--------------------------------------------------
Project Purpose
--------------------------------------------------
MoodMart is a full-stack web application designed to recommend specific "Retro Survival Kits" based on users' emotional states. 
The project implements a mood-based discovery system using a quiz and automated recommendations.

--------------------------------------------------
Project Architecture & Technologies
--------------------------------------------------
Backend:
- Java 17 / Spring Boot 
- Spring Data JPA with PostgreSQL 
- Maven for dependency management 

Frontend:
- React Framework 
- Material UI Component Library 
- Axios for RESTful API communication

--------------------------------------------------
Project Structure (Mandatory)
--------------------------------------------------
The project follows the required folder structure:
/SourceCode/frontend   - React source code (run with 'npm start') 
/SourceCode/backend    - Spring Boot source code (IntelliJ/Maven) 
/SourceCode/database   - PostgreSQL structure and data export 

--------------------------------------------------
API Endpoints
--------------------------------------------------
GET  /api/products          - Returns all products
GET  /api/products/mood/{m} - Returns products filtered by mood 

--------------------------------------------------
How to Run the Project
--------------------------------------------------
Backend: Open in IntelliJ IDE and run BackendApplication.
Frontend: Navigate to /SourceCode/frontend, run 'npm install' then 'npm start'. 
Database: Import 'moodmart_db.sql' from /SourceCode/database into PostgreSQL. 

--------------------------------------------------
Important Notes
--------------------------------------------------
- This project is submitted for the Web Design and Programming Final Project.
- Submission includes a 2-page signed report as per guidelines. 