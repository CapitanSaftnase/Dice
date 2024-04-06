input.onButtonPressed(Button.A, function on_button_pressed_a() {
    if (spiel.gamestate == 2) {
        console.log("SelectMode")
    }
    
    
})
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
    static MODE_SEL: number
    private ___MODE_SEL_is_set: boolean
    private ___MODE_SEL: number
    get MODE_SEL(): number {
        return this.___MODE_SEL_is_set ? this.___MODE_SEL : Gamestate.MODE_SEL
    }
    set MODE_SEL(value: number) {
        this.___MODE_SEL_is_set = true
        this.___MODE_SEL = value
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
    
    public static __initGamestate() {
        Gamestate.MODE_SEL = 1
        Gamestate.CARD_SEL = 2
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
    
    public static __initSpiel() {
        Spiel.mode = 0
        Spiel.modeIndex = 0
        Spiel.numberOfCards = 0
        Spiel.gamestate = Gamestate.MODE_SEL
        Spiel.cards = []
        Spiel.drawnCards = []
    }
    
    constructor() {
        
    }
    
    public selectMode() {
        
    }
    
    public incrementMode() {
        this.modeIndex += 1
    }
    
    public static decrementMode() {
        this.modeIndex -= 1
    }
    
    public static confirmMode() {
        
    }
    
    // create a List with every number up to numberOfCards starting from 1 at index 0 up to and including numberOfCards
    //  e.g 20 -> 1,2...20
    //  list() doesn't work
    public initializeCards(numberOfCards: number): any[] {
        let cardlist = []
        for (let i = 1; i < numberOfCards + 1; i++) {
            cardlist.push(i)
        }
        this.cards = cardlist
        return cardlist
    }
    
    public static selectNumberOfCards() {
        Spiel.numberOfCards = Spiel.modeIndex
    }
    
    public static incrementNumberOfCards() {
        Spiel.modeIndex += 1
    }
    
    public static decrementNumberOfCards() {
        Spiel.modeIndex -= 1
    }
    
    public celebration() {
        basic.showNumber(this.drawnCards.length)
        
    }
    
    public static userInducedExit() {
        
    }
    
    public static drawCard() {
        
    }
    
    public static outputCard() {
        
    }
    
    public static exitGame() {
        
    }
    
}

Spiel.__initSpiel()

let spiel = new Spiel()
spiel.gamestate = 2
let l = [1, 2, 3, 4, 5]
console.log(l.length)
spiel.numberOfCards = 20
spiel.initializeCards(spiel.numberOfCards)
console.log(spiel.cards)
spiel.selectMode()
