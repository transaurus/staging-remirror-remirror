import type { Shape } from '@remirror/core-types';

/**
 * The callback function signature for the `eachEvent` which is available when
 * `batch` is true.
 */
declare type BatchedCallback = (action: BatchedKeyboardAction, index: number, actions: BatchedKeyboardAction[]) => void;
export { BatchedCallback }
export { BatchedCallback as BatchedCallback_alias_1 }

declare interface BatchedKeyboardAction {
    /**
     * When called will dispatched the stored event.
     */
    dispatch: () => void;
    /**
     * The event that will be dispatched.
     */
    event: KeyboardEvent;
    /**
     * The type of the event.
     */
    type: KeyboardEventName;
}
export { BatchedKeyboardAction }
export { BatchedKeyboardAction as BatchedKeyboardAction_alias_1 }

/**
 * Removes the shiftKey property from the keyboard layout spec
 *
 * @param key
 */
declare function cleanKey(key: SupportedCharacters): Omit<KeyDefinition, 'shiftKey'>;
export { cleanKey }
export { cleanKey as cleanKey_alias_1 }

/**
 * Creates a keyboard event which can be dispatched into the DOM
 *
 * @param type
 * @param options
 */
declare function createKeyboardEvent(type: KeyboardEventName, options: KeyboardEventInit & Shape): KeyboardEvent;
export { createKeyboardEvent }
export { createKeyboardEvent as createKeyboardEvent_alias_1 }

/**
 * Returns an info object detailing which modifier keys are currently active
 *
 * @param props
 */
declare function getModifierInformation(props: GetModifierInformationProps): ModifierInformation;
export { getModifierInformation }
export { getModifierInformation as getModifierInformation_alias_1 }

declare interface GetModifierInformationProps {
    /**
     * The modifier keys passed in
     */
    modifiers: string[];
    /**
     * Whether to treat this as a mac
     *
     * @defaultValue false
     */
    isMac?: boolean;
}

declare interface IsTypingProps {
    /** Indicates whether the text input is part of a typing sequence (i.e. into an editor)
     * This can change a few semantics.
     *
     * e.g. Pressing enter by default fires: `keydown` , `keyup` however when pressed in a text editor
     * it fires:  `keydown` , `keypress`, `keyup`
     */
    typing: boolean;
}
export { IsTypingProps }
export { IsTypingProps as IsTypingProps_alias_1 }

/**
 * Predicate for checking if the passed char is a supported character for the US
 * Keyboard
 *
 * @param char
 */
declare function isUSKeyboardCharacter(char: unknown): char is SupportedCharacters;
export { isUSKeyboardCharacter }
export { isUSKeyboardCharacter as isUSKeyboardCharacter_alias_1 }

