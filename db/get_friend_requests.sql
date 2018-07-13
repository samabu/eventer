select username, profile_pic, userid from userinfo
where userid in (select friend_1_id from friends where friend_2_id = $1 and request_pending = true)