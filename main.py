def on_button_pressed_a():
    test = Newtest()
    test.x = test.run_func()
    print(test.x)
input.on_button_pressed(Button.A, on_button_pressed_a)



class Gamestate(Enum):
    PLAYER_SEL = 1
    CARD_SEL = 2

class Spiel:
    mode = 0
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
        pass

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

class Newtest:
    def run_func(self):
        return "string"
    x = None