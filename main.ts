input.onButtonPressed(Button.A, function on_button_pressed_a() {
    let test = new Newtest()
    test.x = test.run_func()
    console.log(test.x)
})
class Newtest {
    static x: string
    private ___x_is_set: boolean
    private ___x: string
    get x(): string {
        return this.___x_is_set ? this.___x : Newtest.x
    }
    set x(value: string) {
        this.___x_is_set = true
        this.___x = value
    }
    
    public static __initNewtest() {
        Newtest.x = null
    }
    
    public run_func(): string {
        return "string"
    }
    
}

Newtest.__initNewtest()

