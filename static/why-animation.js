function logoTargetAnim(tgDoc) {
    anime.createTimeline({
        defaults: {
            ease: anime.spring({ bounce: .35 }),
            duration: 1000,
        }
    })
    .add(tgDoc.querySelector('#telegram-logo-target'), {
        rotate: 0,
        onCompleted: fernschreiberToFerniegramAnim
    }, 0)
    .add([...tgDoc.querySelectorAll('#linear-gradient stop')], {
        'stop-color': (el, i) => {
            return i === 0 ? '#2AABEE' : '#229ED9';
        }
    }, 0);
}

function setupWhyAnimation() {
    const tgDoc = document.querySelector('#telegram-logo').contentDocument;
    var telegramOldLogoElements = tgDoc.querySelectorAll('#telegram-logo, #telegram-logo-inner1, #telegram-logo-inner2');

    anime.animate([...telegramOldLogoElements], {
        ease: 'inOutExpo',
        duration: 500,
        delay: 1000,
        rotate: -70,
        onComplete: () => {
            telegramOldLogoElements.forEach(el => el.remove())
            logoTargetAnim(tgDoc);
        },
        autoplay: anime.onScroll({container: 'body'})
    });
}

function fernschreiberToFerniegramAnim() {
    const doc = document.querySelector('#fernschreiber-to-ferniegram-logo').contentDocument;

    // for some reason, you can't pass doc.querySelectorAll(whatever) as a target
    // and need to do [...doc.querySelectorAll(whatever)]

    const tl = anime.createTimeline({
        defaults: {
            ease: 'in',//anime.spring({ bounce: .35 }),
            duration: 1000,
        },
        delay: 1000
    });

    tl
    .add([...doc.querySelectorAll('#linearGradient30 stop')], {
        'stop-color': (el, i) =>
            ['#214fec', '#459ce7', '#45c9e7'][i]
    }, 0)
    .add(doc.querySelector('#linearGradient30'), {
        // TODO
        /*keyframes: [
            {x1: 0},
            {x1: 1},
            //{x1: 0},
        ]*/
        //x1: '1'
    }, 0)
    .add(doc.querySelector('#inner-background'), {
        'fill': '#00d5ff'
    }, 0);
    //.add([...doc.querySelectorAll('.middle-dot')], middleDotAnimation, 0)

    var delay = 0;
    for (const x of ['1, 2', 3, 4, 5, 6, '7, 8']) {
        delay += 50;
        var elements = [...doc.querySelectorAll(('' + x).split(', ').map(x => '#mdot' + x).join(', '))];
        tl.add(elements, {fill: '#0084ff'}, delay);
    }

    delay = 0;
    for (const x of ['15', '11, 25', '12, 14, 35', '21, 22, 24', '32, 34', '31, 42, 13']) {
        delay += 50;
        var elements = [...doc.querySelectorAll(x.split(', ').map(x => '#dot' + x).join(', '))];
        tl.add(elements, {
            keyframes: {
                '50%': {fill: '#0084ff'},
                '100%': {fill: '#fffee3'},
            }
        }, delay);
    }
}