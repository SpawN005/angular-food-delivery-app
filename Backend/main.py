from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import mysql.connector
import json

mydb = mysql.connector.connect(host = "localhost" , port="9090", user = "root" , password = "root" , database = "web")

class CreateUser(BaseModel):
    username:str
    email:str
    password:str
class User(BaseModel):
    email: str
    password: str
class Cart(BaseModel):
    email:str
    foodid :Optional[int]
    quantity: Optional[int]
    price:Optional[int]
    foodnom:Optional[str]
    




app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Settings(BaseModel):
    authjwt_secret_key: str = "my_jwt_secret"
@AuthJWT.load_config
def get_config():
    return Settings()
@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )

@app.post('/login')
def login(user: User, Authorize: AuthJWT = Depends()):
    mycursor = mydb.cursor()
    sql="select email from user where email='"+str(user.email)+"' and password='"+str(user.password)+"'"
    mycursor.execute(sql)
    myresult= mycursor.fetchall()
    if(myresult):
        access_token = Authorize.create_access_token(subject=user.email)
    else:
        raise HTTPException(status_code=401,detail='wrong email or password')
    return {"access_token": access_token}

      
    
@app.get('/test-jwt')
def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    return {"user": current_user, 'data': 'jwt test works'}




@app.post("/register")
def register(user:CreateUser):
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO user ( username, email ,password) VALUES ('"+user.username+"','"+user.email+"','"+user.password+"')")
    mydb.commit()
    return {"done"}


@app.get('/food')
def get_food():
    mycursor=mydb.cursor()
    mycursor.execute("SELECT * FROM food")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.post("/cart")
def add_cart(cart:Cart):
    mycursor = mydb.cursor()
    x=mydb.cursor()
    x.execute("select * from panier where email='"+cart.email+"' and foodid='"+str(cart.foodid)+"'")
    myresult= x.fetchall()
    if(myresult):
        x.execute("update panier set quantity=quantity +"+str(cart.quantity)+", price=price+'"+str(cart.price)+"' where foodid='"+str(cart.foodid)+"'")
    else:
        mycursor.execute("INSERT INTO panier ( email, foodid , quantity , price , foodnom) VALUES ('"+str(cart.email)+"','"+str(cart.foodid)+"','"+str(cart.quantity)+"','"+str(cart.price)+"','"+str(cart.foodnom)+"')")

    
    mydb.commit()
    return{"done"}



@app.get("/cart")
def get_cart(email:str):
    mycursor=mydb.cursor()
    mycursor.execute("SELECT * FROM panier where email='"+email+"'")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data




@app.delete("/cart")
def delete_cart(foodid:int ,email:str):
    mycursor=mydb.cursor()
    mycursor.execute("delete from panier where email='"+email+"' and foodid='"+str(foodid)+"'")
    mydb.commit()
    return {"done"}




@app.get("/mycart")
def get_mycart(email:str):
    mycursor=mydb.cursor()
    mycursor.execute("SELECT sum(price) as sum FROM panier where email='"+email+"'")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    return json_data
