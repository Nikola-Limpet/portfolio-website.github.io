from flask import Flask, request, jsonify, render_template,redirect

app = Flask(__name__)

@app.route('/')
def home():
    return redirect('.\Personal_Web.Nikola\index.html')