"""User View tests."""

import os
from unittest import TestCase
from models import db, connect_db, Message, User

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app, CURR_USER_KEY


app.config['WTF_CSRF_ENABLED'] = False


class UserViewTestCase(TestCase):

    """Test views for users"""

    def setUp(self):

        """Create test client, add sample data."""

        self.client = app.test_client()

        db.drop_all()
        db.create_all()
        
        User.query.delete()
        Message.query.delete()

        self.testuser1 = User.signup(username="testuser1",
                                    email="test1@test.com",
                                    password="testuser",
                                    image_url=None)

        self.testuser1.id = 1

        self.testuser2 = User.signup(username="testuser2",
                                    email="test2@test.com",
                                    password="testuser",
                                    image_url=None)

        self.testuser2.id = 2

        db.session.commit()

        self.testmsg1 = Message(text="Test Message")
        self.testuser1.messages.append(self.testmsg1)
        self.testmsg2 = Message(text="Test Message")
        self.testuser2.messages.append(self.testmsg2)

        db.session.commit()

        self.testuser1.followers.append(self.testuser2)
        self.testuser2.followers.append(self.testuser1)

        db.session.commit()




    def test_view_pages_only_for_logged_in_users(self):

        """Are all appropriate views restricted to users who are logged in?"""

        with self.client as c:

            resp = c.get("/users/1/following", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(resp.request.path, '/')

            resp = c.get("/users/1/followers", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(resp.request.path, '/')

            resp = c.get("/users/1/likes", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(resp.request.path, '/')

            resp = c.get("/users/profile", follow_redirects=True)
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(resp.request.path, '/')

    def test_user_profile_view(self):

        """Does user edit profile display?"""

        with self.client as c:

            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1.id

            resp = c.get("/users/profile")
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            x = '<form method="POST" id="user_form">'
            self.assertIn(x, html)

    def test_user_followers_view(self):

        """Does user followers view display?"""

        with self.client as c:

            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1.id

            print(self.testuser1.id)
            resp = c.get("/users/1/followers")
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('@testuser2', html)

    def test_user_following_view(self):

        """Does user following view display?"""

        with self.client as c:

            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser1.id

            resp = c.get("/users/1/following")
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('@testuser2', html)

    # def test_user_delete(self):
    #
    #     """Does user delete method work?"""
    #
    #     with self.client as c:
    #
    #         with c.session_transaction() as sess:
    #             sess[CURR_USER_KEY] = self.testuser1.id
    #
    #         resp = c.post("/users/delete")
    #         self.assertEqual(len(User.query.all()),1)
