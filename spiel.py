from enum import Enum

class Mode(Enum):
    SINGLEPLAYER = 1
    MULTIPLAYER = 2

class Gamestate(Enum):
    PLAYER_SEL = 1
    CARD_SEL = 2

class Spiel:
    mode = Mode.SINGLEPLAYER
    modeIndex = 0
    numberOfCards = 0
    gamestate = Gamestate.PLAYER_SEL
    cards = []
    drawnCards = []

    def __init__(self):
        pass

def selectMode():
    pass

def incrementMode():
    Spiel.modeIndex += 1

def decrementMode():
    Spiel.modeIndex -= 1

def confirmMode():
    Spiel.mode = Mode(Spiel.modeIndex)

def selectNumberOfCards():
    Spiel.numberOfCards = Spiel.modeIndex

def incrementNumberOfCards():
    Spiel.modeIndex += 1

def decrementNumberOfCards():
    Spiel.modeIndex -= 1

def celebration():
    pass

def userInducedExit():
    pass

def drawCard():
    pass

def outputCard():
    pass

def exitGame():
    pass