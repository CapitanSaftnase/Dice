namespace spiel {
    export class Mode extends spiel.Enum {
        static SINGLEPLAYER: number
        private ___SINGLEPLAYER_is_set: boolean
        private ___SINGLEPLAYER: number
        get SINGLEPLAYER(): number {
            return this.___SINGLEPLAYER_is_set ? this.___SINGLEPLAYER : Mode.SINGLEPLAYER
        }
        set SINGLEPLAYER(value: number) {
            this.___SINGLEPLAYER_is_set = true
            this.___SINGLEPLAYER = value
        }
        
        static MULTIPLAYER: number
        private ___MULTIPLAYER_is_set: boolean
        private ___MULTIPLAYER: number
        get MULTIPLAYER(): number {
            return this.___MULTIPLAYER_is_set ? this.___MULTIPLAYER : Mode.MULTIPLAYER
        }
        set MULTIPLAYER(value: number) {
            this.___MULTIPLAYER_is_set = true
            this.___MULTIPLAYER = value
        }
        
        public static __initMode() {
            spiel.Mode.SINGLEPLAYER = 1
            spiel.Mode.MULTIPLAYER = 2
        }
        
    }
    
    Mode.__initMode()
    
    export class Gamestate extends spiel.Enum {
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
            spiel.Gamestate.PLAYER_SEL = 1
            spiel.Gamestate.CARD_SEL = 2
        }
        
    }
    
    Gamestate.__initGamestate()
    
    export class Spiel {
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
            spiel.Spiel.mode = spiel.Mode.SINGLEPLAYER
            spiel.Spiel.modeIndex = 0
            spiel.Spiel.numberOfCards = 0
            spiel.Spiel.gamestate = spiel.Gamestate.PLAYER_SEL
            spiel.Spiel.cards = []
            spiel.Spiel.drawnCards = []
        }
        
        constructor() {
            
        }
        
    }
    
    Spiel.__initSpiel()
    
    export function selectMode() {
        
    }
    
    export function incrementMode() {
        spiel.Spiel.modeIndex += 1
    }
    
    export function decrementMode() {
        spiel.Spiel.modeIndex -= 1
    }
    
    export function confirmMode() {
        spiel.Spiel.mode
    }
    
    export function selectNumberOfCards() {
        
    }
    
    export function incrementNumberOfCards() {
        
    }
    
    export function decrementNumberOfCards() {
        
    }
    
    export function celebration() {
        
    }
    
    export function userInducedExit() {
        
    }
    
    export function drawCard() {
        
    }
    
    export function outputCard() {
        
    }
    
    export function exitGame() {
        
    }
    
}
