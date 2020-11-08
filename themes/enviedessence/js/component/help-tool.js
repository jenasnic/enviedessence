import Picker from 'vanilla-picker';

const defaultColor = '#dbc07c66'; // rgba(219, 192, 7, 0.4);
const defaultFont = "'Ruthie', cursive;";

const initHelpTool = () => {
    initColorPicker();
    initFontSelector();
};

const initColorPicker = () => {
    const options = {
        parent: document.getElementById('color-picker-paint'),
        alpha: true,
        popup: true,
        onChange: changeColor,
        onDone: changeColor,
    };

    const picker = new Picker(options);
    picker.setColor(getColor());

    document.getElementById('color-picker-revert').addEventListener('click', () => {
        saveColor(defaultColor);
        picker.setColor(defaultColor);
    });
};

const initFontSelector = () => {
    [...document.querySelectorAll('.font-selector-item')].forEach((item) => {
        item.addEventListener('click', () => {
            const font = item.dataset.font;
            saveFont(font);
            document.documentElement.style.setProperty('--font-title', font);
        });
    });

    document.documentElement.style.setProperty('--font-title', getFont());
};

const changeColor = (color) => {
    saveColor(color.hex);

    const hexaColor = color.hex.substring(0, 7);
    const opacity = color.rgba[3].toFixed(2);

    let root = document.documentElement;
    root.style.setProperty('--theme-color', hexaColor);
    root.style.setProperty('--overlay-transparency', opacity);

    document.getElementById('color-picker-text').innerHTML = `${hexaColor} - ${opacity}`;
};

const saveColor = (color) => {
    localStorage.setItem('color', color);
};

const getColor = () => {
    const color = localStorage.getItem('color');

    if (null !== color) {
        return color;
    }

    return defaultColor;
};

const resetColor = () => {
    localStorage.removeItem('color');
};

const saveFont = (font) => {
    localStorage.setItem('font', font);
};

const getFont = () => {
    const font = localStorage.getItem('font');

    if (null !== font) {
        return font;
    }

    return defaultFont;
};


document.getElementById('help-tool') && initHelpTool();
