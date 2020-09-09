const contnr = document.querySelector('#container')
let ws = new WebSocket('wss://ws.jdedev.fr:8124/')

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = { tmpLogin: "" }
    }

    chgStatus() {
        if (this.props.state == false && this.state.tmpLogin != "") {
            this.props.changeConn(true)
            this.props.changeLogin(this.state.tmpLogin)
            this.props.changeConns(this.state.tmpLogin)
            ws.send(JSON.stringify({
                type: "",
                typeTrame: "user",
                nom: this.state.tmpLogin,
                id: ""
            }))
        }
        else if (this.props.state && this.props.login != "") {
            this.props.changeConn(false)
            this.props.changeLogin("")
            ws.send(JSON.stringify({
                type: "",
                typeTrame: "logOut",
                nom: this.state.tmpLogin,
                id: ""
            }))
            this.setState({ tmpLogin: "" })
        }
    }

    chgName(e) {
        this.setState({ tmpLogin: e.target.value })
    }

    chgLogged() {
        if (this.props.state) {
            return (
                <div id="navMenu">
                    <p id="loginOn">Bonjour, {this.props.login}</p>
                    <button onClick={this.chgStatus.bind(this)}>Se deconnecter</button>
                </div>
            )
        }
        else {
            return (
                <div id="navMenu">
                    <input type="text" name="inpLogin" id="inpLogin" placeholder="Login..." onChange={this.chgName.bind(this)} />
                    <button onClick={this.chgStatus.bind(this)}>Se connecter</button>
                </div>
            )
        }

    }

    render() {
        return (
            <header id="mainHead">
                <nav id="mainNav">
                    <h1 id="logo">Cara<span>mail</span></h1>
                    {this.chgLogged()}
                </nav>
            </header>
        )
    }
}

class LoggedOn extends React.Component {
    constructor(props) {
        super(props)
    }

    affUser() {
        if (this.props.state) {
            for (let i = 0; i < this.props.connecteds.length; i++) {
                return (
                    <div id="loggedIn">
                        <p>{this.props.connecteds[i].user}</p>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div id="usersOn">
                <h2>Connectés</h2>
                {this.affUser()}
            </div>
        )
    }
}

class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { tmpvalue: "" }
    }

    sendToMsg() {
        if (this.state.tmpvalue != "" && this.props.state) {
            this.props.chgMsg(this.state.tmpvalue)
            this.setState({ tmpvalue: "" })
        }
    }

    changeTmpValue(e) {
        this.setState({ tmpvalue: e.target.value })
    }

    render() {
        return (
            <div id="prompt">
                <div id="mainScreen">
                    <React.Fragment>
                        {this.props.msg.map((elem, key) => {
                            return (
                                <div key={key} id="msgUser">
                                    <p className="auteur">{elem.auteur} :</p>
                                    <p className="message">{elem.text.split("\n").map((item, key) => <React.Fragment key={key}>{item} <br /></React.Fragment>)}</p>
                                </div>
                            )
                        })}
                    </React.Fragment>
                </div>
                <div id="inputTxt">
                    <textarea id="userMsg" placeholder="Votre message..." onChange={this.changeTmpValue.bind(this)} value={this.state.tmpvalue}></textarea>
                    <button id="sndMsg" onClick={this.sendToMsg.bind(this)}>Envoyer</button>
                </div>
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        return (
            <footer id="mainFoot">
                <p>Copyright Effes 2020</p>
            </footer>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { connected: false, Login: "", msg: [], conns: [] }
        this.checkConn = this.checkConn.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
        this.chgMsg = this.chgMsg.bind(this)
        this.chgConns = this.chgConns.bind(this)
    }

    componentDidMount() {
        ws.onopen = () => {
            console.log('WS connected')
        }

        ws.onmessage = (message) => {
            const rep = JSON.parse(message.data)
            if (rep.typeTrame === "user") {
                if (rep.nom != "") {
                    this.chgConns(rep.nom)
                }
                console.log(rep.nom)
            }
        }

    }

    componentDidUpdate() {
        console.log('app updated')
    }

    chgConns(elem) {
        let tmpTab = this.state.conns
        tmpTab.push({ user: elem })
        this.setState({ conns: [...tmpTab] })
    }

    chgMsg(elem) {
        let tmpTab = this.state.msg
        tmpTab.push({ text: elem, auteur: this.state.Login })
        this.setState({ msg: [...tmpTab] })
    }

    checkConn(conn) {
        this.setState({ connected: conn })
    }

    checkLogin(login) {
        this.setState({ Login: login })
    }

    render() {
        return (
            <React.Fragment>
                <Header changeConn={this.checkConn} changeLogin={this.checkLogin} changeConns={this.chgConns} state={this.state.connected} login={this.state.Login} />
                <div id="mainSection">
                    <MainScreen state={this.state.connected} msg={this.state.msg} chgMsg={this.chgMsg} />
                    <LoggedOn state={this.state.connected} connecteds={this.state.conns} />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
    contnr
)