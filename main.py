# Custom config for the user
TIME_LIMIT_IN_SECONDS = 5
DEFAULT_NUMBER_OF_CARDS_SINGLEPLAYER = 5
DEFAULT_NUMBER_OF_CARDS_TIMED = 37
DEFAULT_NUMBER_OF_CARDS_FAMILY = 9
DEFAULT_NUMBER_OF_PLAYERS_PICKER = 4

PROBABILITY_SPECIAL_CARD = 30

# Probabilities have to add up to 100%
PROBABILITY_BONBON = 50
PROBABILITY_SONG = 35
PROBABILITY_ABGEBEN = 10
PROBABILITY_PAUSE = 5

# Minimum display duration for any kind of output
DISPLAY_INTERVAL = 50


def on_button_pressed_a():
    input_event(Button.A)

def on_button_pressed_b():
    input_event(Button.B)

def on_button_pressed_ab():
    input_event(Button.AB)

def on_gesture_shake():
    input_event(Gesture.SHAKE)


# Music for different events
def play_bonbon_music():
    music.play(
        music.string_playable("G A G C5 C5 - - - ", 350),
        music.PlaybackMode.UNTIL_DONE)

def play_song_music():
    music.play(
        music.string_playable("A - G A C5 - - - ", 320),
        music.PlaybackMode.UNTIL_DONE)

def play_abgeben_music():
    music.play(
        music.string_playable("C - E C C C - - ", 350),
        music.PlaybackMode.UNTIL_DONE)

def play_pause_music():
    music.play(
        music.string_playable("B A G C5 - - - - ", 350),
        music.PlaybackMode.UNTIL_DONE)

def play_start_music():
    music.play(
        music.string_playable("A B C5 C5 - - - - ", 320),
        music.PlaybackMode.UNTIL_DONE)

def play_end_music():
    music.play(
        music.string_playable("E D C C - - - - ", 320),
        music.PlaybackMode.UNTIL_DONE)

def play_draw_card_music():
    music.play(
        music.string_playable("C E - - - - - - ", 450),
        music.PlaybackMode.UNTIL_DONE)

def play_timeup_music():
    music.play(
        music.string_playable("C G C5 G C G C5 G ", 400), 
        music.PlaybackMode.LOOPING_IN_BACKGROUND)

def play_happy_music():
    music.play(
        music.string_playable("E F G F G A B C5 ", 350),
        music.PlaybackMode.UNTIL_DONE)

    music.play(
        music.string_playable("E F G F G A B C5 ", 350),
        music.PlaybackMode.UNTIL_DONE)


# Set callbacks
input.on_button_pressed(Button.A, on_button_pressed_a)
input.on_button_pressed(Button.B, on_button_pressed_b)
input.on_button_pressed(Button.AB, on_button_pressed_ab)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)


# Handle input based on the current state of the game
def input_event(event):
    if spiel.gamestate == Gamestate.MODE_SELECT:
        if event == Button.AB:
            spiel.confirm_mode()
            return

        if event == Button.A:
            spiel.select_mode(ButtonAction.LEFT)
            return

        if event == Button.B:
            spiel.select_mode(ButtonAction.RIGHT)
            return

    if spiel.gamestate == Gamestate.CARD_SELECT:
        if event == Button.A:
            spiel.select_number_of_cards(ButtonAction.LEFT)
            return

        if event == Button.B:
            spiel.select_number_of_cards(ButtonAction.RIGHT)
            return

        if event == Button.AB:
            spiel.confirm_number_of_cards()
            return

    if spiel.gamestate == Gamestate.GAME_START:
        if event == Gesture.SHAKE:
            spiel.draw_card()
            return

        if event == Button.AB:
            spiel.user_induced_exit()
            return

        if event == Button.B:
            spiel.go_forward()
            return

        if event == Button.A:
            spiel.go_backward()
            return


class Timer:
    def __init__(self):
        self.duration_in_seconds = 0

    def start(self, duration_in_seconds):
        game.start_stopwatch()
        self.duration_in_seconds = duration_in_seconds

    def time_is_up(self):
        return game.current_time() / 1000 > self.duration_in_seconds


class ButtonAction(Enum):
    LEFT = 1
    RIGHT = 2
    BOTH = 3


class Modes(Enum):
    SINGLEPLAYER = 1
    FAMILY = 2
    TIMED = 3
    PICKER = 4
    TOP_OF_THE_DECK = 5

    def length(self):
        return 5

    def items(self, i):
        return ["S", "F", "T", "P", "D"][i]


class Gamestate(Enum):
    MODE_SELECT = 1
    CARD_SELECT = 2
    GAME_START = 3
    GAME_OVER = 4
    INVALID = 5

    def length(self):
        return 4

    def items(self, i):
        return ["MODE", "CARD", "GAME", "GAMEOVER"][i]


