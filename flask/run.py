from gevent.pywsgi import WSGIServer
from flask_app import app

if __name__ == '__main__':  
    print("Hosting flask ...")
    WSGIServer(('0.0.0.0', 8000), app).serve_forever()