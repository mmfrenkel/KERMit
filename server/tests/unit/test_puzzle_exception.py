from server.models.puzzle_exception import PuzzleException


def test_get_message():
    msg = "This is a test exception"
    exception = PuzzleException(msg)
    assert exception.get_message() == msg
