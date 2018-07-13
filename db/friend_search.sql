select username, profile_pic, userid from userinfo
where lower(username) like lower($1) and lower(username) not like lower($2)
and userid not in (select friend_2_ID from friends where friend_1_ID = $3 and request_pending = false);