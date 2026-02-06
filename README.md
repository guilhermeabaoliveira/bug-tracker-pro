# 🛡️ Bug Tracker Pro - Full Stack Edition

This repository contains a professional Full Stack application developed to manage and track software bugs, featuring a decoupled architecture and real-time data synchronization.

## 🚀 Key Enhancements (Full Stack Migration)
- **Decoupled Architecture**: Clearly separated `/frontend` (React) and `/backend` (FastAPI).
- **Reactive Dashboard**: Real-time UI built with **Tailwind CSS v4** and **Lucide Icons**.
- **Full CRUD Support**:
    - **Create**: Integrated modal for reporting new issues.
    - **Read**: Live statistics for "Total Issues" and "Critical Bugs".
    - **Delete**: Secure removal of bug records with user confirmation.
- **CORS Management**: Fully configured for secure communication between React and FastAPI.

## 🛠️ Technologies
- **Frontend**: React, Tailwind CSS v4, Axios, Lucide Icons.
- **Backend**: Python, FastAPI, SQLAlchemy (ORM).
- **Database**: SQLite (Reliable local storage).

## 🏁 How to run
### Backend
1. `cd backend`
2. `.\venv\Scripts\activate`
3. `pip install -r requirements.txt`
4. `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

# 🛡️ Bug Tracker Pro - Edição Full Stack

Este repositório contém uma aplicação Full Stack profissional desenvolvida para gerenciar e rastrear bugs de software, apresentando uma arquitetura desacoplada e sincronização de dados em tempo real.

## 🚀 Melhorias Principais (Migração Full Stack)
- **Arquitetura Desacoplada**: Separação clara entre `/frontend` (React) e `/backend` (FastAPI).
- **Dashboard Reativo**: Interface em tempo real construída com **Tailwind CSS v4** e **Lucide Icons**.
- **Suporte CRUD Completo**:
    - **Create**: Modal integrado para reportar novos problemas.
    - **Read**: Estatísticas ao vivo para "Total Issues" e "Critical Bugs".
    - **Delete**: Remoção segura de registros com confirmação do usuário.
- **Gerenciamento de CORS**: Totalmente configurado para comunicação segura entre React e FastAPI.

## 🛠️ Tecnologias e Ferramentas
- **Frontend**: React, Tailwind CSS v4, Axios, Lucide Icons.
- **Backend**: Python, FastAPI, SQLAlchemy (ORM).
- **Database**: SQLite (Armazenamento local confiável).

## 🏁 Como Executar
### Backend
1. `cd backend`
2. `.\venv\Scripts\activate`
3. `pip install -r requirements.txt`
4. `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`