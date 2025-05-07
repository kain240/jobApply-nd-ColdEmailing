from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from . import Base

class EmailDraft(Base):
    __tablename__ = 'email_drafts'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    subject = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    template_type = Column(String(50), nullable=True)

    user = relationship("User", back_populates="email_drafts")

    def __repr__(self):
        return f"<EmailDraft(id={self.id}, subject={self.subject}, user_id={self.user_id})>"