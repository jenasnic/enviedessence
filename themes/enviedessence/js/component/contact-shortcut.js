import CircleType from 'circletype';

const initShortcutContact = () => {
    const top = new CircleType(document.querySelector('#contact-shortcut .text-top'));
    top
        .radius(42)
        .forceWidth(true)
        .forceHeight(true)
    ;

    const bottom = new CircleType(document.querySelector('#contact-shortcut .text-bottom'));
    bottom
        .dir(-1)
        .radius(40)
        .forceWidth(true)
        .forceHeight(true)
    ;

    document.getElementById('contact-shortcut').classList.add('initialized');
};

document.getElementById('contact-shortcut') && initShortcutContact();
