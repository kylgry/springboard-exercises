
from models import User, Post, Tag, PostTag, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

john_smith = User(first_name='John', last_name="Smith")
melissa_black = User(first_name='Melissa', last_name="Black")

db.session.add(john_smith)
db.session.add(melissa_black)
db.session.commit()

post1 = Post(title='title1', content='blah blah blah', posted_by='1')
post2 = Post(title='title2', content='blah blah blah', posted_by='1')
post3 = Post(title='title3', content='blah blah blah', posted_by='2')

db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
db.session.commit()

tag1 = Tag(name='awesome')
tag2 = Tag(name='not_awesome')

db.session.add(tag1)
db.session.add(tag2)
db.session.commit()

posttag1 = PostTag(post_id='1', tag_id='1')
posttag2 = PostTag(post_id='1', tag_id='2')
posttag3 = PostTag(post_id='2', tag_id='1')
posttag4 = PostTag(post_id='2', tag_id='2')
posttag5 = PostTag(post_id='3', tag_id='2')

db.session.add(posttag1)
db.session.add(posttag2)
db.session.add(posttag3)
db.session.add(posttag4)
db.session.add(posttag5)
db.session.commit()
