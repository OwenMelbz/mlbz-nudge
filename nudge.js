function findElements(selector) {
    return [].slice.call(document.querySelectorAll(selector))
}

function findElement(selector) {
    return document.querySelector(selector)
}

function removeElement(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function createElement(markup, targetName = 'body') {
    const targetElement = findElement(targetName)
    const newElement = document.createElement('div')

    newElement.innerHTML = markup

    targetElement.appendChild(newElement)

    return newElement
}

function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    }
}

function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className)
    }
}

function fadeOut(element, callback){
    element.style.opacity = 1;

    (function fade() {
        if ((element.style.opacity -= .1) < 0) {
            element.style.display = 'none'
            callback()
        } else {
            requestAnimationFrame(fade)
        }
    })()
}

export default function nudge (message) {
    let config = {
        message: 'This is a nudge',
        wait: 3000, // how long to sit on the screen
        delay: 100, // how long to wait before initiating
        kill: 4500, // how long before removing the element
        noCss: false,
        debug: false
    }

    if (typeof message == 'object') {
        config = Object.assign(config, message)
    } else if (message) {
        config.message = message
    }

    const debugLog = function (message) {
        if (config.debug) {
            console.log('nudge :: ', message)
        }
    }

    debugLog(config)

    let existingNudges = findElements('.mlbz-nudge')

    if (existingNudges.length) {
        debugLog(existingNudges.length + ' already showing')

        clearTimeout(window.nudgekillSwitch)

        existingNudges.forEach(element => {
            fadeOut(element, () => removeElement(element))
        })
    }

    let css = `
        <style scoped>
            .mlbz-nudge {
                position: fixed;
                top: 50px;
                left: 50%;
                z-index: 9999999;
                min-width: 120px;
                padding: 10px 20px;
                border-radius: 25px;
                background: rgba(0, 0, 0, .7);
                text-align: center;
                -webkit-box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);
                -moz-box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);
                box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);
                pointer-events: none; }

            .mlbz-nudge span {
                color: #fff;
                font-size: 14px; }

            .mlbz-nudge.start {
                transform: translate(-50%, 100vh); }

            .mlbz-nudge.show {
                transition: all .4s ease-out;
                transform: translate(-50%, 70vh); }

            .mlbz-nudge.finish {
                transition: all .5s ease;
                transform: translate(-50%, -200px); }
        </style>
    `

    if (config.noCss) {
        css = ''
        debugLog('CSS has been disabled')
    }

    let element = createElement(`
        ${css}
        <span>${config.message}</span>
    `)

    addClass(element, 'mlbz-nudge')
    addClass(element, 'start')

    debugLog('element has been created')
    
    setTimeout(() => {
        debugLog('starting nudge')

        removeClass(element, 'start')
        addClass(element, 'show')
    }, config.delay)

    setTimeout(() => {
        debugLog('nudge idled')

        removeClass(element, 'show')
        addClass(element, 'finish')
    }, config.wait)

    window.nudgekillSwitch = setTimeout(() => {
        debugLog('nudge removed')
        findElements('.mlbz-nudge').forEach(element => removeElement(element))
        element = undefined
    }, config.kill)
}