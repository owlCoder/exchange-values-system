from flask import Blueprint, request, jsonify
import time

realtime_blueprint = Blueprint("realtime_blueprint", __name__)
realtime_data = []

class TransactionsUpdates:
    @realtime_blueprint.route('/api/realtime', methods=['GET'])
    def wait_for_data():
        while True:
            if realtime_data != request.args.get('lastData'):
                return jsonify({"data": realtime_data})
            time.sleep(1)