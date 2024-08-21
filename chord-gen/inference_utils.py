import json
import torch

START_TOKEN = '<START>'
END_TOKEN = '<END>'
PADDING_TOKEN = '<PAD>'
MAX_SEQ_LEN = 180
    
class ChordTokenizer:
    def __init__(self):
        self.vocab = [] # this array is just for encoding/decoding ease

    def tokenize(self, song, start_token=False, end_token=False):
        chord_indices = [self.vocab.index(token) for token in song]
        if start_token:
            chord_indices.insert(0, self.vocab.index(START_TOKEN))
        if end_token:
            chord_indices.append(self.vocab.index(END_TOKEN))
        for _ in range(len(chord_indices), MAX_SEQ_LEN):
            chord_indices.append(self.vocab.index(PADDING_TOKEN))
        return torch.tensor(chord_indices)

    def decode_sequence(self, token_ids):
        return [self.vocab[token_id] if token_id < len(self.vocab) else self.vocab[0] for token_id in token_ids]

    def get_vocab_size(self):
        return len(self.vocab)

    def __getitem__(self, token):
        if token in self.vocab:
            return self.vocab.index(token)
        else:
            raise ValueError(f"Token '{token}' not found in the vocabulary.")
            

with open('tokenizer_vocab.json', 'r') as f:
    vocab = json.load(f)
    tokenizer = ChordTokenizer()
    tokenizer.vocab = vocab
    

def run_inference(model, input_tensor, output_tensor):

    with torch.no_grad():  # No need to compute gradients for inference
        predictions = model(input_tensor, output_tensor)

    return predictions
    
def post_process_output(predictions, tokenizer):
    # Convert predictions to indices
    predicted_indices = predictions.argmax(dim=-1).squeeze().tolist()
    
    # Convert indices to tokens
    predicted_tokens = tokenizer.decode_sequence(predicted_indices)
    return predicted_tokens