function addVignette({gameName, playerNumbers, createdAt}){
    let div0 = document.createElement("div")
    div0.className = "row"
    let div1 = document.createElement("div")
    div1.className = "ui card"
    let div2 = document.createElement("div")
    div2.className = "content"
    let div3 = document.createElement("div")
    div3.className = "header"
    let title1 = document.createTextNode(gameName)

    let div4 = document.createElement("div")
    div4.className = "content"
    let h4 = document.createElement("h4")
    h4.className = "ui sub header"
    let label1 = document.createTextNode("Informations partie")
    let div5 = document.createElement("div")
    div5.className = "ui small feed"
    let div6 = document.createElement("div")
    div6.className = "event"
    let div7 = document.createElement("div")
    div7.className = "content"
    let div8 = document.createElement("div")
    div8.className = "summary"
    let label2 = document.createTextNode(`Nombre de joueurs: ${playerNumbers}/2`)
    let div9 = document.createElement("div")
    div9.className = "event"
    let div10 = document.createElement("div")
    div10.className = "content"
    let div11 = document.createElement("div")
    div11.className = "summary"
    let label3 = document.createTextNode(`Date de création: ${createdAt}`)
    let div12 = document.createElement("div")
    div12.className = "extra content"
    let button1 = document.createElement("button")
    button1.className = "ui blue button"
    let label4 = document.createTextNode("Joindre la partie")

    div0.appendChild(div1)
    div1.appendChild(div2)
    div2.appendChild(div3)
    div3.appendChild(title1)

    div1.appendChild(div4)
    div4.appendChild(h4)
    h4.appendChild(label1)
    div4.appendChild(div5)
    div5.appendChild(div6)
    div6.appendChild(div7)
    div7.appendChild(div8)
    div8.appendChild(label2)

    div5.appendChild(div9)
    div9.appendChild(div10)
    div10.appendChild(div11)
    div11.appendChild(label3)
    div1.appendChild(div12)
    div12.appendChild(button1)
    button1.appendChild(label4)

    let _div1 = document.getElementById('contentList')
    let _div2 = document.getElementsByClassName('ui one column centered grid')[0]

    _div2.insertBefore(div0, _div1)
}

for(let i =0; i <= 3; i++){
    addVignette({gameName: `Partie n°${i}`, playerNumbers: 1, createdAt: "18/12/2020"})
}