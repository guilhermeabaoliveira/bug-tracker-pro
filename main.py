from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas, database

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Bug Tracker Pro - International Edition")

# Dependency to get the database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"status": "Online", "message": "Bug Tracker API is running!"}

# --- CREATE ---
@app.post("/bugs", response_model=schemas.BugResponse)
def create_bug(bug: schemas.BugCreate, db: Session = Depends(get_db)):
    new_bug = models.Bug(**bug.model_dump())
    db.add(new_bug)
    db.commit()
    db.refresh(new_bug)
    return new_bug

# --- READ ---
@app.get("/bugs")
def list_bugs(db: Session = Depends(get_db)):
    return db.query(models.Bug).all()

# --- UPDATE ---
@app.patch("/bugs/{bug_id}")
def update_bug_severity(bug_id: int, new_severity: str, db: Session = Depends(get_db)):
    db_bug = db.query(models.Bug).filter(models.Bug.id == bug_id).first()
    
    if not db_bug:
        return {"error": "Bug not found", "id": bug_id}
    
    db_bug.severity = new_severity
    db.commit()
    db.refresh(db_bug)
    return {"message": "Severity updated successfully", "bug": db_bug}

# --- DELETE ---
@app.delete("/bugs/{bug_id}")
def delete_bug(bug_id: int, db: Session = Depends(get_db)):
    db_bug = db.query(models.Bug).filter(models.Bug.id == bug_id).first()
    
    if db_bug is None:
        return {"error": "Bug not found", "id": bug_id}
    
    db.delete(db_bug)
    db.commit()
    return {"message": "Bug deleted successfully", "id": bug_id}

# --- DIAGNOSTIC ---
@app.get("/test-db")
def test_connection(db: Session = Depends(get_db)):
    bugs = db.query(models.Bug).all()
    return {"count": len(bugs), "data": bugs}