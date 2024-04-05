input.onGesture(Gesture.Shake, function on_gesture_shake2() {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . # . .
        . # . # .
        . . . . .
        `)
    music.play(music.createSoundExpression(WaveShape.Noise, 54, 54, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    basic.clearScreen()
})
