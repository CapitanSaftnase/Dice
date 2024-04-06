input.onButtonPressed(Button.A, function on_button_pressed_a() {
    mainInput(Button.A)
})
function mainInput(btn: number) {
    if (spiel.gamestate == 1) {
        spiel.selectMode(btn)
    }
    
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    mainInput(Button.B)
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    let spiel = new Spiel()
})
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
    
}

Modus.__initModus()

class Gamestate {
    static PLAYER_SEL: number
    private ___PLAYER_SEL_is_set: boolean
    private ___PLAYER_SEL: number
    get PLAYER_SEL(): number {
        return this.___PLAYER_SEL_is_set ? this.___PLAYER_SEL : Gamestate.PLAYER_SEL
    }
    set PLAYER_SEL(value: number) {
        this.___PLAYER_SEL_is_set = true
        this.___PLAYER_SEL = value
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
        Gamestate.PLAYER_SEL = 1
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
        Spiel.modeIndex = 1
        Spiel.numberOfCards = 0
        Spiel.gamestate = Gamestate.PLAYER_SEL
        Spiel.cards = []
        Spiel.drawnCards = []
    }
    
    constructor() {
        
    }
    
    public selectMode(btn: number) {
        if (Button.A) {
            this.incrementMode()
        } else if (Button.B) {
            this.decrementMode()
        }
        
        console.log(this.modeIndex)
    }
    
    public incrementMode() {
        if (this.modeIndex < 2) {
            this.modeIndex += 1
        } else {
            this.modeIndex = 1
        }
        
    }
    
    public decrementMode() {
        if (this.modeIndex > 1) {
            this.modeIndex -= 1
        } else {
            this.modeIndex = 2
        }
        
    }
    
    public confirmMode() {
        
    }
    
    public selectNumberOfCards() {
        Spiel.numberOfCards = Spiel.modeIndex
    }
    
    public incrementNumberOfCards() {
        Spiel.modeIndex += 1
    }
    
    public decrementNumberOfCards() {
        Spiel.modeIndex -= 1
    }
    
    public celebration() {
        
    }
    
    public userInducedExit() {
        
    }
    
    public drawCard() {
        
    }
    
    public outputCard() {
        
    }
    
    public exitGame() {
        
    }
    
}

Spiel.__initSpiel()

let spiel = new Spiel()
