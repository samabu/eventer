module.exports = {
    read: ( req, res ) => {
        let { userid } = req.session.user;
        req.app.get('db').get_friends([userid])
        .then(response => {
            req.session.friends = response;
            return res.send(response)
        })
        .catch(console.log)
    },

    search: ( req, res ) => {
        let { userid, username } = req.session.user
        let input = '%' + req.params.input + '%'
        req.app.get('db').friend_search([input, username, userid])
        .then(response => {
            return res.send(response)
        })
        .catch(console.log)
    },

    add: ( req, res ) => {
        req.app.get('db').add_friend([ req.session.user.userid, req.body.userid ])
    }

}