# ♻️ EcoVision AI - Real-Time Waste Detection System

EcoVision AI is a real-time object detection web application built using **Python, Flask, YOLOv8, OpenCV, HTML, CSS, JavaScript, and Bootstrap**. The application captures live webcam video, performs object detection using YOLOv8, and displays the processed video stream in a modern web dashboard.

---

## 📌 Features

- 🎥 Real-time webcam streaming
- 🤖 YOLOv8 object detection
- 🌐 Flask web application
- 📊 Live dashboard
- ▶️ Start Detection
- ⏹️ Stop Detection
- 📷 Capture detection images
- 📈 Live statistics
- 📱 Responsive Bootstrap UI
- ⚡ Fast and lightweight

---

## 🛠 Technologies Used

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

### Backend
- Python
- Flask
- OpenCV

### AI Model
- YOLOv8 (Ultralytics)

---

# 📂 Project Structure

```
WasteDetection/
│
├── app.py
├── requirements.txt
├── README.md
├── yolov8n.pt
│
├── captures/
│
├── templates/
│     └── index.html
│
├── static/
│     ├── css/
│     │      style.css
│     │
│     └── js/
│            app.js
│
└── screenshots/
```

---

# ⚙️ Installation

## 1 Clone Repository

```bash
git clone https://github.com/yourusername/EcoVision-AI.git
```

Move into project

```bash
cd EcoVision-AI
```

---

## 2 Create Virtual Environment (Optional)

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

---

## 3 Install Dependencies

```bash
pip install -r requirements.txt
```

or

```bash
pip install flask ultralytics opencv-python
```

---

## 4 Download YOLOv8 Model

Place

```
yolov8n.pt
```

inside the project root.

---

## 5 Run the Project

```bash
python app.py
```

---

## 6 Open Browser

```
http://127.0.0.1:5000
```

---

# 🚀 Dashboard

The dashboard provides

- Live Camera Feed
- Object Detection
- Object Counter
- Detection Confidence
- FPS
- Start Button
- Stop Button
- Capture Button

---

# 📷 Capture Images

Captured images are automatically stored inside

```
captures/
```

---

# ⚙️ API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Home Page |
| GET | /video_feed | Live Detection Stream |
| GET | /start | Start Detection |
| GET | /stop | Stop Detection |
| GET | /capture | Save Screenshot |
| GET | /stats | Detection Statistics |

---

# 📊 Current Model

Current model

```
YOLOv8 Nano
```

```
yolov8n.pt
```

The model detects the standard COCO object classes such as:

- Person
- Bottle
- Cup
- Chair
- Laptop
- Car
- Dog
- Cat
- Cell Phone
- etc.

---

# 🔮 Future Improvements

- Train a custom YOLO model for biodegradable and non-biodegradable waste.
- Add object tracking using ByteTrack or DeepSORT.
- Store detection history in a database.
- Generate analytics dashboards.
- User authentication.
- Export reports.
- Deploy to cloud.
- Mobile support.

---

# 📸 Screenshots

Add screenshots inside

```
screenshots/
```

Example

```
dashboard.png

detection.png

capture.png
```

---

# 📦 Requirements

```
Flask
OpenCV
Ultralytics
Python 3.10+
Bootstrap 5
```

---

# 📄 License

This project is developed for educational and research purposes.

---

# 👨‍💻 Author

**Vaithyanadhan S G**

Artificial Intelligence and Data Science

K. Ramakrishnan College of Technology

---

# ⭐ Acknowledgements

- Ultralytics YOLOv8
- Flask
- OpenCV
- Bootstrap
