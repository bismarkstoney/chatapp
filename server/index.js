require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const socket = require('socket.io');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const strategy = require('./middleware/passport');
const connectDb = require('./config/db');

//app initialization
const app = express();
const PORT = process.env.PORT || 5000;

const session = {
	secret: process.env.secret,
	cookie: {},
	resave: false,
	saveUninitialized: false,
};
if (app.get('env') === 'production') {
	session.cookie.secure = true; // Serve secure cookies, requires HTTPS
}
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
//middlewares
app.use(cors());
app.use(express.json());

//Connect to databse
connectDb();

//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/messages', messageRoutes);

const server = app.listen(process.env.PORT, () =>
	console.log(`Server started on ${PORT}`)
);
const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-recieve', data.msg);
		}
	});
});
