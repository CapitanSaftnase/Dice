# from microbit import *

# display.scroll("Hello, World!")   

counter = 0

def on_button_pressed_a():
    global counter
    counter = 0


while True:
    basic.show_number(counter)
    counter = counter + 1
    input.on_button_pressed(Button.A, on_button_pressed_a)
