insert into events (host_id, event_name)
values ($1, $2)
returning *;