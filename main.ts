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
function input_event(btn: number) {
    if (spiel.gamestate == Gamestate.MODES_SEL) {
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
        
    } else if (spiel.gamestate == Gamestate.GAME_START) {
        if (btn == Gesture.Shake) {
            spiel.drawCard()
        } else if (btn == Button.AB) {
            spiel.userInducedExit()
        } else if (btn == Button.B) {
            spiel.goForward()
        } else if (btn == Button.A) {
            spiel.goBackward()
        }
        
    } else if (spiel.gamestate == Gamestate.GAME_OVER) {
        
    }
    
}

class Zufallsgenerator {
    static cards: number
    private ___cards_is_set: boolean
    private ___cards: number
    get cards(): number {
        return this.___cards_is_set ? this.___cards : Zufallsgenerator.cards
    }
    set cards(value: number) {
        this.___cards_is_set = true
        this.___cards = value
    }
    
    public static __initZufallsgenerator() {
        Zufallsgenerator.cards = 0
    }
    
    public init(cards: number) {
        this.cards = cards
    }
    
    public generateRandomNumber(cards: number): number {
        let random_index = randint(0, cards - 1)
        return random_index
    }
    
}

Zufallsgenerator.__initZufallsgenerator()

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

class Modes {
    static ONE: number
    private ___ONE_is_set: boolean
    private ___ONE: number
    get ONE(): number {
        return this.___ONE_is_set ? this.___ONE : Modes.ONE
    }
    set ONE(value: number) {
        this.___ONE_is_set = true
        this.___ONE = value
    }
    
    static TWO: number
    private ___TWO_is_set: boolean
    private ___TWO: number
    get TWO(): number {
        return this.___TWO_is_set ? this.___TWO : Modes.TWO
    }
    set TWO(value: number) {
        this.___TWO_is_set = true
        this.___TWO = value
    }
    
    static THREE: number
    private ___THREE_is_set: boolean
    private ___THREE: number
    get THREE(): number {
        return this.___THREE_is_set ? this.___THREE : Modes.THREE
    }
    set THREE(value: number) {
        this.___THREE_is_set = true
        this.___THREE = value
    }
    
    static FOUR: number
    private ___FOUR_is_set: boolean
    private ___FOUR: number
    get FOUR(): number {
        return this.___FOUR_is_set ? this.___FOUR : Modes.FOUR
    }
    set FOUR(value: number) {
        this.___FOUR_is_set = true
        this.___FOUR = value
    }
    
    public static __initModes() {
        Modes.ONE = 1
        Modes.TWO = 2
        Modes.THREE = 3
        Modes.FOUR = 4
    }
    
    public length(): number {
        return 4
    }
    
    public items(i: number): string {
        return ["1", "2", "3", "4"][i]
    }
    
}

Modes.__initModes()

class Gamestate {
    static MODES_SEL: number
    private ___MODES_SEL_is_set: boolean
    private ___MODES_SEL: number
    get MODES_SEL(): number {
        return this.___MODES_SEL_is_set ? this.___MODES_SEL : Gamestate.MODES_SEL
    }
    set MODES_SEL(value: number) {
        this.___MODES_SEL_is_set = true
        this.___MODES_SEL = value
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
        Gamestate.MODES_SEL = 1
        Gamestate.CARD_SEL = 2
        Gamestate.GAME_START = 3
        Gamestate.GAME_OVER = 4
    }
    
    //  length has to be hard-coded
    public length(): number {
        return 4
    }
    
    public items(i: number): string {
        return ["MODE", "CARD", "GAME", "GAMEOVER"][i]
    }
    
}

Gamestate.__initGamestate()

class Spiel {
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
    
