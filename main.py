DISPLAY_INTERVAL = 50

def on_button_pressed_a():
    input_event(Button.A)

def on_button_pressed_b():
    input_event(Button.B)

def on_button_pressed_ab():
    input_event(Button.AB)

def on_gesture_shake():
    input_event(Gesture.SHAKE)

# Set callbacks
input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)
input.on_button_pressed(Button.AB, on_button_pressed_ab)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

# Handle input based on the current state of the game
def input_event(event):
    if spiel.gamestate == Gamestate.MODES_SELECT:
        if event == Button.AB:
            spiel.confirm_mode()
        elif event == Button.A:
            spiel.select_mode(ButtonAction.LEFT)
        elif event == Button.B:
            spiel.select_mode(ButtonAction.RIGHT)
    elif spiel.gamestate == Gamestate.CARD_SELECT:
        if event == Button.A:
            spiel.select_number_of_cards(ButtonAction.LEFT)
        elif event == Button.B:
            spiel.select_number_of_cards(ButtonAction.RIGHT)
        elif event == Button.AB:
            spiel.confirm_number_of_cards()
    elif spiel.gamestate == Gamestate.GAME_START:
        if event == Gesture.SHAKE:
            if (spiel.mode.draw_card()) == 1:
                spiel.exit_game()
        elif event == Button.AB:
            spiel.user_induced_exit()
        elif event == Button.B:
            spiel.go_forward()
        elif event == Button.A:
            spiel.go_backward()
    elif spiel.gamestate == Gamestate.GAME_OVER:
        pass

class Timer:
    duration = 0
    def __init__(self, duration):
        self.duration = duration

    def start_timer(self):
        game.start_countdown(self.duration)

timer = Timer(10000)

class ButtonAction(Enum):
    LEFT = 1
    RIGHT = 2
    BOTH = 3

class Modes(Enum):
    SINGLEPLAYER = 1
    TIMED = 2
    FAMILY = 3
    PICKER = 4
    TOP_OF_THE_DECK = 5
    def length(self):
        return 5
    def items(self, i):
        return ["S", "F", "T", "P", "D"][i]


class Gamestate(Enum):
    MODES_SELECT = 1
    CARD_SELECT = 2
    GAME_START = 3
    GAME_OVER = 4
    def length(self):
        return 4
    def items(self, i):
        return ["MODE", "CARD", "GAME", "GAMEOVER"][i]

class Mode():
    index = 0
    number_of_cards = 0
    cards = []
    drawn_cards = []

    def drawn_card(self):
        pass
    def get_mode(self):
        pass

class SingleplayerMode(Mode):
    # At the end check if there are any cards left
    def draw_card(self):
        index_for_drawing = random_number(len(self.cards))

        # Remove drawn_card from cards and add it to drawn_cards
        drawn_card = self.cards[index_for_drawing]
        self.cards.remove_at(index_for_drawing)
        self.drawn_cards.push(drawn_card)

        self.output_card(drawn_card)
        self.index = 0
        #no cards left
        if len(self.cards) == 0:
            gamestate = Gamestate.GAME_OVER
            self.celebration()
            return 1
        return 0

    # depending on what type of symbol(int,string,char) card is, output different sounds
    def output_card(self, card):
        if card == "P":
            basic.show_string(card, DISPLAY_INTERVAL)
        elif card == "S":
            basic.show_string(card, DISPLAY_INTERVAL)
        else:
            basic.show_string(card, DISPLAY_INTERVAL)
        pass

    # outputs sound/image and how many cards were done
    # depending on how many show different images e.g hear/smiley/sad smiley
    def celebration(self):
        done_cards = len(self.drawn_cards)
        # 100% done
        if done_cards == self.number_of_cards:
            #TODO special action sounds (melody or so)
            basic.show_icon(IconNames.HAPPY)
            pass
        # 50%
        elif done_cards >= self.number_of_cards / 2:
            #TODO
            basic.show_icon(IconNames.DUCK)
            pass
        # < 50%
        else:
            basic.show_icon(IconNames.SAD)
        #game waits for 3 secs before restarting
        control.wait_micros(2000000)
        basic.show_number(done_cards, DISPLAY_INTERVAL)
        control.wait_micros(2000000)
        basic.clear_screen()

    def get_mode(self):
        return Modes.SINGLEPLAYER

class TimedMode(Mode):
    def draw_card(self):
        return 1
    def output_card(self, card):
        pass
    def celebration(self):
        pass
    def get_mode(self):
        return Modes.TIMED

class FamilyMode(Mode):
    def draw_card(self):
        return 1
    def output_card(self, card):
        pass
    def celebration(self):
        pass
    def get_mode(self):
        return Modes.FAMILY

