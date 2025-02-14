

# Auto-Github

**Auto-Github** is a Python-based tool designed to automate the process of collating code content from public repositories on GitHub. Specifically, it focuses on downloading and processing files from the `src/components` directories of repositories listed in [Custom Components for Qodly Studio](https://github.com/qodly/custom-components). 

This tool is useful for creating datasets that can be used to train machine learning models (e.g., LLMs) or analyze coding patterns in custom components for Qodly Studio. The dataset is optimized for React components written in TypeScript (`tsx`).

Inspired by [hf-codegen](https://github.com/sayakpaul/hf-codegen), this project adapts and extends the original idea to focus on Qodly Studio's custom components.

See the [Qodly documentation](https://developer.qodly.com/docs/customComponent/overview) to learn how to code new custom components.

---

## Features

- **Automated Download**: Recursively downloads all files from the `src/components` directory of specified GitHub repositories.
- **GPU-Accelerated Cleaning**: Cleans and preprocesses text data using GPU acceleration (if available). Optimized for React components written in TypeScript (`tsx`).
- **Parallel Processing**: Utilizes multi-threading to handle I/O-bound tasks and maximize performance.
- **Single Dataset File**: Saves the cleaned dataset in a single JSONL file compatible with LLM training.
- **Logging**: Provides detailed logs to monitor progress and debug issues.

---

## Prerequisites

Before running the scripts, ensure you have the following:

1. **Python 3.10+**: The scripts are written in Python and require version 3.10 or higher.
2. **GitHub Personal Access Token**: A token with access to public repositories. See [GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for instructions.
3. **Dependencies**: Install the required libraries:
   ```bash
   pip install requests pandas tqdm torch python-dotenv
   ```
4. **NVIDIA GPU (Optional)**: For GPU acceleration, ensure you have:
   - NVIDIA drivers installed.
   - PyTorch with CUDA support. Example installation:
     ```bash
     pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
     ```

---

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Auto-Github.git
   cd Auto-Github
   ```

2. **Create a `.env` File**:
   Create a `.env` file in the root directory and add your GitHub token:
   ```plaintext
   GH_ACCESS_TOKEN=your_github_personal_access_token_here
   ```

3. **Install Dependencies**:
   Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. **Verify CUDA (Optional)**:
   If you want to use GPU acceleration, verify that CUDA is available:
   ```bash
   python check_cuda.py
   ```

5. **Batch Size Warning**:
   - If you're using a GPU with limited VRAM (e.g., 8GB), ensure the `BATCH_SIZE` in `prepare_data.py` is set appropriately. Start with `BATCH_SIZE = 512` and adjust based on your GPU memory.
   - If you encounter out-of-memory errors, reduce the batch size or reserve less GPU memory by adjusting `torch.cuda.set_per_process_memory_fraction(0.7)` in the script.

---

## Usage

### Step 1: Download Files

Run the `download_files.py` script to download all files from the `src/components` directories of the specified repositories:
```bash
python download_files.py
```

### Step 2: Prepare Dataset

Run the `prepare_data.py` script to clean and process the downloaded files:
```bash
python prepare_data.py
```

The final dataset will be saved as `final_dataset.jsonl` in the `cleaned_data` directory.

---

## Directory Structure

After running the scripts, your project directory will look like this:
```
/path/to/Auto-Github/
    ├── .env
    ├── download_files.py
    ├── prepare_data.py
    ├── downloaded_files/
    │   ├── metayoub/
    │   │   └── qodly_accordion/
    │   │       └── src/
    │   │           └── components/
    │   │               ├── file1.js
    │   │               ├── file2.css
    │   │               └── ...
    ├── cleaned_data/
    │   ├── final_dataset.jsonl
    │   ├── download_log.txt
    │   └── prepare_log.txt
    └── requirements.txt
```

---

## Dataset Format

The final dataset (`final_dataset.jsonl`) is structured as follows:
```jsonl
{"repository_name": "qodly_accordion", "filepath_in_repository": "src/components/Accordion.tsx", "file_contents": "export default function Accordion() {...}"}
{"repository_name": "Qodly_ApexCharts", "filepath_in_repository": "src/components/Chart.tsx", "file_contents": "import React from 'react';..."}
```

Each line represents a single file, with the following fields:
- `repository_name`: The name of the repository.
- `filepath_in_repository`: The relative path of the file within the repository.
- `file_contents`: The cleaned and processed content of the file.

**Note**: The dataset is optimized for React components written in TypeScript (`tsx`). If your repositories contain other file types, you may need to adjust the cleaning logic.

---

## Logging and Monitoring

Logs are written to both the console and log files:
- `download_log.txt`: Logs progress and errors during the file download process.
- `prepare_log.txt`: Logs progress and errors during dataset preparation.

To monitor progress in real-time, check the logs or view console output while the scripts are running.

---

## Credits

This project was inspired by [hf-codegen](https://github.com/sayakpaul/hf-codegen) by Sayak Paul. Special thanks to the original creator for their work on automating dataset generation for code-related tasks.

---

