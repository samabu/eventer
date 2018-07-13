module.exports = {
    update: ( req, res ) => {
        let { auth_id } = req.session.user;
        let { username, email, profile_pic, zipcode } = req.body;
        req.app.get('db').update_user([auth_id, username, email, profile_pic, zipcode])
        .then((response) => {
            req.session.user = response[0]
            res.sendStatus(200)
        })
        .catch(console.log)
    },

    delete: ( req, res ) => {
        req.app.get('db').delete_user([req.session.user.auth_id])
    }
}