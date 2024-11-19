from pydantic import BaseModel, EmailStr

# Pydantic model for user sign-up
class SignupModel(BaseModel):
    username: EmailStr
    password: str

# Pydantic model for user login
class LoginModel(BaseModel):
    username: EmailStr
    password: str
