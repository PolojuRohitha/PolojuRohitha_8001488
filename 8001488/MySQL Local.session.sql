/*Task-1
SELECT e.*
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
WHERE r.user_id = 1;
*/


/*Task-2
SELECT 
    e.event_id,
    e.title,
    AVG(f.rating) AS avg_rating,
    COUNT(f.feedback_id) AS total_feedback
FROM Events e
JOIN Feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.title
ORDER BY avg_rating DESC;
*/

/*Task-3
SELECT u.*
FROM Users u
WHERE u.user_id NOT IN (
    SELECT r.user_id
    FROM Registrations r
    WHERE r.registration_date >= CURDATE() - INTERVAL 90 DAY
);
*/


/*Task-4
SELECT 
    event_id,
    COUNT(*) AS session_count
FROM Sessions
WHERE HOUR(start_time) BETWEEN 10 AND 11
GROUP BY event_id;
*/

/*Task-5
SELECT 
    u.city,
    COUNT(DISTINCT r.user_id) AS total_users
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY total_users DESC
LIMIT 5;
*/

/*Task-6
SELECT 
    event_id,
    COUNT(CASE WHEN resource_type = 'pdf' THEN 1 END) AS pdf_count,
    COUNT(CASE WHEN resource_type = 'image' THEN 1 END) AS image_count,
    COUNT(CASE WHEN resource_type = 'link' THEN 1 END) AS link_count
FROM Resources
GROUP BY event_id;
*/

/*Task-7
SELECT 
    u.full_name,
    f.comments,
    e.title AS event_name,
    f.rating
FROM Feedback f
JOIN Users u ON f.user_id = u.user_id
JOIN Events e ON f.event_id = e.event_id
WHERE f.rating < 3;
*/

/*Task-8
SELECT 
    e.event_id,
    e.title,
    COUNT(s.session_id) AS session_count
FROM Events e
LEFT JOIN Sessions s 
    ON e.event_id = s.event_id
WHERE e.status = 'upcoming'
GROUP BY e.event_id, e.title;
*/


/*Task-9
SELECT 
    organizer_id,
    status,
    COUNT(event_id) AS total_events
FROM Events
GROUP BY organizer_id, status
ORDER BY organizer_id;
*/

/*Task-10
SELECT DISTINCT e.event_id, e.title
FROM Events e
WHERE e.event_id IN (SELECT event_id FROM Registrations)
AND e.event_id NOT IN (SELECT event_id FROM Feedback);
*/


/*Task-11
SELECT 
    DATE(registration_date) AS reg_day,
    COUNT(*) AS new_users
FROM Users
GROUP BY DATE(registration_date)
ORDER BY reg_day DESC;
*/

/*Task-12
SELECT 
    e.event_id,
    e.title,
    COUNT(s.session_id) AS session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
ORDER BY session_count DESC
LIMIT 1;
*/


/*Task-13
SELECT e.city,
       ROUND(AVG(f.rating), 2) AS average_rating
FROM Events e
JOIN Feedback f
ON e.event_id = f.event_id
GROUP BY e.city;
*/

/*Task-14
SELECT e.event_id,
       e.title,
       COUNT(r.registration_id) AS total_registrations
FROM Events e
JOIN Registrations r
ON e.event_id = r.event_id
GROUP BY e.event_id, e.title
ORDER BY total_registrations DESC
LIMIT 3;
*/


/*Task-15
SELECT s1.event_id,
       s1.session_id AS session1,
       s2.session_id AS session2,
       s1.title AS session1_title,
       s2.title AS session2_title
FROM Sessions s1
JOIN Sessions s2
ON s1.event_id = s2.event_id
AND s1.session_id < s2.session_id
AND s1.start_time < s2.end_time
AND s1.end_time > s2.start_time;
*/

/*Task-16
SELECT u.user_id,
       u.full_name,
       u.registration_date
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
WHERE r.user_id IS NULL;
*/


/*Task-17
SELECT speaker_name,
       COUNT(*) AS total_sessions
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(*) > 1;
*/

/*Task-18
SELECT e.event_id,
       e.title
FROM Events e
LEFT JOIN Resources r
ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;
*/

/*Task-19
SELECT e.event_id,
       e.title,
       COUNT(DISTINCT r.registration_id) AS total_registrations,
       ROUND(AVG(f.rating),2) AS average_rating
FROM Events e
LEFT JOIN Registrations r
ON e.event_id = r.event_id
LEFT JOIN Feedback f
ON e.event_id = f.event_id
WHERE e.status = 'completed'
GROUP BY e.event_id,e.title;
*/


/*Task-20
SELECT u.user_id,
       u.full_name,
       COUNT(DISTINCT r.event_id) AS events_attended,
       COUNT(DISTINCT f.feedback_id) AS feedbacks_submitted
FROM Users u
LEFT JOIN Registrations r
ON u.user_id = r.user_id
LEFT JOIN Feedback f
ON u.user_id = f.user_id
GROUP BY u.user_id,u.full_name
ORDER BY u.user_id;
*/


/*Task-21
SELECT u.user_id,
       u.full_name,
       COUNT(f.feedback_id) AS feedback_count
FROM Users u
JOIN Feedback f
ON u.user_id = f.user_id
GROUP BY u.user_id, u.full_name
ORDER BY feedback_count DESC
LIMIT 5;
*/

/*Task-22
SELECT user_id,
       event_id,
       COUNT(*) AS registration_count
FROM Registrations
GROUP BY user_id, event_id
HAVING COUNT(*) > 1;
*/


/*Task-23
SELECT DATE_FORMAT(registration_date,'%Y-%m') AS month,
       COUNT(*) AS registration_count
FROM Registrations
WHERE registration_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY DATE_FORMAT(registration_date,'%Y-%m')
ORDER BY month;
*/



/*Task-24
SELECT e.event_id,
       e.title,
       ROUND(AVG(TIMESTAMPDIFF(MINUTE,
                               s.start_time,
                               s.end_time)),2)
       AS avg_duration_minutes
FROM Events e
JOIN Sessions s
ON e.event_id = s.event_id
GROUP BY e.event_id, e.title;
*/