def on_button_pressed_a():
    input_event(Button.A)

input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    input_event(Button.B)

input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    input_event(Button.AB)

input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_gesture_shake():
    input_event(Gesture.SHAKE)
    pass
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def input_event(btn):
    if spiel.gamestate == Gamestate.MODES_SEL:
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
        elif btn == Button.AB:
            spiel.confirmNumberOfCards()
    elif spiel.gamestate == Gamestate.GAME_START:
        if btn == Gesture.SHAKE:
            if (spiel.mode.drawCard()) == 1:
                spiel.exitGame()
        elif btn == Button.AB:
            spiel.userInducedExit()
        elif btn == Button.B:
            spiel.goForward()
        elif btn == Button.A:
            spiel.goBackward()
    elif spiel.gamestate == Gamestate.GAME_OVER:
        pass

class Zufallsgenerator():
    cards = 0
    def __init__(self,cards):
        self.cards = cards

    def generateRandomNumber(self):
        random_index = randint(0, self.cards -1 )
        return random_index


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

class Modes(Enum):
    ONE = 1 # Singleplayer mode
    TWO = 2 # Timer mode
    THREE = 3 # Family mode
    FOUR = 4 # Picker mode
    FIVE = 5 # Top of the deck mode
    def length(self):
        return 5
    def items(self, i):
        return ["1", "2", "3", "4", "5"][i]


class Gamestate(Enum):
    MODES_SEL = 1
    CARD_SEL = 2
    GAME_START = 3
    GAME_OVER = 4
    # length has to be hard-coded
    def length(self):
        return 4
    def items(self, i):
        return ["MODE", "CARD", "GAME", "GAMEOVER"][i]

class Mode():
    index = 0
    numberOfCards = 0
    cards = []
    drawnCards = []
    def drawnCard(self):
        return 1
    def outputCard(self, card):
        pass
    def getMode(self):
        pass
    def celebration(self):
        pass

class Mode1(Mode):
    # at the end check if there are any cards left
    def drawCard(self):
        # call random Num generator with length of cards
        generator = Zufallsgenerator(len(self.cards))
        indexForDrawing = generator.generateRandomNumber()
        # remove drawnCard from cards and add it to drawnCards
        drawnCard = self.cards[indexForDrawing]
        self.cards.remove_at(indexForDrawing)
        self.drawnCards.push(drawnCard)

        self.outputCard(drawnCard)
        self.index = 0
        #no cards left
        if len(self.cards) == 0:
            gamestate = Gamestate.GAME_OVER
            self.celebration()
            return 1
        return 0

    # depending on what type of symbol(int,string,char) card is, output different sounds
    def outputCard(self, card):
        if card == "P":
            basic.show_string(card, 50)
        elif card == "S":
            basic.show_string(card, 50)
        else:
            basic.show_string(card, 50)
        pass

    # outputs sound/image and how many cards were done
    # depending on how many show different images e.g hear/smiley/sad smiley
    def celebration(self):
        doneCards = len(self.drawnCards)
        # 100% done
        if doneCards == self.numberOfCards:
            #TODO special action sounds (melody or so)
            basic.show_icon(IconNames.HAPPY)
            pass
        # 50%
        elif doneCards >= self.numberOfCards / 2:
            #TODO
            basic.show_icon(IconNames.DUCK)
            pass
        # < 50%
        else:
            basic.show_icon(IconNames.SAD)
        #game waits for 3 secs before restarting
        control.wait_micros(2000000)
        basic.show_number(doneCards, 50)
        control.wait_micros(2000000)
        basic.clear_screen()

    def getMode(self):
        return Modes.ONE

class Mode2(Mode):
    def drawCard(self):
        return 1
    def outputCard(self, card):
        pass
    def celebration(self):
        pass
    def getMode(self):
        return Modes.TWO

class Mode3(Mode):
    def drawCard(self):
        return 1
    def outputCard(self, card):
        pass
    def celebration(self):
        pass
    def getMode(self):
        return Modes.THREE

class Mode4(Mode):
    def drawCard(self):
        return 1
    def outputCard(self, card):
        pass
    def celebration(self):
        pass
    def getMode(self):
        return Modes.FOUR

