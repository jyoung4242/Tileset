var tileCoord = []
var pixelSize = 32

var tilesetSelection
var tilesetContainer

function callback() {
  tilesetSelection = document.querySelector(".tileset-container_selection")
  tilesetContainer = document.querySelector("#tilesetcontainer")

  const dropZoneElement = document.getElementById("dropzone")

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault()
    dropZoneElement.classList.add("dropzone--over")
  })
  dropZoneElement.addEventListener("dragleave", (e) => {
    dropZoneElement.classList.remove("dropzone--over")
  })
  dropZoneElement.addEventListener("dragend", (e) => {
    dropZoneElement.classList.remove("dropzone--over")
  })
  dropZoneElement.addEventListener("drop", (e) => {
    //console.log(e.dataTransfer.files)
    e.preventDefault()
    dropZoneElement.classList.remove("dropzone--over")
    if (e.dataTransfer.files.length) {
      var inputElement = document.querySelector(".dropfile")
      //console.log(inputElement)
      inputElement.files = e.dataTransfer.files
      //add image to canvase grid
      //hide text span
      var spanElement = document.querySelector(".drop-zone_prompt")
      spanElement.classList.add("drop-zone_prompt__hidden")
      drawImagetoGrid()
    }
  })
}

function drawImagetoGrid() {
  var file = document.querySelector(".dropfile").files[0]
  var reader = new FileReader()
  reader.onload = function () {
    document.getElementById("myImage").src = reader.result
  }
  reader.readAsDataURL(file)
}

function divclick() {
  var cnv = document.querySelector("canvas")
  var ctx = cnv.getContext("2d")
  var img = document.querySelector("#myImage")
  ctx.drawImage(img, tileCoord[0] * 32, tileCoord[1] * 32, 32, 32)
  var spanElement = document.querySelector(".drop-zone_prompt")
  spanElement.classList.remove("drop-zone_prompt__hidden")
  document.getElementById("myImage").src = ""
}

function drawCanvas() {
  function drawBoard() {
    for (var x = 0; x <= bw; x += 32) {
      context.moveTo(0.5 + x + p, p)
      context.lineTo(0.5 + x + p, bh + p)
    }

    for (var x = 0; x <= bh; x += 32) {
      context.moveTo(p, 0.5 + x + p)
      context.lineTo(bw + p, 0.5 + x + p)
    }

    context.strokeStyle = "black"
    context.stroke()
  }

  var canvas = document.getElementById("canvas")
  var context = canvas.getContext("2d")
  var bw = 320
  var bh = 320
  var p = 0
  var cw = bw + p * 2 + 1
  var ch = bh + p * 2 + 1

  drawBoard()
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  tileCoord[0] = Math.floor(x / pixelSize)
  tileCoord[1] = Math.floor(y / pixelSize)
  tilesetSelection.classList.remove("tileset-container_selection__hidden")
  document.getElementById("spanSelTile").innerHTML = tileCoord
}

function selectTile(e) {
  getCursorPosition(e.target, e)
  var canvas = document.getElementById("canvas")
  var context = canvas.getContext("2d")

  var obj = getOffset(document.querySelector("#canvas"))

  tilesetSelection.style.left = obj.left + 1 + tileCoord[0] * 32 + "px"
  tilesetSelection.style.top = obj.top + 1 + tileCoord[1] * 32 + "px"
}

function clearCanvas() {
  var canvas = document.getElementById("canvas")
  var context = canvas.getContext("2d")
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawCanvas()
  tilesetSelection.classList.add("tileset-container_selection__hidden")
}

function deleteTile() {
  var canvas = document.getElementById("canvas")
  var context = canvas.getContext("2d")
  context.clearRect(tileCoord[0] * 32 + 1, tileCoord[1] * 32 + 1, 31, 31)
  drawCanvas()
}

//Select tile from the Tiles grid
function getOffset(el) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  }
}

function exportImage() {
  var data = canvas.toDataURL()
  var image = new Image()
  image.src = data
  var w = window.open("")
  w.document.write(image.outerHTML)
}
