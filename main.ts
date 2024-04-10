let DISPLAY_INTERVAL = 50
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
    if (spiel.gamestate == Gamestate.MODES_SELECT) {
        if (event == Button.AB) {
            spiel.confirm_mode()
        } else if (event == Button.A) {
            spiel.select_mode(ButtonAction.LEFT)
        } else if (event == Button.B) {
            spiel.select_mode(ButtonAction.RIGHT)
        }
        
    } else if (spiel.gamestate == Gamestate.CARD_SELECT) {
        if (event == Button.A) {
            spiel.select_number_of_cards(ButtonAction.LEFT)
        } else if (event == Button.B) {
            spiel.select_number_of_cards(ButtonAction.RIGHT)
        } else if (event == Button.AB) {
            spiel.confirm_number_of_cards()
        }
        
    } else if (spiel.gamestate == Gamestate.GAME_START) {
        if (event == Gesture.Shake) {
            if (spiel.mode.draw_card() == 1) {
                spiel.exit_game()
            }
            
        } else if (event == Button.AB) {
            spiel.user_induced_exit()
        } else if (event == Button.B) {
            spiel.go_forward()
        } else if (event == Button.A) {
            spiel.go_backward()
        }
        
    } else if (spiel.gamestate == Gamestate.GAME_OVER) {
        
    }
    
}

class Timer {
    static duration: number
    private ___duration_is_set: boolean
    private ___duration: number
    get duration(): number {
        return this.___duration_is_set ? this.___duration : Timer.duration
    }
    set duration(value: number) {
        this.___duration_is_set = true
        this.___duration = value
    }
    
    public static __initTimer() {
        Timer.duration = 0
    }
    
    constructor(duration: number) {
        this.duration = duration
    }
    
    public start_timer() {
        game.startCountdown(this.duration)
    }
    
}

Timer.__initTimer()

let timer = new Timer(10000)
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
        Modes.TIMED = 2
        Modes.FAMILY = 3
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
    static MODES_SELECT: number
    private ___MODES_SELECT_is_set: boolean
    private ___MODES_SELECT: number
    get MODES_SELECT(): number {
        return this.___MODES_SELECT_is_set ? this.___MODES_SELECT : Gamestate.MODES_SELECT
    }
    set MODES_SELECT(value: number) {
        this.___MODES_SELECT_is_set = true
        this.___MODES_SELECT = value
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
    
    public static __initGamestate() {
        Gamestate.MODES_SELECT = 1
        Gamestate.CARD_SELECT = 2
        Gamestate.GAME_START = 3
        Gamestate.GAME_OVER = 4
    }
    
    public length(): number {
        return 4
    }
    
    public items(i: number): string {
        return ["MODE", "CARD", "GAME", "GAMEOVER"][i]
    }
    
}

Gamestate.__initGamestate()

class Mode {
    static index: number
    private ___index_is_set: boolean
    private ___index: number
    get index(): number {
        return this.___index_is_set ? this.___index : Mode.index
    }
    set index(value: number) {
        this.___index_is_set = true
        this.___index = value
    }
    
    static number_of_cards: number
    private ___number_of_cards_is_set: boolean
    private ___number_of_cards: number
    get number_of_cards(): number {
        return this.___number_of_cards_is_set ? this.___number_of_cards : Mode.number_of_cards
    }
    set number_of_cards(value: number) {
        this.___number_of_cards_is_set = true
        this.___number_of_cards = value
    }
    
    static cards: string[]
    private ___cards_is_set: boolean
    private ___cards: string[]
    get cards(): string[] {
        return this.___cards_is_set ? this.___cards : Mode.cards
    }
    set cards(value: string[]) {
        this.___cards_is_set = true
        this.___cards = value
    }
    
    static drawn_cards: string[]
    private ___drawn_cards_is_set: boolean
    private ___drawn_cards: string[]
    get drawn_cards(): string[] {
        return this.___drawn_cards_is_set ? this.___drawn_cards : Mode.drawn_cards
    }
    set drawn_cards(value: string[]) {
        this.___drawn_cards_is_set = true
        this.___drawn_cards = value
    }
    
    public static __initMode() {
        Mode.index = 0
        Mode.number_of_cards = 0
        Mode.cards = []
        Mode.drawn_cards = []
    }
    
