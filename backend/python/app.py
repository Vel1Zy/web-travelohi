from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf
import numpy as np
import io

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('./alexnet1.h5')

def prepare_image(image, target_size=(224, 224)):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = np.asarray(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return "Please upload an image.", 400
    file = request.files['file']
    if file.filename == '':
        return "No image selected for uploading", 400
    image = Image.open(io.BytesIO(file.read()))

    processed_image = prepare_image(image, target_size=(224, 224))  
    
    predictions = model.predict(processed_image)

    highest_index = np.argmax(predictions)

    predicted_value = int(highest_index) + 1

    country_names = {
        1: "Brazil",
        2: "Canada",
        3: "Finland",
        4: "Japan",
        5: "United Kingdom",
        6: "United States"
    }

    country_name = country_names.get(predicted_value, "Unknown")

    response_message = f"The predicted country is: {country_name}"

    response = {
        "prediction": country_name,
        "message": response_message
    }

    print("Predicted value:", predicted_value)

    return jsonify(response)
@app.route('/')
def home():
    return 'Welcome to the Location Recognition API!'

if __name__ == '__main__':
    app.run(debug=True)
