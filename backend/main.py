from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, database

# 1. Initialize database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Bug Tracker Pro - International Edition")

# 2. CORS CONFIGURATION (Essential for React Integration)
# This allows your Frontend (localhost:5173) to talk to this API (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Database Session Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ROOT ROUTE ---
@app.get("/")
def read_root():
    return {"status": "Online", "message": "Bug Tracker API is running smoothly!"}

# --- CREATE (Add New Bug) ---
@app.post("/bugs", response_model=schemas.BugResponse)
def create_bug(bug: schemas.BugCreate, db: Session = Depends(get_db)):
    new_bug = models.Bug(**bug.model_dump())
    db.add(new_bug)
    db.commit()
    db.refresh(new_bug)
    return new_bug

# --- READ (List All Bugs) ---
@app.get("/bugs")
def list_bugs(db: Session = Depends(get_db)):
    return db.query(models.Bug).all()

# --- UPDATE (Update Bug Severity) ---
@app.patch("/bugs/{bug_id}")
def update_bug_severity(bug_id: int, new_severity: str, db: Session = Depends(get_db)):
    db_bug = db.query(models.Bug).filter(models.Bug.id == bug_id).first()
    
    if not db_bug:
        return {"error": "Bug record not found", "id": bug_id}
    
    db_bug.severity = new_severity
    db.commit()
    db.refresh(db_bug)
    return {"message": "Severity updated successfully", "bug": db_bug}

# --- DELETE (Remove Bug) ---
@app.delete("/bugs/{bug_id}")
def delete_bug(bug_id: int, db: Session = Depends(get_db)):
    db_bug = db.query(models.Bug).filter(models.Bug.id == bug_id).first()
    
    if db_bug is None:
        return {"error": "Bug record not found", "id": bug_id}
    
    db.delete(db_bug)
    db.commit()
    return {"message": "Bug deleted successfully", "id": bug_id}

# --- DIAGNOSTICS (Database Connection Test) ---
@app.get("/test-db")
def test_connection(db: Session = Depends(get_db)):
    bugs = db.query(models.Bug).all()
    return {"count": len(bugs), "data": bugs}