from config.database import socketio

@socketio.on('data_update',namespace="/api/update")
def handle_data_update(data):
    # Process received data
    updated_data = data

    # Broadcast the updated data to all connected clients
    socketio.emit('updated_data', updated_data)