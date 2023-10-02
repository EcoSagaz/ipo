/* Var init */questionscreen
let user = ""
let registers = []
let elWelcomeScr = document.getElementById("welcomescreen")
let elQuestionScreen = document.getElementById("questionscreen")
let elOptionScreen = document.getElementById("optionscreen")
let elRestartScreen = document.getElementById("restartscreen")
let elTableScreen = document.getElementById("tablescreen")

function hiddenAllScreens(){
    elWelcomeScr.classList.add('hidden')
    elQuestionScreen.classList.add('hidden')
    elOptionScreen.classList.add('hidden')
    elRestartScreen.classList.add('hidden')
    elTableScreen.classList.add('hidden')
}

function User(name){
    this.name = name
    this.text = ""
    this.answers = new Array(10).fill("")
    this.addAnswer = function(question,answer){
        this.answers[question] = answer
    }
}

function Ipo() {
    this.questions = []
    this.counter = 0
    this.indexCurrentQuestion = 0
    this.addQuestion = function(question) {
        this.questions.push(question)
    }
    this.showCurrentQuestion = function(currentQuestion) {
        console.log("ipo.showCurrentQuestion")
        this.counter++
        this.indexCurrentQuestion = currentQuestion
        if( this.indexCurrentQuestion <= this.questions.length && currentQuestion >= 0){
            this.questions[currentQuestion].getElement(this.counter)
        } else {
            let elCorrectAnswers = document.querySelector("#correctAnswers")
            elCorrectAnswers.innerHTML = "Gracias por contribuir con la Seguridad Operacional"
            
            hiddenAllScreens()
            elOptionScreen.classList.remove("hidden")
            elRestartScreen.classList.remove("hidden")
            registers.push(user)
            console.log("Registers: "+JSON.stringify(registers))
        }
    }
}

function Question(id,title,answers,type,nextQuestions) {
    this.id = id
    this.title = title
    this.answers = answers
    this.type = type
    this.nextQuestions = nextQuestions
    this.getBody = function() {
        let body = this.title.toUpperCase() + '\n'
        for (let i=0; i<this.answers.length; i++) {
            body += (i+1) + '. ' + this.answers[i] + '\n'
        }
        return body
    }
    this.addAnswer = function(answer) {
        this.answers.push(answer)
    }
    this.isCorrectAnswer = function(userAnswer) {
        if (this.correctAnswer == userAnswer) return true
        else return false
    }
    this.getElement = function(counter) {
        let questionNumber = document.createElement("h2")
        questionNumber.textContent = "Pregunta "+counter
        elQuestionScreen.append(questionNumber)
        let questionTitle = document.createElement("h3")
        questionTitle.textContent = this.title
        elQuestionScreen.append(questionTitle)
        
        let questionAnswers = document.createElement("ul")
        questionAnswers.classList.add("question__awswers")
        console.log(type)
        if (type == 'Texto1'){
            var cuadro = document.createElement("textarea")
            var fechasit = document.createElement("input")
            fechasit.type = "date"
            questionAnswers.append(fechasit)
            questionAnswers.append(cuadro)
        }
        if (type == 'Texto2'){
            var cuadro = document.createElement("textarea")
            questionAnswers.append(cuadro)
        }
        this.answers.forEach((answer, index) => {
            let elAnswer = document.createElement("li")
            elAnswer.classList.add("awswer")
            elAnswer.textContent = answer
            elAnswer.id = index 
            elAnswer.addEventListener("click", this.checkAnswer)
            questionAnswers.append(elAnswer)
        })       
        elQuestionScreen.append(questionAnswers)
    }
    
    this.checkAnswer = (event) => {
        let anwserSelected = event.target
        console.log("Answer: "+anwserSelected.id)
        let indexAnswer = anwserSelected.id
        let idQuestion = this.id
        user.answers[idQuestion] = indexAnswer
        
        let nextQuestion = this.nextQuestions[indexAnswer]
        ipo.indexCurrentQuestion = this.id
        
        setTimeout(function() {
            elQuestionScreen.textContent = ''
            ipo.showCurrentQuestion(nextQuestion)
        }, 100)
    }
}

