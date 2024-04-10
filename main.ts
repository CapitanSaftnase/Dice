//  Custom config for the user
let TIME_LIMIT_IN_SECONDS = 5
let DEFAULT_NUMBER_OF_CARDS_SINGLEPLAYER = 5
let DEFAULT_NUMBER_OF_CARDS_TIMED = 37
let DEFAULT_NUMBER_OF_CARDS_FAMILY = 9
let DEFAULT_NUMBER_OF_PLAYERS_PICKER = 4
let PROBABILITY_SPECIAL_CARD = 30
//  Probabilities have to add up to 100%
let PROBABILITY_BONBON = 50
let PROBABILITY_SONG = 35
let PROBABILITY_ABGEBEN = 10
let PROBABILITY_PAUSE = 5
//  Minimum display duration for any kind of output
let DISPLAY_INTERVAL = 50
//  Music for different events
function play_bonbon_music() {
    music.play(music.stringPlayable("G A G C5 C5 - - - ", 350), music.PlaybackMode.UntilDone)
}

function play_song_music() {
    music.play(music.stringPlayable("A - G A C5 - - - ", 320), music.PlaybackMode.UntilDone)
}

function play_abgeben_music() {
    music.play(music.stringPlayable("C - E C C C - - ", 350), music.PlaybackMode.UntilDone)
}

function play_pause_music() {
    music.play(music.stringPlayable("B A G C5 - - - - ", 350), music.PlaybackMode.UntilDone)
}

function play_start_music() {
    music.play(music.stringPlayable("A B C5 C5 - - - - ", 320), music.PlaybackMode.UntilDone)
}

function play_end_music() {
    music.play(music.stringPlayable("E D C C - - - - ", 320), music.PlaybackMode.UntilDone)
}

function play_draw_card_music() {
    music.play(music.stringPlayable("C E - - - - - - ", 450), music.PlaybackMode.UntilDone)
}

function play_timeup_music() {
    music.play(music.stringPlayable("C G C5 G C G C5 G ", 400), music.PlaybackMode.LoopingInBackground)
}

function play_happy_music() {
    music.play(music.stringPlayable("E F G F G A B C5 ", 350), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E F G F G A B C5 ", 350), music.PlaybackMode.UntilDone)
}

//  Set callbacks
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    input_event(Button.A)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    input_event(Button.B)
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    input_event(Button.AB)
})
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    input_event(Gesture.Shake)
})
//  Handle input based on the current state of the game
function input_event(event: number) {
    if (spiel.gamestate == Gamestate.MODE_SELECT) {
        if (event == Button.AB) {
            spiel.confirm_mode()
            return
        }
        
        if (event == Button.A) {
            spiel.select_mode(ButtonAction.LEFT)
            return
        }
        
        if (event == Button.B) {
            spiel.select_mode(ButtonAction.RIGHT)
            return
        }
        
    }
    
    if (spiel.gamestate == Gamestate.CARD_SELECT) {
        if (event == Button.A) {
            spiel.select_number_of_cards(ButtonAction.LEFT)
            return
        }
        
        if (event == Button.B) {
            spiel.select_number_of_cards(ButtonAction.RIGHT)
            return
        }
        
        if (event == Button.AB) {
            spiel.confirm_number_of_cards()
            return
        }
        
    }
    
    if (spiel.gamestate == Gamestate.GAME_START) {
        if (event == Gesture.Shake) {
            spiel.draw_card()
            return
        }
        
        if (event == Button.AB) {
            spiel.user_induced_exit()
            return
        }
        
        if (event == Button.B) {
            spiel.go_forward()
            return
        }
        
        if (event == Button.A) {
            spiel.go_backward()
            return
        }
        
    }
    
}

class Timer {
    duration_in_seconds: number
    constructor() {
        this.duration_in_seconds = 0
    }
    
    public start(duration_in_seconds: number) {
        game.startStopwatch()
        this.duration_in_seconds = duration_in_seconds
    }
    
    public time_is_up() {
        return game.currentTime() / 1000 > this.duration_in_seconds
    }
    
}

class ButtonAction {
    static LEFT: number
    private ___LEFT_is_set: boolean
    private ___LEFT: number
    get LEFT(): number {
        return this.___LEFT_is_set ? this.___LEFT : ButtonAction.LEFT
    }
    set LEFT(value: number) {
        this.___LEFT_is_set = true
        this.___LEFT = value
    }
    
