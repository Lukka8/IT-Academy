/*
  By: @Luka
  Created: Jan, 16 2021
  Modifed: None

*/

const Backwards = document.getElementById("Backwards")
const Forward = document.getElementById("Forward")
const Selectors = document.getElementById("Selectors")
const Images = document.querySelectorAll('.images img')
const Buttons = []

var Position = 1
var ImageCount = Images.length

var ActiveImage = null
var ActiveButton = null
var Count = 0


const Change = (Number, Type) => {

  ActiveButton = Buttons[Position]
  Buttons[Position].classList.add("active")
  
  if (Type) {
    if (ActiveImage) {
      ActiveImage.classList.remove("active")
    }

    Images[Number].classList.add("active")

    ActiveImage = Images[Number]
  } else {
    if (ActiveImage) {
      ActiveImage.classList.remove("active")
    }

    Position = Position + Number

    if (Position > ImageCount - 1) {
      Position = 1
    } else if (Position < 0) {
      Position = ImageCount - 1
    }

    Images[Position].classList.add("active")

    ActiveImage = Images[Position]
  }

  ActiveButton.classList.remove("active")
  Buttons[Position].classList.add("active")
  ActiveButton = Buttons[Position]
}

Forward.addEventListener("click", () => {
  Change(1, false)
})

Backwards.addEventListener("click", () => {
  Change(-1, false)
})

Images.forEach(Image => {
  var Button = document.createElement("button")

  Button.addEventListener("click", ()=> {
    if (ActiveButton) {
      ActiveButton.classList.remove("active")
    }

    Button.classList.add("active")
    ActiveButton = Button
    Change(Button.dataset.id, true)
  })

  Button.dataset.id = Count

  Selectors.appendChild(Button)
  Buttons[Count] = Button
  Count++
});

Buttons.reverse()


Change(Position, false)