    static index: number
    private ___index_is_set: boolean
    private ___index: number
    get index(): number {
        return this.___index_is_set ? this.___index : Spiel.index
    }
    set index(value: number) {
        this.___index_is_set = true
        this.___index = value
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
    
    static cards: string[]
    private ___cards_is_set: boolean
    private ___cards: string[]
    get cards(): string[] {
        return this.___cards_is_set ? this.___cards : Spiel.cards
    }
    set cards(value: string[]) {
        this.___cards_is_set = true
        this.___cards = value
    }
    
    static drawnCards: string[]
    private ___drawnCards_is_set: boolean
    private ___drawnCards: string[]
    get drawnCards(): string[] {
        return this.___drawnCards_is_set ? this.___drawnCards : Spiel.drawnCards
    }
    set drawnCards(value: string[]) {
        this.___drawnCards_is_set = true
        this.___drawnCards = value
    }
    
    public static __initSpiel() {
        Spiel.mode = Modes.ONE
        Spiel.index = 0
        Spiel.numberOfCards = 0
        Spiel.gamestate = Gamestate.MODES_SEL
        Spiel.cards = []
        Spiel.drawnCards = []
    }
    
    constructor(mode: number, index: number, numberOfCards: number, gamestate: number, cards: any, drawnCards: any) {
        this.initGame(mode, index, numberOfCards, gamestate, cards, drawnCards)
    }
    
    public initGame(mode: number, index: number, numberOfCards: number, gamestate: number, cards: string[], drawnCards: string[]) {
        this.mode = mode
        this.index = index
        this.numberOfCards = numberOfCards
        this.gamestate = gamestate
        this.cards = cards
        this.drawnCards = drawnCards
    }
    
    public selectMode(btn: number) {
        if (btn == ButtonAction.RIGHT) {
            this.incrementMode()
        }
        
        if (btn == ButtonAction.LEFT) {
            this.decrementMode()
        }
        
        basic.showString(new Modes().items(this.index), 50)
    }
    
    public incrementMode() {
        this.index += 1
        this.index %= new Modes().length()
    }
    
    public decrementMode() {
        if (this.index > 0) {
            this.index -= 1
        } else {
            this.index = new Modes().length() - 1
        }
        
    }
    
    public confirmMode() {
        this.mode = this.index + 1
        this.index = 0
        basic.showNumber(this.index + 1, 50)
        this.gamestate = Gamestate.CARD_SEL
    }
    
    public selectNumberOfCards(btn: number) {
        if (btn == ButtonAction.RIGHT) {
            this.incrementNumberOfCards()
        } else if (btn == ButtonAction.LEFT) {
            this.decrementNumberOfCards()
        }
        
        basic.showNumber(this.index + 1, 50)
    }
    
    public incrementNumberOfCards() {
        this.index += 1
        this.index %= 100
    }
    
    public decrementNumberOfCards() {
        if (this.index > 0) {
            this.index -= 1
        } else {
            this.index = 99
        }
        
    }
    
    //  changes gamestate and displays the symbol for starting the game. Then game waits for shake-input
    public confirmNumberOfCards() {
        let timer: Timer;
        this.numberOfCards = this.index + 1
        basic.showNumber(this.index + 1, 50)
        this.initializeCards()
        this.index = 0
        this.gamestate = Gamestate.GAME_START
        if (this.mode == Modes.TWO) {
            //  Start timer, duration: 100s
            timer = new Timer(100000)
            timer.startTimer()
        }
        
        basic.clearScreen()
        basic.showIcon(IconNames.Heart)
    }
    
    // create a List with every number up to numberOfCards starting from 1 at index 0 up to and including numberOfCards
    //  e.g 20 -> 1,2...20
    // list() doesn't work
    public initializeCards(): string[] {
        let cardlist = []
        console.log("numberOfCards:" + this.numberOfCards)
        for (let i = 1; i < this.numberOfCards + 1; i++) {
            cardlist.push("" + i)
        }
        this.cards = cardlist
        return cardlist
    }
    
    public goForward() {
        let doneCards: any;
        if (this.index < 0) {
            this.index += 1
            doneCards = this.drawnCards.length
            this.outputCard(this.drawnCards[doneCards + this.index - 1])
        }
        
    }
    
    public goBackward() {
        let doneCards = this.drawnCards.length
        if (this.index > -3 && doneCards > -this.index + 1) {
            this.index -= 1
            this.outputCard(this.drawnCards[doneCards + this.index - 1])
        }
        
    }
    
    //  outputs sound/image and how many cards were done
    //  depending on how many show different images e.g hear/smiley/sad smiley
    public celebration() {
        let doneCards = this.drawnCards.length
        //  100% done
        if (doneCards == this.numberOfCards) {
            // TODO special action sounds (melody or so)
            basic.showIcon(IconNames.Happy)
            
        } else if (doneCards >= this.numberOfCards / 2) {
            //  50%    
            // TODO 
            basic.showIcon(IconNames.Duck)
            
        } else {
            //  < 50%
            basic.showIcon(IconNames.Sad)
        }
        
        // game waits for 3 secs before restarting
        control.waitMicros(2000000)
        basic.showNumber(doneCards, 50)
        control.waitMicros(2000000)
        basic.clearScreen()
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
        let generator = new Zufallsgenerator()
        let indexForDrawing = generator.generateRandomNumber(this.cards.length)
        //  remove drawnCard from cards and add it to drawnCards
        let drawnCard = this.cards[indexForDrawing]
        this.cards.removeAt(indexForDrawing)
        this.drawnCards.push(drawnCard)
        this.outputCard(drawnCard)
        this.index = 0
        // no cards left
        if (this.cards.length == 0) {
            this.gamestate = Gamestate.GAME_OVER
            this.celebration()
        }
        
        
    }
    
    //  depending on what type of symbol(int,string,char) card is, output different sounds
    public outputCard(card: string) {
        if (card == "P") {
            basic.showString(card, 50)
        } else if (card == "S") {
            basic.showString(card, 50)
        } else {
            basic.showString(card, 50)
        }
        
        
    }
    
    // TODO reset game to beginning showing mode selection first 
    public exitGame() {
        this.initGame(Modes.ONE, 0, 0, Gamestate.MODES_SEL, [], [])
    }
    
}

Spiel.__initSpiel()

let spiel = new Spiel(Modes.ONE, 0, 0, Gamestate.MODES_SEL, [], [])
