namespace game {
    export class MyClass {
        static x: string
        private ___x_is_set: boolean
        private ___x: string
        get x(): string {
            return this.___x_is_set ? this.___x : MyClass.x
        }
        set x(value: string) {
            this.___x_is_set = true
            this.___x = value
        }
        
        public static __initMyClass() {
            game.MyClass.x = "test"
        }
        
    }
    
    MyClass.__initMyClass()
    
    //  Add your code here
    export function showstring() {
        let instance = new game.MyClass()
        basic.showString(instance.x, 200)
    }
    
}
