import { getScreenSize, getMousePos, setMouseDelay, typeString, moveMouse, mouseClick, keyTap } from '@jitsi/robotjs';
import { Config } from './config';

let screenSize = getScreenSize();
let mousePos = getMousePos();
let defaultSensitivity: number;

export function initRobot(config: Config) {
    setMouseDelay(1);
    defaultSensitivity = config.defaultSensitivity;
    updateScreenSize();
}

export function updateScreenSize() {
    screenSize = getScreenSize();
}

export const changeSensitivity = (value: number) => {
    setMouseDelay(value);
    defaultSensitivity *= value;
    console.log('Mouse delay set to: ' + value);
};

export const keyboardType = (value: string) => {
    typeString(value);
    console.log('Keyboard Typing: ' + value);
};

export function moveCursor(x: number, y: number) {
    const { x: newX, y: newY } = checkScreenBoundaries(x, y);
    mousePos = getMousePos();
    console.log(`Mouse Motion (${newX},${newY})`);
    moveMouse(mousePos.x + newX, mousePos.y + newY);
    console.log('Cursor moved to: ' + mousePos.x + ', ' + mousePos.y);
}

export function centerCursor() {
    moveMouse(screenSize.width / 2, screenSize.height / 2);
}

export function rightClick() {
    mouseClick('right');
}

export function leftClick() {
    mouseClick('left');
}

export function performShortcut(shortcut: string) {
    switch (shortcut) {
        case 'next_slide':
            keyTap('right');
            break;
        case 'previous_slide':
            keyTap('left');
            break;
        case 'start_presentation':
            keyTap('f5');
            break;
        case 'end_presentation':
            keyTap('esc');
            break;
        default:
            console.log('Unknown shortcut:', shortcut);
    }
}

function checkScreenBoundaries(x: number, y: number): { x: number; y: number } {
    const currentPos = getMousePos();
    
    let newX = Math.max(0, Math.min(screenSize.width, currentPos.x + x));
    let newY = Math.max(0, Math.min(screenSize.height, currentPos.y + y));
    
    return { x: newX - currentPos.x, y: newY - currentPos.y };
}