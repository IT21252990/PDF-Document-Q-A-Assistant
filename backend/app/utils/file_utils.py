import os
import shutil

def save_uploaded_file(file, file_path: str):
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

def delete_file(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)

def delete_directory(directory_path: str):
    if os.path.exists(directory_path):
        shutil.rmtree(directory_path)