    static RIGHT: number
    private ___RIGHT_is_set: boolean
    private ___RIGHT: number
    get RIGHT(): number {
        return this.___RIGHT_is_set ? this.___RIGHT : ButtonAction.RIGHT
    }
    set RIGHT(value: number) {
        this.___RIGHT_is_set = true
        this.___RIGHT = value
    }
    
    static BOTH: number
    private ___BOTH_is_set: boolean
    private ___BOTH: number
    get BOTH(): number {
        return this.___BOTH_is_set ? this.___BOTH : ButtonAction.BOTH
    }
    set BOTH(value: number) {
        this.___BOTH_is_set = true
        this.___BOTH = value
    }
    
    public static __initButtonAction() {
        ButtonAction.LEFT = 1
        ButtonAction.RIGHT = 2
        ButtonAction.BOTH = 3
    }
    
}

ButtonAction.__initButtonAction()

class Modes {
    static SINGLEPLAYER: number
    private ___SINGLEPLAYER_is_set: boolean
    private ___SINGLEPLAYER: number
    get SINGLEPLAYER(): number {
        return this.___SINGLEPLAYER_is_set ? this.___SINGLEPLAYER : Modes.SINGLEPLAYER
    }
    set SINGLEPLAYER(value: number) {
        this.___SINGLEPLAYER_is_set = true
        this.___SINGLEPLAYER = value
    }
    
    static FAMILY: number
    private ___FAMILY_is_set: boolean
    private ___FAMILY: number
    get FAMILY(): number {
        return this.___FAMILY_is_set ? this.___FAMILY : Modes.FAMILY
    }
    set FAMILY(value: number) {
        this.___FAMILY_is_set = true
        this.___FAMILY = value
    }
    
    static TIMED: number
    private ___TIMED_is_set: boolean
    private ___TIMED: number
    get TIMED(): number {
        return this.___TIMED_is_set ? this.___TIMED : Modes.TIMED
    }
    set TIMED(value: number) {
        this.___TIMED_is_set = true
        this.___TIMED = value
    }
    
    static PICKER: number
    private ___PICKER_is_set: boolean
    private ___PICKER: number
    get PICKER(): number {
        return this.___PICKER_is_set ? this.___PICKER : Modes.PICKER
    }
    set PICKER(value: number) {
        this.___PICKER_is_set = true
        this.___PICKER = value
    }
    
    static TOP_OF_THE_DECK: number
    private ___TOP_OF_THE_DECK_is_set: boolean
    private ___TOP_OF_THE_DECK: number
    get TOP_OF_THE_DECK(): number {
        return this.___TOP_OF_THE_DECK_is_set ? this.___TOP_OF_THE_DECK : Modes.TOP_OF_THE_DECK
    }
    set TOP_OF_THE_DECK(value: number) {
        this.___TOP_OF_THE_DECK_is_set = true
        this.___TOP_OF_THE_DECK = value
    }
    
    public static __initModes() {
        Modes.SINGLEPLAYER = 1
        Modes.FAMILY = 2
        Modes.TIMED = 3
        Modes.PICKER = 4
        Modes.TOP_OF_THE_DECK = 5
    }
    
    public length(): number {
        return 5
    }
    
    public items(i: number): string {
        return ["S", "F", "T", "P", "D"][i]
    }
    
}

Modes.__initModes()

class Gamestate {
    static MODE_SELECT: number
    private ___MODE_SELECT_is_set: boolean
    private ___MODE_SELECT: number
    get MODE_SELECT(): number {
        return this.___MODE_SELECT_is_set ? this.___MODE_SELECT : Gamestate.MODE_SELECT
    }
    set MODE_SELECT(value: number) {
        this.___MODE_SELECT_is_set = true
        this.___MODE_SELECT = value
    }
    
    static CARD_SELECT: number
    private ___CARD_SELECT_is_set: boolean
    private ___CARD_SELECT: number
    get CARD_SELECT(): number {
        return this.___CARD_SELECT_is_set ? this.___CARD_SELECT : Gamestate.CARD_SELECT
    }
    set CARD_SELECT(value: number) {
        this.___CARD_SELECT_is_set = true
        this.___CARD_SELECT = value
    }
    
    static GAME_START: number
    private ___GAME_START_is_set: boolean
    private ___GAME_START: number
    get GAME_START(): number {
        return this.___GAME_START_is_set ? this.___GAME_START : Gamestate.GAME_START
    }
    set GAME_START(value: number) {
        this.___GAME_START_is_set = true
        this.___GAME_START = value
    }
    
