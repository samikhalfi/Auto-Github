import os
import re
import pandas as pd
import json
import logging
from tqdm import tqdm
import torch
from concurrent.futures import ThreadPoolExecutor
from functools import partial

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler("prepare_log.txt"), logging.StreamHandler()]
)

# Configuration
DOWNLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "downloaded_files")
CLEANED_DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cleaned_data")
FINAL_DATASET_FILE = os.path.join(CLEANED_DATA_DIR, "final_dataset.jsonl")
BATCH_SIZE = 1024  # Adjust based on your GPU memory
NUM_WORKERS = os.cpu_count()  # For CPU parallel processing
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

class GPUDataProcessor:
    def __init__(self):
        self.device = DEVICE
        torch.cuda.set_per_process_memory_fraction(0.7)  # Reserve 70% of GPU memory
    
    @staticmethod
    def batch_texts(texts, batch_size=BATCH_SIZE):
        """Split texts into batches for GPU processing"""
        return [texts[i:i + batch_size] for i in range(0, len(texts), batch_size)]
    
    def gpu_clean_batch(self, batch):
        """Process a batch of texts on GPU"""
        tensors = [torch.tensor([ord(c) for c in text], device=self.device) for text in batch]
        cleaned_tensors = []
        for tensor in tensors:
            mask = (tensor > 31) & (tensor != 127)
            cleaned = tensor[mask]
            cleaned_tensors.append(cleaned)
        return [''.join(chr(i) for i in t.cpu().numpy()) for t in cleaned_tensors]

def clean_code_content(content, gpu_processor):
    """Enhanced code cleaning with GPU acceleration"""
    content = re.sub(r'//.*', '', content)  # Remove single-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)  # Remove multi-line comments
    content = re.sub(r'/\*\!.*?\*/', '', content, flags=re.DOTALL)  # Remove special comments
    
    lines = content.split('\n')
    batches = gpu_processor.batch_texts(lines)
    cleaned_lines = []
    
    for batch in batches:
        cleaned_batch = gpu_processor.gpu_clean_batch(batch)
        cleaned_lines.extend(cleaned_batch)
    
    return '\n'.join(line for line in cleaned_lines if line.strip())

def process_file(file_path, gpu_processor):
    """Process a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        cleaned = clean_code_content(content, gpu_processor)
        if not cleaned:
            return None
        return {
            "repository_name": file_path.split(os.sep)[2],  # Extract repository name
            "filepath_in_repository": "/".join(file_path.split(os.sep)[3:]),  # Relative path
            "file_contents": cleaned
        }
    except Exception as e:
        logging.error(f"Error processing {file_path}: {e}")
        return None

def process_directory(directory, gpu_processor):
    """Process all files in a directory"""
    files = []
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            files.append(os.path.join(root, filename))
    
    results = []
    with ThreadPoolExecutor(max_workers=NUM_WORKERS) as executor:
        process_file_partial = partial(process_file, gpu_processor=gpu_processor)
        batch_results = list(tqdm(executor.map(process_file_partial, files), total=len(files)))
        results = [result for result in batch_results if result is not None]
    
    return results

def main():
    os.makedirs(CLEANED_DATA_DIR, exist_ok=True)
    torch.cuda.empty_cache()  # Clear GPU memory
    
    gpu_processor = GPUDataProcessor()
    logging.info("Processing files...")
    results = process_directory(DOWNLOAD_DIR, gpu_processor)
    
    # Save the final dataset in JSONL format
    logging.info(f"Saving final dataset to {FINAL_DATASET_FILE}...")
    with open(FINAL_DATASET_FILE, "w", encoding="utf-8") as f:
        for result in results:
            f.write(json.dumps(result) + "\n")
    
    logging.info("Processing complete.")

if __name__ == "__main__":
    main()