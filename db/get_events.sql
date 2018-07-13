select distinct e.event_id, e.event_name , ui.username 
from events e 
join userinfo ui on e.host_id = ui.userid
join invites i on e.event_id = i.event_id
where i.invitee_id = $1 or e.host_id = $1;