    public drawn_card() {
        
    }
    
    public get_mode() {
        
    }
    
}

Mode.__initMode()

class SingleplayerMode extends Mode {
    //  At the end check if there are any cards left
    public draw_card(): number {
        let gamestate: number;
        let index_for_drawing = random_number(this.cards.length)
        //  Remove drawn_card from cards and add it to drawn_cards
        let drawn_card = this.cards[index_for_drawing]
        this.cards.removeAt(index_for_drawing)
        this.drawn_cards.push(drawn_card)
        this.output_card(drawn_card)
        this.index = 0
        // no cards left
        if (this.cards.length == 0) {
            gamestate = Gamestate.GAME_OVER
            this.celebration()
            return 1
        }
        
        return 0
    }
    
    //  depending on what type of symbol(int,string,char) card is, output different sounds
    public output_card(card: string) {
        if (card == "P") {
            basic.showString(card, DISPLAY_INTERVAL)
        } else if (card == "S") {
            basic.showString(card, DISPLAY_INTERVAL)
        } else {
            basic.showString(card, DISPLAY_INTERVAL)
        }
        
        
    }
    
    //  outputs sound/image and how many cards were done
    //  depending on how many show different images e.g hear/smiley/sad smiley
    public celebration() {
        let done_cards = this.drawn_cards.length
        //  100% done
        if (done_cards == this.number_of_cards) {
            // TODO special action sounds (melody or so)
            basic.showIcon(IconNames.Happy)
        } else if (done_cards >= this.number_of_cards / 2) {
            //  50%
            // TODO
            basic.showIcon(IconNames.Duck)
        } else {
            //  < 50%
            basic.showIcon(IconNames.Sad)
        }
        
        //  Game waits for 3 seconds before restarting
        control.waitMicros(2000000)
        basic.showNumber(done_cards, DISPLAY_INTERVAL)
        control.waitMicros(2000000)
        basic.clearScreen()
    }
    
    public get_mode(): number {
        return Modes.SINGLEPLAYER
    }
    
}

class TimedMode extends Mode {
    public draw_card(): number {
        return 1
    }
    
    public output_card(card: any) {
        
    }
    
    public celebration() {
        
    }
    
    public get_mode(): number {
        return Modes.TIMED
    }
    
}

class FamilyMode extends Mode {
    public draw_card(): number {
        return 1
    }
    
    public output_card(card: any) {
        
    }
    
    public celebration() {
        
    }
    
    public get_mode(): number {
        return Modes.FAMILY
    }
    
}

class PickerMode extends Mode {
    public draw_card(): number {
        return 1
    }
    
    public output_card(card: any) {
        
    }
    
    public celebration() {
        
    }
    
    public get_mode(): number {
        return Modes.PICKER
    }
    
}

class TopOfTheDeckMode extends Mode {
    public draw_card(): number {
        return 1
    }
    
    public output_card(card: any) {
        
    }
    
    public celebration() {
        
    }
    
    public get_mode(): number {
        return Modes.TOP_OF_THE_DECK
    }
    
}

class Spiel {
    static mode: SingleplayerMode
    private ___mode_is_set: boolean
    private ___mode: SingleplayerMode
    get mode(): SingleplayerMode {
        return this.___mode_is_set ? this.___mode : Spiel.mode
    }
    set mode(value: SingleplayerMode) {
        this.___mode_is_set = true
        this.___mode = value
    }
    
    static gamestate: number
    private ___gamestate_is_set: boolean
    private ___gamestate: number
    get gamestate(): number {
        return this.___gamestate_is_set ? this.___gamestate : Spiel.gamestate
    }
    set gamestate(value: number) {
        this.___gamestate_is_set = true
        this.___gamestate = value
    }
    
    public static __initSpiel() {
        Spiel.mode = null
        Spiel.gamestate = Gamestate.MODES_SELECT
    }
    
    constructor(game_mode_index: number, index: number, number_of_cards: number, gamestate: number, cards: any, drawn_cards: any) {
        this.init_game(game_mode_index, index, number_of_cards, gamestate, cards, drawn_cards)
    }
    
