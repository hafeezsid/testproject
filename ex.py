from flask import Flask, request
import pandas as pd
from flask_cors import CORS
import smtplib
import ssl
from flask import jsonify
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)
# Load the majors data
MAJORS_FILE = 'majors.xlsx'
majors_df = pd.read_excel(MAJORS_FILE)

@app.route('/majors/mvc/', methods=['POST'])
def get_majors():
    data = request.json
    input_subjects = set(data['subjects'])

    # Filter majors based on the input subjects
    def is_eligible(required_subjects):
        required_subjects_set = set(required_subjects.split(', '))
        return input_subjects.issubset(required_subjects_set)

    eligible_majors = majors_df[majors_df['Required Subjects for Admission'].apply(is_eligible)]

    # Convert the filtered DataFrame to a dictionary list to return as JSON
    majors_list = eligible_majors.to_dict(orient='records')
    
    return {'majors': majors_list}

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    
    sender = 'futuresbrainiac@fastmail.com'
    receiver = data.get('receiver')
    password = 'yhemg7k4h734k6sz'

    message = MIMEMultipart("alternative")
    message["Subject"] = "Your Details and Eligible Majors"
    message["From"] = sender
    message["To"] = receiver
    
    majors = [major['Major'] for major in data.get('majors', [])]

    html = f"""
    <html>
    <body>
        <h1>Welcome to Your Academic Journey!</h1>
        <p>Hello {data.get('name')},</p>
        <p>We are thrilled to assist you on your academic path. Below, you'll find a personalized overview based on the information you provided. This is a step toward making informed decisions about your future studies.</p>
        <p><strong>Here are the details we have on file for you:</strong></p>
        <p><strong>Name:</strong> {data.get('name')}</p>
        <p><strong>Age:</strong> {data.get('age')}</p>
        <p><strong>Degree:</strong> {data.get('degree')}</p>
        <p><strong>Grade:</strong> {data.get('grade')}%</p>
        <p><strong>Selected Subjects:</strong> {', '.join(data.get('subjects', []))}</p>
        <p><strong>Suggested Majors:</strong> {', '.join(majors)}</p>
        <p>We hope this information helps you in planning your major selection and future career. If you have any questions or need further assistance, feel free to reach out to us.</p>
    </body>
    </html>
    """

    # Attach the HTML part to the email
    part = MIMEText(html, "html")
    message.attach(part)

    context = ssl.create_default_context()
    
    try:
        with smtplib.SMTP_SSL('smtp.fastmail.com', 465, context=context) as server:
            server.login(sender, password)
            server.send_message(message)  # Use send_message for MIME objects
        return jsonify({"message": "Email sent successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
