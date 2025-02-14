import os
import requests
import logging
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler("download_log.txt"), logging.StreamHandler()]
)

# GitHub API endpoint for listing repository contents
GITHUB_API_URL = "https://api.github.com/repos"

# List of repositories to process
REPOS = [
    "metayoub/qodly_accordion",
    "LimpalaerCyril/Qodly_ApexCharts",
    "metayoub/Qoldy_avatarGroup",
    "TihounaNasrallah/qodly-calendar",
    "metayoub/qodly-carousel",
    "metayoub/qodly_chart",
    "rihab-ze/qodly_map",
    "b-fadwa/audio-player",
    "LimpalaerCyril/Qodly_OrgTree",
    "metayoub/qodly_tags",
    "AyaBengherifa/Qodly_timeline",
    "metayoub/qodly_signature",
    "rihab-ze/qodly_treeView",
    "AyaBengherifa/Qodly-pdfViewer",
    "b-fadwa/Qodly-file-download",
    "almostafanahas/qodly-Code-QR",
    "b-fadwa/Qodly-object-viewer",
    "TihounaNasrallah/qodly-iframe",
    "metayoub/qodly_webCam",
    "metayoub/qodly_filemanager",
    "metayoub/qodly-grid-layout",
    "metayoub/qodly_popover",
    "TihounaNasrallah/qodly-stylishbox",
    "metayoub/qodly_virtualizer",
    "metayoub/Qodly_AGGrid",
    "metayoub/qodly_slate",
    "rihab-ze/qodly_datePicker",
    "metayoub/qoldy_rating",
    "metayoub/Qodly_TinyMCE",
    "metayoub/qodly_color_input"
]

# Directory to save downloaded files (same directory as the script)
SAVE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "downloaded_files")

def create_save_directory():
    if not os.path.exists(SAVE_DIR):
        os.makedirs(SAVE_DIR)
        logging.info(f"Created directory: {SAVE_DIR}")

def get_github_token():
    load_dotenv()
    print(os.getenv("GH_ACCESS_TOKEN"))
    token = os.getenv("GH_ACCESS_TOKEN")
    if not token:
        logging.error("GitHub token not set. Please set the GH_ACCESS_TOKEN environment variable.")
    return token

def get_repo_contents(owner, repo, path, token):
    headers = {"Authorization": f"token {token}"}
    response = requests.get(f"{GITHUB_API_URL}/{owner}/{repo}/contents/{path}", headers=headers)
    if response.status_code == 200:
        logging.info(f"Fetched contents for {owner}/{repo}/{path}")
        return response.json()
    else:
        logging.warning(f"Failed to fetch contents for {owner}/{repo}/{path}: {response.status_code}")
        return []

def download_file(url, save_path, token):
    headers = {"Authorization": f"token {token}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with open(save_path, 'wb') as f:
            f.write(response.content)
        logging.info(f"Downloaded {save_path}")
    else:
        logging.error(f"Failed to download {url}: {response.status_code}")

def process_directory(owner, repo, path, token, base_save_dir):
    contents = get_repo_contents(owner, repo, path, token)
    for item in contents:
        item_path = item['path']
        item_type = item['type']
        relative_path = item_path[len(path) + 1:]  # Remove the leading `src/components/`
        save_path = os.path.join(base_save_dir, owner, repo, relative_path)

        if item_type == "file":
            download_url = item['download_url']
            download_file(download_url, save_path, token)
        elif item_type == "dir":
            process_directory(owner, repo, item_path, token, base_save_dir)

def main():
    create_save_directory()
    token = get_github_token()
    if not token:
        return

    with ThreadPoolExecutor(max_workers=4) as executor:
        for repo in REPOS:
            owner, repo_name = repo.split('/')
            executor.submit(process_directory, owner, repo_name, "src/components", token, SAVE_DIR)

if __name__ == "__main__":
    main()