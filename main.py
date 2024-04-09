def on_button_pressed_a():
    input_event(Button.A)

def on_button_pressed_b():
    input_event(Button.B)

def on_button_pressed_ab():
    input_event(Button.AB)

def on_gesture_shake():
    input_event(Gesture.SHAKE)
    pass

input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)
input.on_button_pressed(Button.AB, on_button_pressed_ab)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)


# Handle input based on the current state of the game
def input_event(btn):
    if spiel.gamestate == Gamestate.MODES_SEL:
        if btn == Button.AB:
            spiel.confirm_mode()
        elif btn == Button.A:
            spiel.select_mode(ButtonAction.LEFT)
        elif btn == Button.B:
            spiel.select_mode(ButtonAction.RIGHT)
    elif spiel.gamestate == Gamestate.CARD_SEL:
        if btn == Button.A:
            spiel.select_number_of_cards(ButtonAction.LEFT)
        elif btn == Button.B:
            spiel.select_number_of_cards(ButtonAction.RIGHT)
        elif btn == Button.AB:
            spiel.confirm_number_of_cards()
    elif spiel.gamestate == Gamestate.GAME_START:
        if btn == Gesture.SHAKE:
            spiel.draw_card()
        elif btn == Button.AB:
            spiel.user_induced_exit()
        elif btn == Button.B:
            spiel.go_forward()
        elif btn == Button.A:
            spiel.go_backward()
    elif spiel.gamestate == Gamestate.GAME_OVER:
        pass


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
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    def length(self):
        return 4
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


class Spiel:
    mode = Modes.ONE
    index = 0
    number_of_cards = 0
    gamestate = Gamestate.MODES_SEL
    cards = []
    drawn_cards = []

    def __init__(self, mode, index, number_of_cards, gamestate, cards, drawn_cards):
        self.init_game(mode, index, number_of_cards, gamestate, cards, drawn_cards)

    def init_game(self, mode, index, number_of_cards, gamestate, cards, drawn_cards):
        self.mode = mode
        self.index = index
        self.number_of_cards = number_of_cards
        self.gamestate = gamestate
        self.cards = cards
        self.drawn_cards = drawn_cards

    def select_mode(self, btn):
        if btn == ButtonAction.RIGHT:
            self.increment_mode()

        if btn == ButtonAction.LEFT:
            self.decrement_mode()

        basic.show_string(Modes().items(self.index), 50)

    def increment_mode(self):
        self.index += 1
        self.index %= len(Modes())

    def decrement_mode(self):
        if self.index > 0:
            self.index -= 1
        else:
            self.index = len(Modes()) - 1

    def confirm_mode(self):
        self.mode = self.index+1
        self.index = 0
        basic.show_number(self.index+1, 50)
        self.gamestate = Gamestate.CARD_SEL

    def select_number_of_cards(self, btn):
        if btn == ButtonAction.RIGHT:
            self.increment_number_of_cards()
        elif btn == ButtonAction.LEFT:
            self.decrement_number_of_cards()
        basic.show_number(self.index+1, 50)

    def increment_number_of_cards(self):
        self.index += 1
        self.index %= 100

    def decrement_number_of_cards(self):
        if self.index > 0:
            self.index -= 1
        else:
            self.index = 99

    # Changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    def confirm_number_of_cards(self):
        self.number_of_cards = self.index + 1
        basic.show_number(self.index+1, 50)
        self.initialize_cards()
        self.index = 0
        self.gamestate = Gamestate.GAME_START
        if self.mode == Modes.TWO:
            # Start timer, duration: 100s
            timer = Timer(100000)
            timer.startTimer()
        basic.clear_screen()
        basic.show_icon(IconNames.HEART)

    # Create a List with every number up to number_of_cards starting from 1 at index 0 up to and including number_of_cards
    # e.g 20 -> 1,2...20
    # list() doesn't work
    def initialize_cards(self):
        cardlist = []
        print("number_of_cards:" + self.number_of_cards)
        for i in range(1, self.number_of_cards + 1):
            cardlist.push("" + i)
        
        self.cards = cardlist
        return cardlist

    def go_forward(self):
        if self.index < 0:
            self.index += 1
            doneCards = len(self.drawn_cards)
            self.output_card(self.drawn_cards[doneCards+self.index-1])

    def go_backward(self):
        doneCards = len(self.drawn_cards)
        if self.index > -3 and doneCards > -self.index+1:
            self.index -= 1
            self.output_card(self.drawn_cards[doneCards+self.index - 1])

    # Outputs sound/image and how many cards were done
    # Depending on how many show different images e.g hear/smiley/sad smiley
    def celebration(self):
        doneCards = len(self.drawn_cards)
        # 100% done
        if doneCards == self.number_of_cards:
            #TODO special action sounds (melody or so)
            basic.show_icon(IconNames.HAPPY)
            pass
        # 50%
        elif doneCards >= self.number_of_cards / 2:
            #TODO
            basic.show_icon(IconNames.DUCK)
            pass
        # < 50%
        else:
            basic.show_icon(IconNames.SAD)
        # Game waits for 3 secs before restarting
        control.wait_micros(2000000)
        basic.show_number(doneCards, 50)
        control.wait_micros(2000000)
        basic.clear_screen()
        self.exit_game()
        pass

    # Triggered with A+B -> change gamestate and call celebration()
    def user_induced_exit(self):
        gamestate = Gamestate.GAME_OVER
        self.celebration()
        pass

    # At the end check if there are any cards left
    def draw_card(self):
        # call random Num generator with length of cards
        indexForDrawing = random_number(len(self.cards))
        # remove drawnCard from cards and add it to drawn_cards
        drawnCard = self.cards[indexForDrawing]
        self.cards.remove_at(indexForDrawing)
        self.drawn_cards.push(drawnCard)

        self.output_card(drawnCard)
        self.index = 0
        #no cards left
        if len(self.cards) == 0:
            self.gamestate = Gamestate.GAME_OVER
            self.celebration()
        pass


    # Depending on what type of symbol(int,string,char) card is, output different sounds
    def output_card(self, card):
        if card == "P":
            basic.show_string(card, 50)
        elif card == "S":
            basic.show_string(card, 50)
        else:
            basic.show_string(card, 50)
        pass

    #TODO: Reset game to beginning showing mode selection first
    def exit_game(self):
        self.init_game(Modes.ONE, 0, 0, Gamestate.MODES_SEL, [], [])


spiel = Spiel(Modes.ONE, 0, 0, Gamestate.MODES_SEL, [], [])


# Various helper functions

# Generates a random number between 0 and max_value excluded
def random_number(max_value):
    return randint(0, max_value - 1)
