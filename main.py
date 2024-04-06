def on_button_pressed_a():
    test = Newtest()
    test.x = test.run_func()
    print(test.x)
input.on_button_pressed(Button.A, on_button_pressed_a)


class Newtest:
    def run_func(self):
        return "string"
    x = None