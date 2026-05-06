Stage 1

APIs
1.  GET /notifications — fetch all notifications
2. POST /notifications — add a new one
3. DELETE /notifications/:id — remove by id

Real-time
WebSocket for live updates.

Stage 2

Database
MySQL or PostgreSQL

notifications table
1 id
2. title
3.  type
4. createdAt

Problem
Large data = slow queries

Fix
Indexing + pagination

Stage 3

Problem
Query is slow on large data.

Fix
Index on (studentID, isRead, createdAt)

Why not index everything?
Slows inserts and wastes memory.

Query
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;
# Stage 4

##Problem

Fetching all data every time → slow

##Solution

1Pagination
2. Caching
3. Lazy loading
# Stage 5

Problem

Looping over 50k users is slow

Solution

Use queue system

Flow:
1. Save to DB
2. Send to queue
3. Worker sends email

Benefit

->. Fast
->. Retry if failure
# Stage 6

-> Logic

Priority:
Placement > Result > Event

Sort by:
1. priority
2. ttimestamp

Return top 10 notifications