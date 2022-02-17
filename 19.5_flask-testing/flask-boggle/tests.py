from unittest import TestCase
from app import app
from boggle import Boggle
from flask import session

class Test(TestCase):

    def setUp(self):
        self.boggle_game = Boggle()
        self.board = self.boggle_game.make_board()
        self.scores = []

    def tearDown(self):
        self.board = []

    def test_display_root(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<form id="guess">', html)

    def test_check_guess(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = self.board
            resp = client.get('/guess?word=book')
            answer = resp.get_json()
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(answer["result"],'not-on-board' or 'not-word' or 'ok')

    def test_update_scores(self):
        with app.test_client() as client:
            resp = client.post('/newscore', data={'score':'15'})
            self.assertEqual(resp.status_code, 204)
