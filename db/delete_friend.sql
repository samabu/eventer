delete from friends 
where (friend_1_id = $1 and friend_2_id = $2)
or (friend_1_id = $2 and friend_2_id = $1);