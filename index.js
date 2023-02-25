const containerEl = document.querySelector("#container")
const submitButtonEl = document.querySelector("#submit")
const userRateElement = document.querySelector("#userRate")
const alertElement = document.querySelector("#alert")
const rateButtons = document.querySelectorAll(".rating .rate")
const starIconElement = document.querySelector("#starIcon")

var userRate = 0
var timeout = undefined

rateButtons.forEach((button, i) => {
  button.addEventListener("mouseover", () => {
    rateButtons.forEach(button => {
      button.classList.remove("hovering")
      button.classList.remove("hover")
    })
    for (let i = 0; i < button.getAttribute("data-rate"); i++) {
      rateButtons[i].classList.add("hovering")
    }
  })

  button.addEventListener("mouseleave", () => {
    rateButtons.forEach(button => {
      button.classList.remove("hovering")
      
      if (button.classList.contains("active")) {
        if (i > 0) {
          rateButtons[userRate - 2].classList.add("hover")
        }
      }
    })
  })

  button.addEventListener("click", () => {
    rateButtons.forEach(button => {
      button.classList.remove("hover")
      button.classList.remove("active")
    })
    button.classList.add("active")
    userRate = parseInt(button.getAttribute("data-rate"))
    if (i > 0) {
      rateButtons[i - 1].classList.add("hover")
    }
  })
})

const debug = {
  buttonElement: document.querySelector("#toggleRate"),
  initialize: function () {
    if (this.buttonElement) 
      this.buttonElement.onclick = this.forceToggleRate
  },
  forceToggleRate: function () {
    if (containerEl.getAttribute("data-current-screen") === "rate") {
      containerEl.setAttribute("data-current-screen", "submit")
    }
    else if (containerEl.getAttribute("data-current-screen") === "submit") {
      containerEl.setAttribute("data-current-screen", "rate")
    }
  }
}

submitButtonEl.onclick = submitRate

function submitRate() {
  if (userRate > 0) {
    userRateElement.innerText = userRate
    containerEl.setAttribute("data-current-screen", "submit")
  } else {
    alertElement.style.animationName = "inAlert"
    alertElement.style.animationPlayState = "running"
    alertElement.style.visibility = "visible"

    timeout = setTimeout(() => {
      alertElement.style.animationName = "outAlert"
      alertElement.style.animationPlayState = "running"

      alertElement.addEventListener("animationend", ({ animationName }) => {
        if (animationName === "outAlert") {
          alertElement.style.visibility = "hidden"
          clearTimeout(timeout)
          timeout = undefined
        }
      })
    }, 2000)
  }
}

debug.initialize()

starIconElement.addEventListener("animationend", () => {
  containerEl.style.overflow = "hidden"
})