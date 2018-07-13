update friends
set request_pending = false
where friend_1_id = $1 and friend_2_id = $2;