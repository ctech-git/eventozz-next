"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9569:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "react-redux"
const external_react_redux_namespaceObject = require("react-redux");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: external "redux"
const external_redux_namespaceObject = require("redux");
;// CONCATENATED MODULE: external "redux-devtools-extension"
const external_redux_devtools_extension_namespaceObject = require("redux-devtools-extension");
;// CONCATENATED MODULE: ./store.js



let store;
const initialState = {
    lastUpdate: 0,
    light: false,
    count: 0
};
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'TICK':
            return {
                ...state,
                lastUpdate: action.lastUpdate,
                light: !!action.light
            };
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            };
        case 'RESET':
            return {
                ...state,
                count: initialState.count
            };
        default:
            return state;
    }
};
function initStore(preloadedState = initialState) {
    return (0,external_redux_namespaceObject.createStore)(reducer, preloadedState, (0,external_redux_devtools_extension_namespaceObject.composeWithDevTools)((0,external_redux_namespaceObject.applyMiddleware)()));
}
const initializeStore = (preloadedState)=>{
    let _store = store ?? initStore(preloadedState);
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState
        });
        // Reset the current store
        store = undefined;
    }
    // For SSG and SSR always create a new store
    if (true) return _store;
    // Create the store once in the client
    if (!store) store = _store;
    return _store;
};
function useStore(initialState1) {
    const store1 = (0,external_react_.useMemo)(()=>initializeStore(initialState1)
    , [
        initialState1
    ]);
    return store1;
}

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/dynamic.js
var dynamic = __webpack_require__(5152);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
;// CONCATENATED MODULE: ./components/Layout/TopHeader.js




