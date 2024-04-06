def on_button_pressed_a():
    input_event(Button.A)

input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    input_event(Button.B)

input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    input_event(Button.AB)

input.on_button_pressed(Button.AB, on_button_pressed_ab)


def input_event(btn):
    if spiel.gamestate == Gamestate.MODUS_SEL:
        if btn == Button.AB:
            spiel.confirmMode()
        elif btn == Button.A:
            spiel.selectMode(ButtonAction.LEFT)
        elif btn == Button.B:
            spiel.selectMode(ButtonAction.RIGHT)
    elif spiel.gamestate == Gamestate.CARD_SEL:
        if btn == Button.A:
            spiel.selectNumberOfCards(ButtonAction.LEFT)
        elif btn == Button.B:
            spiel.selectNumberOfCards(ButtonAction.RIGHT)

class Timer:
    duration = 0
    def __init__(self, duration):
        self.duration = duration

    def startTimer(self):
        game.start_countdown(self.duration)

timer = Timer(10000)

class ButtonAction(Enum):
    LEFT = 1
    RIGHT = 2
    BOTH = 3

class Modus(Enum):
    BASIC = 1
    TIMED = 2
    def length(self):
        return 2
    def items(self, i):
        return ["BASIC", "TIMED"][i]

class Gamestate(Enum):
    MODUS_SEL = 1
    CARD_SEL = 2
    GAME_START = 3
    def length(self):
        return 2
    def items(self, i):
        return ["MODE", "CARD", "GAME"][i]

class Spiel:
    mode = Modus.BASIC
    modeIndex = 0
    numberOfCards = 0
    gamestate = Gamestate.MODUS_SEL
    cards = []
    drawnCards = []
    def __init__(self):
        pass

    def selectMode(self, btn):
        if btn == ButtonAction.RIGHT:
            self.incrementMode()
        if btn == ButtonAction.LEFT:
            self.decrementMode()
        basic.show_string(Modus().items(self.modeIndex))

    def incrementMode(self):
        self.modeIndex += 1
        self.modeIndex %= len(Modus())

    def decrementMode(self):
        if self.modeIndex > 0:
            self.modeIndex -= 1
        else:
            self.modeIndex = len(Modus()) - 1

    def confirmMode(self):
        self.mode = self.modeIndex+1
        self.modeIndex = 0
        basic.show_number(self.modeIndex+1)
        self.gamestate = Gamestate.CARD_SEL

    def selectNumberOfCards(self, btn):
        if btn == ButtonAction.RIGHT:
            self.incrementNumberOfCards()
        elif btn == ButtonAction.LEFT:
            self.decrementNumberOfCards()
        basic.show_number(self.modeIndex+1)

    def incrementNumberOfCards(self):
        self.modeIndex += 1
        self.modeIndex %= 100

    def decrementNumberOfCards(self):
        if self.modeIndex > 0:
            self.modeIndex -= 1
        else:
            self.modeIndex = 99

    def confirmNumberOfCards(self):
        self.numberOfCards = self.modeIndex
        basic.show_number(self.modeIndex+1)
        self.gamestate = Gamestate.GAME_START


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
