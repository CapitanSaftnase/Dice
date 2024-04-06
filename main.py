

def on_button_pressed_a():
    if spiel.gamestate==2:
        print("SelectMode")
    
    pass
input.on_button_pressed(Button.A, on_button_pressed_a)



class Modes(Enum):
    BASIC = 0
    TIMED = 1    


class Gamestate(Enum):
    MODE_SEL = 1
    CARD_SEL = 2

class Spiel:
    mode = 0
    modeIndex = 0
    numberOfCards = 0
    gamestate = Gamestate.MODE_SEL
    cards = []
    drawnCards = []

    def __init__(self):
        pass



    def selectMode(self):
        pass

    def incrementMode(self):
        self.modeIndex += 1
        
        

    def decrementMode():
        self.modeIndex -= 1

    def confirmMode():
        pass

    #TODO
    def initializeCards():
        
        # return list
        pass

    
    def selectNumberOfCards():
        Spiel.numberOfCards = Spiel.modeIndex

    def incrementNumberOfCards():
        Spiel.modeIndex += 1

    def decrementNumberOfCards():
        Spiel.modeIndex -= 1

    def celebration():
        pass

    def userInducedExit():
        pass

    def drawCard():
        pass

    def outputCard():
        pass

    def exitGame():
        pass

spiel = Spiel()
spiel.gamestate = 2
l =[1,2,3,4,5]
print(len(l))
spiel.selectMode()
