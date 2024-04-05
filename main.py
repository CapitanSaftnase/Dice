def on_gesture_shake2():
    basic.show_leds("""
        . . . . .
        . # . # .
        . . # . .
        . # . # .
        . . . . .
        """)
    music.play(music.create_sound_expression(WaveShape.NOISE,
            54,
            54,
            255,
            0,
            500,
            SoundExpressionEffect.NONE,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.UNTIL_DONE)
    basic.clear_screen()
input.on_gesture(Gesture.SHAKE, on_gesture_shake2)
