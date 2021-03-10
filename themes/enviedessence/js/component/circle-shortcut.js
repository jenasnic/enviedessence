import CircleType from 'circletype';

const initShortcutContact = () => {
    const top = new CircleType(document.querySelector('#circle-shortcut .text-top'));
    top
        .radius(42)
        .forceWidth(true)
        .forceHeight(true)
    ;

    const bottom = new CircleType(document.querySelector('#circle-shortcut .text-bottom'));
    bottom
        .dir(-1)
        .radius(40)
        .forceWidth(true)
        .forceHeight(true)
    ;

    document.getElementById('circle-shortcut').classList.add('initialized');
};

document.getElementById('circle-shortcut') && initShortcutContact();