class Mode5(Mode):
    def drawCard(self):
        return 1
    def outputCard(self, card):
        pass
    def celebration(self):
        pass
    def getMode(self):
        return Modes.FIVE

class Spiel:
    mode = None
    gamestate = Gamestate.MODES_SEL

    def __init__(self, gameModeIndex, index, numberOfCards, gamestate, cards, drawnCards):
        self.initGame(gameModeIndex, index, numberOfCards, gamestate, cards, drawnCards)

    def initGame(self, gameModeIndex, index, numberOfCards, gamestate, cards, drawnCards):
        self.setGameMode(gameModeIndex)
        self.mode.index = index
        self.mode.numberOfCards = numberOfCards
        self.gamestate = gamestate
        self.mode.cards = cards
        self.mode.drawnCards = drawnCards

    def setGameMode(self, gameModeIndex):
        self.mode = [Mode1(), Mode2(), Mode3(), Mode4(), Mode5()][gameModeIndex]

    def selectMode(self, btn):
        if btn == ButtonAction.RIGHT:
            self.incrementMode()
        if btn == ButtonAction.LEFT:
            self.decrementMode()
        basic.show_string(Modes().items(self.mode.index), 50)

    def incrementMode(self):
        self.mode.index += 1
        self.mode.index %= len(Modes())

    def decrementMode(self):
        if self.mode.index > 0:
            self.mode.index -= 1
        else:
            self.mode.index = len(Modes()) - 1

    def confirmMode(self):
        # set Mode
        self.setGameMode(self.mode.index) 
        self.mode.index = 0
        basic.show_number(self.mode.index+1, 50)
        self.gamestate = Gamestate.CARD_SEL

    def modeInstance(self):
        return Mode1()

    def selectNumberOfCards(self, btn):
        if btn == ButtonAction.RIGHT:
            self.incrementNumberOfCards()
        elif btn == ButtonAction.LEFT:
            self.decrementNumberOfCards()
        basic.show_number(self.mode.index+1, 50)

    def incrementNumberOfCards(self):
        self.mode.index += 1
        self.mode.index %= 100

    def decrementNumberOfCards(self):
        if self.mode.index > 0:
            self.mode.index -= 1
        else:
            self.mode.index = 99

    # changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    def confirmNumberOfCards(self):
        self.mode.numberOfCards = self.mode.index + 1
        basic.show_number(self.mode.index+1, 50)
        self.initializeCards()
        self.mode.index = 0
        self.gamestate = Gamestate.GAME_START
        if self.mode.getMode() == Modes.TWO:
            # Start timer, duration: 100s
            timer = Timer(100000)
            timer.startTimer()
        basic.clear_screen()
        basic.show_icon(IconNames.HEART)

    #create a List with every number up to numberOfCards starting from 1 at index 0 up to and including numberOfCards
    # e.g 20 -> 1,2...20
    #list() doesn't work
    def initializeCards(self):
        cardlist = []
        print("numberOfCards:" + self.mode.numberOfCards)
        for i in range(1, self.mode.numberOfCards + 1):
            cardlist.push("" +i)
        
        self.mode.cards = cardlist
        return cardlist

    def goForward(self):
        if self.mode.index < 0:
            self.mode.index += 1
            doneCards = len(self.mode.drawnCards)
            self.mode.outputCard(self.mode.drawnCards[doneCards+self.mode.index-1])

    def goBackward(self):
        doneCards = len(self.mode.drawnCards)
        if self.mode.index > -3 and doneCards > -self.mode.index+1:
            self.mode.index -= 1
            self.mode.outputCard(self.mode.drawnCards[doneCards+self.mode.index-1])

    # triggered with A+B -> change gamestate and call celebration()
    def userInducedExit(self):
        gamestate = Gamestate.GAME_OVER
        self.mode.celebration()
        self.exitGame()
        pass

    #TODO reset game to beginning showing mode selection first
    def exitGame(self):
        self.initGame(0, 0, 0, Gamestate.MODES_SEL, [], [])

spiel = Spiel(0, 0, 0, Gamestate.MODES_SEL, [], [])
