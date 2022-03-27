"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        self.u1 = User(
                    email="test1@test.com",
                    username="testuser1",
                    password="HASHED_PASSWORD"
                )

        self.u2 = User(
                    email="test2@test.com",
                    username="testuser2",
                    password="HASHED_PASSWORD"
                )


        db.session.add(self.u1)
        db.session.add(self.u2)
        db.session.commit()

    def tearDown(self):

        db.session.rollback()
        User.query.delete()
        db.session.commit()

    def test_user_model(self):

        """Does basic model work?"""
        # User should have no messages & no followers
        self.assertEqual(len(self.u1.messages), 0)
        self.assertEqual(len(self.u1.followers), 0)

    def test_incomplete_user_signup(self):

        """Does model prevent incomplete user signup?"""
        u = User(email="test", password="hash")
        db.session.add(u)
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_user_repr(self):

        """Does repr method work?"""
        self.assertEqual(repr(self.u1), "<User #1: testuser1, test1@test.com>",)

    def test_user_following(self):

        """Does following model work?"""
        self.u1.following.append(self.u2)
        self.assertEqual(len(self.u1.following),1)
        self.assertEqual(len(self.u2.following),0)

    def test_user_followers(self):

        """Does follower model work?"""
        self.u1.followers.append(self.u2)
        self.assertEqual(len(self.u1.followers),1)
        self.assertEqual(len(self.u2.followers),0)

        
