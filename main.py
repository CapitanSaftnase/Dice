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
            spiel.mode.drawCard(spiel.cards, spiel.index)
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
    def init(self,cards):
        self.cards = cards

    def generateRandomNumber(self, cards):
        import Math.random
        random_index = randint(0, cards -1 )

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
        return ["1", "2", "3", "4"][i]


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
    def drawnCard(self):
        pass
    def getMode(self):
        pass

class Mode1(Mode):
    # at the end check if there are any cards left
    def drawCard(self, cards, index):
        #self.gameMode.drawCard()
        # call random Num generator with length of cards
        generator = Zufallsgenerator()
        #indexForDrawing = generator.generateRandomNumber(len(cards))
        # remove drawnCard from cards and add it to drawnCards
        #drawnCard = cards[indexForDrawing]
        #cards.remove_at(indexForDrawing)
        #drawnCards.push(drawnCard)

        #outputCard(drawnCard)
        index = 0
        #no cards left
        #if len(cards) == 0:
        #    gamestate = Gamestate.GAME_OVER
        #    celebration()
        pass

    def getMode(self):
        return Modes.ONE

class Mode2(Mode):
    def drawCard(self):
        pass
    def getMode(self):
        return Modes.TWO

class Mode3(Mode):
    def drawCard(self):
        pass
    def getMode(self):
        return Modes.THREE

class Mode4(Mode):
    def drawCard(self):
        pass
    def getMode(self):
        return Modes.FOUR

class Mode5(Mode):
    def drawCard(self):
        pass
    def getMode(self):
        return Modes.FIVE

class Spiel:
    mode = None
    index = 0
    numberOfCards = 0
    gamestate = Gamestate.MODES_SEL
    cards = []
    drawnCards = []

    def __init__(self, gameModeIndex, index, numberOfCards, gamestate, cards, drawnCards):
        self.initGame(gameModeIndex, index, numberOfCards, gamestate, cards, drawnCards)

    def initGame(self, gameModeIndex, index, numberOfCards, gamestate, cards, drawnCards):
        self.index = index
        self.numberOfCards = numberOfCards
        self.gamestate = gamestate
        self.cards = cards
        self.drawnCards = drawnCards
        self.setGameMode(gameModeIndex)

    def setGameMode(self, gameModeIndex):
        self.mode = [Mode1(), Mode2(), Mode3(), Mode4(), Mode5()][gameModeIndex]

    def selectMode(self, btn):
        if btn == ButtonAction.RIGHT:
            self.incrementMode()
        if btn == ButtonAction.LEFT:
            self.decrementMode()
        basic.show_string(Modes().items(self.index), 50)

    def incrementMode(self):
        self.index += 1
        self.index %= len(Modes())

    def decrementMode(self):
        if self.index > 0:
            self.index -= 1
        else:
            self.index = len(Modes()) - 1

    def confirmMode(self):
        self.setGameMode(self.index + 1) 
        self.index = 0
        basic.show_number(self.index+1, 50)
        self.gamestate = Gamestate.CARD_SEL
        # set Mode

    def modeInstance(self):
        return Mode1()

    def selectNumberOfCards(self, btn):
        if btn == ButtonAction.RIGHT:
            self.incrementNumberOfCards()
        elif btn == ButtonAction.LEFT:
            self.decrementNumberOfCards()
        basic.show_number(self.index+1, 50)

    def incrementNumberOfCards(self):
        self.index += 1
        self.index %= 100

    def decrementNumberOfCards(self):
        if self.index > 0:
            self.index -= 1
        else:
            self.index = 99

    # changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    def confirmNumberOfCards(self):
        self.numberOfCards = self.index + 1
        basic.show_number(self.index+1, 50)
        self.initializeCards()
        self.index = 0
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
        print("numberOfCards:" + self.numberOfCards)
        for i in range(1, self.numberOfCards + 1):
            cardlist.push("" +i)
        
        self.cards = cardlist
        return cardlist

    def goForward(self):
        if self.index < 0:
            self.index += 1
            doneCards = len(self.drawnCards)
            self.outputCard(self.drawnCards[doneCards+self.index-1])

    def goBackward(self):
        doneCards = len(self.drawnCards)
        if self.index > -3 and doneCards > -self.index+1:
            self.index -= 1
            self.outputCard(self.drawnCards[doneCards+self.index-1])


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
        self.exitGame()
        pass

    # triggered with A+B -> change gamestate and call celebration()
    def userInducedExit(self):
        gamestate = Gamestate.GAME_OVER
        self.celebration()
        pass


# depending on what type of symbol(int,string,char) card is, output different sounds
    def outputCard(self, card): 
        if card == "P":
            basic.show_string(card, 50)
        elif card == "S":
            basic.show_string(card, 50)
        else:
            basic.show_string(card, 50)
        pass

    #TODO reset game to beginning showing mode selection first 
    def exitGame(self):
        self.initGame(0, 0, 0, Gamestate.MODES_SEL, [], [])

spiel = Spiel(0, 0, 0, Gamestate.MODES_SEL, [], [])