    public init_game(game_mode_index: number, index: number, number_of_cards: number, gamestate: number, cards: string[], drawn_cards: string[]) {
        this.set_game_mode(game_mode_index)
        this.mode.index = index
        this.mode.number_of_cards = number_of_cards
        this.gamestate = gamestate
        this.mode.cards = cards
        this.mode.drawn_cards = drawn_cards
    }
    
    public set_game_mode(game_mode_index: number) {
        this.mode = [new SingleplayerMode(), new TimedMode(), new FamilyMode(), new PickerMode(), new TopOfTheDeckMode()][game_mode_index]
    }
    
    public select_mode(event: number) {
        if (event == ButtonAction.RIGHT) {
            this.increment_mode()
        }
        
        if (event == ButtonAction.LEFT) {
            this.decrement_mode()
        }
        
        basic.showString(new Modes().items(this.mode.index), DISPLAY_INTERVAL)
    }
    
    public increment_mode() {
        this.mode.index += 1
        this.mode.index %= new Modes().length()
    }
    
    public decrement_mode() {
        if (this.mode.index > 0) {
            this.mode.index -= 1
        } else {
            this.mode.index = new Modes().length() - 1
        }
        
    }
    
    public confirm_mode() {
        //  set Mode
        this.set_game_mode(this.mode.index)
        this.mode.index = 0
        basic.showNumber(this.mode.index + 1, DISPLAY_INTERVAL)
        this.gamestate = Gamestate.CARD_SELECT
    }
    
    //  set Mode
    public select_number_of_cards(event: number) {
        if (event == ButtonAction.RIGHT) {
            this.increment_number_of_cards()
        } else if (event == ButtonAction.LEFT) {
            this.decrement_number_of_cards()
        }
        
        basic.showNumber(this.mode.index + 1, DISPLAY_INTERVAL)
    }
    
    public increment_number_of_cards() {
        this.mode.index += 1
        this.mode.index %= 100
    }
    
    public decrement_number_of_cards() {
        if (this.mode.index > 0) {
            this.mode.index -= 1
        } else {
            this.mode.index = 99
        }
        
    }
    
    //  changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    public confirm_number_of_cards() {
        let timer: Timer;
        this.mode.number_of_cards = this.mode.index + 1
        basic.showNumber(this.mode.index + 1, DISPLAY_INTERVAL)
        this.initialize_cards()
        this.mode.index = 0
        this.gamestate = Gamestate.GAME_START
        if (this.mode.get_mode() == Modes.TIMED) {
            //  Start timer, duration: 100s
            timer = new Timer(100000)
            timer.start_timer()
        }
        
        basic.clearScreen()
        basic.showIcon(IconNames.Heart)
    }
    
    //  create a list with every number up to number_of_cards starting from 1 at index 0 up to and including number_of_cards
    //  e.g. 20 -> 1, 2, ..., 20
    //  list() doesn't work
    public initialize_cards(): string[] {
        let cardlist = []
        for (let i = 1; i < this.mode.number_of_cards + 1; i++) {
            cardlist.push("" + i)
        }
        this.mode.cards = cardlist
        return cardlist
    }
    
    public go_forward() {
        let doneCards: any;
        if (this.mode.index < 0) {
            this.mode.index += 1
            doneCards = this.mode.drawn_cards.length
            this.mode.output_card(this.mode.drawn_cards[doneCards + this.mode.index - 1])
        }
        
    }
    
    public go_backward() {
        let doneCards = this.mode.drawn_cards.length
        if (this.mode.index > -3 && doneCards > -this.mode.index + 1) {
            this.mode.index -= 1
            this.mode.output_card(this.mode.drawn_cards[doneCards + this.mode.index - 1])
        }
        
    }
    
    //  triggered with A+B -> change gamestate and call celebration()
    public user_induced_exit() {
        let gamestate = Gamestate.GAME_OVER
        this.mode.celebration()
        this.exit_game()
        
    }
    
    // TODO reset game to beginning showing mode selection first
    public exit_game() {
        this.init_game(0, 0, 0, Gamestate.MODES_SELECT, [], [])
    }
    
}

Spiel.__initSpiel()

let spiel = new Spiel(0, 0, 0, Gamestate.MODES_SELECT, [], [])
//  Various helper functions
//  Generates a random number between 0 and max_value excluded
function random_number(max_value: number): number {
    return randint(0, max_value - 1)
}

