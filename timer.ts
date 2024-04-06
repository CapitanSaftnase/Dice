namespace timer {
    export class Timer {
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
            timer.Timer.duration = 0
        }
        
    }
    
    Timer.__initTimer()
    
    export function startTimer() {
        
    }
    
    export function incrementTimer() {
        
    }
    
    export function decrementTimer() {
        
    }
    
    export function timeout() {
        
    }
    
}