class Spiel:
    def __init__(self, mode, index, number_of_cards, gamestate, cards, drawn_cards):
        self.mode = Modes.SINGLEPLAYER
        self.index = 0
        self.number_of_cards = 0
        self.number_of_special_cards = 0
        self.gamestate = Gamestate.MODE_SELECT
        self.cards = []
        self.drawn_cards = []

        self.init_game(mode, index, number_of_cards, gamestate, cards, drawn_cards)

    def init_game(self, mode, index, number_of_cards, gamestate, cards, drawn_cards):
        self.mode = mode
        self.index = index
        self.number_of_cards = number_of_cards
        self.gamestate = gamestate
        self.cards = cards
        self.drawn_cards = drawn_cards

        self.timer = Timer()
        self.time_limit_in_seconds = TIME_LIMIT_IN_SECONDS

        basic.show_string(Modes().items(self.index), DISPLAY_INTERVAL)

    def select_mode(self, event):
        if event == ButtonAction.RIGHT:
            self.increment_mode()

        if event == ButtonAction.LEFT:
            self.decrement_mode()

        basic.show_string(Modes().items(self.index), DISPLAY_INTERVAL)

    def increment_mode(self):
        self.index += 1
        self.index %= len(Modes())

    def decrement_mode(self):
        if self.index > 0:
            self.index -= 1
        else:
            self.index = len(Modes()) - 1

    def confirm_mode(self):
        self.mode = self.index + 1
        self.index = 0

        if self.mode == Modes.SINGLEPLAYER:
            self.index = DEFAULT_NUMBER_OF_CARDS_SINGLEPLAYER
            basic.show_number(self.index, DISPLAY_INTERVAL)
            self.gamestate = Gamestate.CARD_SELECT
            return

        if self.mode == Modes.TIMED:
            self.index = DEFAULT_NUMBER_OF_CARDS_TIMED
            basic.show_number(self.index, DISPLAY_INTERVAL)
            self.gamestate = Gamestate.CARD_SELECT
            return

        if self.mode == Modes.FAMILY:
            self.index = DEFAULT_NUMBER_OF_CARDS_FAMILY
            basic.show_number(self.index, DISPLAY_INTERVAL)
            self.gamestate = Gamestate.CARD_SELECT
            return

        if self.mode == Modes.PICKER:
            self.index = DEFAULT_NUMBER_OF_PLAYERS_PICKER
            self.gamestate = Gamestate.CARD_SELECT
            basic.show_number(self.index, DISPLAY_INTERVAL)
            return

        if self.mode == Modes.TOP_OF_THE_DECK:
            self.index = 3
            self.number_of_cards = self.index
            self.initialize_cards()
            self.index = 0
            self.gamestate = Gamestate.GAME_START

            basic.clear_screen()
            basic.show_icon(IconNames.HEART)
            return

    def select_number_of_cards(self, event):
        if event == ButtonAction.RIGHT:
            self.increment_number_of_cards()
        elif event == ButtonAction.LEFT:
            self.decrement_number_of_cards()

        basic.show_number(self.index, DISPLAY_INTERVAL)

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
        self.number_of_cards = self.index
        self.initialize_cards()
        self.index = 0
        self.gamestate = Gamestate.GAME_START

        if self.mode == Modes.TIMED:
            self.timer.start(self.time_limit_in_seconds)

        basic.clear_screen()
        basic.show_icon(IconNames.HEART)

    # Create a list with every number up to number_of_cards starting from 1 at index 0 up to and including number_of_cards
    # e.g. 20 -> 1, 2, ... , 20
    # list() doesn't work
    def initialize_cards(self):
        for i in range(1, self.number_of_cards + 1):
            self.cards.push(str(i))

    def go_forward(self):
        if self.index < 0:
            self.index += 1
            done_cards = len(self.drawn_cards)
            self.output_card(self.drawn_cards[done_cards + self.index - 1])

    def go_backward(self):
        done_cards = len(self.drawn_cards)
        if self.index > -3 and done_cards > -self.index + 1:
            self.index -= 1
            self.output_card(self.drawn_cards[done_cards + self.index - 1])

    # Outputs sound/image and how many cards were done
    # Depending on how many show different images e.g hear/smiley/sad smiley
    def celebration(self):
        # set time to wait inbetween animations in micro seconds
        TIME_TO_WAIT = 2000000
        done_cards = len(self.drawn_cards) - self.number_of_special_cards

        if self.mode == Modes.SINGLEPLAYER or self.mode == Modes.FAMILY:
            # 100% done
            if done_cards >= self.number_of_cards:
                play_happy_music()
                basic.show_icon(IconNames.HAPPY)
            # 50%
            elif done_cards >= self.number_of_cards / 2:
                #TODO
                basic.show_icon(IconNames.DUCK)
            # < 50%
            else:
                basic.show_icon(IconNames.SAD)

            # Game waits for 2 seconds before restarting
            control.wait_micros(TIME_TO_WAIT)
            basic.show_number(done_cards, DISPLAY_INTERVAL)
            control.wait_micros(TIME_TO_WAIT)
            basic.clear_screen()
            self.exit_game()

        if self.mode == Modes.TIMED:
            # TODO: A cool sound to indicate that the time is up
            basic.show_icon(IconNames.SURPRISED)
            control.wait_micros(TIME_TO_WAIT)
            basic.show_number(done_cards, DISPLAY_INTERVAL)
            control.wait_micros(TIME_TO_WAIT)
            basic.clear_screen()
            self.exit_game()

        if self.mode == Modes.PICKER :
            # TODO: Make a cool celebration.
            if done_cards > self.number_of_cards * 4:
                basic.show_icon(IconNames.HAPPY)
                music.play(music.string_playable("E F F A A B A - ", 500),
                    music.PlaybackMode.LOOPING_IN_BACKGROUND)
            elif done_cards > self.number_of_cards * 2:
                basic.show_icon(IconNames.SMALL_HEART)
            else:
                basic.show_icon(IconNames.SAD)
            
            control.wait_micros(TIME_TO_WAIT)
            music.stop_melody(MelodyStopOptions.ALL)
            self.exit_game()
        if self.mode == Modes.TOP_OF_THE_DECK:
            basic.show_icon(IconNames.GIRAFFE)
            control.wait_micros(TIME_TO_WAIT)
            self.exit_game()
            pass

    # Triggered with A + B -> change gamestate and call celebration()
    def user_induced_exit(self):
        gamestate = Gamestate.GAME_OVER
        self.celebration()

    def special_card_drawn(self):
        random_value = random_number(100)

        return random_value < PROBABILITY_SPECIAL_CARD

    def draw_card(self):
        if self.mode == Modes.SINGLEPLAYER or self.mode == Modes.TIMED:
            index_for_drawing = random_number(len(self.cards))

            # Remove drawn_card from cards and add it to drawn_cards
            drawn_card = self.cards[index_for_drawing]
            self.cards.remove_at(index_for_drawing)
            self.drawn_cards.push(drawn_card)

            self.output_card(drawn_card)
            self.index = 0

            # No cards left
            if len(self.cards) == 0:
                self.gamestate = Gamestate.GAME_OVER
                self.celebration()

            if self.mode == Modes.TIMED and self.timer.time_is_up():
                self.gamestate = Gamestate.GAME_OVER
                play_timeup_music()
                control.wait_micros(400 * 10000)
                music.stop_all_sounds()
                self.celebration()

        if self.mode == Modes.FAMILY:
            if self.special_card_drawn():
                self.number_of_special_cards += 1
                random_value = random_number(100)

                if random_value < PROBABILITY_BONBON:
                    self.drawn_cards.push("Bonbon")
                    self.output_card("Bonbon")
                elif random_value < PROBABILITY_BONBON + PROBABILITY_PAUSE:
                    self.drawn_cards.push("Pause")
                    self.output_card("Pause")
                elif random_value < PROBABILITY_BONBON + PROBABILITY_PAUSE + PROBABILITY_SONG:
                    self.drawn_cards.push("Song")
                    self.output_card("Song")
                else:
                    self.drawn_cards.push("Abgeben")
                    self.output_card("Abgeben")
            else:
                index_for_drawing = random_number(len(self.cards))

                # Remove drawn_card from cards and add it to drawn_cards
                drawn_card = self.cards[index_for_drawing]
                self.cards.remove_at(index_for_drawing)
                self.drawn_cards.push(drawn_card)

                self.output_card(drawn_card)
                self.index = 0

            # No cards left
            if len(self.cards) == 0:
                self.gamestate = Gamestate.GAME_OVER
                control.wait_micros(2000000)
                self.celebration()

        if self.mode == Modes.PICKER or self.mode == Modes.TOP_OF_THE_DECK:
            index_for_drawing = random_number(len(self.cards))

            # Remove drawn_card from cards and add it to drawn_cards
            drawn_card = self.cards[index_for_drawing]
            self.drawn_cards.push(drawn_card)

            self.output_card(drawn_card)
            self.index = 0

            # No cards left
            if len(self.cards) == 0:
                self.gamestate = Gamestate.GAME_OVER
                self.celebration()

    # Depending on what type of symbol(int, string, char) card is, output different sounds
    def output_card(self, card):
        # TODO: Make cool symbols for the special cards, instead of displaying just the letter.
        if card == "Bonbon":
            basic.show_leds("""
                . . . # .
                . # # # #
                . # # # .
                # # # # .
                . # . . .
                """)
            play_bonbon_music()
        elif card == "Song":
            basic.show_icon(IconNames.EIGHTH_NOTE)
            play_song_music()
        elif card == "Pause":
            basic.show_leds("""
                . . . . .
                . # . # .
                . # . # .
                . # . # .
                . . . . .
                """)
            play_pause_music()
        elif card == "Abgeben":
            basic.show_leds("""
                . . . # #
                . . # # #
                # # # # .
                . # # . .
                # . # . .
                """)
            play_abgeben_music()
        else:
            basic.show_string(card, DISPLAY_INTERVAL)
            play_draw_card_music()

    # Reset game to beginning showing mode selection first
    def exit_game(self):
        self.init_game(Modes.SINGLEPLAYER, 0, 0, Gamestate.MODE_SELECT, [], [])
        play_end_music()


spiel = Spiel(Modes.SINGLEPLAYER, 0, 0, Gamestate.MODE_SELECT, [], [])
play_start_music()


# Various helper functions

# Generates a random number between 0 and max_value excluded
def random_number(max_value):
    return randint(0, max_value - 1)