class PickerMode(Mode):
    def draw_card(self):
        return 1
    def output_card(self, card):
        pass
    def celebration(self):
        pass
    def get_mode(self):
        return Modes.PICKER

class TopOfTheDeckMode(Mode):
    def draw_card(self):
        return 1
    def output_card(self, card):
        pass
    def celebration(self):
        pass
    def get_mode(self):
        return Modes.TOP_OF_THE_DECK

class Spiel:
    mode = None
    gamestate = Gamestate.MODES_SELECT

    def __init__(self, game_mode_index, index, number_of_cards, gamestate, cards, drawn_cards):
        self.init_game(game_mode_index, index, number_of_cards, gamestate, cards, drawn_cards)

    def init_game(self, game_mode_index, index, number_of_cards, gamestate, cards, drawn_cards):
        self.set_game_mode(game_mode_index)
        self.mode.index = index
        self.mode.number_of_cards = number_of_cards
        self.gamestate = gamestate
        self.mode.cards = cards
        self.mode.drawn_cards = drawn_cards

    def set_game_mode(self, game_mode_index):
        self.mode = [SingleplayerMode(), TimedMode(), FamilyMode(), PickerMode(), TopOfTheDeckMode()][game_mode_index]

    def select_mode(self, event):
        if event == ButtonAction.RIGHT:
            self.increment_mode()
        if event == ButtonAction.LEFT:
            self.decrement_mode()
        basic.show_string(Modes().items(self.mode.index), DISPLAY_INTERVAL)

    def increment_mode(self):
        self.mode.index += 1
        self.mode.index %= len(Modes())

    def decrement_mode(self):
        if self.mode.index > 0:
            self.mode.index -= 1
        else:
            self.mode.index = len(Modes()) - 1

    def confirm_mode(self):
        # set Mode
        self.set_game_mode(self.mode.index)
        self.mode.index = 0
        basic.show_number(self.mode.index+1, DISPLAY_INTERVAL)
        self.gamestate = Gamestate.CARD_SELECT
        # set Mode

    def select_number_of_cards(self, event):
        if event == ButtonAction.RIGHT:
            self.increment_number_of_cards()
        elif event == ButtonAction.LEFT:
            self.decrement_number_of_cards()
        basic.show_number(self.mode.index+1, DISPLAY_INTERVAL)

    def increment_number_of_cards(self):
        self.mode.index += 1
        self.mode.index %= 100

    def decrement_number_of_cards(self):
        if self.mode.index > 0:
            self.mode.index -= 1
        else:
            self.mode.index = 99

    # changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    def confirm_number_of_cards(self):
        self.mode.number_of_cards = self.mode.index + 1
        basic.show_number(self.mode.index+1, DISPLAY_INTERVAL)
        self.initialize_cards()
        self.mode.index = 0
        self.gamestate = Gamestate.GAME_START
        if self.mode.get_mode() == Modes.TIMED:
            # Start timer, duration: 100s
            timer = Timer(100000)
            timer.start_timer()
        basic.clear_screen()
        basic.show_icon(IconNames.HEART)

    # create a list with every number up to number_of_cards starting from 1 at index 0 up to and including number_of_cards
    # e.g. 20 -> 1, 2, ..., 20
    # list() doesn't work
    def initialize_cards(self):
        cardlist = []
        for i in range(1, self.mode.number_of_cards + 1):
            cardlist.push("" +i)
        
        self.mode.cards = cardlist
        return cardlist

    def go_forward(self):
        if self.mode.index < 0:
            self.mode.index += 1
            doneCards = len(self.mode.drawn_cards)
            self.mode.output_card(self.mode.drawn_cards[doneCards+self.mode.index-1])

    def go_backward(self):
        doneCards = len(self.mode.drawn_cards)
        if self.mode.index > -3 and doneCards > -self.mode.index+1:
            self.mode.index -= 1
            self.mode.output_card(self.mode.drawn_cards[doneCards+self.mode.index-1])

    # triggered with A+B -> change gamestate and call celebration()
    def user_induced_exit(self):
        gamestate = Gamestate.GAME_OVER
        self.mode.celebration()
        self.exit_game()
        pass

    #TODO reset game to beginning showing mode selection first
    def exit_game(self):
        self.init_game(0, 0, 0, Gamestate.MODES_SELECT, [], [])

spiel = Spiel(0, 0, 0, Gamestate.MODES_SELECT, [], [])

# Various helper functions

# Generates a random number between 0 and max_value excluded
def random_number(max_value):
    return randint(0, max_value - 1)