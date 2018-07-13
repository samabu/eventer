delete from friends
where friend_1_id = $1 and request_pending = $2;