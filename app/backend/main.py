## Developed for Hack WashU 2022 by a bunch of nerds, lol

import flask

api = flask.Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body
