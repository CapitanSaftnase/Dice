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
        if btn == Button.A:
            spiel.drawCard()
        elif btn == Button.B:
            spiel.drawCard()
        elif btn == Button.AB:
            spiel.userInducedExit()
    elif spiel.gamestate == Gamestate.GAME_OVER:
        pass

class Zufallsgenerator(cards):
    def init(self,cards):
        self.cards = cards


    def generateRandomNumber(self):
        import random
        random_index = random.randint(0, len(self.cards) -1 )

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
    BASIC = 1
    TIMED = 2
    def length(self):
        return 2
    def items(self, i):
        return ["BASIC", "TIMED"][i] 


class Gamestate(Enum):
    MODES_SEL = 1
    CARD_SEL = 2
    GAME_START = 3
    # length has to be hard-coded
    def length(self):
        return 3
    def items(self, i):
        return ["MODE", "CARD", "GAME"][i]

class Spiel:
    mode = Modes.BASIC
    modeIndex = 0
    numberOfCards = 0
    gamestate = Gamestate.MODES_SEL
    cards = []
    drawnCards = []

    def __init__(self, mode, modeIndex, numberOfCards, gamestate, cards, drawnCards):
        self.initGame(mode, modeIndex, numberOfCards, gamestate, cards, drawnCards)

    def initGame(self, mode, modeIndex, numberOfCards, gamestate, cards, drawnCards):
        self.mode = mode
        self.modeIndex = modeIndex
        self.numberOfCards = numberOfCards
        self.gamestate = gamestate
        self.cards = cards
        self.drawnCards = drawnCards


    def selectMode(self, btn):
        if btn == ButtonAction.RIGHT:
            self.incrementMode()
        if btn == ButtonAction.LEFT:
            self.decrementMode()
        basic.show_string(Modes().items(self.modeIndex), 50)

    def incrementMode(self):
        self.modeIndex += 1
        self.modeIndex %= len(Modes())

    def decrementMode(self):
        if self.modeIndex > 0:
            self.modeIndex -= 1
        else:
            self.modeIndex = len(Modes()) - 1

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
    # changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    def confirmNumberOfCards(self):
        self.initializeCards()
        self.numberOfCards = self.modeIndex
        basic.show_number(self.modeIndex+1)
        self.gamestate = Gamestate.GAME_START
        basic.clear_screen()
        basic.show_icon(IconNames.HEART)

    #create a List with every number up to numberOfCards starting from 1 at index 0 up to and including numberOfCards
    # e.g 20 -> 1,2...20
    #list() doesn't work
    def initializeCards(self):
        i = self.modeIndex
        while (i>0):
            self.cards.push(""+i)
            i-=1
        print(self.cards)
            

# outputs sound/image and how many cards were done
    # depending on how many show different images e.g hear/smiley/sad smiley
    def celebration(self):
        doneCards = len(self.drawnCards)
        # 100% done
        if doneCards == self.numberOfCards:
            #TODO special action sounds (melody or so)
            basic.show_icon(IconNames.FABULOUS)
            pass
        # 50%    
        elif doneCards >= self.numberOfCards / 2:
            #TODO 
            basic.show_icon(IconNames.HAPPY)
            pass
        # < 50%
        else:
            basic.show_icon(IconNames.SAD)
        #game waits for 3 secs before restarting
        control.wait_micros(4000)
        basic.clear_screen()
        self.exitGame()
        pass

    # triggered with A+B -> change gamestate and call celebration()
    def userInducedExit(self):
        gamestate = Gamestate.GAME_OVER
        self.celebration()
        pass

     # at the end check if there are any cards left
    def drawCard(self):
        # call random Num generator with length of cards
        indexForDrawing = 0
        # <- for now -> Zufallsgenerator.generateNumber(len(self.cards))
        # remove drawnCard from cards and add it to drawnCards
        self.drawnCards.push(self.cards[indexForDrawing])
        self.cards.remove_at(indexForDrawing)
        self.outputCard()
        #no cards left
        if len(self.cards) == 0:
            self.gamestate = Gamestate.GAME_OVER
            self.celebration()
        pass

    # depending on what type of symbol(int,string,char) card is, output different sounds 
   def outputCard(self, card):
       if isinstance(card, int):
           basic.show_number(card)
       elif isinstance(card, str):
           if len(card) == 1:
               basic.show_string(card)
           else:
               basic.show_string(card)

    #TODO reset game to beginning showing mode selection first 
    def exitGame(self):
        self.initGame(Modes.BASIC, 0, 0, Gamestate.MODES_SEL, [], [])

spiel = Spiel(Modes.BASIC, 0, 0, Gamestate.MODES_SEL, [], [])
