module.exports = {
    search: ( req, res ) => {
        let { userid, username } = req.session.user;
        let input = '%' + req.params.input + '%';
        req.app.get('db').invite_search([ input, username, userid ])
        .then(response => {
            return res.send(response)
        })
        .catch(console.log)
    },

    create: ( req, res ) => {
        let { userid } = req.session.user;
        let { input } = req.body;     
        req.app.get('db').create_event([ userid, input ])
        .then(response => {            
            req.session.event_id = response[0].event_id
            res.send(response[0])
        })
        .catch(console.log)
    },

    invite_friend: ( req, res ) => {
        let { userid } = req.body
        req.app.get('db').invite_friend([ req.session.event_id, userid ])
    },

    read: ( req, res ) => {
        let { userid } = req.session.user;
        req.app.get('db').get_events([ userid ])
        .then(response => {
            return res.send(response)
        })
        .catch(console.log)
    },

    delete: ( req, res ) => {
        req.app.get('db').delete_invites([ req.params.event_id ])
        .then(req.app.get('db').delete_event([ req.params.event_id ]))
        .catch(console.log)
    },

    delete_invite: ( req, res ) => {
        req.app.get('db').delete_invite([ req.params.event_id, req.session.user.userid ])
        .catch(console.log)
    }
}