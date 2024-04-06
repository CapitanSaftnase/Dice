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
        
        public static __initSpiel() {
            spiel.Spiel.numberOfCards = 0
        }
        
    }
    
    Spiel.__initSpiel()
    
    export function selectMode() {
        //  ruft increment-/decrementMode auf und zeigt nach jeweiligem Aufruf den aktuell gewählten Modus an
        
    }
    
    export function show() {
        let instance = new spiel.Spiel()
        basic.showNumber(10)
    }
    
}
