const canvas = document.getElementById('canvas')
const arrow = document.getElementById('prizeArrow')
const modal = document.getElementById('modal')
const modalDesc = document.getElementById('modal-description')
const resultEl = document.getElementById('result')

const arrCtx = arrow.getContext('2d')

arrCtx.strokeStyle = 'black'
arrCtx.fillStyle = 'gray'

arrCtx.lineTo(30, 0)
arrCtx.lineTo(0, 30 / 2)
arrCtx.lineTo(30, 30)
arrCtx.lineTo(30, 0)
arrCtx.stroke()
arrCtx.fill()

const winAngles = [30, 150, 270]
const loseAngles = [90, 210, 330]

let shouldWin = false
let spinning = false

const wheel = new Winwheel({
  textFontFamily: 'Roboto',
  responsive: true,
  pointerAngle: 90,
  innerRadius: 15,
  lineWidth: 0.8,
  textAlignment: 'center',
  textMargin: 8,
  numSegments: 6,
  segments: [
    {
      fillStyle: '#3369e7',
      text: 'WIN',
      textFontSize: 20,
      textFillStyle: 'white'
    },
    {
      fillStyle: '#d11325',
      text: 'LOSE',
      textFontSize: 20,
      textFillStyle: 'white'
    },
    {
      fillStyle: '#3369e7',
      text: 'WIN',
      textFontSize: 20,
      textFillStyle: 'white'
    },
    {
      fillStyle: '#009825',
      text: 'LOSE',
      textFontSize: 20,
      textFillStyle: 'white'
    },
    {
      fillStyle: '#ecb210',
      text: 'WIN',
      textFontSize: 20,
      textFillStyle: 'white'
    },
    {
      fillStyle: '#d11325',
      text: 'LOSE',
      textFontSize: 20,
      textFillStyle: 'white'
    }
  ],
  animation: {
    type: 'spinToStop',
    duration: 7,
    spins: 7,
    easing: 'Power2.easeOut',
    callbackFinished: () => {
      const { text } = wheel.getIndicatedSegment()

      if (text === 'WIN') {
        modalDesc.innerText = 'We have a winner!'
        resultEl.innerText = 'WIN'
      }

      if (text === 'LOSE') {
        modalDesc.innerText = 'We have a loser!'
        resultEl.innerText = 'LOSE'
      }

      openModal()

      spinning = false
    }
  }
})

document.addEventListener('keydown', ({ key }) => {
  key = key.toLowerCase()

  if (key === 'w') shouldWin = true
  if (key === 'l') shouldWin = false
})

canvas.addEventListener('click', () => {
  if (!spinning) {
    const random = Math.floor(Math.random() * 3)
    const angle = shouldWin ? winAngles[random] : loseAngles[random]
    const stopAt = (angle + Math.floor((Math.random() * 30)))

    wheel.stopAnimation(false)
    wheel.rotationAngle = wheel.rotationAngle % 360
    wheel.animation.stopAngle = stopAt

    wheel.startAnimation()
    spinning = true
  }
})

function openModal() {
  modal.style.display = 'block'
}

function closeModal() {
  modal.style.display = 'none'
}