declare class Keyboard {
    static create(props: KeyboardConstructorProps): Keyboard;
    static get defaultOptions(): KeyboardEventInit;
    status: 'started' | 'ended' | 'idle';
    private readonly target;
    private readonly defaultOptions;
    private readonly isMac;
    private readonly batch;
    private readonly onEventDispatch?;
    private actions;
    private get started();
    constructor({ target, defaultOptions, isMac, batch, onEventDispatch, }: KeyboardConstructorProps);
    /**
     * Starts the fake timers and sets the keyboard status to 'started'
     */
    start(): this;
    /**
     * Ends the fake timers and sets the keyboard status to 'ended'
     */
    end(): this;
    /**
     * When batched is true the user can run through each event and fire as they
     * please.
     */
    forEach(fn: BatchedCallback): this;
    /**
     * Runs all the batched events.
     */
    private runBatchedEvents;
    /**
     * Like `this.char` but only supports US Keyboard Characters. This is mainly a
     * utility for TypeScript and autocomplete support when typing characters.
     *
     * @param props - see {@link TextInputProps}
     */
    usChar({ text, options, typing }: TextInputProps<SupportedCharacters>): this;
    /**
     * Dispatches an event for a keyboard character
     *
     * @param props - see {@link TextInputProps}
     */
    char({ text, options, typing }: TextInputProps): this;
    /**
     * Triggers a keydown event with provided options
     *
     * @param props - see {@link OptionsProps}
     */
    keyDown: ({ options }: OptionsProps) => this;
    /**
     * Trigger a keypress event with the provided options
     *
     * @param props - see {@link OptionsProps}
     */
    keyPress: ({ options }: OptionsProps) => this;
    /**
     * Trigger a keyup event with the provided options
     *
     * @param props - see {@link OptionsProps}
     */
    keyUp: ({ options }: OptionsProps) => this;
    /**
     * Breaks a string into single characters and fires a keyboard into the target
     * node
     *
     * @param props - see {@link TypingInputProps}
     */
    type({ text, options }: TypingInputProps): this;
    /**
     * Enables typing modifier commands
     *
     * ```ts
     * const editor = document.getElementById('editor');
     * const keyboard = new Keyboard({ target: editor });
     * keyboard
     *   .mod({text: 'Shift-Meta-A'})
     *   .end();
     * ```
     *
     * @param props - see {@link TextInputProps}
     */
    mod({ text, options }: TextInputProps): this;
    /**
     * Fires events where valid.
     *
     * @param options - see {@link OptionsWithTypingProps}
     */
    private fireAllEvents;
    /**
     * Fires all modifier events
     *
     * @param info - the modifier information for the keys see
     * {@link ModifierInformation}
     * @param type - the keyboard event type
     *
     */
    private fireModifierEvents;
    /**
     * Dispatches the action or adds it to the queue when batching is enabled.
     *
     * @param type - the keyboard event name
     * @param options - options passed to the keyboard event. See
     * {@link KeyboardEventInit}
     */
    private dispatchEvent;
}
export { Keyboard }
export { Keyboard as Keyboard_alias_1 }

declare interface KeyboardConstructorProps {
    /**
     * The target of our events
     */
    target: Element;
    /**
     * The default properties to extend all events with
     */
    defaultOptions?: KeyboardEventInit;
    /**
     * Whether to simulate a mac
     */
    isMac?: boolean;
    /**
     * Whether to wait until end is called before running all accumulated actions
     */
    batch?: boolean;
    /**
     * Whenever an event is dispatched this is run
     */
    onEventDispatch?: (event: KeyboardEvent) => void;
}
export { KeyboardConstructorProps }
export { KeyboardConstructorProps as KeyboardConstructorProps_alias_1 }

/**
 * The supported keyboard events
 */
declare type KeyboardEventName = 'keydown' | 'keyup' | 'keypress';
export { KeyboardEventName }
export { KeyboardEventName as KeyboardEventName_alias_1 }

declare interface KeyDefinition {
    keyCode?: number;
    code?: string;
    shiftKey?: string;
    shiftKeyCode?: number;
    key: string;
    location?: number;
    text?: string;
}
export { KeyDefinition }
export { KeyDefinition as KeyDefinition_alias_1 }

/**
 * The modifier keys currently active
 */
declare interface ModifierInformation {
    /**
     * Whether the `Shift` key is active
     */
    shiftKey: boolean;
    /**
     * Whether the `Meta` key is active
     */
    metaKey: boolean;
    /**
     * Whether the `Control` key is active
     */
    ctrlKey: boolean;
    /**
     * Whether the `Alt` key is active
     */
    altKey: boolean;
}
export { ModifierInformation }
export { ModifierInformation as ModifierInformation_alias_1 }

declare const noKeyPress: string[];
export { noKeyPress }
export { noKeyPress as noKeyPress_alias_1 }

declare const noKeyUp: string[];
export { noKeyUp }
export { noKeyUp as noKeyUp_alias_1 }

