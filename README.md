# Mental_health_score
# 🧠 Mental Health Score Prediction

An end-to-end Machine Learning web application that predicts a user's mental health score based on various lifestyle and personal factors. The project uses a trained Machine Learning model served through a FastAPI backend and is deployed online using Render.

> **Live Demo:** https://mental-health-score-1-xl6p.onrender.com

---

## 📖 Overview

Mental health is influenced by several lifestyle factors such as sleep, work-life balance, stress levels, physical activity, and more.

This project demonstrates how Machine Learning can be integrated with a modern backend framework to create a complete prediction system.

Users enter their information through a web interface, and the application returns a predicted mental health score in real time.

> **Disclaimer:** This project is intended for educational purposes only and should not be considered a medical diagnosis or professional mental health assessment.

---

# ✨ Features

- Real-time Mental Health Score Prediction
- FastAPI REST API
- User-friendly web interface
- Machine Learning model integration
- Cloud deployment using Render
- Easy to extend with new features

---

# 🛠 Tech Stack

### Machine Learning
- Python
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Backend
- FastAPI
- Uvicorn

### Frontend
- HTML
- CSS
- JavaScript

### Deployment
- Render

### Version Control
- Git
- GitHub

---

# 📂 Project Structure

```
Mental_health_score/
│
├── app/
│   ├── main.py
│   ├── model.py
│   ├── templates/
│   ├── static/
│
├── model/
│   ├── Mental_Health_Model.pkl
│
├── requirements.txt
├── README.md
└── .gitignore
```

*(Update this structure if your folders are different.)*

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Arjun-Webs/Mental_health_score.git
```

Go inside the project

```bash
cd Mental_health_score
```

Create a virtual environment

```bash
python -m venv venv
```

Activate it

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
uvicorn app.main:app --reload
```

Open your browser

```
http://127.0.0.1:8000
```

---

# 📊 How It Works

1. User enters input values.
2. FastAPI receives the request.
3. Input data is preprocessed.
4. The trained Machine Learning model generates a prediction.
5. The predicted mental health score is returned to the user.

---

# 🌐 Live Demo

https://mental-health-score-1-xl6p.onrender.com

---

# 📸 Screenshots

## Home Page

_Add screenshot here_

## Prediction Form

_Add screenshot here_

## Prediction Result

_Add screenshot here_

---

# 🎯 Future Improvements

- User authentication
- Prediction history
- Confidence score
- Interactive visualizations
- Explainable AI (SHAP)
- Better UI/UX
- Mobile responsiveness

---

# 📚 Learning Outcomes

This project helped me gain practical experience in:

- Building Machine Learning models
- Data preprocessing
- API development with FastAPI
- Model deployment
- Cloud hosting
- Git & GitHub
- Debugging deployment issues

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and create a pull request.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

---

# 👨‍💻 Author

**Arjun**

GitHub:
https://github.com/Arjun-Webs

LinkedIn:
(Add your LinkedIn profile here)

---

## 📄 License

This project is licensed under the MIT License.
