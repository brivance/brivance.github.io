from flask import Flask, request, jsonify
import torch
from your_model_file import Transformer
import json
from interence_utils import tokenizer, run_inference, post_process_output

d_model = 144       # dimension of model. you can play around with this for embedding, since vocab size for chords is much less than vocab size for the english language (dimensions would be 512). make this divisible by num_heads (8)
num_heads = 8           # number of attention heads
num_layers = 4   # number of encoder/decoder layers
dim_feedforward = d_model * 4   # dimension of feedforward network
dropout = 0.1           # dropout rate
MAX_SEQ_LEN = 180

app = Flask(__name__, static_folder='static')

model = Transformer(d_model,
                    dim_feedforward,
                    num_heads,
                    dropout,
                    num_layers,
                    MAX_SEQ_LEN,
                    tokenizer.get_vocab_size(),
                    tokenizer.vocab)
                    
model.load_state_dict(torch.load('generate_chords_model.pth'))

model.eval()

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json #this is maybe the input chords
    print(data)
    
    input_chords = ['C', 'G', 'Am']  # Example input chords
    input_tokens = tokenizer.tokenize(input_chords, start_token=False, end_token=False)  # Convert chords to tokens
    output_tokens = tokenizer.tokenize(input_chords, start_token=True, end_token=True)
    
    input_tensor = torch.tensor(input_tokens).unsqueeze(0)  # Add batch dimension
    output_tensor = torch.tensor(output_tokens).unsqueeze(0)
        
    predictions = run_inference(model, input_tensor, output_tensor)
    # print(predictions)
    predicted_tokens = post_process_output(predictions, tokenizer)
    # print(predicted_tokens)
    
    return jsonify(predicted_tokens) #result needs to be a list
    
if __name__ == '__main__':
    app.run(debug=True)