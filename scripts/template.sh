#!/bin/bash

# ==============================

# ROOT STRUCTURE

# ==============================

mkdir -p backend/src
mkdir -p ai-service/src
mkdir -p docs
mkdir -p scripts

# ==============================

# BACKEND

# ==============================

mkdir -p backend/src/routes
mkdir -p backend/src/controllers
mkdir -p backend/src/models
mkdir -p backend/src/middleware
mkdir -p backend/src/config
mkdir -p backend/src/utils
mkdir -p backend/src/services

touch backend/.env
touch backend/server.js
touch backend/package.json
touch backend/README.md

# ==============================

# AI SERVICE

# ==============================

mkdir -p ai-service/src/agents
mkdir -p ai-service/src/prompts
mkdir -p ai-service/src/routes
mkdir -p ai-service/src/services
mkdir -p ai-service/src/utils
mkdir -p ai-service/src/rag

mkdir -p ai-service/prompts
mkdir -p ai-service/research
mkdir -p ai-service/vector_db
mkdir -p ai-service/models

touch ai-service/src/__init__.py
touch ai-service/src/agents/__init__.py
touch ai-service/src/prompts/__init__.py
touch ai-service/src/rag/__init__.py
touch ai-service/src/routes/__init__.py
touch ai-service/src/services/__init__.py
touch ai-service/src/utils/__init__.py

touch ai-service/src/rag/chains.py
touch ai-service/src/rag/prompt.py
touch ai-service/src/rag/retriever.py
touch ai-service/src/routes/medicalRoutes.py
touch ai-service/src/utils/helper.py

touch ai-service/app.py
touch ai-service/setup.py
touch ai-service/requirements.txt
touch ai-service/store_index.py
touch ai-service/.env
touch ai-service/README.md

touch ai-service/research/trials.ipynb

# ==============================

# ROOT FILES

# ==============================

touch .gitignore
touch README.md
touch docker-compose.yml

echo "Industrial AI Full Stack Project Structure Created Successfully"