    static GAME_OVER: number
    private ___GAME_OVER_is_set: boolean
    private ___GAME_OVER: number
    get GAME_OVER(): number {
        return this.___GAME_OVER_is_set ? this.___GAME_OVER : Gamestate.GAME_OVER
    }
    set GAME_OVER(value: number) {
        this.___GAME_OVER_is_set = true
        this.___GAME_OVER = value
    }
    
    static INVALID: number
    private ___INVALID_is_set: boolean
    private ___INVALID: number
    get INVALID(): number {
        return this.___INVALID_is_set ? this.___INVALID : Gamestate.INVALID
    }
    set INVALID(value: number) {
        this.___INVALID_is_set = true
        this.___INVALID = value
    }
    
    public static __initGamestate() {
        Gamestate.MODE_SELECT = 1
        Gamestate.CARD_SELECT = 2
        Gamestate.GAME_START = 3
        Gamestate.GAME_OVER = 4
        Gamestate.INVALID = 5
    }
    
    public length(): number {
        return 4
    }
    
    public items(i: number): string {
        return ["MODE", "CARD", "GAME", "GAMEOVER"][i]
    }
    
}

Gamestate.__initGamestate()

class Spiel {
    mode: number
    index: number
    number_of_cards: number
    number_of_special_cards: number
    gamestate: number
    cards: string[]
    drawn_cards: string[]
    timer: Timer
    time_limit_in_seconds: number
    constructor(mode: number, index: number, number_of_cards: number, gamestate: number, cards: any, drawn_cards: any) {
        this.mode = Modes.SINGLEPLAYER
        this.index = 0
        this.number_of_cards = 0
        this.number_of_special_cards = 0
        this.gamestate = Gamestate.MODE_SELECT
        this.cards = []
        this.drawn_cards = []
        this.init_game(mode, index, number_of_cards, gamestate, cards, drawn_cards)
    }
    
    public init_game(mode: number, index: number, number_of_cards: number, gamestate: number, cards: string[], drawn_cards: string[]) {
        this.mode = mode
        this.index = index
        this.number_of_cards = number_of_cards
        this.gamestate = gamestate
        this.cards = cards
        this.drawn_cards = drawn_cards
        this.timer = new Timer()
        this.time_limit_in_seconds = TIME_LIMIT_IN_SECONDS
        basic.showString(new Modes().items(this.index), DISPLAY_INTERVAL)
    }
    
    public select_mode(event: number) {
        if (event == ButtonAction.RIGHT) {
            this.increment_mode()
        }
        
        if (event == ButtonAction.LEFT) {
            this.decrement_mode()
        }
        
        basic.showString(new Modes().items(this.index), DISPLAY_INTERVAL)
    }
    
    public increment_mode() {
        this.index += 1
        this.index %= new Modes().length()
    }
    
    public decrement_mode() {
        if (this.index > 0) {
            this.index -= 1
        } else {
            this.index = new Modes().length() - 1
        }
        
    }
    
    public confirm_mode() {
        this.mode = this.index + 1
        this.index = 0
        if (this.mode == Modes.SINGLEPLAYER) {
            this.index = DEFAULT_NUMBER_OF_CARDS_SINGLEPLAYER
            basic.showNumber(this.index, DISPLAY_INTERVAL)
            this.gamestate = Gamestate.CARD_SELECT
            return
        }
        
        if (this.mode == Modes.TIMED) {
            this.index = DEFAULT_NUMBER_OF_CARDS_TIMED
            basic.showNumber(this.index, DISPLAY_INTERVAL)
            this.gamestate = Gamestate.CARD_SELECT
            return
        }
        
        if (this.mode == Modes.FAMILY) {
            this.index = DEFAULT_NUMBER_OF_CARDS_FAMILY
            basic.showNumber(this.index, DISPLAY_INTERVAL)
            this.gamestate = Gamestate.CARD_SELECT
            return
        }
        
        if (this.mode == Modes.PICKER) {
            this.index = DEFAULT_NUMBER_OF_PLAYERS_PICKER
            this.gamestate = Gamestate.CARD_SELECT
            basic.showNumber(this.index, DISPLAY_INTERVAL)
            return
        }
        
        if (this.mode == Modes.TOP_OF_THE_DECK) {
            this.index = 3
            this.number_of_cards = this.index
            this.initialize_cards()
            this.index = 0
            this.gamestate = Gamestate.GAME_START
            basic.clearScreen()
            basic.showIcon(IconNames.Heart)
            return
        }
        
    }
    