declare interface OptionsProps {
    /**
     * Additional options that can be passed into the generated keyboard event.
     */
    options: KeyboardEventInit;
}
export { OptionsProps }
export { OptionsProps as OptionsProps_alias_1 }

declare interface OptionsWithTypingProps extends OptionsProps, Partial<IsTypingProps> {
}
export { OptionsWithTypingProps }
export { OptionsWithTypingProps as OptionsWithTypingProps_alias_1 }

/**
 * See
 * {@link https://github.com/GoogleChrome/puppeteer/blob/07febb637c78cd59e22a15166f816d838a36e614/lib/USKeyboardLayout.js}
 */
declare const rawUSKeyboardLayout: {
    '0': {
        keyCode: number;
        key: string;
        code: string;
    };
    '1': {
        keyCode: number;
        key: string;
        code: string;
    };
    '2': {
        keyCode: number;
        key: string;
        code: string;
    };
    '3': {
        keyCode: number;
        key: string;
        code: string;
    };
    '4': {
        keyCode: number;
        key: string;
        code: string;
    };
    '5': {
        keyCode: number;
        key: string;
        code: string;
    };
    '6': {
        keyCode: number;
        key: string;
        code: string;
    };
    '7': {
        keyCode: number;
        key: string;
        code: string;
    };
    '8': {
        keyCode: number;
        key: string;
        code: string;
    };
    '9': {
        keyCode: number;
        key: string;
        code: string;
    };
    Power: {
        key: string;
        code: string;
    };
    Eject: {
        key: string;
        code: string;
    };
    Abort: {
        keyCode: number;
        code: string;
        key: string;
    };
    Help: {
        keyCode: number;
        code: string;
        key: string;
    };
    Backspace: {
        keyCode: number;
        code: string;
        key: string;
    };
    Tab: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad5: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    NumpadEnter: {
        keyCode: number;
        code: string;
        key: string;
        text: string;
        location: number;
    };
    Enter: {
        keyCode: number;
        code: string;
        key: string;
        text: string;
    };
    '\r': {
        keyCode: number;
        code: string;
        key: string;
        text: string;
    };
    '\n': {
        keyCode: number;
        code: string;
        key: string;
        text: string;
    };
    ShiftLeft: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    ShiftRight: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    ControlLeft: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    ControlRight: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    AltLeft: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    AltRight: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    Pause: {
        keyCode: number;
        code: string;
        key: string;
    };
    CapsLock: {
        keyCode: number;
        code: string;
        key: string;
    };
    Escape: {
        keyCode: number;
        code: string;
        key: string;
    };
    Convert: {
        keyCode: number;
        code: string;
        key: string;
    };
    NonConvert: {
        keyCode: number;
        code: string;
        key: string;
    };
    Space: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad9: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    PageUp: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad3: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    PageDown: {
        keyCode: number;
        code: string;
        key: string;
    };
    End: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad1: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    Home: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad7: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    ArrowLeft: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad4: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    Numpad8: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    ArrowUp: {
        keyCode: number;
        code: string;
        key: string;
    };
    ArrowRight: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad6: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    Numpad2: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    ArrowDown: {
        keyCode: number;
        code: string;
        key: string;
    };
    Select: {
        keyCode: number;
        code: string;
        key: string;
    };
    Open: {
        keyCode: number;
        code: string;
        key: string;
    };
    PrintScreen: {
        keyCode: number;
        code: string;
        key: string;
    };
    Insert: {
        keyCode: number;
        code: string;
        key: string;
    };
    Numpad0: {
        keyCode: number;
        shiftKeyCode: number;
        key: string;
        code: string;
        shiftKey: string;
        location: number;
    };
    Delete: {
        keyCode: number;
        code: string;
        key: string;
    };
    NumpadDecimal: {
        keyCode: number;
        shiftKeyCode: number;
        code: string;
        key: string;
        shiftKey: string;
        location: number;
    };
    Digit0: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit1: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit2: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit3: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit4: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit5: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit6: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit7: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit8: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Digit9: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyA: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyB: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyC: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyD: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyE: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyF: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyG: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyH: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyI: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyJ: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyK: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyL: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyM: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyN: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyO: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyP: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyQ: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyR: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyS: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyT: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyU: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyV: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyW: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyX: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyY: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    KeyZ: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    MetaLeft: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    MetaRight: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    ContextMenu: {
        keyCode: number;
        code: string;
        key: string;
    };
    NumpadMultiply: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    NumpadAdd: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    NumpadSubtract: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    NumpadDivide: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    F1: {
        keyCode: number;
        code: string;
        key: string;
    };
    F2: {
        keyCode: number;
        code: string;
        key: string;
    };
    F3: {
        keyCode: number;
        code: string;
        key: string;
    };
    F4: {
        keyCode: number;
        code: string;
        key: string;
    };
    F5: {
        keyCode: number;
        code: string;
        key: string;
    };
    F6: {
        keyCode: number;
        code: string;
        key: string;
    };
    F7: {
        keyCode: number;
        code: string;
        key: string;
    };
    F8: {
        keyCode: number;
        code: string;
        key: string;
    };
    F9: {
        keyCode: number;
        code: string;
        key: string;
    };
    F10: {
        keyCode: number;
        code: string;
        key: string;
    };
    F11: {
        keyCode: number;
        code: string;
        key: string;
    };
    F12: {
        keyCode: number;
        code: string;
        key: string;
    };
    F13: {
        keyCode: number;
        code: string;
        key: string;
    };
    F14: {
        keyCode: number;
        code: string;
        key: string;
    };
    F15: {
        keyCode: number;
        code: string;
        key: string;
    };
    F16: {
        keyCode: number;
        code: string;
        key: string;
    };
    F17: {
        keyCode: number;
        code: string;
        key: string;
    };
    F18: {
        keyCode: number;
        code: string;
        key: string;
    };
    F19: {
        keyCode: number;
        code: string;
        key: string;
    };
    F20: {
        keyCode: number;
        code: string;
        key: string;
    };
    F21: {
        keyCode: number;
        code: string;
        key: string;
    };
    F22: {
        keyCode: number;
        code: string;
        key: string;
    };
    F23: {
        keyCode: number;
        code: string;
        key: string;
    };
    F24: {
        keyCode: number;
        code: string;
        key: string;
    };
    NumLock: {
        keyCode: number;
        code: string;
        key: string;
    };
    ScrollLock: {
        keyCode: number;
        code: string;
        key: string;
    };
    AudioVolumeMute: {
        keyCode: number;
        code: string;
        key: string;
    };
    AudioVolumeDown: {
        keyCode: number;
        code: string;
        key: string;
    };
    AudioVolumeUp: {
        keyCode: number;
        code: string;
        key: string;
    };
    MediaTrackNext: {
        keyCode: number;
        code: string;
        key: string;
    };
    MediaTrackPrevious: {
        keyCode: number;
        code: string;
        key: string;
    };
    MediaStop: {
        keyCode: number;
        code: string;
        key: string;
    };
    MediaPlayPause: {
        keyCode: number;
        code: string;
        key: string;
    };
    Semicolon: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Equal: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    NumpadEqual: {
        keyCode: number;
        code: string;
        key: string;
        location: number;
    };
    Comma: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Minus: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Period: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Slash: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Backquote: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    BracketLeft: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Backslash: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    BracketRight: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    Quote: {
        keyCode: number;
        code: string;
        shiftKey: string;
        key: string;
    };
    AltGraph: {
        keyCode: number;
        code: string;
        key: string;
    };
    Props: {
        keyCode: number;
        code: string;
        key: string;
    };
    Cancel: {
        keyCode: number;
        key: string;
        code: string;
    };
    Clear: {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    Shift: {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    Control: {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    Alt: {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    Accept: {
        keyCode: number;
        key: string;
    };
    ModeChange: {
        keyCode: number;
        key: string;
    };
    ' ': {
        keyCode: number;
        key: string;
        code: string;
    };
    Print: {
        keyCode: number;
        key: string;
    };
    Execute: {
        keyCode: number;
        key: string;
        code: string;
    };
    '\0': {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    a: {
        keyCode: number;
        key: string;
        code: string;
    };
    b: {
        keyCode: number;
        key: string;
        code: string;
    };
    c: {
        keyCode: number;
        key: string;
        code: string;
    };
    d: {
        keyCode: number;
        key: string;
        code: string;
    };
    e: {
        keyCode: number;
        key: string;
        code: string;
    };
    f: {
        keyCode: number;
        key: string;
        code: string;
    };
    g: {
        keyCode: number;
        key: string;
        code: string;
    };
    h: {
        keyCode: number;
        key: string;
        code: string;
    };
    i: {
        keyCode: number;
        key: string;
        code: string;
    };
    j: {
        keyCode: number;
        key: string;
        code: string;
    };
    k: {
        keyCode: number;
        key: string;
        code: string;
    };
    l: {
        keyCode: number;
        key: string;
        code: string;
    };
    m: {
        keyCode: number;
        key: string;
        code: string;
    };
    n: {
        keyCode: number;
        key: string;
        code: string;
    };
    o: {
        keyCode: number;
        key: string;
        code: string;
    };
    p: {
        keyCode: number;
        key: string;
        code: string;
    };
    q: {
        keyCode: number;
        key: string;
        code: string;
    };
    r: {
        keyCode: number;
        key: string;
        code: string;
    };
    s: {
        keyCode: number;
        key: string;
        code: string;
    };
    t: {
        keyCode: number;
        key: string;
        code: string;
    };
    u: {
        keyCode: number;
        key: string;
        code: string;
    };
    v: {
        keyCode: number;
        key: string;
        code: string;
    };
    w: {
        keyCode: number;
        key: string;
        code: string;
    };
    x: {
        keyCode: number;
        key: string;
        code: string;
    };
    y: {
        keyCode: number;
        key: string;
        code: string;
    };
    z: {
        keyCode: number;
        key: string;
        code: string;
    };
    Meta: {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    '*': {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    '+': {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    '-': {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    '/': {
        keyCode: number;
        key: string;
        code: string;
        location: number;
    };
    ';': {
        keyCode: number;
        key: string;
        code: string;
    };
    '=': {
        keyCode: number;
        key: string;
        code: string;
    };
    ',': {
        keyCode: number;
        key: string;
        code: string;
    };
    '.': {
        keyCode: number;
        key: string;
        code: string;
    };
    '`': {
        keyCode: number;
        key: string;
        code: string;
    };
    '[': {
        keyCode: number;
        key: string;
        code: string;
    };
    '\\': {
        keyCode: number;
        key: string;
        code: string;
    };
    ']': {
        keyCode: number;
        key: string;
        code: string;
    };
    "'": {
        keyCode: number;
        key: string;
        code: string;
    };
    Attn: {
        keyCode: number;
        key: string;
    };
    CrSel: {
        keyCode: number;
        key: string;
        code: string;
    };
    ExSel: {
        keyCode: number;
        key: string;
    };
    EraseEof: {
        keyCode: number;
        key: string;
    };
    Play: {
        keyCode: number;
        key: string;
    };
    ZoomOut: {
        keyCode: number;
        key: string;
    };
    ')': {
        keyCode: number;
        key: string;
        code: string;
    };
    '!': {
        keyCode: number;
        key: string;
        code: string;
    };
    '@': {
        keyCode: number;
        key: string;
        code: string;
    };
    '#': {
        keyCode: number;
        key: string;
        code: string;
    };
    $: {
        keyCode: number;
        key: string;
        code: string;
    };
    '%': {
        keyCode: number;
        key: string;
        code: string;
    };
    '^': {
        keyCode: number;
        key: string;
        code: string;
    };
    '&': {
        keyCode: number;
        key: string;
        code: string;
    };
    '(': {
        keyCode: number;
        key: string;
        code: string;
    };
    A: {
        keyCode: number;
        key: string;
        code: string;
    };
    B: {
        keyCode: number;
        key: string;
        code: string;
    };
    C: {
        keyCode: number;
        key: string;
        code: string;
    };
    D: {
        keyCode: number;
        key: string;
        code: string;
    };
    E: {
        keyCode: number;
        key: string;
        code: string;
    };
    F: {
        keyCode: number;
        key: string;
        code: string;
    };
    G: {
        keyCode: number;
        key: string;
        code: string;
    };
    H: {
        keyCode: number;
        key: string;
        code: string;
    };
    I: {
        keyCode: number;
        key: string;
        code: string;
    };
    J: {
        keyCode: number;
        key: string;
        code: string;
    };
    K: {
        keyCode: number;
        key: string;
        code: string;
    };
    L: {
        keyCode: number;
        key: string;
        code: string;
    };
    M: {
        keyCode: number;
        key: string;
        code: string;
    };
    N: {
        keyCode: number;
        key: string;
        code: string;
    };
    O: {
        keyCode: number;
        key: string;
        code: string;
    };
    P: {
        keyCode: number;
        key: string;
        code: string;
    };
    Q: {
        keyCode: number;
        key: string;
        code: string;
    };
    R: {
        keyCode: number;
        key: string;
        code: string;
    };
    S: {
        keyCode: number;
        key: string;
        code: string;
    };
    T: {
        keyCode: number;
        key: string;
        code: string;
    };
    U: {
        keyCode: number;
        key: string;
        code: string;
    };
    V: {
        keyCode: number;
        key: string;
        code: string;
    };
    W: {
        keyCode: number;
        key: string;
        code: string;
    };
    X: {
        keyCode: number;
        key: string;
        code: string;
    };
    Y: {
        keyCode: number;
        key: string;
        code: string;
    };
    Z: {
        keyCode: number;
        key: string;
        code: string;
    };
    ':': {
        keyCode: number;
        key: string;
        code: string;
    };
    '<': {
        keyCode: number;
        key: string;
        code: string;
    };
    _: {
        keyCode: number;
        key: string;
        code: string;
    };
    '>': {
        keyCode: number;
        key: string;
        code: string;
    };
    '?': {
        keyCode: number;
        key: string;
        code: string;
    };
    '~': {
        keyCode: number;
        key: string;
        code: string;
    };
    '{': {
        keyCode: number;
        key: string;
        code: string;
    };
    '|': {
        keyCode: number;
        key: string;
        code: string;
    };
    '}': {
        keyCode: number;
        key: string;
        code: string;
    };
    '"': {
        keyCode: number;
        key: string;
        code: string;
    };
};

declare type SupportedCharacters = Extract<keyof USKeyboardLayout, string>;
export { SupportedCharacters }
export { SupportedCharacters as SupportedCharacters_alias_1 }

declare interface TextInputProps<Type extends string = string> extends Partial<OptionsProps>, Partial<IsTypingProps> {
    /**
     * The text or character being passed into the generated event
     */
    text: Type;
}
export { TextInputProps }
export { TextInputProps as TextInputProps_alias_1 }

declare type TypingInputProps = Omit<TextInputProps, 'typing'>;
export { TypingInputProps }
export { TypingInputProps as TypingInputProps_alias_1 }

declare type USKeyboardLayout = typeof rawUSKeyboardLayout;
export { USKeyboardLayout }
export { USKeyboardLayout as USKeyboardLayout_alias_1 }

declare const usKeyboardLayout: Record<SupportedCharacters, KeyDefinition>;
export { usKeyboardLayout }
export { usKeyboardLayout as usKeyboardLayout_alias_1 }

export { }
