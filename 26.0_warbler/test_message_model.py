"""Message model tests."""

import os
from unittest import TestCase
from sqlalchemy import exc
from models import db, User, Message, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app

class MessageModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        User.query.delete()
        Message.query.delete()

        self.u1 = User.signup(username="testuser1",
                                    email="test1@test.com",
                                    password="testuser",
                                    image_url=None)

        self.u1.id = 1

        self.u2 = User.signup(username="testuser2",
                                    email="test2@test.com",
                                    password="testuser",
                                    image_url=None)

        self.u2.id = 2

        db.session.add(self.u1)
        db.session.add(self.u2)

        db.session.commit()

        # self.m1 = Message(text="Test Message")
        # self.u1.messages.append(self.m1)
        # self.m2 = Message(text="Test Message")
        # self.u2.messages.append(self.m2)
        #
        # db.session.commit()

    def tearDown(self):

        db.session.rollback()
        User.query.delete()
        Message.query.delete()
        db.session.commit()


    def test_message_model(self):

        """Does basic model work?"""

        self.assertEqual(len(self.u1.messages), 0)
        self.m1 = Message(text="Test Message")
        self.u1.messages.append(self.m1)
        db.session.commit()
        self.assertEqual(len(self.u1.messages), 1)

    def test_message_likes(self):

        """Does message liking work?"""

        self.assertEqual(len(self.u1.likes),0)
        self.m1 = Message(text="Test Message")
        self.u1.messages.append(self.m1)
        db.session.commit()
        self.u1.likes.append(self.m1)
        db.session.commit()
        self.assertEqual(len(self.u1.likes),1)
        self.assertEqual(self.u1.likes[0],self.m1)
