module.exports = {
    read: ( req, res ) => {
        let { userid } = req.session.user;
        req.app.get('db').get_friend_requests([ userid ])
        .then( response => {
            return res.send(response)
        })
    },

    add: ( req, res ) => {
        req.app.get('db').accept_friend([ req.session.user.userid, req.body.userid, false ])
        .then( req.app.get('db').update_request([ req.body.userid, req.session.user.userid ]))
        .then( req.app.get('db').get_friend_requests([req.session.user.userid])
        .then( response => {
            return res.send(response)
        }))
    },

    delete: ( req, res ) => {
        let { userid } = req.session.user;
        req.app.get('db').delete_request([ req.params.userid, true ])
        .then(req.app.get('db').get_friend_requests([ userid ])
            .then( response => {
                return res.send(response)
            })
        )
    }
}