function addQuestions(q){
    let question0 = new Question(0,'IDENTIFICACION : Seleccione ámbito del Reporte', ['Humano','Organizacional','Operacional','Mantenimiento','Ambiental'],'Boton',[1,1,1,1,1])
    let question1 = new Question(1,'TIPO DE SUCESO : Seleccione suceso a informar', ['Accidente','Incidente','Riesgo','Falla de Procedimientos','Ausencia de Servicio'], 'Boton',[2,2,2,2,2])
    let question2 = new Question(2,'PROBABILIDAD', ['1-Extremadamente Improbable','2-Improbable','3-Remoto','4-Ocasional','5-Frecuente'], 'Boton',[3,3,3,3,3])
    let question3 = new Question(3,'SEVERIDAD', ['A-Catastrófico','B-Peligroso','C-Mayor','D-Menor','E-Insignificante'], 'Boton',[4,4,4,4,4])
    let question4 = new Question(4,'FACTORES CONTRIBUYENTES : Seleccione Factor Contribuyente', ['Norma/Procedimientos','Condición Fisiológica','Equipamiento','COMM','Ergonomía'], 'Boton', [5,5,5,5,5])
    let question5 = new Question(5,'LUGAR', ['Acceso', 'Sala de Control','Servicios Básicos','Entorno'], 'Boton',[6,6,6,6])
    let question6 = new Question(6,'SITUACIÓN : Describa la situación indicando la fecha del suceso. Recuerde NO entregar Nombres',['Continuar'],'Texto1',[7,7])
    let question7 = new Question(7,'RECOMENDACIONES : Indicar propuestas conforme a TREES', ['Continuar'], 'Texto2',[8,8])
    let question8 = new Question(8,'Considerando el tiempo usado, ¿Cómo evalúas?', ['Insuficiente','Suficiente','Bueno','Muy Bueno'],'Boton',[9,9,9,9])
    let question9 = new Question(9,'¡¡Hemos Terminado!! Gracias por tu compromiso con la Seguridad Operacional', ['Finalizar'],'Boton',[-1])
    q.addQuestion(question0)
    q.addQuestion(question1)
    q.addQuestion(question2)
    q.addQuestion(question3)
    q.addQuestion(question4)
    q.addQuestion(question5)
    q.addQuestion(question6)
    q.addQuestion(question7)
    q.addQuestion(question8)
    q.addQuestion(question9)
}

function seeFirstQuestion() {
    console.log("seeFirstQuestion")
    hiddenAllScreens()
    elQuestionScreen.classList.remove("hidden")
    elQuestionScreen.style.display = "block"
    ipo.showCurrentQuestion(0)
}

function saveUser(){
    user = new User(document.getElementById("userInput").value)
    console.log(user)
    seeFirstQuestion()
}

function restartIpo(){
    ipo.counter = 0
    document.getElementById("userInput").value = ""
    hiddenAllScreens()
    elWelcomeScr.classList.remove("hidden")
    elOptionScreen.classList.remove("hidden")
}

function displayTable(){
    let tbody = document.getElementById("tbody")
    tbody.textContent = ''
    registers.forEach( (user) => {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let nombre = document.createTextNode(user.name)
        let ans = ""
        td.appendChild(nombre)
        tr.appendChild(td)
        user.answers.forEach( (answer) => {
            td = document.createElement("td")
            ans = document.createTextNode(answer)
            td.appendChild(ans)
            tr.appendChild(td)
        })
        tbody.appendChild(tr)
    })
}

function viewData(){
    hiddenAllScreens()
    elRestartScreen.classList.remove("hidden")
    elTableScreen.classList.remove("hidden")
    displayTable()
}

hiddenAllScreens()
elWelcomeScr.classList.remove("hidden")

let ipo = new Ipo()
addQuestions(ipo)

let elWelcomeBtn = document.getElementById("welcome_btn")
elWelcomeBtn.addEventListener("click", saveUser)

let elRestartBtn = document.getElementById("restart_btn")
elRestartBtn.addEventListener("click", restartIpo)

let elDataBtn = document.getElementById("data_btn")
elDataBtn.addEventListener("click", viewData)
