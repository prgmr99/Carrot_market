from fastapi import FastAPI,UploadFile,Form,Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from typing import Annotated
import sqlite3

con = sqlite3.connect('db.db',check_same_thread=False) 
cur = con.cursor()

cur.execute(f"""
            CREATE table IF NOT EXISTS items (
                id integer primary key,
                title text not null,
                image blob,
                price integer not null,
                description text,
                place text not null,
                insertAt integer not null
            )
            """)

app = FastAPI()

SECRET = "super-coding"
manager = LoginManager(SECRET, '/login')

@manager.user_loader()
def query_user(id):
    con.row_factory = sqlite3.Row
    cur =  con.cursor()
    user = cur.execute(f"""
                       SELECT * FROM users WHERE id='{id}'
                       """).fetchone()
    return user

@app.post('/login')
def login(id:Annotated[str,Form()], 
           password:Annotated[str,Form()]):
    user = query_user(id)
    if not user:
        raise InvalidCredentialsException
    elif password != user['password']:
        raise InvalidCredentialsException
    # 꼭 200을 return하지 않아도 동작함.
    # access token을 전달해주면 됨.
    access_token = manager.create_access_token(data={
        'id': user['id'],
        'name': user['name'],
        'email': user['email'],
    })
    return {'access_token': access_token} 

@app.post('/signup')
def signup(id:Annotated[str,Form()], 
           password:Annotated[str,Form()],
           name:Annotated[str,Form()],
           email:Annotated[str,Form()]):
    cur.execute(f"""
                INSERT INTO users(id,name,email,password)
                VALUES ('{id}','{name}','{email}','{password}')
                """)
    con.commit()
    print(id, password)
    return '200'

@app.post('/items')
async def create_item(image:UploadFile, title:Annotated[str,Form()], price:Annotated[int, Form()], description:Annotated[str, Form()], place:Annotated[str,Form()], insertAt:Annotated[int,Form()]):
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items(title,image,price,description,place,insertAt) 
                VALUES ('{title}', '{image_bytes.hex()}', {price}, '{description}', '{place}', {insertAt})
                """)
    con.commit()
    return '200'

@app.get('/items')
async def get_items():
    # 컬럼명도 같이 넣어줘야 한다.
    con.row_factory = sqlite3.Row
    cur =  con.cursor()
    rows = cur.execute(f"""
                      SELECT * FROM items;
                      """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows)) 

@app.get('/images/{item_id}')
async def get_image(item_id):
    cur=con.cursor()
    image_bytes = cur.execute(f"""
                              SELECT image FROM items WHERE id == {item_id}
                              """).fetchone()[0]
    return Response(content = bytes.fromhex(image_bytes), media_type='image/*') 



app.mount("/", StaticFiles(directory="frontend", html=True),name="frontend")