from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__, "/static")
socketio = SocketIO(app)
users = {}


@app.route("/")
def index():
    print("index")
    return render_template("chatapp.html")


@socketio.on("connect")
def handle_connect():
    pass


@socketio.on("user_join")
def handle_user_join(username):
    users[username] = request.sid
    print(username)

@socketio.on("message")
def handle_message(message):
    for user in users:
        if users[user] != request.sid:
            emit("chat", {"message": message, "username": [i for i in users if users[i]==request.sid]}, to=users[user])


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
    # http://127.0.0.1:5000/