const OwlCarousel = (0,dynamic["default"])(Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 4208, 23)), {
    loadableGenerated: {
        modules: [
            "../components/Layout/TopHeader.js -> " + "react-owl-carousel3"
        ]
    }
});
const options = {
    loop: true,
    margin: 0,
    nav: false,
    mouseDrag: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayTimeout: 3100,
    autoplayHoverPause: false,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 3
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        }
    }
};
const TopHeader = ()=>{
    const { 0: newData , 1: setnewData  } = useState([]);
    const { 0: display , 1: setDisplay  } = useState(false);
    const { 0: isMounted , 1: setisMounted  } = useState(false);
    useEffect(()=>{
        setisMounted(true);
        setDisplay(true);
        setisMounted(false);
    }, []);
    useEffect(()=>{
        const getCoins = async ()=>{
            const { data  } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
            setnewData(data);
        };
        getCoins();
    }, []);
    return(/*#__PURE__*/ _jsx(_Fragment, {
        children: /*#__PURE__*/ _jsx("div", {
            className: "value-trade-area",
            children: /*#__PURE__*/ _jsx("div", {
                className: "container",
                children: /*#__PURE__*/ _jsx("div", {
                    className: "value-trade-slides",
                    children: display ? /*#__PURE__*/ _jsx(OwlCarousel, {
                        ...options,
                        children: newData && newData.length > 0 && newData.slice(0, 20).map((data)=>/*#__PURE__*/ _jsx("div", {
                                className: "single-value-trade-box",
                                children: /*#__PURE__*/ _jsxs("p", {
                                    children: [
                                        /*#__PURE__*/ _jsxs("span", {
                                            className: "crypto-name",
                                            children: [
                                                data.name,
                                                "/",
                                                data.symbol
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("span", {
                                            className: "price",
                                            children: data.current_price
                                        }),
                                        data.price_change_percentage_24h < 0 ? /*#__PURE__*/ _jsxs("span", {
                                            className: "trending down",
                                            children: [
                                                /*#__PURE__*/ _jsx("i", {
                                                    className: "fas fa-caret-down"
                                                }),
                                                " -",
                                                data.price_change_percentage_24h.toFixed(2),
                                                "%"
                                            ]
                                        }) : /*#__PURE__*/ _jsxs("span", {
                                            className: "trending up",
                                            children: [
                                                /*#__PURE__*/ _jsx("i", {
                                                    className: "fas fa-caret-up"
                                                }),
                                                " +",
                                                data.price_change_percentage_24h.toFixed(2),
                                                "%"
                                            ]
                                        })
                                    ]
                                })
                            }, data.id)
                        )
                    }) : ''
                })
            })
        })
    }));
};
/* harmony default export */ const Layout_TopHeader = ((/* unused pure expression or super */ null && (TopHeader)));

// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./context/auth.js
var auth = __webpack_require__(730);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./utils/ActiveLink.js




const ActiveLink = ({ router , children , ...props })=>{
    const child = external_react_.Children.only(children);
    let className = child.props.className || '';
    if (router.pathname === props.href && props.activeClassName) {
        className = `${className} ${props.activeClassName}`.trim();
    }
    delete props.activeClassName;
    return(/*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
        ...props,
        children: /*#__PURE__*/ external_react_default().cloneElement(child, {
            className
        })
    }));
};
/* harmony default export */ const utils_ActiveLink = ((0,router_.withRouter)(ActiveLink));

;// CONCATENATED MODULE: ./components/Layout/Navbar.js





const Navbar = ()=>{
    const authContext = (0,external_react_.useContext)(auth/* AuthContext */.V);
    const { 0: showMenu , 1: setshowMenu  } = (0,external_react_.useState)(false);
    const { userToken , logout  } = authContext;
    console.log(logout);
    // const [token, setToken] = useState(false);
    console.log(userToken);
    const toggleMenu = ()=>{
        setshowMenu(!showMenu);
    };
    // useEffect(() => {
    //   let accessToken = window.localStorage.getItem("accessToken");
    //   setToken(accessToken ? (accessToken) : (false));
    // }, []);
    (0,external_react_.useEffect)(()=>{
        let elementId = document.getElementById('navbar');
        document.addEventListener('scroll', ()=>{
            if (window.scrollY > 170) {
                elementId.classList.add('is-sticky');
            } else {
                elementId.classList.remove('is-sticky');
            }
        });
        window.scrollTo(0, 0);
    }, []);
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            id: "navbar",
            className: "navbar-area",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "raimo-responsive-nav",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "raimo-responsive-menu",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    onClick: ()=>toggleMenu()
                                    ,
                                    className: "hamburger-menu",
                                    children: showMenu ? /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "bx bx-x"
                                    }) : /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "bx bx-menu"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "logo",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                        href: "/",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                src: "/images/logo-eventozz.png",
                                                alt: "logo"
                                            })
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "responsive-others-option",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "d-flex align-items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "option-item",
                                            children: userToken ? /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                href: "/wallet",
                                                activeClassName: "active",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    className: "login-btn",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                        className: "bx bx-user"
                                                    })
                                                })
                                            }) : /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                href: "/authentication",
                                                activeClassName: "active",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    className: "login-btn",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                        className: "bx bx-log-in"
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                    className: showMenu ? 'show navbar navbar-expand-md navbar-light' : 'navbar navbar-expand-md navbar-light hide-menu',
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "container",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: "navbar-brand",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: "/images/logo-eventozz.png",
                                        alt: "logo"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "collapse navbar-collapse mean-menu",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                        className: "navbar-nav",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                className: "nav-item",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                    href: "/",
                                                    activeClassName: "active",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        className: "nav-link",
                                                        children: "Home"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                className: "nav-item megamenu",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                    href: "/buy",
                                                    activeClassName: "active",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        className: "nav-link",
                                                        children: "Eventos"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                className: "nav-item",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                    href: "/blog",
                                                    activeClassName: "active",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        className: "nav-link",
                                                        children: "Noticias"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                className: "nav-item",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                    href: "/price-details",
                                                    activeClassName: "active",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        className: "nav-link listing",
                                                        children: "Sobre N\xf3s"
                                                    })
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "others-option",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "d-flex align-items-center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "option-item",
                                                    children: userToken ? /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                        href: "/minhas-compras",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                            className: "login-btn",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                    className: "bx bx-user"
                                                                }),
                                                                " Minhas compras"
                                                            ]
                                                        })
                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                        href: "/authentication",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                            className: "login-btn",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                    className: "bx bx-log-in"
                                                                }),
                                                                " Entrar"
                                                            ]
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "option-item",
                                                    children: userToken && /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                                                        onClick: ()=>logout()
                                                        ,
                                                        className: "linkNavbar",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                            className: "login-btn",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                    className: "bx bx-log-out"
                                                                }),
                                                                "Sair"
                                                            ]
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "option-item",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(utils_ActiveLink, {
                                                        href: "/contact",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                            className: "default-btn",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                                    className: "bx bxs-chat"
                                                                }),
                                                                " Fale Conosco"
                                                            ]
                                                        })
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    }));
};
/* harmony default export */ const Layout_Navbar = (Navbar);

