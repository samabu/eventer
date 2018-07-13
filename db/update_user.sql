update userInfo
set username = $2, email = $3, profile_pic = $4, zipcode = $5
where auth_id = $1
returning *;