    public select_number_of_cards(event: number) {
        if (event == ButtonAction.RIGHT) {
            this.increment_number_of_cards()
        } else if (event == ButtonAction.LEFT) {
            this.decrement_number_of_cards()
        }
        
        basic.showNumber(this.index, DISPLAY_INTERVAL)
    }
    
    public increment_number_of_cards() {
        this.index += 1
        this.index %= 100
    }
    
    public decrement_number_of_cards() {
        if (this.index > 0) {
            this.index -= 1
        } else {
            this.index = 99
        }
        
    }
    
    //  Changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    public confirm_number_of_cards() {
        this.number_of_cards = this.index
        this.initialize_cards()
        this.index = 0
        this.gamestate = Gamestate.GAME_START
        if (this.mode == Modes.TIMED) {
            this.timer.start(this.time_limit_in_seconds)
        }
        
        basic.clearScreen()
        basic.showIcon(IconNames.Heart)
    }
    
    //  Create a list with every number up to number_of_cards starting from 1 at index 0 up to and including number_of_cards
    //  e.g. 20 -> 1, 2, ... , 20
    //  list() doesn't work
    public initialize_cards() {
        for (let i = 1; i < this.number_of_cards + 1; i++) {
            this.cards.push("" + i)
        }
    }
    
    public go_forward() {
        let done_cards: any;
        if (this.index < 0) {
            this.index += 1
            done_cards = this.drawn_cards.length
            this.output_card(this.drawn_cards[done_cards + this.index - 1])
        }
        
    }
    
    public go_backward() {
        let done_cards = this.drawn_cards.length
        if (this.index > -3 && done_cards > -this.index + 1) {
            this.index -= 1
            this.output_card(this.drawn_cards[done_cards + this.index - 1])
        }
        
    }
    
    //  Outputs sound/image and how many cards were done
    //  Depending on how many show different images e.g hear/smiley/sad smiley
    public celebration() {
        //  set time to wait inbetween animations in micro seconds
        let TIME_TO_WAIT = 2000000
        let done_cards = this.drawn_cards.length - this.number_of_special_cards
        if (this.mode == Modes.SINGLEPLAYER || this.mode == Modes.FAMILY) {
            //  100% done
            if (done_cards >= this.number_of_cards) {
                play_happy_music()
                basic.showIcon(IconNames.Happy)
            } else if (done_cards >= this.number_of_cards / 2) {
                //  50%
                // TODO
                basic.showIcon(IconNames.Duck)
            } else {
                //  < 50%
                basic.showIcon(IconNames.Sad)
            }
            
            //  Game waits for 2 seconds before restarting
            control.waitMicros(TIME_TO_WAIT)
            basic.showNumber(done_cards, DISPLAY_INTERVAL)
            control.waitMicros(TIME_TO_WAIT)
            basic.clearScreen()
            this.exit_game()
        }
        
        if (this.mode == Modes.TIMED) {
            //  TODO: A cool sound to indicate that the time is up
            basic.showIcon(IconNames.Surprised)
            control.waitMicros(TIME_TO_WAIT)
            basic.showNumber(done_cards, DISPLAY_INTERVAL)
            control.waitMicros(TIME_TO_WAIT)
            basic.clearScreen()
            this.exit_game()
        }
        
        if (this.mode == Modes.PICKER) {
            //  TODO: Make a cool celebration.
            if (done_cards > this.number_of_cards * 4) {
                basic.showIcon(IconNames.Happy)
                music.play(music.stringPlayable("E F F A A B A - ", 500), music.PlaybackMode.LoopingInBackground)
            } else if (done_cards > this.number_of_cards * 2) {
                basic.showIcon(IconNames.SmallHeart)
            } else {
                basic.showIcon(IconNames.Sad)
            }
            
            control.waitMicros(TIME_TO_WAIT)
            music.stopMelody(MelodyStopOptions.All)
            this.exit_game()
        }
        
        if (this.mode == Modes.TOP_OF_THE_DECK) {
            basic.showIcon(IconNames.Giraffe)
            control.waitMicros(TIME_TO_WAIT)
            this.exit_game()
            
        }
        
    }
    
    //  Triggered with A + B -> change gamestate and call celebration()
    public user_induced_exit() {
        let gamestate = Gamestate.GAME_OVER
        this.celebration()
    }
    
    public special_card_drawn() {
        let random_value = random_number(100)
        return random_value < PROBABILITY_SPECIAL_CARD
    }
    
    public draw_card() {
        let index_for_drawing: number;
        let drawn_card: string;
        let random_value: number;
        if (this.mode == Modes.SINGLEPLAYER || this.mode == Modes.TIMED) {
            index_for_drawing = random_number(this.cards.length)
            //  Remove drawn_card from cards and add it to drawn_cards
            drawn_card = this.cards[index_for_drawing]
            this.cards.removeAt(index_for_drawing)
            this.drawn_cards.push(drawn_card)
            this.output_card(drawn_card)
            this.index = 0
            //  No cards left
            if (this.cards.length == 0) {
                this.gamestate = Gamestate.GAME_OVER
                this.celebration()
            }
            
            if (this.mode == Modes.TIMED && this.timer.time_is_up()) {
                this.gamestate = Gamestate.GAME_OVER
                play_timeup_music()
                control.waitMicros(400 * 10000)
                music.stopAllSounds()
                this.celebration()
            }
            
        }
        
        if (this.mode == Modes.FAMILY) {
            if (this.special_card_drawn()) {
                this.number_of_special_cards += 1
                random_value = random_number(100)
                if (random_value < PROBABILITY_BONBON) {
                    this.drawn_cards.push("Bonbon")
                    this.output_card("Bonbon")
                } else if (random_value < PROBABILITY_BONBON + PROBABILITY_PAUSE) {
                    this.drawn_cards.push("Pause")
                    this.output_card("Pause")
                } else if (random_value < PROBABILITY_BONBON + PROBABILITY_PAUSE + PROBABILITY_SONG) {
                    this.drawn_cards.push("Song")
                    this.output_card("Song")
                } else {
                    this.drawn_cards.push("Abgeben")
                    this.output_card("Abgeben")
                }
                
            } else {
                index_for_drawing = random_number(this.cards.length)
                //  Remove drawn_card from cards and add it to drawn_cards
                drawn_card = this.cards[index_for_drawing]
                this.cards.removeAt(index_for_drawing)
                this.drawn_cards.push(drawn_card)
                this.output_card(drawn_card)
                this.index = 0
            }
            
            //  No cards left
            if (this.cards.length == 0) {
                this.gamestate = Gamestate.GAME_OVER
                control.waitMicros(2000000)
                this.celebration()
            }
            
        }
        
        if (this.mode == Modes.PICKER || this.mode == Modes.TOP_OF_THE_DECK) {
            index_for_drawing = random_number(this.cards.length)
            //  Remove drawn_card from cards and add it to drawn_cards
            drawn_card = this.cards[index_for_drawing]
            this.drawn_cards.push(drawn_card)
            this.output_card(drawn_card)
            this.index = 0
            //  No cards left
            if (this.cards.length == 0) {
                this.gamestate = Gamestate.GAME_OVER
                this.celebration()
            }
            
        }
        
    }
    
    //  Depending on what type of symbol(int, string, char) card is, output different sounds
    public output_card(card: string) {
        //  TODO: Make cool symbols for the special cards, instead of displaying just the letter.
        if (card == "Bonbon") {
            basic.showLeds(`
                . . . # .
                . # # # #
                . # # # .
                # # # # .
                . # . . .
                `)
            play_bonbon_music()
        } else if (card == "Song") {
            basic.showIcon(IconNames.EighthNote)
            play_song_music()
        } else if (card == "Pause") {
            basic.showLeds(`
                . . . . .
                . # . # .
                . # . # .
                . # . # .
                . . . . .
                `)
            play_pause_music()
        } else if (card == "Abgeben") {
            basic.showLeds(`
                . . . # #
                . . # # #
                # # # # .
                . # # . .
                # . # . .
                `)
            play_abgeben_music()
        } else {
            basic.showString(card, DISPLAY_INTERVAL)
            play_draw_card_music()
        }
        
    }
    
    //  Reset game to beginning showing mode selection first
    public exit_game() {
        this.init_game(Modes.SINGLEPLAYER, 0, 0, Gamestate.MODE_SELECT, [], [])
        play_end_music()
    }
    
}

let spiel = new Spiel(Modes.SINGLEPLAYER, 0, 0, Gamestate.MODE_SELECT, [], [])
play_start_music()
//  Various helper functions
//  Generates a random number between 0 and max_value excluded
function random_number(max_value: number): number {
    return randint(0, max_value - 1)
}

