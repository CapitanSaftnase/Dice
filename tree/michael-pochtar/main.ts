//  from microbit import *
//  display.scroll("Hello, World!")   
let counter = 0
while (true) {
    basic.showNumber(counter)
    counter = counter + 1
    input.onButtonPressed(Button.A, function on_button_pressed_a() {
        
        counter = 0
    })
}
