namespace spiel {
    //  Add your code here
    export class Spiel {
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
            spiel.Spiel.numberOfCards = 0
            spiel.Spiel.gamestate = 0
            spiel.Spiel.cards = []
            spiel.Spiel.drawnCards = []
        }
        
    }
    
    Spiel.__initSpiel()
    
    export function selectMode() {
        //  ruft increment-/decrementMode auf und zeigt nach jeweiligem Aufruf den aktuell gewählten Modus an
        
    }
    
    export function show() {
        let instance = new spiel.Spiel()
        basic.showNumber(5)
    }
    
}
