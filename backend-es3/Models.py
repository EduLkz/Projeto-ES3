from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from extensions import db

class User(db.Model):
    __tablename__ = 'usuarios'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_type: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    nome: Mapped[str]

class Cliente(User):
    endereco: Mapped[str]