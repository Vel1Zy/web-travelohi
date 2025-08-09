# Travelohi ✈️ (March, 2024)

Travelohi is a web application inspired by the popular travel booking platform, Traveloka. This project serves as a full-stack development exercise, integrating a Go (Golang) backend with a React frontend.

A key feature of this application is an **AI-powered location recognition model**. Users can upload an image of a location, and the model will predict the country where the photo was taken.

## About The Project

This project was built to demonstrate proficiency in modern web development and machine learning integration. It includes a complete REST API for handling data, a responsive user interface, a secure authentication system, and a custom-trained Convolutional Neural Network (CNN) served via a Flask API.

The primary goal is to replicate the core user experience of a travel booking website while showcasing the ability to build and deploy an end-to-end AI model.

---

## Tech Stack

This project is built with the following technologies:

### Backend & AI

![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

- **Go (Golang):** For building the main REST API for user data and bookings.
- **Python/Flask:** For serving the trained AI model as a dedicated backend endpoint.
- **TensorFlow/Keras:** For building and training the deep learning model.
- **PostgreSQL:** As the relational database for storing all application data.
- **JWT (JSON Web Tokens):** For secure, stateless user authentication.

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

- **React (with TypeScript):** For building a type-safe and scalable user interface.
- **Vite:** As the next-generation frontend tooling for a blazing fast development experience.
- **Pure CSS:** For styling, to demonstrate foundational CSS skills without component libraries.

---

## Features

- **AI-Powered Location Recognition:** Upload an image and let the model predict the country (Brazil, Canada, Finland, Japan, UK, or US).
- **Secure User Authentication:** Users can register and log in using a system secured by JWT.
- **Dual REST APIs:** A Go API for core application logic and a Python/Flask API for serving AI predictions.
- **Dynamic Frontend:** A responsive and interactive UI built with React.
- **Travel Product Browse:** Users can view lists of available flights and hotels.
- **Booking Simulation:** A simplified process for users to create bookings.

---

## 🤖 AI Model: Location Recognition

The core of the AI functionality is a custom-built Convolutional Neural Network (CNN) trained to identify a location's country from an image. The model and its training process are detailed in the `AlexNet_final_AI23_2.ipynb` notebook.

### Model Details

- **Architecture**: The model is a custom sequential CNN inspired by the **AlexNet** architecture. It consists of multiple `Conv2D` layers with `BatchNormalization` and `MaxPooling2D`, followed by `Dense` layers with `Dropout` to prevent overfitting.
- **Input**: The model expects a **224x224** pixel RGB image.
- **Output**: It provides a probability distribution across 6 classes using a `softmax` activation function. The classes are:
  - `Brazil`, `Canada`, `Finland`, `Japan`, `United-Kingdom`, `United-States`

### Data & Training

- **Preprocessing**: As noted in the notebook, images undergo augmentation (`shear`, `zoom`, `horizontal_flip`) and an experimental `GaussianBlur` is applied to see its effect on performance.
- **Data Handling**: To preserve valuable data, a small number of `Unlabeled` images in the training set were merged into the `Finland` class, which had the fewest samples.
- **Training**: The model was compiled using a **Stochastic Gradient Descent (SGD)** optimizer and the `CategoricalCrossentropy` loss function. In addition to accuracy, `Top-3 Categorical Accuracy` was tracked as a key metric to evaluate performance.

### Deployment

- The trained model (`.h5` file) is deployed using a lightweight **Flask** backend. This creates a dedicated API endpoint that receives an image file, preprocesses it, and returns the model's prediction as a JSON response.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

- [Go](https://golang.org/dl/) (version 1.18 or higher)
- [Python](https://www.python.org/downloads/) (for the Flask API)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/en/download/) (which includes npm)

### Installation

1.  **Clone the repository**

    ```sh
    git clone [https://github.com/your-username/travelohi.git](https://github.com/your-username/travelohi.git)
    cd travelohi
    ```

2.  **Backend Setup (Go API)**

    - Navigate to the Go backend directory.
    - Set up environment variables for the database (`.env` file).
    - Run the server: `go run main.go`.

3.  **AI Model Setup (Flask API)**

    - Navigate to the Python/Flask directory.
    - Install Python dependencies: `pip install -r requirements.txt`.
    - Ensure the trained model file (`alexnet1.h5`) is present.
    - Run the Flask server.

4.  **Frontend Setup**
    - Navigate to the frontend directory.
    - Install NPM packages: `npm install`.
    - Set up your `.env.local` file with the correct API base URLs for both the Go and Flask servers.
    - Run the dev server: `npm run dev`.

---

## Acknowledgements

- This project is a clone created for educational purposes.
- It is inspired by the excellent user interface and functionality of [Traveloka](https://www.traveloka.com).
