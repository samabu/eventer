select profile_pic, username, userid from userinfo
where userid in (select friend_2_ID from friends where friend_1_ID = $1 and request_pending = false);