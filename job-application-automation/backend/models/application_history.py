from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from . import Base

class ApplicationHistory(Base):
    __tablename__ = 'application_history'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    job_listing_id = Column(Integer, ForeignKey('job_listing.id'), nullable=False)
    status = Column(String(50), nullable=False)
    applied_on = Column(DateTime, default=datetime.utcnow)
    follow_up_date = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="application_history")
    job_listing = relationship("JobListing", back_populates="application_history")