def on_button_pressed_a():
    mainInput(Button.A)

input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    mainInput(Button.B)

def mainInput(btn):
    if spiel.gamestate == 1:
        spiel.selectMode(btn)

input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    pass

input.on_button_pressed(Button.AB, on_button_pressed_ab)

class Modus(Enum):
    BASIC = 1
    TIMED = 2

class Gamestate(Enum):
    PLAYER_SEL = 1
    CARD_SEL = 2

class Spiel:
    mode = Modus.BASIC
    modeIndex = 1
    numberOfCards = 0
    gamestate = Gamestate.PLAYER_SEL
    cards = []
    drawnCards = []

    def __init__(self):
        pass

    def selectMode(self, btn):
        if Button.A:
            self.incrementMode()
        elif Button.B:
            self.decrementMode()

        print(self.modeIndex)

    def incrementMode(self):
        if self.modeIndex < 2:
            self.modeIndex += 1
        else:
            self.modeIndex = 1

    def decrementMode(self):
        if (self.modeIndex > 1):
            self.modeIndex -= 1
        else:
            self.modeIndex = 2


    def confirmMode(self):
        pass

    def selectNumberOfCards(self):
        Spiel.numberOfCards = Spiel.modeIndex

    def incrementNumberOfCards(self):
        Spiel.modeIndex += 1

    def decrementNumberOfCards(self):
        Spiel.modeIndex -= 1

    def celebration(self):
        pass

    def userInducedExit(self):
        pass

    def drawCard(self):
        pass

    def outputCard(self):
        pass

    def exitGame(self):
        pass

spiel = Spiel()