;// CONCATENATED MODULE: ./components/Layout/NavbarTwo.js



const NavbarTwo = ()=>{
    const { 0: showMenu , 1: setshowMenu  } = useState(false);
    const toggleMenu = ()=>{
        setshowMenu(!showMenu);
    };
    useEffect(()=>{
        let elementId = document.getElementById('navbar');
        document.addEventListener('scroll', ()=>{
            if (window.scrollY > 170) {
                elementId.classList.add('is-sticky');
            } else {
                elementId.classList.remove('is-sticky');
            }
        });
        window.scrollTo(0, 0);
    }, []);
    return(/*#__PURE__*/ _jsx(_Fragment, {
        children: /*#__PURE__*/ _jsxs("div", {
            id: "navbar",
            className: "navbar-area navbar-style-two",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "raimo-responsive-nav",
                    children: /*#__PURE__*/ _jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: "raimo-responsive-menu",
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    onClick: ()=>toggleMenu()
                                    ,
                                    className: "hamburger-menu",
                                    children: showMenu ? /*#__PURE__*/ _jsx("i", {
                                        className: "bx bx-x"
                                    }) : /*#__PURE__*/ _jsx("i", {
                                        className: "bx bx-menu"
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "logo",
                                    children: /*#__PURE__*/ _jsx(Link, {
                                        href: "/",
                                        children: /*#__PURE__*/ _jsx("a", {
                                            children: /*#__PURE__*/ _jsx("img", {
                                                src: "/images/logo.png",
                                                alt: "logo"
                                            })
                                        })
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "responsive-others-option",
                                    children: /*#__PURE__*/ _jsxs("div", {
                                        className: "d-flex align-items-center",
                                        children: [
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "option-item",
                                                children: /*#__PURE__*/ _jsx(Link, {
                                                    href: "/authentication",
                                                    activeClassName: "active",
                                                    children: /*#__PURE__*/ _jsx("a", {
                                                        className: "login-btn",
                                                        children: /*#__PURE__*/ _jsx("i", {
                                                            className: "bx bx-log-in"
                                                        })
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "option-item",
                                                children: /*#__PURE__*/ _jsxs("select", {
                                                    className: "form-select",
                                                    children: [
                                                        /*#__PURE__*/ _jsx("option", {
                                                            defaultValue: "0",
                                                            children: "English"
                                                        }),
                                                        /*#__PURE__*/ _jsx("option", {
                                                            defaultValue: "1",
                                                            children: "T\xfcrk\xe7e"
                                                        }),
                                                        /*#__PURE__*/ _jsx("option", {
                                                            defaultValue: "2",
                                                            children: "Espa\xf1ol"
                                                        }),
                                                        /*#__PURE__*/ _jsx("option", {
                                                            defaultValue: "3",
                                                            children: "한국어"
                                                        }),
                                                        /*#__PURE__*/ _jsx("option", {
                                                            defaultValue: "4",
                                                            children: "Italiano"
                                                        }),
                                                        /*#__PURE__*/ _jsx("option", {
                                                            defaultValue: "5",
                                                            children: "Polski"
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ _jsx("nav", {
                    className: showMenu ? 'show navbar navbar-expand-md navbar-light' : 'navbar navbar-expand-md navbar-light hide-menu',
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: "container",
                        children: [
                            /*#__PURE__*/ _jsx(Link, {
                                href: "/",
                                children: /*#__PURE__*/ _jsx("a", {
                                    className: "navbar-brand",
                                    children: /*#__PURE__*/ _jsx("img", {
                                        src: "/images/logo.png",
                                        alt: "logo"
                                    })
                                })
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "collapse navbar-collapse mean-menu",
                                children: [
                                    /*#__PURE__*/ _jsxs("ul", {
                                        className: "navbar-nav",
                                        children: [
                                            /*#__PURE__*/ _jsxs("li", {
                                                className: "nav-item",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Link, {
                                                        href: "/",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ _jsx("a", {
                                                            className: "dropdown-toggle nav-link",
                                                            children: "Home"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("ul", {
                                                        className: "dropdown-menu",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/",
                                                                    className: "nav-link",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                        className: "nav-link",
                                                                        children: "Home Demo - 1"
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/index-2",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                        className: "nav-link",
                                                                        children: "Home Demo - 2"
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/index-3",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                        className: "nav-link",
                                                                        children: "Home Demo - 3"
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsxs("li", {
                                                                className: "nav-item",
                                                                children: [
                                                                    /*#__PURE__*/ _jsx(Link, {
                                                                        href: "#",
                                                                        activeClassName: "active",
                                                                        children: /*#__PURE__*/ _jsx("a", {
                                                                            className: "dropdown-toggle nav-link",
                                                                            children: "Pages"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ _jsxs("ul", {
                                                                        className: "dropdown-menu",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("li", {
                                                                                className: "nav-item",
                                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                                    href: "/trade",
                                                                                    activeClassName: "active",
                                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                                        className: "nav-link",
                                                                                        children: "Trade"
                                                                                    })
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ _jsx("li", {
                                                                                className: "nav-item",
                                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                                    href: "/leadership",
                                                                                    activeClassName: "active",
                                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                                        className: "nav-link",
                                                                                        children: "Leadership Team"
                                                                                    })
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ _jsx("li", {
                                                                                className: "nav-item",
                                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                                    href: "/privacy-policy",
                                                                                    activeClassName: "active",
                                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                                        className: "nav-link",
                                                                                        children: "Privacy Policy"
                                                                                    })
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ _jsx("li", {
                                                                                className: "nav-item",
                                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                                    href: "/terms-condition",
                                                                                    activeClassName: "active",
                                                                                    children: /*#__PURE__*/ _jsx("a", {
                                                                                        className: "nav-link",
                                                                                        children: "Terms & Conditions"
                                                                                    })
                                                                                })
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("li", {
                                                className: "nav-item megamenu",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Link, {
                                                        href: "#",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ _jsx("a", {
                                                            className: "dropdown-toggle nav-link",
                                                            children: "Buy"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("ul", {
                                                        className: "dropdown-menu",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/buy",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency2.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "BTC - Bitcoin"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/buy",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency3.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "MIT - Litecoin"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/buy",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency4.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "XRP - Ripple"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/buy",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency5.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "STE - Stellar"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/cryptocurrency",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bxs-chevron-right-circle"
                                                                            }),
                                                                            "View All Coins"
                                                                        ]
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsxs("li", {
                                                className: "nav-item megamenu",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Link, {
                                                        href: "#",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ _jsx("a", {
                                                            className: "dropdown-toggle nav-link",
                                                            children: "Sell"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("ul", {
                                                        className: "dropdown-menu",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/sell",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency4.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "XRP - Ripple"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/sell",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency5.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "STE - Stellar"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/sell",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency2.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "BTC - Bitcoin"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/sell",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("img", {
                                                                                src: "/images/cryptocurrency/cryptocurrency3.png",
                                                                                alt: "image"
                                                                            }),
                                                                            "MIT - Litecoin"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/cryptocurrency",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bxs-chevron-right-circle"
                                                                            }),
                                                                            "View All Coins"
                                                                        ]
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("li", {
                                                className: "nav-item",
                                                children: /*#__PURE__*/ _jsx(Link, {
                                                    href: "/prices",
                                                    activeClassName: "active",
                                                    children: /*#__PURE__*/ _jsx("a", {
                                                        className: "nav-link",
                                                        children: "Listings"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ _jsxs("li", {
                                                className: "nav-item megamenu support",
                                                children: [
                                                    /*#__PURE__*/ _jsx(Link, {
                                                        href: "#",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ _jsx("a", {
                                                            className: "dropdown-toggle nav-link",
                                                            children: "Support"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ _jsxs("ul", {
                                                        className: "dropdown-menu",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/faq",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bx-info-circle"
                                                                            }),
                                                                            "FAQ"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/guides",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bx-book"
                                                                            }),
                                                                            "Guides"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/wallet",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bx-wallet"
                                                                            }),
                                                                            "Wallets"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/about",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bx-group"
                                                                            }),
                                                                            "About Us"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/contact",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bx-phone-call"
                                                                            }),
                                                                            "Contact Us"
                                                                        ]
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx("li", {
                                                                className: "nav-item",
                                                                children: /*#__PURE__*/ _jsx(Link, {
                                                                    href: "/affiliate",
                                                                    activeClassName: "active",
                                                                    children: /*#__PURE__*/ _jsxs("a", {
                                                                        className: "nav-link",
                                                                        children: [
                                                                            /*#__PURE__*/ _jsx("i", {
                                                                                className: "bx bx-paper-plane"
                                                                            }),
                                                                            "Affiliates"
                                                                        ]
                                                                    })
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ _jsx("li", {
                                                className: "nav-item",
                                                children: /*#__PURE__*/ _jsx(Link, {
                                                    href: "/blog",
                                                    activeClassName: "active",
                                                    children: /*#__PURE__*/ _jsx("a", {
                                                        className: "nav-link",
                                                        children: "Blog"
                                                    })
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "others-option",
                                        children: /*#__PURE__*/ _jsxs("div", {
                                            className: "d-flex align-items-center",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "option-item",
                                                    children: /*#__PURE__*/ _jsx(Link, {
                                                        href: "/authentication",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ _jsxs("a", {
                                                            className: "login-btn",
                                                            children: [
                                                                /*#__PURE__*/ _jsx("i", {
                                                                    className: "bx bx-log-in"
                                                                }),
                                                                " Login"
                                                            ]
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "option-item",
                                                    children: /*#__PURE__*/ _jsx(Link, {
                                                        href: "/contact",
                                                        className: "register-btn",
                                                        activeClassName: "active",
                                                        children: /*#__PURE__*/ _jsxs("a", {
                                                            className: "register-btn",
                                                            children: [
                                                                /*#__PURE__*/ _jsx("i", {
                                                                    className: "bx bxs-contact"
                                                                }),
                                                                " Contact"
                                                            ]
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "option-item",
                                                    children: /*#__PURE__*/ _jsxs("select", {
                                                        className: "form-select",
                                                        children: [
                                                            /*#__PURE__*/ _jsx("option", {
                                                                defaultValue: "0",
                                                                children: "English"
                                                            }),
                                                            /*#__PURE__*/ _jsx("option", {
                                                                defaultValue: "1",
                                                                children: "T\xfcrk\xe7e"
                                                            }),
                                                            /*#__PURE__*/ _jsx("option", {
                                                                defaultValue: "2",
                                                                children: "Espa\xf1ol"
                                                            }),
                                                            /*#__PURE__*/ _jsx("option", {
                                                                defaultValue: "3",
                                                                children: "한국어"
                                                            }),
                                                            /*#__PURE__*/ _jsx("option", {
                                                                defaultValue: "4",
                                                                children: "Italiano"
                                                            }),
                                                            /*#__PURE__*/ _jsx("option", {
                                                                defaultValue: "5",
                                                                children: "Polski"
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    }));
};
/* harmony default export */ const Layout_NavbarTwo = ((/* unused pure expression or super */ null && (NavbarTwo)));

// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
;// CONCATENATED MODULE: ./public/images/logo-eventozz.png
/* harmony default export */ const logo_eventozz = ({"src":"/_next/static/media/logo-eventozz.2ecd02a1.png","height":100,"width":200,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAEBAMAAABB42PDAAAALVBMVEUAppwAppwAppwAppwAppwAppwAppwAppwAppwAppwAppwAppwAppwAppwAppwxdvUdAAAAD3RSTlMAMzhBQkdKS05QU1ZYWV7Hz4qDAAAAFUlEQVR42mMAA8sVZRMZou94PwLzACjpBE1WQFKuAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./components/Layout/Footer.js




const Footer = ()=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
            className: "footer-area",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "row justify-content-center",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-lg-4 col-sm-6 col-md-6",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "single-footer-widget",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            href: "index.html",
                                            className: "d-inline-block logo",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
                                                src: logo_eventozz,
                                                alt: "logo"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "newsletter-form"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                            className: "social-links",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        href: "#",
                                                        target: "_blank",
                                                        className: "facebook",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                            className: "bx bxl-facebook"
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        href: "#",
                                                        target: "_blank",
                                                        className: "twitter",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                            className: "bx bxl-twitter"
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        href: "#",
                                                        target: "_blank",
                                                        className: "linkedin",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                            className: "bx bxl-linkedin"
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                        href: "#",
                                                        target: "_blank",
                                                        className: "instagram",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                                            className: "bx bxl-instagram"
                                                        })
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-lg-2 col-sm-6 col-md-6",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "single-footer-widget",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                            children: "Servi\xe7os"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                            className: "services-links",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/buy",
                                                        children: "Participar de Eventos"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/buy",
                                                        children: "Organizar Eventos"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-lg-3 col-sm-6 col-md-6",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "single-footer-widget pl-5",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                            children: "Links"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                            className: "quick-links",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/trade",
                                                        children: "Home"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/guides",
                                                        children: "Eventos"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/wallet",
                                                        children: "Noticias"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/faq",
                                                        children: "Sobre N\xf3s"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "col-lg-3 col-sm-6 col-md-6",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "single-footer-widget",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                            children: "Contato"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                            className: "footer-contact-info",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: "Endere\xe7o: Rua Araguia - 705 C, Novo Horizonte. Marab\xe1 - PA"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                    children: [
                                                        "E-mail: ",
                                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            href: "mailto:contato@eventozz.com",
                                                            children: "contato@eventozz.com"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                    children: [
                                                        "Whatsapp: ",
                                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            href: "https://wa.me//5594993040161",
                                                            children: "(94) 9 9304-0161"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "copyright-area",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            children: [
                                "Copyright 2021. Desenvolvido por",
                                ' ',
                                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "https://portalctech.com.br/",
                                    target: "_blank",
                                    children: "CTECH"
                                })
                            ]
                        })
                    })
                })
            ]
        })
    }));
};
/* harmony default export */ const Layout_Footer = (Footer);

;// CONCATENATED MODULE: ./components/Layout/Layout.js



//top header

//navbar


//footer



const Layout = ({ children  })=>{
    const authContext = (0,external_react_.useContext)(auth/* AuthContext */.V);
    const { checkUserToken  } = authContext;
    (0,external_react_.useEffect)(()=>{
        checkUserToken();
    }, []);
    const router = (0,router_.useRouter)();
    const { pathname  } = router;
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Eventozz"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, shrink-to-fit=no"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Ribnic - Muli-Niche eCommerce React Template"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "og:title",
                        property: "og:title",
                        content: "Ribnic - Muli-Niche eCommerce React Template"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "twitter:card",
                        content: "Ribnic - Muli-Niche eCommerce React Template"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "canonical",
                        href: "https://novis-react.envytheme.com"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Layout_Navbar, {}),
            children,
            /*#__PURE__*/ jsx_runtime_.jsx(Layout_Footer, {})
        ]
    }));
};
/* harmony default export */ const Layout_Layout = (Layout);

;// CONCATENATED MODULE: ./components/Shared/GoTop.js


const GoTop = ()=>{
    const { 0: isVisible , 1: setisVisible  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        document.addEventListener('scroll', function(e) {
            toggleVisibility();
        });
    }, []);
    const toggleVisibility = ()=>{
        if (window.pageYOffset > 300) {
            setisVisible(true);
        } else {
            setisVisible(false);
        }
    };
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: isVisible && /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "go-top active",
            onClick: ()=>scrollToTop()
            ,
            children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: "bx bx-chevron-up"
            })
        })
    }));
};
/* harmony default export */ const Shared_GoTop = (GoTop);

;// CONCATENATED MODULE: external "next-cookies"
const external_next_cookies_namespaceObject = require("next-cookies");
var external_next_cookies_default = /*#__PURE__*/__webpack_require__.n(external_next_cookies_namespaceObject);
// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__(1187);
;// CONCATENATED MODULE: ./pages/_app.js

















function App({ Component , pageProps  }) {
    const store = useStore(pageProps.initialReduxState);
    return(/*#__PURE__*/ jsx_runtime_.jsx(auth/* AuthProvider */.H, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_redux_namespaceObject.Provider, {
            store: store,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Layout_Layout, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                            ...pageProps
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(Shared_GoTop, {})
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(external_react_toastify_.ToastContainer, {
                    limit: 1
                })
            ]
        })
    }));
}
App.getInitialProps = async ({ Component , ctx  })=>{
    let pageProps = {};
    pageProps = {
        car: external_next_cookies_default()(ctx).namu_token,
        idUser: external_next_cookies_default()(ctx).business_id,
        nome: external_next_cookies_default()(ctx).namu_intro
    };
    return {
        pageProps
    };
};
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 8028:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ 4208:
/***/ ((module) => {

module.exports = require("react-owl-carousel3");

/***/ }),

/***/ 1187:
/***/ ((module) => {

module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [730,664,152,675,976], () => (__webpack_exec__(9569)));
module.exports = __webpack_exports__;

})();