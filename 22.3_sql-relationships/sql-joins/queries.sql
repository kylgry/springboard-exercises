-- 1 --

SELECT * FROM owners
FULL JOIN vehicles
ON owners.id = vehicles.owner_id;

-- 2 --

SELECT first_name, last_name, count(*) FROM owners
JOIN vehicles ON owners.id = vehicles.owner_id
GROUP BY first_name, last_name
ORDER BY first_name ASC;

-- 3 --

SELECT first_name, last_name, to_char(avg(price), '99999999')
AS average_price, count(*) FROM owners
JOIN vehicles ON owners.id = vehicles.owner_id
GROUP by first_name, last_name
HAVING avg(price) > 10000
ORDER by first_name DESC;
