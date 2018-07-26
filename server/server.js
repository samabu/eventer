require('dotenv').config();
const express = require('express');
const bodyPaser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const axios = require('axios');
const pc = require('./controllers/profile_controller');
const fc = require('./controllers/friends_controller');
const rc = require('./controllers/requests_controller');
const ec = require('./controllers/events_controller');
const bc = require('./controllers/business_controller')
const socket = require('socket.io');

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

const io = socket(app.listen(3005, () => console.log('Server listening on port 3005')));

io.on('connection', socket => {
  console.log('User Connected');
  socket.emit("welcome", {userID: socket.id})

  socket.on('message sent', data => {
    console.log(data)
    io.emit('message dispatched', data);
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })

});

app.use(bodyPaser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));

// app.use(authMid.bypassAuthInDevelopment)

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('database ready')
})
.catch((e) => console.log(e));

app.get('/auth/callback', async (req, res) => {
    let payload = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/callback`
    };
  
    let responseWithToken = await axios.post(
      `https://${process.env.REACT_APP_DOMAIN}/oauth/token`,
      payload
    );

    let userData = await axios.get(
      `https://${process.env.REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`
    );
    const db = req.app.get('db');
    let { sub, name, picture } = userData.data;
    let userExists = await db.find_user([sub]);
    if (userExists[0]) {
      req.session.user = userExists[0];
      res.redirect(`${process.env.FRONTEND_DOMAIN}/#/dashboard`);
    } else {
      db.create_user([sub, name, picture]).then(createdUser => {
        req.session.user = createdUser[0];
        res.redirect(`${process.env.FRONTEND_DOMAIN}/#/dashboard`);
    });

    }
  });
  
  app.get('/api/user-data', ( req, res ) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    }
    else {
      res.status(401).send('Nice try loser')
    }
  })
  
  app.get('/api/logout', ( req, res ) => {
    req.session.destroy();
    res.redirect(`${process.env.FRONTEND_DOMAIN}/#`)
  })
  
  // Profile 
  app.post('/api/update', pc.update)
  app.delete('/api/delete', pc.delete)

  // Friend List
  app.get('/api/friends', fc.read)
  app.get('/api/search/:input', fc.search)
  app.post('/api/addfriend', fc.add)
  app.delete('/api/delete/:userid', fc.delete)

  // Friend Requests
  app.get('/api/friendrequests', rc.read)
  app.post('/api/accept', rc.add)
  app.delete('/api/reject/:userid', rc.delete)

  // Events
  app.get('/api/invitefriendsearch/:input', ec.search)
  app.post('/api/create', ec.create)
  app.post('/api/invitefriend', ec.invite_friend)
  app.get('/api/events', ec.read)
  app.delete('/api/deleteevent/:event_id', ec.delete)
  app.delete('/api/deleteinvite/:event_id', ec.delete_invite)

  // Businesses 
  app.get('/api/businesses', bc.read)
