var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contnr = document.querySelector('#container');
var ws = new WebSocket('wss://ws.jdedev.fr:8124/');

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this.state = { tmpLogin: "" };
        return _this;
    }

    _createClass(Header, [{
        key: 'chgStatus',
        value: function chgStatus() {
            if (this.props.state == false && this.state.tmpLogin != "") {
                this.props.changeConn(true);
                this.props.changeLogin(this.state.tmpLogin);
                this.props.changeConns(this.state.tmpLogin);
                ws.send(JSON.stringify({
                    type: "",
                    typeTrame: "user",
                    nom: this.state.tmpLogin,
                    id: ""
                }));
            } else if (this.props.state && this.props.login != "") {
                this.props.changeConn(false);
                this.props.changeLogin("");
                ws.send(JSON.stringify({
                    type: "",
                    typeTrame: "logOut",
                    nom: this.state.tmpLogin,
                    id: ""
                }));
                this.setState({ tmpLogin: "" });
            }
        }
    }, {
        key: 'chgName',
        value: function chgName(e) {
            this.setState({ tmpLogin: e.target.value });
        }
    }, {
        key: 'chgLogged',
        value: function chgLogged() {
            if (this.props.state) {
                return React.createElement(
                    'div',
                    { id: 'navMenu' },
                    React.createElement(
                        'p',
                        { id: 'loginOn' },
                        'Bonjour, ',
                        this.props.login
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.chgStatus.bind(this) },
                        'Se deconnecter'
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    { id: 'navMenu' },
                    React.createElement('input', { type: 'text', name: 'inpLogin', id: 'inpLogin', placeholder: 'Login...', onChange: this.chgName.bind(this) }),
                    React.createElement(
                        'button',
                        { onClick: this.chgStatus.bind(this) },
                        'Se connecter'
                    )
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'header',
                { id: 'mainHead' },
                React.createElement(
                    'nav',
                    { id: 'mainNav' },
                    React.createElement(
                        'h1',
                        { id: 'logo' },
                        'Cara',
                        React.createElement(
                            'span',
                            null,
                            'mail'
                        )
                    ),
                    this.chgLogged()
                )
            );
        }
    }]);

    return Header;
}(React.Component);

var LoggedOn = function (_React$Component2) {
    _inherits(LoggedOn, _React$Component2);

    function LoggedOn(props) {
        _classCallCheck(this, LoggedOn);

        return _possibleConstructorReturn(this, (LoggedOn.__proto__ || Object.getPrototypeOf(LoggedOn)).call(this, props));
    }

    _createClass(LoggedOn, [{
        key: 'affUser',
        value: function affUser() {
            if (this.props.state) {
                for (var i = 0; i < this.props.connecteds.length; i++) {
                    return React.createElement(
                        'div',
                        { id: 'loggedIn' },
                        React.createElement(
                            'p',
                            null,
                            this.props.connecteds[i].user
                        )
                    );
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'usersOn' },
                React.createElement(
                    'h2',
                    null,
                    'Connect\xE9s'
                ),
                this.affUser()
            );
        }
    }]);

    return LoggedOn;
}(React.Component);

var MainScreen = function (_React$Component3) {
    _inherits(MainScreen, _React$Component3);

    function MainScreen(props) {
        _classCallCheck(this, MainScreen);

        var _this3 = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this, props));

        _this3.state = { tmpvalue: "" };
        return _this3;
    }

    _createClass(MainScreen, [{
        key: 'sendToMsg',
        value: function sendToMsg() {
            if (this.state.tmpvalue != "" && this.props.state) {
                this.props.chgMsg(this.state.tmpvalue);
                this.setState({ tmpvalue: "" });
            }
        }
    }, {
        key: 'changeTmpValue',
        value: function changeTmpValue(e) {
            this.setState({ tmpvalue: e.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { id: 'prompt' },
                React.createElement(
                    'div',
                    { id: 'mainScreen' },
                    React.createElement(
                        React.Fragment,
                        null,
                        this.props.msg.map(function (elem, key) {
                            return React.createElement(
                                'div',
                                { key: key, id: 'msgUser' },
                                React.createElement(
                                    'p',
                                    { className: 'auteur' },
                                    elem.auteur,
                                    ' :'
                                ),
                                React.createElement(
                                    'p',
                                    { className: 'message' },
                                    elem.text.split("\n").map(function (item, key) {
                                        return React.createElement(
                                            React.Fragment,
                                            { key: key },
                                            item,
                                            ' ',
                                            React.createElement('br', null)
                                        );
                                    })
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'inputTxt' },
                    React.createElement('textarea', { id: 'userMsg', placeholder: 'Votre message...', onChange: this.changeTmpValue.bind(this), value: this.state.tmpvalue }),
                    React.createElement(
                        'button',
                        { id: 'sndMsg', onClick: this.sendToMsg.bind(this) },
                        'Envoyer'
                    )
                )
            );
        }
    }]);

    return MainScreen;
}(React.Component);

var Footer = function (_React$Component4) {
    _inherits(Footer, _React$Component4);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'footer',
                { id: 'mainFoot' },
                React.createElement(
                    'p',
                    null,
                    'Copyright Effes 2020'
                )
            );
        }
    }]);

    return Footer;
}(React.Component);

var App = function (_React$Component5) {
    _inherits(App, _React$Component5);

    function App(props) {
        _classCallCheck(this, App);

        var _this5 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this5.state = { connected: false, Login: "", msg: [], conns: [] };
        _this5.checkConn = _this5.checkConn.bind(_this5);
        _this5.checkLogin = _this5.checkLogin.bind(_this5);
        _this5.chgMsg = _this5.chgMsg.bind(_this5);
        _this5.chgConns = _this5.chgConns.bind(_this5);
        return _this5;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this6 = this;

            ws.onopen = function () {
                console.log('WS connected');
            };

            ws.onmessage = function (message) {
                var rep = JSON.parse(message.data);
                if (rep.typeTrame === "user") {
                    if (rep.nom != "") {
                        _this6.chgConns(rep.nom);
                    }
                    console.log(rep.nom);
                }
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log('app updated');
        }
    }, {
        key: 'chgConns',
        value: function chgConns(elem) {
            var tmpTab = this.state.conns;
            tmpTab.push({ user: elem });
            this.setState({ conns: [].concat(_toConsumableArray(tmpTab)) });
        }
    }, {
        key: 'chgMsg',
        value: function chgMsg(elem) {
            var tmpTab = this.state.msg;
            tmpTab.push({ text: elem, auteur: this.state.Login });
            this.setState({ msg: [].concat(_toConsumableArray(tmpTab)) });
        }
    }, {
        key: 'checkConn',
        value: function checkConn(conn) {
            this.setState({ connected: conn });
        }
    }, {
        key: 'checkLogin',
        value: function checkLogin(login) {
            this.setState({ Login: login });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(Header, { changeConn: this.checkConn, changeLogin: this.checkLogin, changeConns: this.chgConns, state: this.state.connected, login: this.state.Login }),
                React.createElement(
                    'div',
                    { id: 'mainSection' },
                    React.createElement(MainScreen, { state: this.state.connected, msg: this.state.msg, chgMsg: this.chgMsg }),
                    React.createElement(LoggedOn, { state: this.state.connected, connecteds: this.state.conns })
                ),
                React.createElement(Footer, null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), contnr);