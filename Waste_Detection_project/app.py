from flask import Flask, render_template, Response, jsonify
from ultralytics import YOLO
import cv2
import os
import time

app = Flask(__name__)

# -----------------------------
# Create Capture Folder
# -----------------------------
os.makedirs("captures", exist_ok=True)

# -----------------------------
# Load YOLO
# -----------------------------
model = YOLO("yolov8n.pt")

# -----------------------------
# Webcam
# -----------------------------
camera = cv2.VideoCapture(0)

camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
camera.set(cv2.CAP_PROP_FPS, 30)
camera.set(cv2.CAP_PROP_BUFFERSIZE, 1)

# -----------------------------
# Global Variables
# -----------------------------
detection_running = True

last_frame = None

total_objects = 0

confidence = 0


# -----------------------------
# Home
# -----------------------------
@app.route("/")
def index():
    return render_template("index.html")


# -----------------------------
# Video Feed
# -----------------------------
def generate_frames():

    global last_frame
    global total_objects
    global confidence
    global detection_running

    while True:

        success, frame = camera.read()

        if not success:
            break

        if detection_running:

            results = model.predict(
                frame,
                conf=0.5,
                imgsz=640,
                verbose=False
            )

            annotated = results[0].plot()

            last_frame = annotated.copy()

            total_objects = len(results[0].boxes)

            if total_objects > 0:

                confidence = int(
                    float(results[0].boxes.conf[0]) * 100
                )

            else:

                confidence = 0

        else:

            annotated = frame

        ret, buffer = cv2.imencode(".jpg", annotated)

        frame = buffer.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' +
            frame +
            b'\r\n'
        )


@app.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )


# -----------------------------
# Start Detection
# -----------------------------
@app.route("/start")
def start():

    global detection_running

    detection_running = True

    return jsonify({
        "status": "started"
    })


# -----------------------------
# Stop Detection
# -----------------------------
@app.route("/stop")
def stop():

    global detection_running

    detection_running = False

    return jsonify({
        "status": "stopped"
    })


# -----------------------------
# Capture
# -----------------------------
@app.route("/capture")
def capture():

    global last_frame

    if last_frame is not None:

        filename = f"captures/{int(time.time())}.jpg"

        cv2.imwrite(filename, last_frame)

        return jsonify({
            "status": "saved",
            "file": filename
        })

    return jsonify({
        "status": "no frame"
    })


# -----------------------------
# Statistics
# -----------------------------
@app.route("/stats")
def stats():

    return jsonify({

        "objects": total_objects,

        "confidence": confidence,

        "bio": 0,

        "nonbio": total_objects

    })


# -----------------------------
# Exit
# -----------------------------
@app.route("/shutdown")
def shutdown():

    camera.release()

    return "Camera Released"


# -----------------------------
# Main
# -----------------------------
if __name__ == "__main__":

    app.run(
        debug=True,
        threaded=True
    )