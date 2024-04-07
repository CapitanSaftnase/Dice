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
    
})
function input_event(btn: number) {
    if (spiel.gamestate == Gamestate.MODUS_SEL) {
        if (btn == Button.AB) {
            spiel.confirmMode()
        } else if (btn == Button.A) {
            spiel.selectMode(ButtonAction.LEFT)
        } else if (btn == Button.B) {
            spiel.selectMode(ButtonAction.RIGHT)
        }
        
    } else if (spiel.gamestate == Gamestate.CARD_SEL) {
        if (btn == Button.A) {
            spiel.selectNumberOfCards(ButtonAction.LEFT)
        } else if (btn == Button.B) {
            spiel.selectNumberOfCards(ButtonAction.RIGHT)
        } else if (btn == Button.AB) {
            spiel.confirmNumberOfCards()
        }
        
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
    
    public startTimer() {
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

class Modus {
    static BASIC: number
    private ___BASIC_is_set: boolean
    private ___BASIC: number
    get BASIC(): number {
        return this.___BASIC_is_set ? this.___BASIC : Modus.BASIC
    }
    set BASIC(value: number) {
        this.___BASIC_is_set = true
        this.___BASIC = value
    }
    
    static TIMED: number
    private ___TIMED_is_set: boolean
    private ___TIMED: number
    get TIMED(): number {
        return this.___TIMED_is_set ? this.___TIMED : Modus.TIMED
    }
    set TIMED(value: number) {
        this.___TIMED_is_set = true
        this.___TIMED = value
    }
    
    public static __initModus() {
        Modus.BASIC = 1
        Modus.TIMED = 2
    }
    
    public length(): number {
        return 2
    }
    
    public items(i: number): string {
        return ["BASIC", "TIMED"][i]
    }
    
}

Modus.__initModus()

class Modes {
    static BASIC: number
    private ___BASIC_is_set: boolean
    private ___BASIC: number
    get BASIC(): number {
        return this.___BASIC_is_set ? this.___BASIC : Modes.BASIC
    }
    set BASIC(value: number) {
        this.___BASIC_is_set = true
        this.___BASIC = value
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
    
    public static __initModes() {
        Modes.BASIC = 0
        Modes.TIMED = 1
    }
    
}

Modes.__initModes()

class Gamestate {
    static MODUS_SEL: number
    private ___MODUS_SEL_is_set: boolean
    private ___MODUS_SEL: number
    get MODUS_SEL(): number {
        return this.___MODUS_SEL_is_set ? this.___MODUS_SEL : Gamestate.MODUS_SEL
    }
    set MODUS_SEL(value: number) {
        this.___MODUS_SEL_is_set = true
        this.___MODUS_SEL = value
    }
    
    static CARD_SEL: number
    private ___CARD_SEL_is_set: boolean
    private ___CARD_SEL: number
    get CARD_SEL(): number {
        return this.___CARD_SEL_is_set ? this.___CARD_SEL : Gamestate.CARD_SEL
    }
    set CARD_SEL(value: number) {
        this.___CARD_SEL_is_set = true
        this.___CARD_SEL = value
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
        Gamestate.MODUS_SEL = 1
        Gamestate.CARD_SEL = 2
        Gamestate.GAME_START = 3
    }
    
    //  length has to be hard-coded
    public length(): number {
        return 3
    }
    
    public items(i: number): string {
        return ["MODE", "CARD", "GAME"][i]
    }
    
}

Gamestate.__initGamestate()

class Spiel {
    static modeIndex: number
    private ___modeIndex_is_set: boolean
    private ___modeIndex: number
    get modeIndex(): number {
        return this.___modeIndex_is_set ? this.___modeIndex : Spiel.modeIndex
    }
    set modeIndex(value: number) {
        this.___modeIndex_is_set = true
        this.___modeIndex = value
    }
    
    static mode: number
    private ___mode_is_set: boolean
    private ___mode: number
    get mode(): number {
        return this.___mode_is_set ? this.___mode : Spiel.mode
    }
    set mode(value: number) {
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
    
    static numberOfCards: number
    private ___numberOfCards_is_set: boolean
    private ___numberOfCards: number
    get numberOfCards(): number {
        return this.___numberOfCards_is_set ? this.___numberOfCards : Spiel.numberOfCards
    }
    set numberOfCards(value: number) {
        this.___numberOfCards_is_set = true
        this.___numberOfCards = value
    }
    
    static cards: any[]
    private ___cards_is_set: boolean
    private ___cards: any[]
    get cards(): any[] {
        return this.___cards_is_set ? this.___cards : Spiel.cards
    }
    set cards(value: any[]) {
        this.___cards_is_set = true
        this.___cards = value
    }
    
    static drawnCards: any[]
    private ___drawnCards_is_set: boolean
    private ___drawnCards: any[]
    get drawnCards(): any[] {
        return this.___drawnCards_is_set ? this.___drawnCards : Spiel.drawnCards
    }
    set drawnCards(value: any[]) {
        this.___drawnCards_is_set = true
        this.___drawnCards = value
    }
    
    public static __initSpiel() {
        Spiel.mode = Modus.BASIC
        Spiel.modeIndex = 0
        Spiel.numberOfCards = 0
        Spiel.gamestate = Gamestate.MODUS_SEL
        Spiel.cards = []
        Spiel.drawnCards = []
    }
    
    constructor() {
        
    }
    
    public selectMode(btn: number) {
        if (btn == ButtonAction.RIGHT) {
            this.incrementMode()
        }
        
        if (btn == ButtonAction.LEFT) {
            this.decrementMode()
        }
        
        basic.showString(new Modus().items(this.modeIndex))
    }
    
    public incrementMode() {
        this.modeIndex += 1
        this.modeIndex %= new Modus().length()
    }
    
    public decrementMode() {
        if (this.modeIndex > 0) {
            this.modeIndex -= 1
        } else {
            this.modeIndex = new Modus().length() - 1
        }
        
    }
    
    public confirmMode() {
        this.mode = this.modeIndex + 1
        this.modeIndex = 0
        basic.showNumber(this.modeIndex + 1)
        this.gamestate = Gamestate.CARD_SEL
    }
    
    public selectNumberOfCards(btn: number) {
        if (btn == ButtonAction.RIGHT) {
            this.incrementNumberOfCards()
        } else if (btn == ButtonAction.LEFT) {
            this.decrementNumberOfCards()
        }
        
        basic.showNumber(this.modeIndex + 1)
    }
    
    public incrementNumberOfCards() {
        this.modeIndex += 1
        this.modeIndex %= 100
    }
    
    public decrementNumberOfCards() {
        if (this.modeIndex > 0) {
            this.modeIndex -= 1
        } else {
            this.modeIndex = 99
        }
        
    }
    
    //  changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    public confirmNumberOfCards() {
        this.numberOfCards = this.modeIndex
        basic.showNumber(this.modeIndex + 1)
        this.gamestate = Gamestate.GAME_START
        this.initializeCards(this.numberOfCards)
        basic.clearScreen()
        basic.showIcon(IconNames.Heart)
    }
    
    // create a List with every number up to numberOfCards starting from 1 at index 0 up to and including numberOfCards
    //  e.g 20 -> 1,2...20
    // list() doesn't work
    public initializeCards(numberOfCards: number): any[] {
        let cardlist = []
        for (let i = 1; i < numberOfCards + 1; i++) {
            cardlist.push(i)
        }
        this.cards = cardlist
        return cardlist
    }
    
    //  outputs sound/image and how many cards were done
    //  depending on how many show different images e.g hear/smiley/sad smiley
    public celebration() {
        let doneCards = this.drawnCards.length
        // 
        //  100% done
        if (doneCards == this.numberOfCards) {
            // TODO special action sounds (melody or so)
            basic.showIcon(IconNames.Fabulous)
            
        } else if (doneCards == this.numberOfCards / 2) {
            //  50%    
            // TODO 
            basic.showIcon(IconNames.Happy)
            
        } else {
            //  < 50%
            basic.showIcon(IconNames.Sad)
        }
        
        // game waits for 3 secs before restarting
        control.waitMicros(3000)
        this.exitGame()
        
    }
    
    //  triggered with A+B -> change gamestate and call celebration()
    public userInducedExit() {
        let gamestate = Gamestate.GAME_OVER
        this.celebration()
        
    }
    
    //  at the end check if there are any cards left
    public drawCard() {
        //  call random Num generator with length of cards
        let indexForDrawing = 5
        //  <- for now -> Zufallsgenerator.generateNumber(len(self.cards))
        //  remove drawnCard from cards and add it to drawnCards
        let drawnCard = this.cards[indexForDrawing]
        this.cards.removeAt(indexForDrawing)
        this.drawnCards.push(drawnCard)
        this.outputCard(drawnCard)
        // no cards left
        if (this.cards.length == 0) {
            this.gamestate = Gamestate.GAME_OVER
            this.celebration()
        }
        
        
    }
    
    //  depending on what type of symbol(int,string,char) card is, output different sounds 
    public outputCard(card: any) {
        
    }
    
    // TODO reset game to beginning showing mode selection first 
    public exitGame() {
        
    }
    
}

Spiel.__initSpiel()

let spiel = new Spiel()
