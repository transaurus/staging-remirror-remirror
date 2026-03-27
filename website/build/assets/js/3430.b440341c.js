"use strict";
exports.id = 3430;
exports.ids = [3430,6604,811,9609];
exports.modules = {

/***/ 75525:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ar: () => (/* binding */ ifNotIn),
/* harmony export */   Gw: () => (/* binding */ snippetCompletion),
/* harmony export */   et: () => (/* binding */ completeFromList)
/* harmony export */ });
/* unused harmony exports CompletionContext, acceptCompletion, autocompletion, clearSnippet, closeBrackets, closeBracketsKeymap, closeCompletion, completeAnyWord, completionKeymap, completionStatus, currentCompletions, deleteBracketPair, ifIn, insertBracket, insertCompletionText, moveCompletionSelection, nextSnippetField, pickedCompletion, prevSnippetField, selectedCompletion, selectedCompletionIndex, setSelectedCompletion, snippet, snippetKeymap, startCompletion */
/* harmony import */ var _codemirror_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71380);
/* harmony import */ var _codemirror_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17628);
/* harmony import */ var _codemirror_language__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12726);




/**
An instance of this is passed to completion source functions.
*/
class CompletionContext {
    /**
    Create a new completion context. (Mostly useful for testing
    completion sources—in the editor, the extension will create
    these for you.)
    */
    constructor(
    /**
    The editor state that the completion happens in.
    */
    state, 
    /**
    The position at which the completion is happening.
    */
    pos, 
    /**
    Indicates whether completion was activated explicitly, or
    implicitly by typing. The usual way to respond to this is to
    only return completions when either there is part of a
    completable entity before the cursor, or `explicit` is true.
    */
    explicit) {
        this.state = state;
        this.pos = pos;
        this.explicit = explicit;
        /**
        @internal
        */
        this.abortListeners = [];
    }
    /**
    Get the extent, content, and (if there is a token) type of the
    token before `this.pos`.
    */
    tokenBefore(types) {
        let token = (0,_codemirror_language__WEBPACK_IMPORTED_MODULE_0__/* .syntaxTree */ .mv)(this.state).resolveInner(this.pos, -1);
        while (token && types.indexOf(token.name) < 0)
            token = token.parent;
        return token ? { from: token.from, to: this.pos,
            text: this.state.sliceDoc(token.from, this.pos),
            type: token.type } : null;
    }
    /**
    Get the match of the given expression directly before the
    cursor.
    */
    matchBefore(expr) {
        let line = this.state.doc.lineAt(this.pos);
        let start = Math.max(line.from, this.pos - 250);
        let str = line.text.slice(start - line.from, this.pos - line.from);
        let found = str.search(ensureAnchor(expr, false));
        return found < 0 ? null : { from: start + found, to: this.pos, text: str.slice(found) };
    }
    /**
    Yields true when the query has been aborted. Can be useful in
    asynchronous queries to avoid doing work that will be ignored.
    */
    get aborted() { return this.abortListeners == null; }
    /**
    Allows you to register abort handlers, which will be called when
    the query is
    [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
    */
    addEventListener(type, listener) {
        if (type == "abort" && this.abortListeners)
            this.abortListeners.push(listener);
    }
}
function toSet(chars) {
    let flat = Object.keys(chars).join("");
    let words = /\w/.test(flat);
    if (words)
        flat = flat.replace(/\w/g, "");
    return `[${words ? "\\w" : ""}${flat.replace(/[^\w\s]/g, "\\$&")}]`;
}
function prefixMatch(options) {
    let first = Object.create(null), rest = Object.create(null);
    for (let { label } of options) {
        first[label[0]] = true;
        for (let i = 1; i < label.length; i++)
            rest[label[i]] = true;
    }
    let source = toSet(first) + toSet(rest) + "*$";
    return [new RegExp("^" + source), new RegExp(source)];
}
/**
Given a a fixed array of options, return an autocompleter that
completes them.
*/
function completeFromList(list) {
    let options = list.map(o => typeof o == "string" ? { label: o } : o);
    let [validFor, match] = options.every(o => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options);
    return (context) => {
        let token = context.matchBefore(match);
        return token || context.explicit ? { from: token ? token.from : context.pos, options, validFor } : null;
    };
}
/**
Wrap the given completion source so that it will only fire when the
cursor is in a syntax node with one of the given names.
*/
function ifIn(nodes, source) {
    return (context) => {
        for (let pos = syntaxTree(context.state).resolveInner(context.pos, -1); pos; pos = pos.parent)
            if (nodes.indexOf(pos.name) > -1)
                return source(context);
        return null;
    };
}
/**
Wrap the given completion source so that it will not fire when the
cursor is in a syntax node with one of the given names.
*/
function ifNotIn(nodes, source) {
    return (context) => {
        for (let pos = (0,_codemirror_language__WEBPACK_IMPORTED_MODULE_0__/* .syntaxTree */ .mv)(context.state).resolveInner(context.pos, -1); pos; pos = pos.parent)
            if (nodes.indexOf(pos.name) > -1)
                return null;
        return source(context);
    };
}
class Option {
    constructor(completion, source, match) {
        this.completion = completion;
        this.source = source;
        this.match = match;
    }
}
function cur(state) { return state.selection.main.head; }
// Make sure the given regexp has a $ at its end and, if `start` is
// true, a ^ at its start.
function ensureAnchor(expr, start) {
    var _a;
    let { source } = expr;
    let addStart = start && source[0] != "^", addEnd = source[source.length - 1] != "$";
    if (!addStart && !addEnd)
        return expr;
    return new RegExp(`${addStart ? "^" : ""}(?:${source})${addEnd ? "$" : ""}`, (_a = expr.flags) !== null && _a !== void 0 ? _a : (expr.ignoreCase ? "i" : ""));
}
/**
This annotation is added to transactions that are produced by
picking a completion.
*/
const pickedCompletion = /*@__PURE__*/(/* unused pure expression or super */ null && (Annotation.define()));
/**
Helper function that returns a transaction spec which inserts a
completion's text in the main selection range, and any other
selection range that has the same text in front of it.
*/
function insertCompletionText(state, text, from, to) {
    return Object.assign(Object.assign({}, state.changeByRange(range => {
        if (range == state.selection.main)
            return {
                changes: { from: from, to: to, insert: text },
                range: _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .EditorSelection */ .OF.cursor(from + text.length)
            };
        let len = to - from;
        if (!range.empty ||
            len && state.sliceDoc(range.from - len, range.from) != state.sliceDoc(from, to))
            return { range };
        return {
            changes: { from: range.from - len, to: range.from, insert: text },
            range: _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .EditorSelection */ .OF.cursor(range.from - len + text.length)
        };
    })), { userEvent: "input.complete" });
}
function applyCompletion(view, option) {
    const apply = option.completion.apply || option.completion.label;
    let result = option.source;
    if (typeof apply == "string")
        view.dispatch(insertCompletionText(view.state, apply, result.from, result.to));
    else
        apply(view, option.completion, result.from, result.to);
}
const SourceCache = /*@__PURE__*/new WeakMap();
function asSource(source) {
    if (!Array.isArray(source))
        return source;
    let known = SourceCache.get(source);
    if (!known)
        SourceCache.set(source, known = completeFromList(source));
    return known;
}

// A pattern matcher for fuzzy completion matching. Create an instance
// once for a pattern, and then use that to match any number of
// completions.
class FuzzyMatcher {
    constructor(pattern) {
        this.pattern = pattern;
        this.chars = [];
        this.folded = [];
        // Buffers reused by calls to `match` to track matched character
        // positions.
        this.any = [];
        this.precise = [];
        this.byWord = [];
        for (let p = 0; p < pattern.length;) {
            let char = (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(pattern, p), size = (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)(char);
            this.chars.push(char);
            let part = pattern.slice(p, p + size), upper = part.toUpperCase();
            this.folded.push((0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(upper == part ? part.toLowerCase() : upper, 0));
            p += size;
        }
        this.astral = pattern.length != this.chars.length;
    }
    // Matches a given word (completion) against the pattern (input).
    // Will return null for no match, and otherwise an array that starts
    // with the match score, followed by any number of `from, to` pairs
    // indicating the matched parts of `word`.
    //
    // The score is a number that is more negative the worse the match
    // is. See `Penalty` above.
    match(word) {
        if (this.pattern.length == 0)
            return [0];
        if (word.length < this.pattern.length)
            return null;
        let { chars, folded, any, precise, byWord } = this;
        // For single-character queries, only match when they occur right
        // at the start
        if (chars.length == 1) {
            let first = (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(word, 0);
            return first == chars[0] ? [0, 0, (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)(first)]
                : first == folded[0] ? [-200 /* CaseFold */, 0, (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)(first)] : null;
        }
        let direct = word.indexOf(this.pattern);
        if (direct == 0)
            return [0, 0, this.pattern.length];
        let len = chars.length, anyTo = 0;
        if (direct < 0) {
            for (let i = 0, e = Math.min(word.length, 200); i < e && anyTo < len;) {
                let next = (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(word, i);
                if (next == chars[anyTo] || next == folded[anyTo])
                    any[anyTo++] = i;
                i += (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)(next);
            }
            // No match, exit immediately
            if (anyTo < len)
                return null;
        }
        // This tracks the extent of the precise (non-folded, not
        // necessarily adjacent) match
        let preciseTo = 0;
        // Tracks whether there is a match that hits only characters that
        // appear to be starting words. `byWordFolded` is set to true when
        // a case folded character is encountered in such a match
        let byWordTo = 0, byWordFolded = false;
        // If we've found a partial adjacent match, these track its state
        let adjacentTo = 0, adjacentStart = -1, adjacentEnd = -1;
        let hasLower = /[a-z]/.test(word), wordAdjacent = true;
        // Go over the option's text, scanning for the various kinds of matches
        for (let i = 0, e = Math.min(word.length, 200), prevType = 0 /* NonWord */; i < e && byWordTo < len;) {
            let next = (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(word, i);
            if (direct < 0) {
                if (preciseTo < len && next == chars[preciseTo])
                    precise[preciseTo++] = i;
                if (adjacentTo < len) {
                    if (next == chars[adjacentTo] || next == folded[adjacentTo]) {
                        if (adjacentTo == 0)
                            adjacentStart = i;
                        adjacentEnd = i + 1;
                        adjacentTo++;
                    }
                    else {
                        adjacentTo = 0;
                    }
                }
            }
            let ch, type = next < 0xff
                ? (next >= 48 && next <= 57 || next >= 97 && next <= 122 ? 2 /* Lower */ : next >= 65 && next <= 90 ? 1 /* Upper */ : 0 /* NonWord */)
                : ((ch = (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .fromCodePoint */ .MK)(next)) != ch.toLowerCase() ? 1 /* Upper */ : ch != ch.toUpperCase() ? 2 /* Lower */ : 0 /* NonWord */);
            if (!i || type == 1 /* Upper */ && hasLower || prevType == 0 /* NonWord */ && type != 0 /* NonWord */) {
                if (chars[byWordTo] == next || (folded[byWordTo] == next && (byWordFolded = true)))
                    byWord[byWordTo++] = i;
                else if (byWord.length)
                    wordAdjacent = false;
            }
            prevType = type;
            i += (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)(next);
        }
        if (byWordTo == len && byWord[0] == 0 && wordAdjacent)
            return this.result(-100 /* ByWord */ + (byWordFolded ? -200 /* CaseFold */ : 0), byWord, word);
        if (adjacentTo == len && adjacentStart == 0)
            return [-200 /* CaseFold */ - word.length, 0, adjacentEnd];
        if (direct > -1)
            return [-700 /* NotStart */ - word.length, direct, direct + this.pattern.length];
        if (adjacentTo == len)
            return [-200 /* CaseFold */ + -700 /* NotStart */ - word.length, adjacentStart, adjacentEnd];
        if (byWordTo == len)
            return this.result(-100 /* ByWord */ + (byWordFolded ? -200 /* CaseFold */ : 0) + -700 /* NotStart */ +
                (wordAdjacent ? 0 : -1100 /* Gap */), byWord, word);
        return chars.length == 2 ? null : this.result((any[0] ? -700 /* NotStart */ : 0) + -200 /* CaseFold */ + -1100 /* Gap */, any, word);
    }
    result(score, positions, word) {
        let result = [score - word.length], i = 1;
        for (let pos of positions) {
            let to = pos + (this.astral ? (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)((0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(word, pos)) : 1);
            if (i > 1 && result[i - 1] == pos)
                result[i - 1] = to;
            else {
                result[i++] = pos;
                result[i++] = to;
            }
        }
        return result;
    }
}

const completionConfig = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .Facet */ .sj.define({
    combine(configs) {
        return (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .combineConfig */ .QR)(configs, {
            activateOnTyping: true,
            override: null,
            closeOnBlur: true,
            maxRenderedOptions: 100,
            defaultKeymap: true,
            optionClass: () => "",
            aboveCursor: false,
            icons: true,
            addToOptions: []
        }, {
            defaultKeymap: (a, b) => a && b,
            closeOnBlur: (a, b) => a && b,
            icons: (a, b) => a && b,
            optionClass: (a, b) => c => joinClass(a(c), b(c)),
            addToOptions: (a, b) => a.concat(b)
        });
    }
});
function joinClass(a, b) {
    return a ? b ? a + " " + b : a : b;
}

function optionContent(config) {
    let content = config.addToOptions.slice();
    if (config.icons)
        content.push({
            render(completion) {
                let icon = document.createElement("div");
                icon.classList.add("cm-completionIcon");
                if (completion.type)
                    icon.classList.add(...completion.type.split(/\s+/g).map(cls => "cm-completionIcon-" + cls));
                icon.setAttribute("aria-hidden", "true");
                return icon;
            },
            position: 20
        });
    content.push({
        render(completion, _s, match) {
            let labelElt = document.createElement("span");
            labelElt.className = "cm-completionLabel";
            let { label } = completion, off = 0;
            for (let j = 1; j < match.length;) {
                let from = match[j++], to = match[j++];
                if (from > off)
                    labelElt.appendChild(document.createTextNode(label.slice(off, from)));
                let span = labelElt.appendChild(document.createElement("span"));
                span.appendChild(document.createTextNode(label.slice(from, to)));
                span.className = "cm-completionMatchedText";
                off = to;
            }
            if (off < label.length)
                labelElt.appendChild(document.createTextNode(label.slice(off)));
            return labelElt;
        },
        position: 50
    }, {
        render(completion) {
            if (!completion.detail)
                return null;
            let detailElt = document.createElement("span");
            detailElt.className = "cm-completionDetail";
            detailElt.textContent = completion.detail;
            return detailElt;
        },
        position: 80
    });
    return content.sort((a, b) => a.position - b.position).map(a => a.render);
}
function rangeAroundSelected(total, selected, max) {
    if (total <= max)
        return { from: 0, to: total };
    if (selected <= (total >> 1)) {
        let off = Math.floor(selected / max);
        return { from: off * max, to: (off + 1) * max };
    }
    let off = Math.floor((total - selected) / max);
    return { from: total - (off + 1) * max, to: total - off * max };
}
class CompletionTooltip {
    constructor(view, stateField) {
        this.view = view;
        this.stateField = stateField;
        this.info = null;
        this.placeInfo = {
            read: () => this.measureInfo(),
            write: (pos) => this.positionInfo(pos),
            key: this
        };
        let cState = view.state.field(stateField);
        let { options, selected } = cState.open;
        let config = view.state.facet(completionConfig);
        this.optionContent = optionContent(config);
        this.optionClass = config.optionClass;
        this.range = rangeAroundSelected(options.length, selected, config.maxRenderedOptions);
        this.dom = document.createElement("div");
        this.dom.className = "cm-tooltip-autocomplete";
        this.dom.addEventListener("mousedown", (e) => {
            for (let dom = e.target, match; dom && dom != this.dom; dom = dom.parentNode) {
                if (dom.nodeName == "LI" && (match = /-(\d+)$/.exec(dom.id)) && +match[1] < options.length) {
                    applyCompletion(view, options[+match[1]]);
                    e.preventDefault();
                    return;
                }
            }
        });
        this.list = this.dom.appendChild(this.createListBox(options, cState.id, this.range));
        this.list.addEventListener("scroll", () => {
            if (this.info)
                this.view.requestMeasure(this.placeInfo);
        });
    }
    mount() { this.updateSel(); }
    update(update) {
        if (update.state.field(this.stateField) != update.startState.field(this.stateField))
            this.updateSel();
    }
    positioned() {
        if (this.info)
            this.view.requestMeasure(this.placeInfo);
    }
    updateSel() {
        let cState = this.view.state.field(this.stateField), open = cState.open;
        if (open.selected < this.range.from || open.selected >= this.range.to) {
            this.range = rangeAroundSelected(open.options.length, open.selected, this.view.state.facet(completionConfig).maxRenderedOptions);
            this.list.remove();
            this.list = this.dom.appendChild(this.createListBox(open.options, cState.id, this.range));
            this.list.addEventListener("scroll", () => {
                if (this.info)
                    this.view.requestMeasure(this.placeInfo);
            });
        }
        if (this.updateSelectedOption(open.selected)) {
            if (this.info) {
                this.info.remove();
                this.info = null;
            }
            let { completion } = open.options[open.selected];
            let { info } = completion;
            if (!info)
                return;
            let infoResult = typeof info === 'string' ? document.createTextNode(info) : info(completion);
            if (!infoResult)
                return;
            if ('then' in infoResult) {
                infoResult.then(node => {
                    if (node && this.view.state.field(this.stateField, false) == cState)
                        this.addInfoPane(node);
                }).catch(e => (0,_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .logException */ .c_)(this.view.state, e, "completion info"));
            }
            else {
                this.addInfoPane(infoResult);
            }
        }
    }
    addInfoPane(content) {
        let dom = this.info = document.createElement("div");
        dom.className = "cm-tooltip cm-completionInfo";
        dom.appendChild(content);
        this.dom.appendChild(dom);
        this.view.requestMeasure(this.placeInfo);
    }
    updateSelectedOption(selected) {
        let set = null;
        for (let opt = this.list.firstChild, i = this.range.from; opt; opt = opt.nextSibling, i++) {
            if (i == selected) {
                if (!opt.hasAttribute("aria-selected")) {
                    opt.setAttribute("aria-selected", "true");
                    set = opt;
                }
            }
            else {
                if (opt.hasAttribute("aria-selected"))
                    opt.removeAttribute("aria-selected");
            }
        }
        if (set)
            scrollIntoView(this.list, set);
        return set;
    }
    measureInfo() {
        let sel = this.dom.querySelector("[aria-selected]");
        if (!sel || !this.info)
            return null;
        let listRect = this.dom.getBoundingClientRect();
        let infoRect = this.info.getBoundingClientRect();
        let selRect = sel.getBoundingClientRect();
        if (selRect.top > Math.min(innerHeight, listRect.bottom) - 10 || selRect.bottom < Math.max(0, listRect.top) + 10)
            return null;
        let top = Math.max(0, Math.min(selRect.top, innerHeight - infoRect.height)) - listRect.top;
        let left = this.view.textDirection == _codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .Direction */ .OP.RTL;
        let spaceLeft = listRect.left, spaceRight = innerWidth - listRect.right;
        if (left && spaceLeft < Math.min(infoRect.width, spaceRight))
            left = false;
        else if (!left && spaceRight < Math.min(infoRect.width, spaceLeft))
            left = true;
        return { top, left };
    }
    positionInfo(pos) {
        if (this.info) {
            this.info.style.top = (pos ? pos.top : -1e6) + "px";
            if (pos) {
                this.info.classList.toggle("cm-completionInfo-left", pos.left);
                this.info.classList.toggle("cm-completionInfo-right", !pos.left);
            }
        }
    }
    createListBox(options, id, range) {
        const ul = document.createElement("ul");
        ul.id = id;
        ul.setAttribute("role", "listbox");
        ul.setAttribute("aria-expanded", "true");
        ul.setAttribute("aria-label", this.view.state.phrase("Completions"));
        for (let i = range.from; i < range.to; i++) {
            let { completion, match } = options[i];
            const li = ul.appendChild(document.createElement("li"));
            li.id = id + "-" + i;
            li.setAttribute("role", "option");
            let cls = this.optionClass(completion);
            if (cls)
                li.className = cls;
            for (let source of this.optionContent) {
                let node = source(completion, this.view.state, match);
                if (node)
                    li.appendChild(node);
            }
        }
        if (range.from)
            ul.classList.add("cm-completionListIncompleteTop");
        if (range.to < options.length)
            ul.classList.add("cm-completionListIncompleteBottom");
        return ul;
    }
}
// We allocate a new function instance every time the completion
// changes to force redrawing/repositioning of the tooltip
function completionTooltip(stateField) {
    return (view) => new CompletionTooltip(view, stateField);
}
function scrollIntoView(container, element) {
    let parent = container.getBoundingClientRect();
    let self = element.getBoundingClientRect();
    if (self.top < parent.top)
        container.scrollTop -= parent.top - self.top;
    else if (self.bottom > parent.bottom)
        container.scrollTop += self.bottom - parent.bottom;
}

// Used to pick a preferred option when two options with the same
// label occur in the result.
function score(option) {
    return (option.boost || 0) * 100 + (option.apply ? 10 : 0) + (option.info ? 5 : 0) +
        (option.type ? 1 : 0);
}
function sortOptions(active, state) {
    let options = [], i = 0;
    for (let a of active)
        if (a.hasResult()) {
            if (a.result.filter === false) {
                let getMatch = a.result.getMatch;
                for (let option of a.result.options) {
                    let match = [1e9 - i++];
                    if (getMatch)
                        for (let n of getMatch(option))
                            match.push(n);
                    options.push(new Option(option, a, match));
                }
            }
            else {
                let matcher = new FuzzyMatcher(state.sliceDoc(a.from, a.to)), match;
                for (let option of a.result.options)
                    if (match = matcher.match(option.label)) {
                        if (option.boost != null)
                            match[0] += option.boost;
                        options.push(new Option(option, a, match));
                    }
            }
        }
    let result = [], prev = null;
    for (let opt of options.sort(cmpOption)) {
        if (!prev || prev.label != opt.completion.label || prev.detail != opt.completion.detail ||
            (prev.type != null && opt.completion.type != null && prev.type != opt.completion.type) ||
            prev.apply != opt.completion.apply)
            result.push(opt);
        else if (score(opt.completion) > score(prev))
            result[result.length - 1] = opt;
        prev = opt.completion;
    }
    return result;
}
class CompletionDialog {
    constructor(options, attrs, tooltip, timestamp, selected) {
        this.options = options;
        this.attrs = attrs;
        this.tooltip = tooltip;
        this.timestamp = timestamp;
        this.selected = selected;
    }
    setSelected(selected, id) {
        return selected == this.selected || selected >= this.options.length ? this
            : new CompletionDialog(this.options, makeAttrs(id, selected), this.tooltip, this.timestamp, selected);
    }
    static build(active, state, id, prev, conf) {
        let options = sortOptions(active, state);
        if (!options.length)
            return null;
        let selected = 0;
        if (prev && prev.selected) {
            let selectedValue = prev.options[prev.selected].completion;
            for (let i = 0; i < options.length; i++)
                if (options[i].completion == selectedValue) {
                    selected = i;
                    break;
                }
        }
        return new CompletionDialog(options, makeAttrs(id, selected), {
            pos: active.reduce((a, b) => b.hasResult() ? Math.min(a, b.from) : a, 1e8),
            create: completionTooltip(completionState),
            above: conf.aboveCursor,
        }, prev ? prev.timestamp : Date.now(), selected);
    }
    map(changes) {
        return new CompletionDialog(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), { pos: changes.mapPos(this.tooltip.pos) }), this.timestamp, this.selected);
    }
}
class CompletionState {
    constructor(active, id, open) {
        this.active = active;
        this.id = id;
        this.open = open;
    }
    static start() {
        return new CompletionState(none, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
    }
    update(tr) {
        let { state } = tr, conf = state.facet(completionConfig);
        let sources = conf.override ||
            state.languageDataAt("autocomplete", cur(state)).map(asSource);
        let active = sources.map(source => {
            let value = this.active.find(s => s.source == source) ||
                new ActiveSource(source, this.active.some(a => a.state != 0 /* Inactive */) ? 1 /* Pending */ : 0 /* Inactive */);
            return value.update(tr, conf);
        });
        if (active.length == this.active.length && active.every((a, i) => a == this.active[i]))
            active = this.active;
        let open = tr.selection || active.some(a => a.hasResult() && tr.changes.touchesRange(a.from, a.to)) ||
            !sameResults(active, this.active) ? CompletionDialog.build(active, state, this.id, this.open, conf)
            : this.open && tr.docChanged ? this.open.map(tr.changes) : this.open;
        if (!open && active.every(a => a.state != 1 /* Pending */) && active.some(a => a.hasResult()))
            active = active.map(a => a.hasResult() ? new ActiveSource(a.source, 0 /* Inactive */) : a);
        for (let effect of tr.effects)
            if (effect.is(setSelectedEffect))
                open = open && open.setSelected(effect.value, this.id);
        return active == this.active && open == this.open ? this : new CompletionState(active, this.id, open);
    }
    get tooltip() { return this.open ? this.open.tooltip : null; }
    get attrs() { return this.open ? this.open.attrs : baseAttrs; }
}
function sameResults(a, b) {
    if (a == b)
        return true;
    for (let iA = 0, iB = 0;;) {
        while (iA < a.length && !a[iA].hasResult)
            iA++;
        while (iB < b.length && !b[iB].hasResult)
            iB++;
        let endA = iA == a.length, endB = iB == b.length;
        if (endA || endB)
            return endA == endB;
        if (a[iA++].result != b[iB++].result)
            return false;
    }
}
const baseAttrs = {
    "aria-autocomplete": "list"
};
function makeAttrs(id, selected) {
    return {
        "aria-autocomplete": "list",
        "aria-haspopup": "listbox",
        "aria-activedescendant": id + "-" + selected,
        "aria-controls": id
    };
}
const none = [];
function cmpOption(a, b) {
    let dScore = b.match[0] - a.match[0];
    if (dScore)
        return dScore;
    return a.completion.label.localeCompare(b.completion.label);
}
function getUserEvent(tr) {
    return tr.isUserEvent("input.type") ? "input" : tr.isUserEvent("delete.backward") ? "delete" : null;
}
class ActiveSource {
    constructor(source, state, explicitPos = -1) {
        this.source = source;
        this.state = state;
        this.explicitPos = explicitPos;
    }
    hasResult() { return false; }
    update(tr, conf) {
        let event = getUserEvent(tr), value = this;
        if (event)
            value = value.handleUserEvent(tr, event, conf);
        else if (tr.docChanged)
            value = value.handleChange(tr);
        else if (tr.selection && value.state != 0 /* Inactive */)
            value = new ActiveSource(value.source, 0 /* Inactive */);
        for (let effect of tr.effects) {
            if (effect.is(startCompletionEffect))
                value = new ActiveSource(value.source, 1 /* Pending */, effect.value ? cur(tr.state) : -1);
            else if (effect.is(closeCompletionEffect))
                value = new ActiveSource(value.source, 0 /* Inactive */);
            else if (effect.is(setActiveEffect))
                for (let active of effect.value)
                    if (active.source == value.source)
                        value = active;
        }
        return value;
    }
    handleUserEvent(tr, type, conf) {
        return type == "delete" || !conf.activateOnTyping ? this.map(tr.changes) : new ActiveSource(this.source, 1 /* Pending */);
    }
    handleChange(tr) {
        return tr.changes.touchesRange(cur(tr.startState)) ? new ActiveSource(this.source, 0 /* Inactive */) : this.map(tr.changes);
    }
    map(changes) {
        return changes.empty || this.explicitPos < 0 ? this : new ActiveSource(this.source, this.state, changes.mapPos(this.explicitPos));
    }
}
class ActiveResult extends ActiveSource {
    constructor(source, explicitPos, result, from, to) {
        super(source, 2 /* Result */, explicitPos);
        this.result = result;
        this.from = from;
        this.to = to;
    }
    hasResult() { return true; }
    handleUserEvent(tr, type, conf) {
        var _a;
        let from = tr.changes.mapPos(this.from), to = tr.changes.mapPos(this.to, 1);
        let pos = cur(tr.state);
        if ((this.explicitPos < 0 ? pos <= from : pos < this.from) ||
            pos > to ||
            type == "delete" && cur(tr.startState) == this.from)
            return new ActiveSource(this.source, type == "input" && conf.activateOnTyping ? 1 /* Pending */ : 0 /* Inactive */);
        let explicitPos = this.explicitPos < 0 ? -1 : tr.changes.mapPos(this.explicitPos), updated;
        if (checkValid(this.result.validFor, tr.state, from, to))
            return new ActiveResult(this.source, explicitPos, this.result, from, to);
        if (this.result.update &&
            (updated = this.result.update(this.result, from, to, new CompletionContext(tr.state, pos, explicitPos >= 0))))
            return new ActiveResult(this.source, explicitPos, updated, updated.from, (_a = updated.to) !== null && _a !== void 0 ? _a : cur(tr.state));
        return new ActiveSource(this.source, 1 /* Pending */, explicitPos);
    }
    handleChange(tr) {
        return tr.changes.touchesRange(this.from, this.to) ? new ActiveSource(this.source, 0 /* Inactive */) : this.map(tr.changes);
    }
    map(mapping) {
        return mapping.empty ? this :
            new ActiveResult(this.source, this.explicitPos < 0 ? -1 : mapping.mapPos(this.explicitPos), this.result, mapping.mapPos(this.from), mapping.mapPos(this.to, 1));
    }
}
function checkValid(validFor, state, from, to) {
    if (!validFor)
        return false;
    let text = state.sliceDoc(from, to);
    return typeof validFor == "function" ? validFor(text, from, to, state) : ensureAnchor(validFor, true).test(text);
}
const startCompletionEffect = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define();
const closeCompletionEffect = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define();
const setActiveEffect = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define({
    map(sources, mapping) { return sources.map(s => s.map(mapping)); }
});
const setSelectedEffect = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define();
const completionState = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateField */ .sU.define({
    create() { return CompletionState.start(); },
    update(value, tr) { return value.update(tr); },
    provide: f => [
        _codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .showTooltip */ .DK.from(f, val => val.tooltip),
        _codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .EditorView */ .Lz.contentAttributes.from(f, state => state.attrs)
    ]
});

const CompletionInteractMargin = 75;
/**
Returns a command that moves the completion selection forward or
backward by the given amount.
*/
function moveCompletionSelection(forward, by = "option") {
    return (view) => {
        let cState = view.state.field(completionState, false);
        if (!cState || !cState.open || Date.now() - cState.open.timestamp < CompletionInteractMargin)
            return false;
        let step = 1, tooltip;
        if (by == "page" && (tooltip = (0,_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .getTooltip */ .Eg)(view, cState.open.tooltip)))
            step = Math.max(2, Math.floor(tooltip.dom.offsetHeight /
                tooltip.dom.querySelector("li").offsetHeight) - 1);
        let selected = cState.open.selected + step * (forward ? 1 : -1), { length } = cState.open.options;
        if (selected < 0)
            selected = by == "page" ? 0 : length - 1;
        else if (selected >= length)
            selected = by == "page" ? length - 1 : 0;
        view.dispatch({ effects: setSelectedEffect.of(selected) });
        return true;
    };
}
/**
Accept the current completion.
*/
const acceptCompletion = (view) => {
    let cState = view.state.field(completionState, false);
    if (view.state.readOnly || !cState || !cState.open || Date.now() - cState.open.timestamp < CompletionInteractMargin)
        return false;
    applyCompletion(view, cState.open.options[cState.open.selected]);
    return true;
};
/**
Explicitly start autocompletion.
*/
const startCompletion = (view) => {
    let cState = view.state.field(completionState, false);
    if (!cState)
        return false;
    view.dispatch({ effects: startCompletionEffect.of(true) });
    return true;
};
/**
Close the currently active completion.
*/
const closeCompletion = (view) => {
    let cState = view.state.field(completionState, false);
    if (!cState || !cState.active.some(a => a.state != 0 /* Inactive */))
        return false;
    view.dispatch({ effects: closeCompletionEffect.of(null) });
    return true;
};
class RunningQuery {
    constructor(active, context) {
        this.active = active;
        this.context = context;
        this.time = Date.now();
        this.updates = [];
        // Note that 'undefined' means 'not done yet', whereas 'null' means
        // 'query returned null'.
        this.done = undefined;
    }
}
const DebounceTime = 50, MaxUpdateCount = 50, MinAbortTime = 1000;
const completionPlugin = /*@__PURE__*/_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .ViewPlugin */ .Z9.fromClass(class {
    constructor(view) {
        this.view = view;
        this.debounceUpdate = -1;
        this.running = [];
        this.debounceAccept = -1;
        this.composing = 0 /* None */;
        for (let active of view.state.field(completionState).active)
            if (active.state == 1 /* Pending */)
                this.startQuery(active);
    }
    update(update) {
        let cState = update.state.field(completionState);
        if (!update.selectionSet && !update.docChanged && update.startState.field(completionState) == cState)
            return;
        let doesReset = update.transactions.some(tr => {
            return (tr.selection || tr.docChanged) && !getUserEvent(tr);
        });
        for (let i = 0; i < this.running.length; i++) {
            let query = this.running[i];
            if (doesReset ||
                query.updates.length + update.transactions.length > MaxUpdateCount && Date.now() - query.time > MinAbortTime) {
                for (let handler of query.context.abortListeners) {
                    try {
                        handler();
                    }
                    catch (e) {
                        (0,_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .logException */ .c_)(this.view.state, e);
                    }
                }
                query.context.abortListeners = null;
                this.running.splice(i--, 1);
            }
            else {
                query.updates.push(...update.transactions);
            }
        }
        if (this.debounceUpdate > -1)
            clearTimeout(this.debounceUpdate);
        this.debounceUpdate = cState.active.some(a => a.state == 1 /* Pending */ && !this.running.some(q => q.active.source == a.source))
            ? setTimeout(() => this.startUpdate(), DebounceTime) : -1;
        if (this.composing != 0 /* None */)
            for (let tr of update.transactions) {
                if (getUserEvent(tr) == "input")
                    this.composing = 2 /* Changed */;
                else if (this.composing == 2 /* Changed */ && tr.selection)
                    this.composing = 3 /* ChangedAndMoved */;
            }
    }
    startUpdate() {
        this.debounceUpdate = -1;
        let { state } = this.view, cState = state.field(completionState);
        for (let active of cState.active) {
            if (active.state == 1 /* Pending */ && !this.running.some(r => r.active.source == active.source))
                this.startQuery(active);
        }
    }
    startQuery(active) {
        let { state } = this.view, pos = cur(state);
        let context = new CompletionContext(state, pos, active.explicitPos == pos);
        let pending = new RunningQuery(active, context);
        this.running.push(pending);
        Promise.resolve(active.source(context)).then(result => {
            if (!pending.context.aborted) {
                pending.done = result || null;
                this.scheduleAccept();
            }
        }, err => {
            this.view.dispatch({ effects: closeCompletionEffect.of(null) });
            (0,_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .logException */ .c_)(this.view.state, err);
        });
    }
    scheduleAccept() {
        if (this.running.every(q => q.done !== undefined))
            this.accept();
        else if (this.debounceAccept < 0)
            this.debounceAccept = setTimeout(() => this.accept(), DebounceTime);
    }
    // For each finished query in this.running, try to create a result
    // or, if appropriate, restart the query.
    accept() {
        var _a;
        if (this.debounceAccept > -1)
            clearTimeout(this.debounceAccept);
        this.debounceAccept = -1;
        let updated = [];
        let conf = this.view.state.facet(completionConfig);
        for (let i = 0; i < this.running.length; i++) {
            let query = this.running[i];
            if (query.done === undefined)
                continue;
            this.running.splice(i--, 1);
            if (query.done) {
                let active = new ActiveResult(query.active.source, query.active.explicitPos, query.done, query.done.from, (_a = query.done.to) !== null && _a !== void 0 ? _a : cur(query.updates.length ? query.updates[0].startState : this.view.state));
                // Replay the transactions that happened since the start of
                // the request and see if that preserves the result
                for (let tr of query.updates)
                    active = active.update(tr, conf);
                if (active.hasResult()) {
                    updated.push(active);
                    continue;
                }
            }
            let current = this.view.state.field(completionState).active.find(a => a.source == query.active.source);
            if (current && current.state == 1 /* Pending */) {
                if (query.done == null) {
                    // Explicitly failed. Should clear the pending status if it
                    // hasn't been re-set in the meantime.
                    let active = new ActiveSource(query.active.source, 0 /* Inactive */);
                    for (let tr of query.updates)
                        active = active.update(tr, conf);
                    if (active.state != 1 /* Pending */)
                        updated.push(active);
                }
                else {
                    // Cleared by subsequent transactions. Restart.
                    this.startQuery(current);
                }
            }
        }
        if (updated.length)
            this.view.dispatch({ effects: setActiveEffect.of(updated) });
    }
}, {
    eventHandlers: {
        blur() {
            let state = this.view.state.field(completionState, false);
            if (state && state.tooltip && this.view.state.facet(completionConfig).closeOnBlur)
                this.view.dispatch({ effects: closeCompletionEffect.of(null) });
        },
        compositionstart() {
            this.composing = 1 /* Started */;
        },
        compositionend() {
            if (this.composing == 3 /* ChangedAndMoved */) {
                // Safari fires compositionend events synchronously, possibly
                // from inside an update, so dispatch asynchronously to avoid reentrancy
                setTimeout(() => this.view.dispatch({ effects: startCompletionEffect.of(false) }), 20);
            }
            this.composing = 0 /* None */;
        }
    }
});

const baseTheme = /*@__PURE__*/_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .EditorView */ .Lz.baseTheme({
    ".cm-tooltip.cm-tooltip-autocomplete": {
        "& > ul": {
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            overflow: "hidden auto",
            maxWidth_fallback: "700px",
            maxWidth: "min(700px, 95vw)",
            minWidth: "250px",
            maxHeight: "10em",
            listStyle: "none",
            margin: 0,
            padding: 0,
            "& > li": {
                overflowX: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
                padding: "1px 3px",
                lineHeight: 1.2
            },
        }
    },
    "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
        background: "#17c",
        color: "white",
    },
    "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
        background: "#347",
        color: "white",
    },
    ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
        content: '"···"',
        opacity: 0.5,
        display: "block",
        textAlign: "center"
    },
    ".cm-tooltip.cm-completionInfo": {
        position: "absolute",
        padding: "3px 9px",
        width: "max-content",
        maxWidth: "300px",
    },
    ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
    ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
    "&light .cm-snippetField": { backgroundColor: "#00000022" },
    "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
    ".cm-snippetFieldPosition": {
        verticalAlign: "text-top",
        width: 0,
        height: "1.15em",
        margin: "0 -0.7px -.7em",
        borderLeft: "1.4px dotted #888"
    },
    ".cm-completionMatchedText": {
        textDecoration: "underline"
    },
    ".cm-completionDetail": {
        marginLeft: "0.5em",
        fontStyle: "italic"
    },
    ".cm-completionIcon": {
        fontSize: "90%",
        width: ".8em",
        display: "inline-block",
        textAlign: "center",
        paddingRight: ".6em",
        opacity: "0.6"
    },
    ".cm-completionIcon-function, .cm-completionIcon-method": {
        "&:after": { content: "'ƒ'" }
    },
    ".cm-completionIcon-class": {
        "&:after": { content: "'○'" }
    },
    ".cm-completionIcon-interface": {
        "&:after": { content: "'◌'" }
    },
    ".cm-completionIcon-variable": {
        "&:after": { content: "'𝑥'" }
    },
    ".cm-completionIcon-constant": {
        "&:after": { content: "'𝐶'" }
    },
    ".cm-completionIcon-type": {
        "&:after": { content: "'𝑡'" }
    },
    ".cm-completionIcon-enum": {
        "&:after": { content: "'∪'" }
    },
    ".cm-completionIcon-property": {
        "&:after": { content: "'□'" }
    },
    ".cm-completionIcon-keyword": {
        "&:after": { content: "'🔑\uFE0E'" } // Disable emoji rendering
    },
    ".cm-completionIcon-namespace": {
        "&:after": { content: "'▢'" }
    },
    ".cm-completionIcon-text": {
        "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
    }
});

class FieldPos {
    constructor(field, line, from, to) {
        this.field = field;
        this.line = line;
        this.from = from;
        this.to = to;
    }
}
class FieldRange {
    constructor(field, from, to) {
        this.field = field;
        this.from = from;
        this.to = to;
    }
    map(changes) {
        let from = changes.mapPos(this.from, -1, _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .MapMode */ .iR.TrackDel);
        let to = changes.mapPos(this.to, 1, _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .MapMode */ .iR.TrackDel);
        return from == null || to == null ? null : new FieldRange(this.field, from, to);
    }
}
class Snippet {
    constructor(lines, fieldPositions) {
        this.lines = lines;
        this.fieldPositions = fieldPositions;
    }
    instantiate(state, pos) {
        let text = [], lineStart = [pos];
        let lineObj = state.doc.lineAt(pos), baseIndent = /^\s*/.exec(lineObj.text)[0];
        for (let line of this.lines) {
            if (text.length) {
                let indent = baseIndent, tabs = /^\t*/.exec(line)[0].length;
                for (let i = 0; i < tabs; i++)
                    indent += state.facet(_codemirror_language__WEBPACK_IMPORTED_MODULE_0__/* .indentUnit */ .Xt);
                lineStart.push(pos + indent.length - tabs);
                line = indent + line.slice(tabs);
            }
            text.push(line);
            pos += line.length + 1;
        }
        let ranges = this.fieldPositions.map(pos => new FieldRange(pos.field, lineStart[pos.line] + pos.from, lineStart[pos.line] + pos.to));
        return { text, ranges };
    }
    static parse(template) {
        let fields = [];
        let lines = [], positions = [], m;
        for (let line of template.split(/\r\n?|\n/)) {
            while (m = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(line)) {
                let seq = m[1] ? +m[1] : null, name = m[2] || m[3] || "", found = -1;
                for (let i = 0; i < fields.length; i++) {
                    if (seq != null ? fields[i].seq == seq : name ? fields[i].name == name : false)
                        found = i;
                }
                if (found < 0) {
                    let i = 0;
                    while (i < fields.length && (seq == null || (fields[i].seq != null && fields[i].seq < seq)))
                        i++;
                    fields.splice(i, 0, { seq, name });
                    found = i;
                    for (let pos of positions)
                        if (pos.field >= found)
                            pos.field++;
                }
                positions.push(new FieldPos(found, lines.length, m.index, m.index + name.length));
                line = line.slice(0, m.index) + name + line.slice(m.index + m[0].length);
            }
            for (let esc; esc = /([$#])\\{/.exec(line);) {
                line = line.slice(0, esc.index) + esc[1] + "{" + line.slice(esc.index + esc[0].length);
                for (let pos of positions)
                    if (pos.line == lines.length && pos.from > esc.index) {
                        pos.from--;
                        pos.to--;
                    }
            }
            lines.push(line);
        }
        return new Snippet(lines, positions);
    }
}
let fieldMarker = /*@__PURE__*/_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .Decoration */ .NZ.widget({ widget: /*@__PURE__*/new class extends _codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .WidgetType */ .xO {
        toDOM() {
            let span = document.createElement("span");
            span.className = "cm-snippetFieldPosition";
            return span;
        }
        ignoreEvent() { return false; }
    } });
let fieldRange = /*@__PURE__*/_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .Decoration */ .NZ.mark({ class: "cm-snippetField" });
class ActiveSnippet {
    constructor(ranges, active) {
        this.ranges = ranges;
        this.active = active;
        this.deco = _codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .Decoration */ .NZ.set(ranges.map(r => (r.from == r.to ? fieldMarker : fieldRange).range(r.from, r.to)));
    }
    map(changes) {
        let ranges = [];
        for (let r of this.ranges) {
            let mapped = r.map(changes);
            if (!mapped)
                return null;
            ranges.push(mapped);
        }
        return new ActiveSnippet(ranges, this.active);
    }
    selectionInsideField(sel) {
        return sel.ranges.every(range => this.ranges.some(r => r.field == this.active && r.from <= range.from && r.to >= range.to));
    }
}
const setActive = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define({
    map(value, changes) { return value && value.map(changes); }
});
const moveToField = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define();
const snippetState = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateField */ .sU.define({
    create() { return null; },
    update(value, tr) {
        for (let effect of tr.effects) {
            if (effect.is(setActive))
                return effect.value;
            if (effect.is(moveToField) && value)
                return new ActiveSnippet(value.ranges, effect.value);
        }
        if (value && tr.docChanged)
            value = value.map(tr.changes);
        if (value && tr.selection && !value.selectionInsideField(tr.selection))
            value = null;
        return value;
    },
    provide: f => _codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .EditorView */ .Lz.decorations.from(f, val => val ? val.deco : _codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .Decoration */ .NZ.none)
});
function fieldSelection(ranges, field) {
    return _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .EditorSelection */ .OF.create(ranges.filter(r => r.field == field).map(r => _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .EditorSelection */ .OF.range(r.from, r.to)));
}
/**
Convert a snippet template to a function that can
[apply](https://codemirror.net/6/docs/ref/#autocomplete.Completion.apply) it. Snippets are written
using syntax like this:

    "for (let ${index} = 0; ${index} < ${end}; ${index}++) {\n\t${}\n}"

Each `${}` placeholder (you may also use `#{}`) indicates a field
that the user can fill in. Its name, if any, will be the default
content for the field.

When the snippet is activated by calling the returned function,
the code is inserted at the given position. Newlines in the
template are indented by the indentation of the start line, plus
one [indent unit](https://codemirror.net/6/docs/ref/#language.indentUnit) per tab character after
the newline.

On activation, (all instances of) the first field are selected.
The user can move between fields with Tab and Shift-Tab as long as
the fields are active. Moving to the last field or moving the
cursor out of the current field deactivates the fields.

The order of fields defaults to textual order, but you can add
numbers to placeholders (`${1}` or `${1:defaultText}`) to provide
a custom order.

To include a literal `${` or `#{` in your template, put a
backslash after the dollar or hash and before the brace (`$\\{`).
This will be removed and the sequence will not be interpreted as a
placeholder.
*/
function snippet(template) {
    let snippet = Snippet.parse(template);
    return (editor, _completion, from, to) => {
        let { text, ranges } = snippet.instantiate(editor.state, from);
        let spec = {
            changes: { from, to, insert: _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY.of(text) },
            scrollIntoView: true
        };
        if (ranges.length)
            spec.selection = fieldSelection(ranges, 0);
        if (ranges.length > 1) {
            let active = new ActiveSnippet(ranges, 0);
            let effects = spec.effects = [setActive.of(active)];
            if (editor.state.field(snippetState, false) === undefined)
                effects.push(_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.appendConfig.of([snippetState, addSnippetKeymap, snippetPointerHandler, baseTheme]));
        }
        editor.dispatch(editor.state.update(spec));
    };
}
function moveField(dir) {
    return ({ state, dispatch }) => {
        let active = state.field(snippetState, false);
        if (!active || dir < 0 && active.active == 0)
            return false;
        let next = active.active + dir, last = dir > 0 && !active.ranges.some(r => r.field == next + dir);
        dispatch(state.update({
            selection: fieldSelection(active.ranges, next),
            effects: setActive.of(last ? null : new ActiveSnippet(active.ranges, next))
        }));
        return true;
    };
}
/**
A command that clears the active snippet, if any.
*/
const clearSnippet = ({ state, dispatch }) => {
    let active = state.field(snippetState, false);
    if (!active)
        return false;
    dispatch(state.update({ effects: setActive.of(null) }));
    return true;
};
/**
Move to the next snippet field, if available.
*/
const nextSnippetField = /*@__PURE__*/moveField(1);
/**
Move to the previous snippet field, if available.
*/
const prevSnippetField = /*@__PURE__*/moveField(-1);
const defaultSnippetKeymap = [
    { key: "Tab", run: nextSnippetField, shift: prevSnippetField },
    { key: "Escape", run: clearSnippet }
];
/**
A facet that can be used to configure the key bindings used by
snippets. The default binds Tab to
[`nextSnippetField`](https://codemirror.net/6/docs/ref/#autocomplete.nextSnippetField), Shift-Tab to
[`prevSnippetField`](https://codemirror.net/6/docs/ref/#autocomplete.prevSnippetField), and Escape
to [`clearSnippet`](https://codemirror.net/6/docs/ref/#autocomplete.clearSnippet).
*/
const snippetKeymap = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .Facet */ .sj.define({
    combine(maps) { return maps.length ? maps[0] : defaultSnippetKeymap; }
});
const addSnippetKeymap = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .Prec */ .Nb.highest(/*@__PURE__*/_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .keymap */ .w4.compute([snippetKeymap], state => state.facet(snippetKeymap)));
/**
Create a completion from a snippet. Returns an object with the
properties from `completion`, plus an `apply` function that
applies the snippet.
*/
function snippetCompletion(template, completion) {
    return Object.assign(Object.assign({}, completion), { apply: snippet(template) });
}
const snippetPointerHandler = /*@__PURE__*/_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .EditorView */ .Lz.domEventHandlers({
    mousedown(event, view) {
        let active = view.state.field(snippetState, false), pos;
        if (!active || (pos = view.posAtCoords({ x: event.clientX, y: event.clientY })) == null)
            return false;
        let match = active.ranges.find(r => r.from <= pos && r.to >= pos);
        if (!match || match.field == active.active)
            return false;
        view.dispatch({
            selection: fieldSelection(active.ranges, match.field),
            effects: setActive.of(active.ranges.some(r => r.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null)
        });
        return true;
    }
});

function wordRE(wordChars) {
    let escaped = wordChars.replace(/[\\[.+*?(){|^$]/g, "\\$&");
    try {
        return new RegExp(`[\\p{Alphabetic}\\p{Number}_${escaped}]+`, "ug");
    }
    catch (_a) {
        return new RegExp(`[\w${escaped}]`, "g");
    }
}
function mapRE(re, f) {
    return new RegExp(f(re.source), re.unicode ? "u" : "");
}
const wordCaches = /*@__PURE__*/(/* unused pure expression or super */ null && (Object.create(null)));
function wordCache(wordChars) {
    return wordCaches[wordChars] || (wordCaches[wordChars] = new WeakMap);
}
function storeWords(doc, wordRE, result, seen, ignoreAt) {
    for (let lines = doc.iterLines(), pos = 0; !lines.next().done;) {
        let { value } = lines, m;
        wordRE.lastIndex = 0;
        while (m = wordRE.exec(value)) {
            if (!seen[m[0]] && pos + m.index != ignoreAt) {
                result.push({ type: "text", label: m[0] });
                seen[m[0]] = true;
                if (result.length >= 2000 /* MaxList */)
                    return;
            }
        }
        pos += value.length + 1;
    }
}
function collectWords(doc, cache, wordRE, to, ignoreAt) {
    let big = doc.length >= 1000 /* MinCacheLen */;
    let cached = big && cache.get(doc);
    if (cached)
        return cached;
    let result = [], seen = Object.create(null);
    if (doc.children) {
        let pos = 0;
        for (let ch of doc.children) {
            if (ch.length >= 1000 /* MinCacheLen */) {
                for (let c of collectWords(ch, cache, wordRE, to - pos, ignoreAt - pos)) {
                    if (!seen[c.label]) {
                        seen[c.label] = true;
                        result.push(c);
                    }
                }
            }
            else {
                storeWords(ch, wordRE, result, seen, ignoreAt - pos);
            }
            pos += ch.length + 1;
        }
    }
    else {
        storeWords(doc, wordRE, result, seen, ignoreAt);
    }
    if (big && result.length < 2000 /* MaxList */)
        cache.set(doc, result);
    return result;
}
/**
A completion source that will scan the document for words (using a
[character categorizer](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer)), and
return those as completions.
*/
const completeAnyWord = context => {
    let wordChars = context.state.languageDataAt("wordChars", context.pos).join("");
    let re = wordRE(wordChars);
    let token = context.matchBefore(mapRE(re, s => s + "$"));
    if (!token && !context.explicit)
        return null;
    let from = token ? token.from : context.pos;
    let options = collectWords(context.state.doc, wordCache(wordChars), re, 50000 /* Range */, from);
    return { from, options, validFor: mapRE(re, s => "^" + s) };
};

const defaults = {
    brackets: ["(", "[", "{", "'", '"'],
    before: ")]}:;>"
};
const closeBracketEffect = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define({
    map(value, mapping) {
        let mapped = mapping.mapPos(value, -1, _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .MapMode */ .iR.TrackAfter);
        return mapped == null ? undefined : mapped;
    }
});
const skipBracketEffect = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateEffect */ .Pe.define({
    map(value, mapping) { return mapping.mapPos(value); }
});
const closedBracket = /*@__PURE__*/new class extends _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .RangeValue */ .FB {
};
closedBracket.startSide = 1;
closedBracket.endSide = -1;
const bracketState = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .StateField */ .sU.define({
    create() { return _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .RangeSet */ .om.empty; },
    update(value, tr) {
        if (tr.selection) {
            let lineStart = tr.state.doc.lineAt(tr.selection.main.head).from;
            let prevLineStart = tr.startState.doc.lineAt(tr.startState.selection.main.head).from;
            if (lineStart != tr.changes.mapPos(prevLineStart, -1))
                value = _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .RangeSet */ .om.empty;
        }
        value = value.map(tr.changes);
        for (let effect of tr.effects) {
            if (effect.is(closeBracketEffect))
                value = value.update({ add: [closedBracket.range(effect.value, effect.value + 1)] });
            else if (effect.is(skipBracketEffect))
                value = value.update({ filter: from => from != effect.value });
        }
        return value;
    }
});
/**
Extension to enable bracket-closing behavior. When a closeable
bracket is typed, its closing bracket is immediately inserted
after the cursor. When closing a bracket directly in front of a
closing bracket inserted by the extension, the cursor moves over
that bracket.
*/
function closeBrackets() {
    return [inputHandler, bracketState];
}
const definedClosing = "()[]{}<>";
function closing(ch) {
    for (let i = 0; i < definedClosing.length; i += 2)
        if (definedClosing.charCodeAt(i) == ch)
            return definedClosing.charAt(i + 1);
    return (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .fromCodePoint */ .MK)(ch < 128 ? ch : ch + 1);
}
function config(state, pos) {
    return state.languageDataAt("closeBrackets", pos)[0] || defaults;
}
const android = typeof navigator == "object" && /*@__PURE__*//Android\b/.test(navigator.userAgent);
const inputHandler = /*@__PURE__*/(/* unused pure expression or super */ null && (EditorView.inputHandler.of((view, from, to, insert) => {
    if ((android ? view.composing : view.compositionStarted) || view.state.readOnly)
        return false;
    let sel = view.state.selection.main;
    if (insert.length > 2 || insert.length == 2 && codePointSize(codePointAt(insert, 0)) == 1 ||
        from != sel.from || to != sel.to)
        return false;
    let tr = insertBracket(view.state, insert);
    if (!tr)
        return false;
    view.dispatch(tr);
    return true;
})));
/**
Command that implements deleting a pair of matching brackets when
the cursor is between them.
*/
const deleteBracketPair = ({ state, dispatch }) => {
    if (state.readOnly)
        return false;
    let conf = config(state, state.selection.main.head);
    let tokens = conf.brackets || defaults.brackets;
    let dont = null, changes = state.changeByRange(range => {
        if (range.empty) {
            let before = prevChar(state.doc, range.head);
            for (let token of tokens) {
                if (token == before && nextChar(state.doc, range.head) == closing((0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(token, 0)))
                    return { changes: { from: range.head - token.length, to: range.head + token.length },
                        range: _codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .EditorSelection */ .OF.cursor(range.head - token.length),
                        userEvent: "delete.backward" };
            }
        }
        return { range: dont = range };
    });
    if (!dont)
        dispatch(state.update(changes, { scrollIntoView: true }));
    return !dont;
};
/**
Close-brackets related key bindings. Binds Backspace to
[`deleteBracketPair`](https://codemirror.net/6/docs/ref/#autocomplete.deleteBracketPair).
*/
const closeBracketsKeymap = [
    { key: "Backspace", run: deleteBracketPair }
];
/**
Implements the extension's behavior on text insertion. If the
given string counts as a bracket in the language around the
selection, and replacing the selection with it requires custom
behavior (inserting a closing version or skipping past a
previously-closed bracket), this function returns a transaction
representing that custom behavior. (You only need this if you want
to programmatically insert brackets—the
[`closeBrackets`](https://codemirror.net/6/docs/ref/#autocomplete.closeBrackets) extension will
take care of running this for user input.)
*/
function insertBracket(state, bracket) {
    let conf = config(state, state.selection.main.head);
    let tokens = conf.brackets || defaults.brackets;
    for (let tok of tokens) {
        let closed = closing(codePointAt(tok, 0));
        if (bracket == tok)
            return closed == tok ? handleSame(state, tok, tokens.indexOf(tok + tok + tok) > -1)
                : handleOpen(state, tok, closed, conf.before || defaults.before);
        if (bracket == closed && closedBracketAt(state, state.selection.main.from))
            return handleClose(state, tok, closed);
    }
    return null;
}
function closedBracketAt(state, pos) {
    let found = false;
    state.field(bracketState).between(0, state.doc.length, from => {
        if (from == pos)
            found = true;
    });
    return found;
}
function nextChar(doc, pos) {
    let next = doc.sliceString(pos, pos + 2);
    return next.slice(0, (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)((0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(next, 0)));
}
function prevChar(doc, pos) {
    let prev = doc.sliceString(pos - 2, pos);
    return (0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointSize */ .Fh)((0,_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .codePointAt */ .vS)(prev, 0)) == prev.length ? prev : prev.slice(1);
}
function handleOpen(state, open, close, closeBefore) {
    let dont = null, changes = state.changeByRange(range => {
        if (!range.empty)
            return { changes: [{ insert: open, from: range.from }, { insert: close, from: range.to }],
                effects: closeBracketEffect.of(range.to + open.length),
                range: EditorSelection.range(range.anchor + open.length, range.head + open.length) };
        let next = nextChar(state.doc, range.head);
        if (!next || /\s/.test(next) || closeBefore.indexOf(next) > -1)
            return { changes: { insert: open + close, from: range.head },
                effects: closeBracketEffect.of(range.head + open.length),
                range: EditorSelection.cursor(range.head + open.length) };
        return { range: dont = range };
    });
    return dont ? null : state.update(changes, {
        scrollIntoView: true,
        userEvent: "input.type"
    });
}
function handleClose(state, _open, close) {
    let dont = null, moved = state.selection.ranges.map(range => {
        if (range.empty && nextChar(state.doc, range.head) == close)
            return EditorSelection.cursor(range.head + close.length);
        return dont = range;
    });
    return dont ? null : state.update({
        selection: EditorSelection.create(moved, state.selection.mainIndex),
        scrollIntoView: true,
        effects: state.selection.ranges.map(({ from }) => skipBracketEffect.of(from))
    });
}
// Handles cases where the open and close token are the same, and
// possibly triple quotes (as in `"""abc"""`-style quoting).
function handleSame(state, token, allowTriple) {
    let dont = null, changes = state.changeByRange(range => {
        if (!range.empty)
            return { changes: [{ insert: token, from: range.from }, { insert: token, from: range.to }],
                effects: closeBracketEffect.of(range.to + token.length),
                range: EditorSelection.range(range.anchor + token.length, range.head + token.length) };
        let pos = range.head, next = nextChar(state.doc, pos);
        if (next == token) {
            if (nodeStart(state, pos)) {
                return { changes: { insert: token + token, from: pos },
                    effects: closeBracketEffect.of(pos + token.length),
                    range: EditorSelection.cursor(pos + token.length) };
            }
            else if (closedBracketAt(state, pos)) {
                let isTriple = allowTriple && state.sliceDoc(pos, pos + token.length * 3) == token + token + token;
                return { range: EditorSelection.cursor(pos + token.length * (isTriple ? 3 : 1)),
                    effects: skipBracketEffect.of(pos) };
            }
        }
        else if (allowTriple && state.sliceDoc(pos - 2 * token.length, pos) == token + token &&
            nodeStart(state, pos - 2 * token.length)) {
            return { changes: { insert: token + token + token + token, from: pos },
                effects: closeBracketEffect.of(pos + token.length),
                range: EditorSelection.cursor(pos + token.length) };
        }
        else if (state.charCategorizer(pos)(next) != CharCategory.Word) {
            let prev = state.sliceDoc(pos - 1, pos);
            if (prev != token && state.charCategorizer(pos)(prev) != CharCategory.Word && !probablyInString(state, pos, token))
                return { changes: { insert: token + token, from: pos },
                    effects: closeBracketEffect.of(pos + token.length),
                    range: EditorSelection.cursor(pos + token.length) };
        }
        return { range: dont = range };
    });
    return dont ? null : state.update(changes, {
        scrollIntoView: true,
        userEvent: "input.type"
    });
}
function nodeStart(state, pos) {
    let tree = syntaxTree(state).resolveInner(pos + 1);
    return tree.parent && tree.from == pos;
}
function probablyInString(state, pos, quoteToken) {
    let node = syntaxTree(state).resolveInner(pos, -1);
    for (let i = 0; i < 5; i++) {
        if (state.sliceDoc(node.from, node.from + quoteToken.length) == quoteToken)
            return true;
        let parent = node.to == pos && node.parent;
        if (!parent)
            break;
        node = parent;
    }
    return false;
}

/**
Returns an extension that enables autocompletion.
*/
function autocompletion(config = {}) {
    return [
        completionState,
        completionConfig.of(config),
        completionPlugin,
        completionKeymapExt,
        baseTheme
    ];
}
/**
Basic keybindings for autocompletion.

 - Ctrl-Space: [`startCompletion`](https://codemirror.net/6/docs/ref/#autocomplete.startCompletion)
 - Escape: [`closeCompletion`](https://codemirror.net/6/docs/ref/#autocomplete.closeCompletion)
 - ArrowDown: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(true)`
 - ArrowUp: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(false)`
 - PageDown: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(true, "page")`
 - PageDown: [`moveCompletionSelection`](https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection)`(true, "page")`
 - Enter: [`acceptCompletion`](https://codemirror.net/6/docs/ref/#autocomplete.acceptCompletion)
*/
const completionKeymap = [
    { key: "Ctrl-Space", run: startCompletion },
    { key: "Escape", run: closeCompletion },
    { key: "ArrowDown", run: /*@__PURE__*/moveCompletionSelection(true) },
    { key: "ArrowUp", run: /*@__PURE__*/moveCompletionSelection(false) },
    { key: "PageDown", run: /*@__PURE__*/moveCompletionSelection(true, "page") },
    { key: "PageUp", run: /*@__PURE__*/moveCompletionSelection(false, "page") },
    { key: "Enter", run: acceptCompletion }
];
const completionKeymapExt = /*@__PURE__*/_codemirror_state__WEBPACK_IMPORTED_MODULE_1__/* .Prec */ .Nb.highest(/*@__PURE__*/_codemirror_view__WEBPACK_IMPORTED_MODULE_2__/* .keymap */ .w4.computeN([completionConfig], state => state.facet(completionConfig).defaultKeymap ? [completionKeymap] : []));
/**
Get the current completion status. When completions are available,
this will return `"active"`. When completions are pending (in the
process of being queried), this returns `"pending"`. Otherwise, it
returns `null`.
*/
function completionStatus(state) {
    let cState = state.field(completionState, false);
    return cState && cState.active.some(a => a.state == 1 /* Pending */) ? "pending"
        : cState && cState.active.some(a => a.state != 0 /* Inactive */) ? "active" : null;
}
const completionArrayCache = /*@__PURE__*/new WeakMap;
/**
Returns the available completions as an array.
*/
function currentCompletions(state) {
    var _a;
    let open = (_a = state.field(completionState, false)) === null || _a === void 0 ? void 0 : _a.open;
    if (!open)
        return [];
    let completions = completionArrayCache.get(open.options);
    if (!completions)
        completionArrayCache.set(open.options, completions = open.options.map(o => o.completion));
    return completions;
}
/**
Return the currently selected completion, if any.
*/
function selectedCompletion(state) {
    var _a;
    let open = (_a = state.field(completionState, false)) === null || _a === void 0 ? void 0 : _a.open;
    return open ? open.options[open.selected].completion : null;
}
/**
Returns the currently selected position in the active completion
list, or null if no completions are active.
*/
function selectedCompletionIndex(state) {
    var _a;
    let open = (_a = state.field(completionState, false)) === null || _a === void 0 ? void 0 : _a.open;
    return open ? open.selected : null;
}
/**
Create an effect that can be attached to a transaction to change
the currently selected completion.
*/
function setSelectedCompletion(index) {
    return setSelectedEffect.of(index);
}




/***/ }),

/***/ 23430:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   angular: () => (/* binding */ angular),
/* harmony export */   angularLanguage: () => (/* binding */ angularLanguage)
/* harmony export */ });
/* harmony import */ var _codemirror_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12726);
/* harmony import */ var _codemirror_lang_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20811);
/* harmony import */ var _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49609);
/* harmony import */ var _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38682);
/* harmony import */ var _lezer_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33933);
/* harmony import */ var _lezer_lr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65983);







// This file was generated by lezer-generator. You probably shouldn't edit it.
const Text = 1,
  attributeContentSingle = 33,
  attributeContentDouble = 34,
  scriptAttributeContentSingle = 35,
  scriptAttributeContentDouble = 36;

const text = /*@__PURE__*/new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__/* .ExternalTokenizer */ .Lu(input => {
    let start = input.pos;
    for (;;) {
        if (input.next == 10 /* Ch.Newline */) {
            input.advance();
            break;
        }
        else if (input.next == 123 /* Ch.BraceL */ && input.peek(1) == 123 /* Ch.BraceL */ || input.next < 0) {
            break;
        }
        input.advance();
    }
    if (input.pos > start)
        input.acceptToken(Text);
});
function attrContent(quote, token, script) {
    return new _lezer_lr__WEBPACK_IMPORTED_MODULE_2__/* .ExternalTokenizer */ .Lu(input => {
        let start = input.pos;
        while (input.next != quote && input.next >= 0 &&
            (script || input.next != 38 /* Ch.Ampersand */ && (input.next != 123 /* Ch.BraceL */ || input.peek(1) != 123 /* Ch.BraceL */)))
            input.advance();
        if (input.pos > start)
            input.acceptToken(token);
    });
}
const attrSingle = /*@__PURE__*/attrContent(39 /* Ch.SingleQuote */, attributeContentSingle, false);
const attrDouble = /*@__PURE__*/attrContent(34 /* Ch.DoubleQuote */, attributeContentDouble, false);
const scriptAttrSingle = /*@__PURE__*/attrContent(39 /* Ch.SingleQuote */, scriptAttributeContentSingle, true);
const scriptAttrDouble = /*@__PURE__*/attrContent(34 /* Ch.DoubleQuote */, scriptAttributeContentDouble, true);

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = /*@__PURE__*/_lezer_lr__WEBPACK_IMPORTED_MODULE_2__/* .LRParser */ .U1.deserialize({
  version: 14,
  states: "(jOVOqOOOeQpOOOvO!bO'#CaOOOP'#Cx'#CxQVOqOOO!OQpO'#CfO!WQpO'#ClO!]QpO'#CrO!bQpO'#CsOOQO'#Cv'#CvQ!gQpOOQ!lQpOOQ!qQpOOOOOV,58{,58{O!vOpO,58{OOOP-E6v-E6vO!{QpO,59QO#TQpO,59QOOQO,59W,59WO#YQpO,59^OOQO,59_,59_O#_QpOOO#_QpOOO#gQpOOOOOV1G.g1G.gO#oQpO'#CyO#tQpO1G.lOOQO1G.l1G.lO#|QpO1G.lOOQO1G.x1G.xO$UO`O'#DUO$ZOWO'#DUOOQO'#Co'#CoQOQpOOOOQO'#Cu'#CuO$`OtO'#CwO$qOrO'#CwOOQO,59e,59eOOQO-E6w-E6wOOQO7+$W7+$WO%SQpO7+$WO%[QpO7+$WOOOO'#Cp'#CpO%aOpO,59pOOOO'#Cq'#CqO%fOpO,59pOOOS'#Cz'#CzO%kOtO,59cOOQO,59c,59cOOOQ'#C{'#C{O%|OrO,59cO&_QpO<<GrOOQO<<Gr<<GrOOQO1G/[1G/[OOOS-E6x-E6xOOQO1G.}1G.}OOOQ-E6y-E6yOOQOAN=^AN=^",
  stateData: "&d~OvOS~OPROSQOVROWRO~OZTO[XO^VOaUOhWO~OR]OU^O~O[`O^aO~O[bO~O[cO~O[dO~ObeO~ObfO~ObgO~ORhO~O]kOwiO~O[lO~O_mO~OynOzoO~OysOztO~O[uO~O]wOwiO~O_yOwiO~OtzO~Os|O~OSQOV!OOW!OOr!OOy!QO~OSQOV!ROW!ROq!ROz!QO~O_!TOwiO~O]!UO~Oy!VO~Oz!VO~OSQOV!OOW!OOr!OOy!XO~OSQOV!ROW!ROq!ROz!XO~O]!ZO~O",
  goto: "#dyPPPPPzPPPP!WPPPPP!WPP!Z!^!a!d!dP!g!j!m!p!v#Q#WPPPPPPPP#^SROSS!Os!PT!Rt!SRYPRqeR{nR}oRZPRqfR[PRqgQSOR_SQj`SvjxRxlQ!PsR!W!PQ!StR!Y!SQpeRrf",
  nodeNames: "⚠ Text Content }} {{ Interpolation InterpolationContent Entity InvalidEntity Attribute BoundAttributeName [ Identifier ] ( ) ReferenceName # Is ExpressionAttributeValue AttributeInterpolation AttributeInterpolation EventName DirectiveName * StatementAttributeValue AttributeName AttributeValue",
  maxTerm: 42,
  nodeProps: [
    ["openedBy", 3,"{{",15,"("],
    ["closedBy", 4,"}}",14,")"]
  ],
  skippedNodes: [0],
  repeatNodeCount: 4,
  tokenData: "0r~RyOX#rXY$mYZ$mZ]#r]^$m^p#rpq$mqr#rrs%jst&Qtv#rvw&hwx)zxy*byz*xz{+`{}#r}!O+v!O!P-]!P!Q#r!Q![+v![!]+v!]!_#r!_!`-s!`!c#r!c!}+v!}#O.Z#O#P#r#P#Q.q#Q#R#r#R#S+v#S#T#r#T#o+v#o#p/X#p#q#r#q#r0Z#r%W#r%W;'S+v;'S;:j-V;:j;=`$g<%lO+vQ#wTUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rQ$ZSO#q#r#r;'S#r;'S;=`$g<%lO#rQ$jP;=`<%l#rR$t[UQvPOX#rXY$mYZ$mZ]#r]^$m^p#rpq$mq#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR%qTyPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR&XTaPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR&oXUQWPOp'[pq#rq!]'[!]!^#r!^#q'[#q#r(d#r;'S'[;'S;=`)t<%lO'[R'aXUQOp'[pq#rq!]'[!]!^'|!^#q'[#q#r(d#r;'S'[;'S;=`)t<%lO'[R(TTVPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR(gXOp'[pq#rq!]'[!]!^'|!^#q'[#q#r)S#r;'S'[;'S;=`)t<%lO'[P)VUOp)Sq!])S!]!^)i!^;'S)S;'S;=`)n<%lO)SP)nOVPP)qP;=`<%l)SR)wP;=`<%l'[R*RTzPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR*iT^PUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR+PT_PUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR+gThPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR+}b[PUQO}#r}!O+v!O!Q#r!Q![+v![!]+v!]!c#r!c!}+v!}#R#r#R#S+v#S#T#r#T#o+v#o#q#r#q#r$W#r%W#r%W;'S+v;'S;:j-V;:j;=`$g<%lO+vR-YP;=`<%l+vR-dTwPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR-zTUQbPO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR.bTZPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR.xT]PUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR/^VUQO#o#r#o#p/s#p#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#rR/zTSPUQO#q#r#q#r$W#r;'S#r;'S;=`$g<%lO#r~0^TO#q#r#q#r0m#r;'S#r;'S;=`$g<%lO#r~0rOR~",
  tokenizers: [text, attrSingle, attrDouble, scriptAttrSingle, scriptAttrDouble, 0, 1],
  topRules: {"Content":[0,2],"Attribute":[1,9]},
  tokenPrec: 0
});

const exprParser = /*@__PURE__*/_codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_3__.javascriptLanguage.parser.configure({
    top: "SingleExpression"
});
const baseParser = /*@__PURE__*/parser.configure({
    props: [
        /*@__PURE__*/(0,_lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .styleTags */ .pn)({
            Text: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.content,
            Is: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.definitionOperator,
            AttributeName: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.attributeName,
            "AttributeValue ExpressionAttributeValue StatementAttributeValue": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.attributeValue,
            Entity: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.character,
            InvalidEntity: _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.invalid,
            "BoundAttributeName/Identifier": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.attributeName,
            "EventName/Identifier": /*@__PURE__*/_lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.special(_lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.attributeName),
            "ReferenceName/Identifier": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.variableName,
            "DirectiveName/Identifier": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.keyword,
            "{{ }}": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.brace,
            "( )": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.paren,
            "[ ]": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.bracket,
            "# '*'": _lezer_highlight__WEBPACK_IMPORTED_MODULE_0__/* .tags */ ._A.punctuation
        })
    ]
});
const exprMixed = { parser: exprParser }, statementMixed = { parser: _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_3__.javascriptLanguage.parser };
const textParser = /*@__PURE__*/baseParser.configure({
    wrap: /*@__PURE__*/(0,_lezer_common__WEBPACK_IMPORTED_MODULE_1__/* .parseMixed */ .$g)((node, input) => node.name == "InterpolationContent" ? exprMixed : null),
});
const attrParser = /*@__PURE__*/baseParser.configure({
    wrap: /*@__PURE__*/(0,_lezer_common__WEBPACK_IMPORTED_MODULE_1__/* .parseMixed */ .$g)((node, input) => {
        var _a;
        return node.name == "InterpolationContent" ? exprMixed
            : node.name != "AttributeInterpolation" ? null
                : ((_a = node.node.parent) === null || _a === void 0 ? void 0 : _a.name) == "StatementAttributeValue" ? statementMixed : exprMixed;
    }),
    top: "Attribute"
});
const textMixed = { parser: textParser }, attrMixed = { parser: attrParser };
/**
A language provider for Angular Templates.
*/
const angularLanguage = /*@__PURE__*/_codemirror_language__WEBPACK_IMPORTED_MODULE_4__/* .LRLanguage */ .bj.define({
    name: "angular",
    parser: /*@__PURE__*/_codemirror_lang_html__WEBPACK_IMPORTED_MODULE_5__.htmlLanguage.parser.configure({
        wrap: /*@__PURE__*/(0,_lezer_common__WEBPACK_IMPORTED_MODULE_1__/* .parseMixed */ .$g)(mixAngular)
    }),
    languageData: {
        closeBrackets: { brackets: ["[", "{", '"'] },
        indentOnInput: /^\s*[\}\]]$/
    }
});
function mixAngular(node, input) {
    switch (node.name) {
        case "Attribute":
            return /^[*#(\[]|\{\{/.test(input.read(node.from, node.to)) ? attrMixed : null;
        case "Text":
            return textMixed;
    }
    return null;
}
/**
Angular Template language support.
*/
function angular() {
    return new _codemirror_language__WEBPACK_IMPORTED_MODULE_4__/* .LanguageSupport */ .Yy(angularLanguage);
}




/***/ }),

/***/ 6604:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  css: () => (/* binding */ css),
  cssCompletionSource: () => (/* binding */ cssCompletionSource),
  cssLanguage: () => (/* binding */ cssLanguage),
  defineCSSCompletionSource: () => (/* binding */ defineCSSCompletionSource)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+lr@1.3.4/node_modules/@lezer/lr/dist/index.js
var dist = __webpack_require__(65983);
// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+highlight@1.0.0/node_modules/@lezer/highlight/dist/index.js
var highlight_dist = __webpack_require__(38682);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@lezer+css@1.0.0/node_modules/@lezer/css/dist/index.es.js



// This file was generated by lezer-generator. You probably shouldn't edit it.
const descendantOp = 93,
  Unit = 1,
  callee = 94,
  identifier = 95,
  VariableName = 2;

/* Hand-written tokenizers for CSS tokens that can't be
   expressed by Lezer's built-in tokenizer. */

const space = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197,
               8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288];
const colon = 58, parenL = 40, underscore = 95, bracketL = 91, dash = 45, period = 46,
      hash = 35, percent = 37;

function isAlpha(ch) { return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 161 }

function isDigit(ch) { return ch >= 48 && ch <= 57 }

const identifiers = new dist/* ExternalTokenizer */.Lu((input, stack) => {
  for (let inside = false, dashes = 0, i = 0;; i++) {
    let {next} = input;
    if (isAlpha(next) || next == dash || next == underscore || (inside && isDigit(next))) {
      if (!inside && (next != dash || i > 0)) inside = true;
      if (dashes === i && next == dash) dashes++;
      input.advance();
    } else {
      if (inside)
        input.acceptToken(next == parenL ? callee : dashes == 2 && stack.canShift(VariableName) ? VariableName : identifier);
      break
    }
  }
});

const descendant = new dist/* ExternalTokenizer */.Lu(input => {
  if (space.includes(input.peek(-1))) {
    let {next} = input;
    if (isAlpha(next) || next == underscore || next == hash || next == period ||
        next == bracketL || next == colon || next == dash)
      input.acceptToken(descendantOp);
  }
});

const unitToken = new dist/* ExternalTokenizer */.Lu(input => {
  if (!space.includes(input.peek(-1))) {
    let {next} = input;
    if (next == percent) { input.advance(); input.acceptToken(Unit); }
    if (isAlpha(next)) {
      do { input.advance(); } while (isAlpha(input.next))
      input.acceptToken(Unit);
    }
  }
});

const cssHighlighting = (0,highlight_dist/* styleTags */.pn)({
  "import charset namespace keyframes": highlight_dist/* tags */._A.definitionKeyword,
  "media supports": highlight_dist/* tags */._A.controlKeyword,
  "from to selector": highlight_dist/* tags */._A.keyword,
  NamespaceName: highlight_dist/* tags */._A.namespace,
  KeyframeName: highlight_dist/* tags */._A.labelName,
  TagName: highlight_dist/* tags */._A.tagName,
  ClassName: highlight_dist/* tags */._A.className,
  PseudoClassName: highlight_dist/* tags */._A.constant(highlight_dist/* tags */._A.className),
  IdName: highlight_dist/* tags */._A.labelName,
  "FeatureName PropertyName": highlight_dist/* tags */._A.propertyName,
  AttributeName: highlight_dist/* tags */._A.attributeName,
  NumberLiteral: highlight_dist/* tags */._A.number,
  KeywordQuery: highlight_dist/* tags */._A.keyword,
  UnaryQueryOp: highlight_dist/* tags */._A.operatorKeyword,
  "CallTag ValueName": highlight_dist/* tags */._A.atom,
  VariableName: highlight_dist/* tags */._A.variableName,
  Callee: highlight_dist/* tags */._A.operatorKeyword,
  Unit: highlight_dist/* tags */._A.unit,
  "UniversalSelector NestingSelector": highlight_dist/* tags */._A.definitionOperator,
  AtKeyword: highlight_dist/* tags */._A.keyword,
  MatchOp: highlight_dist/* tags */._A.compareOperator,
  "ChildOp SiblingOp, LogicOp": highlight_dist/* tags */._A.logicOperator,
  BinOp: highlight_dist/* tags */._A.arithmeticOperator,
  Important: highlight_dist/* tags */._A.modifier,
  Comment: highlight_dist/* tags */._A.blockComment,
  ParenthesizedContent: highlight_dist/* tags */._A.special(highlight_dist/* tags */._A.name),
  ColorLiteral: highlight_dist/* tags */._A.color,
  StringLiteral: highlight_dist/* tags */._A.string,
  ":": highlight_dist/* tags */._A.punctuation,
  "PseudoOp #": highlight_dist/* tags */._A.derefOperator,
  "; ,": highlight_dist/* tags */._A.separator,
  "( )": highlight_dist/* tags */._A.paren,
  "[ ]": highlight_dist/* tags */._A.squareBracket,
  "{ }": highlight_dist/* tags */._A.brace
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_callee = {__proto__:null,lang:32, "nth-child":32, "nth-last-child":32, "nth-of-type":32, dir:32, url:60, "url-prefix":60, domain:60, regexp:60, selector:134};
const spec_AtKeyword = {__proto__:null,"@import":114, "@media":138, "@charset":142, "@namespace":146, "@keyframes":152, "@supports":164};
const spec_identifier = {__proto__:null,not:128, only:128, from:158, to:160};
const parser = dist/* LRParser */.U1.deserialize({
  version: 14,
  states: "7WOYQ[OOOOQP'#Cd'#CdOOQP'#Cc'#CcO!ZQ[O'#CfO!}QXO'#CaO#UQ[O'#ChO#aQ[O'#DPO#fQ[O'#DTOOQP'#Ec'#EcO#kQdO'#DeO$VQ[O'#DrO#kQdO'#DtO$hQ[O'#DvO$sQ[O'#DyO$xQ[O'#EPO%WQ[O'#EROOQS'#Eb'#EbOOQS'#ES'#ESQYQ[OOOOQP'#Cg'#CgOOQP,59Q,59QO!ZQ[O,59QO%_Q[O'#EVO%yQWO,58{O&RQ[O,59SO#aQ[O,59kO#fQ[O,59oO%_Q[O,59sO%_Q[O,59uO%_Q[O,59vO'bQ[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO'iQWO,59SO'nQWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO'sQ`O,59oOOQS'#Cp'#CpO#kQdO'#CqO'{QvO'#CsO)VQtO,5:POOQO'#Cx'#CxO'iQWO'#CwO)kQWO'#CyOOQS'#Ef'#EfOOQO'#Dh'#DhO)pQ[O'#DoO*OQWO'#EiO$xQ[O'#DmO*^QWO'#DpOOQO'#Ej'#EjO%|QWO,5:^O*cQpO,5:`OOQS'#Dx'#DxO*kQWO,5:bO*pQ[O,5:bOOQO'#D{'#D{O*xQWO,5:eO*}QWO,5:kO+VQWO,5:mOOQS-E8Q-E8QOOQP1G.l1G.lO+yQXO,5:qOOQO-E8T-E8TOOQS1G.g1G.gOOQP1G.n1G.nO'iQWO1G.nO'nQWO1G.nOOQP1G/V1G/VO,WQ`O1G/ZO,qQXO1G/_O-XQXO1G/aO-oQXO1G/bO.VQXO'#CdO.zQWO'#DaOOQS,59z,59zO/PQWO,59zO/XQ[O,59zO/`QdO'#CoO/gQ[O'#DOOOQP1G/Z1G/ZO#kQdO1G/ZO/nQpO,59]OOQS,59_,59_O#kQdO,59aO/vQWO1G/kOOQS,59c,59cO/{Q!bO,59eO0TQWO'#DhO0`QWO,5:TO0eQWO,5:ZO$xQ[O,5:VO$xQ[O'#EYO0mQWO,5;TO0xQWO,5:XO%_Q[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O1ZQWO1G/|O1`QdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XOOQP7+$Y7+$YOOQP7+$u7+$uO#kQdO7+$uO#kQdO,59{O1nQ[O'#EXO1xQWO1G/fOOQS1G/f1G/fO1xQWO1G/fO2QQtO'#ETO2uQdO'#EeO3PQWO,59ZO3UQXO'#EhO3]QWO,59jO3bQpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO3jQWO1G/PO#kQdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO3oQWO,5:tOOQO-E8W-E8WO3}QXO1G/vOOQS7+%h7+%hO4UQYO'#CsO%|QWO'#EZO4^QdO,5:hOOQS,5:h,5:hO4lQpO<<HaO4tQtO1G/gOOQO,5:s,5:sO5XQ[O,5:sOOQO-E8V-E8VOOQS7+%Q7+%QO5cQWO7+%QOOQS-E8R-E8RO#kQdO'#EUO5kQWO,5;POOQT1G.u1G.uO5sQWO,5;SOOQP1G/U1G/UOOQP<<Ha<<HaOOQS7+$k7+$kO5{QdO7+%ZOOQO7+%b7+%bOOQS,5:u,5:uOOQS-E8X-E8XOOQS1G0S1G0SOOQPAN={AN={O6SQtO'#EWO#kQdO'#EWO6}QdO7+%ROOQO7+%R7+%ROOQO1G0_1G0_OOQS<<Hl<<HlO7_QdO,5:pOOQO-E8S-E8SOOQO<<Hu<<HuO7iQtO,5:rOOQS-E8U-E8UOOQO<<Hm<<Hm",
  stateData: "8j~O#TOSROS~OUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#RPO#WRO~O#RcO~O]hO^hOpfOtiOxjO|kO!PmO#PlO#WeO~O!RnO~P!`O`sO#QqO#RpO~O#RuO~O#RwO~OQ!QObzOf!QOh!QOn!PO#Q}O#RyO#Z{O~Ob!SO!b!UO!e!VO#R!RO!R#]P~Oh![On!PO#R!ZO~O#R!^O~Ob!SO!b!UO!e!VO#R!RO~O!W#]P~P$VOUWOXWO]TO^TOtUOxVO#RPO#WRO~OpfO!RnO~O`!hO#QqO#RpO~OQ!pOUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#R!oO#WRO~O!Q!qO~P&^Ob!tO~Ob!uO~Ov!vOz!wO~OP!yObgXjgX!WgX!bgX!egX#RgXagXQgXfgXhgXngXpgX#QgX#ZgXvgX!QgX!VgX~Ob!SOj!zO!b!UO!e!VO#R!RO!W#]P~Ob!}O~Ob!SO!b!UO!e!VO#R#OO~Op#SO!`#RO!R#]X!W#]X~Ob#VO~Oj!zO!W#XO~O!W#YO~Oh#ZOn!PO~O!R#[O~O!RnO!`#RO~O!RnO!W#_O~O]hO^hOtiOxjO|kO!PmO#PlO#WeO~Op!ya!R!yaa!ya~P+_Ov#aOz#bO~O]hO^hOtiOxjO#WeO~Op{i|{i!P{i!R{i#P{ia{i~P,`Op}i|}i!P}i!R}i#P}ia}i~P,`Op!Oi|!Oi!P!Oi!R!Oi#P!Oia!Oi~P,`O]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#PWX#WWX~O]#cO~O!Q#fO!W#dO~O!Q#fO~P&^Oa#XP~P#kOa#[P~P%_Oa#nOj!zO~O!W#pO~Oh#qOo#qO~O]!^Xa![X!`![X~O]#rO~Oa#sO!`#RO~Op#SO!R#]a!W#]a~O!`#ROp!aa!R!aa!W!aaa!aa~O!W#xO~O!Q#|O!q#zO!r#zO#Z#yO~O!Q!{X!W!{X~P&^O!Q$SO!W#dO~Oj!zOQ!wXa!wXb!wXf!wXh!wXn!wXp!wX#Q!wX#R!wX#Z!wX~Op$VOa#XX~P#kOa$XO~Oa#[X~P!`Oa$ZO~Oj!zOv$[O~Oa$]O~O!`#ROp!|a!R!|a!W!|a~Oa$_O~P+_OP!yO!RgX~O!Q$bO!q#zO!r#zO#Z#yO~Oj!zOv$cO~Oj!zOp$eO!V$gO!Q!Ti!W!Ti~P#kO!Q!{a!W!{a~P&^O!Q$iO!W#dO~Op$VOa#Xa~OpfOa#[a~Oa$lO~P#kOj!zOQ!zXb!zXf!zXh!zXn!zXp!zX!Q!zX!V!zX!W!zX#Q!zX#R!zX#Z!zX~Op$eO!V$oO!Q!Tq!W!Tq~P#kOa!xap!xa~P#kOj!zOQ!zab!zaf!zah!zan!zap!za!Q!za!V!za!W!za#Q!za#R!za#Z!za~Oo#Zj!Pj~",
  goto: ",O#_PPPPP#`P#h#vP#h$U#hPP$[PPP$b$k$kP$}P$kP$k%e%wPPP&a&g#hP&mP#hP&sP#hP#h#hPPP&y']'iPP#`PP'o'o'y'oP'oP'o'oP#`P#`P#`P'|#`P(P(SPP#`P#`(V(e(s(y)T)Z)e)kPPPPPP)q)yP*e*hP+^+a+j]`Obn!s#d$QiWObfklmn!s!u#V#d$QiQObfklmn!s!u#V#d$QQdRR!ceQrTR!ghQ!gsQ!|!OR#`!hq!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jp!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jT#z#[#{q!OXZz!t!w!z#b#c#i#r$O$V$^$e$f$jp!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jQ![[R#Z!]QtTR!ihQ!gtR#`!iQvUR!jiQxVR!kjQoSQ!fgQ#W!XQ#^!`Q#_!aR$`#zQ!rnQ#g!sQ$P#dR$h$QX!pn!s#d$Qa!WY^_|!S!U#R#SR#P!SR!][R!_]R#]!_QbOU!bb!s$QQ!snR$Q#dQ#i!tU$U#i$^$jQ$^#rR$j$VQ$W#iR$k$WQgSS!eg$YR$Y#kQ$f$OR$n$fQ#e!rS$R#e$TR$T#gQ#T!TR#v#TQ#{#[R$a#{]aObn!s#d$Q[SObn!s#d$QQ!dfQ!lkQ!mlQ!nmQ#k!uR#w#VR#j!tQ|XQ!YZQ!xz[#h!t#i#r$V$^$jQ#m!wQ#o!zQ#}#bQ$O#cS$d$O$fR$m$eR#l!uQ!XYQ!a_R!{|U!TY_|Q!`^Q#Q!SQ#U!UQ#t#RR#u#S",
  nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList from to SupportsStatement supports AtRule",
  maxTerm: 106,
  nodeProps: [
    ["openedBy", 17,"(",48,"{"],
    ["closedBy", 18,")",49,"}"]
  ],
  propSources: [cssHighlighting],
  skippedNodes: [0,3],
  repeatNodeCount: 8,
  tokenData: "Ay~R![OX$wX^%]^p$wpq%]qr(crs+}st,otu2Uuv$wvw2rwx2}xy3jyz3uz{3z{|4_|}8U}!O8a!O!P8x!P!Q9Z!Q![;e![!]<Y!]!^<x!^!_$w!_!`=T!`!a=`!a!b$w!b!c>O!c!}$w!}#O?[#O#P$w#P#Q?g#Q#R2U#R#T$w#T#U?r#U#c$w#c#d@q#d#o$w#o#pAQ#p#q2U#q#rA]#r#sAh#s#y$w#y#z%]#z$f$w$f$g%]$g#BY$w#BY#BZ%]#BZ$IS$w$IS$I_%]$I_$I|$w$I|$JO%]$JO$JT$w$JT$JU%]$JU$KV$w$KV$KW%]$KW&FU$w&FU&FV%]&FV~$wW$zQOy%Qz~%QW%VQoWOy%Qz~%Q~%bf#T~OX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q~&}f#T~oWOX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q^(fSOy%Qz#]%Q#]#^(r#^~%Q^(wSoWOy%Qz#a%Q#a#b)T#b~%Q^)YSoWOy%Qz#d%Q#d#e)f#e~%Q^)kSoWOy%Qz#c%Q#c#d)w#d~%Q^)|SoWOy%Qz#f%Q#f#g*Y#g~%Q^*_SoWOy%Qz#h%Q#h#i*k#i~%Q^*pSoWOy%Qz#T%Q#T#U*|#U~%Q^+RSoWOy%Qz#b%Q#b#c+_#c~%Q^+dSoWOy%Qz#h%Q#h#i+p#i~%Q^+wQ!VUoWOy%Qz~%Q~,QUOY+}Zr+}rs,ds#O+}#O#P,i#P~+}~,iOh~~,lPO~+}_,tWtPOy%Qz!Q%Q!Q![-^![!c%Q!c!i-^!i#T%Q#T#Z-^#Z~%Q^-cWoWOy%Qz!Q%Q!Q![-{![!c%Q!c!i-{!i#T%Q#T#Z-{#Z~%Q^.QWoWOy%Qz!Q%Q!Q![.j![!c%Q!c!i.j!i#T%Q#T#Z.j#Z~%Q^.qWfUoWOy%Qz!Q%Q!Q![/Z![!c%Q!c!i/Z!i#T%Q#T#Z/Z#Z~%Q^/bWfUoWOy%Qz!Q%Q!Q![/z![!c%Q!c!i/z!i#T%Q#T#Z/z#Z~%Q^0PWoWOy%Qz!Q%Q!Q![0i![!c%Q!c!i0i!i#T%Q#T#Z0i#Z~%Q^0pWfUoWOy%Qz!Q%Q!Q![1Y![!c%Q!c!i1Y!i#T%Q#T#Z1Y#Z~%Q^1_WoWOy%Qz!Q%Q!Q![1w![!c%Q!c!i1w!i#T%Q#T#Z1w#Z~%Q^2OQfUoWOy%Qz~%QY2XSOy%Qz!_%Q!_!`2e!`~%QY2lQzQoWOy%Qz~%QX2wQXPOy%Qz~%Q~3QUOY2}Zw2}wx,dx#O2}#O#P3d#P~2}~3gPO~2}_3oQbVOy%Qz~%Q~3zOa~_4RSUPjSOy%Qz!_%Q!_!`2e!`~%Q_4fUjS!PPOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q^4}SoWOy%Qz!Q%Q!Q![5Z![~%Q^5bWoW#ZUOy%Qz!Q%Q!Q![5Z![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q^6PWoWOy%Qz{%Q{|6i|}%Q}!O6i!O!Q%Q!Q![6z![~%Q^6nSoWOy%Qz!Q%Q!Q![6z![~%Q^7RSoW#ZUOy%Qz!Q%Q!Q![6z![~%Q^7fYoW#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q_8ZQpVOy%Qz~%Q^8fUjSOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q_8}S#WPOy%Qz!Q%Q!Q![5Z![~%Q~9`RjSOy%Qz{9i{~%Q~9nSoWOy9iyz9zz{:o{~9i~9}ROz9zz{:W{~9z~:ZTOz9zz{:W{!P9z!P!Q:j!Q~9z~:oOR~~:tUoWOy9iyz9zz{:o{!P9i!P!Q;W!Q~9i~;_QoWR~Oy%Qz~%Q^;jY#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%QX<_S]POy%Qz![%Q![!]<k!]~%QX<rQ^PoWOy%Qz~%Q_<}Q!WVOy%Qz~%QY=YQzQOy%Qz~%QX=eS|POy%Qz!`%Q!`!a=q!a~%QX=xQ|PoWOy%Qz~%QX>RUOy%Qz!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX>lY!YPoWOy%Qz}%Q}!O>e!O!Q%Q!Q![>e![!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX?aQxPOy%Qz~%Q^?lQvUOy%Qz~%QX?uSOy%Qz#b%Q#b#c@R#c~%QX@WSoWOy%Qz#W%Q#W#X@d#X~%QX@kQ!`PoWOy%Qz~%QX@tSOy%Qz#f%Q#f#g@d#g~%QXAVQ!RPOy%Qz~%Q_AbQ!QVOy%Qz~%QZAmS!PPOy%Qz!_%Q!_!`2e!`~%Q",
  tokenizers: [descendant, unitToken, identifiers, 0, 1, 2, 3],
  topRules: {"StyleSheet":[0,4]},
  specialized: [{term: 94, get: value => spec_callee[value] || -1},{term: 56, get: value => spec_AtKeyword[value] || -1},{term: 95, get: value => spec_identifier[value] || -1}],
  tokenPrec: 1078
});



// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+language@6.7.0/node_modules/@codemirror/language/dist/index.js
var language_dist = __webpack_require__(12726);
// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+common@1.2.1/node_modules/@lezer/common/dist/index.js
var common_dist = __webpack_require__(33933);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@codemirror+lang-css@6.2.0_@codemirror+view@6.12.0/node_modules/@codemirror/lang-css/dist/index.js




let _properties = null;
function properties() {
    if (!_properties && typeof document == "object" && document.body) {
        let { style } = document.body, names = [], seen = new Set;
        for (let prop in style)
            if (prop != "cssText" && prop != "cssFloat") {
                if (typeof style[prop] == "string") {
                    if (/[A-Z]/.test(prop))
                        prop = prop.replace(/[A-Z]/g, ch => "-" + ch.toLowerCase());
                    if (!seen.has(prop)) {
                        names.push(prop);
                        seen.add(prop);
                    }
                }
            }
        _properties = names.sort().map(name => ({ type: "property", label: name }));
    }
    return _properties || [];
}
const pseudoClasses = /*@__PURE__*/[
    "active", "after", "any-link", "autofill", "backdrop", "before",
    "checked", "cue", "default", "defined", "disabled", "empty",
    "enabled", "file-selector-button", "first", "first-child",
    "first-letter", "first-line", "first-of-type", "focus",
    "focus-visible", "focus-within", "fullscreen", "has", "host",
    "host-context", "hover", "in-range", "indeterminate", "invalid",
    "is", "lang", "last-child", "last-of-type", "left", "link", "marker",
    "modal", "not", "nth-child", "nth-last-child", "nth-last-of-type",
    "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range",
    "part", "placeholder", "placeholder-shown", "read-only", "read-write",
    "required", "right", "root", "scope", "selection", "slotted", "target",
    "target-text", "valid", "visited", "where"
].map(name => ({ type: "class", label: name }));
const values = /*@__PURE__*/[
    "above", "absolute", "activeborder", "additive", "activecaption", "after-white-space",
    "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always",
    "antialiased", "appworkspace", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column",
    "avoid-page", "avoid-region", "axis-pan", "background", "backwards", "baseline", "below",
    "bidi-override", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box",
    "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel",
    "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "capitalize",
    "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle",
    "cjk-decimal", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn",
    "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content",
    "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover",
    "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal",
    "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in",
    "destination-out", "destination-over", "difference", "disc", "discard", "disclosure-closed",
    "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize",
    "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end",
    "ethiopic-abegede-gez", "ethiopic-halehame-aa-er", "ethiopic-halehame-gez", "ew-resize", "exclusion",
    "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fill-box",
    "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from",
    "geometricPrecision", "graytext", "grid", "groove", "hand", "hard-light", "help", "hidden", "hide",
    "higher", "highlight", "highlighttext", "horizontal", "hsl", "hsla", "hue", "icon", "ignore",
    "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext",
    "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid",
    "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "keep-all",
    "landscape", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear",
    "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower",
    "lower-hexadecimal", "lower-latin", "lower-norwegian", "lowercase", "ltr", "luminosity", "manipulation",
    "match", "matrix", "matrix3d", "medium", "menu", "menutext", "message-box", "middle", "min-intrinsic",
    "mix", "monospace", "move", "multiple", "multiple_mask_images", "multiply", "n-resize", "narrower",
    "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none",
    "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize",
    "oblique", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "outset", "outside",
    "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused",
    "perspective", "pinch-zoom", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait",
    "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio",
    "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat",
    "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse",
    "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round",
    "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation",
    "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position",
    "se-resize", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show",
    "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal",
    "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps",
    "small-caption", "smaller", "soft-light", "solid", "source-atop", "source-in", "source-out",
    "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "start",
    "static", "status-bar", "stretch", "stroke", "stroke-box", "sub", "subpixel-antialiased", "svg_masks",
    "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell",
    "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row",
    "table-row-group", "text", "text-bottom", "text-top", "textarea", "textfield", "thick", "thin",
    "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "to", "top",
    "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent",
    "ultra-condensed", "ultra-expanded", "underline", "unidirectional-pan", "unset", "up", "upper-latin",
    "uppercase", "url", "var", "vertical", "vertical-text", "view-box", "visible", "visibleFill",
    "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe",
    "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"
].map(name => ({ type: "keyword", label: name })).concat(/*@__PURE__*/[
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
    "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
    "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod",
    "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
    "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
    "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
    "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
    "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew",
    "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
    "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
    "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown",
    "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
    "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
    "whitesmoke", "yellow", "yellowgreen"
].map(name => ({ type: "constant", label: name })));
const tags = /*@__PURE__*/[
    "a", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "blockquote", "body",
    "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "dd", "del",
    "details", "dfn", "dialog", "div", "dl", "dt", "em", "figcaption", "figure", "footer",
    "form", "header", "hgroup", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "html", "i", "iframe",
    "img", "input", "ins", "kbd", "label", "legend", "li", "main", "meter", "nav", "ol", "output",
    "p", "pre", "ruby", "section", "select", "small", "source", "span", "strong", "sub", "summary",
    "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "tr", "u", "ul"
].map(name => ({ type: "type", label: name }));
const dist_identifier = /^(\w[\w-]*|-\w[\w-]*|)$/, variable = /^-(-[\w-]*)?$/;
function isVarArg(node, doc) {
    var _a;
    if (node.name == "(" || node.type.isError)
        node = node.parent || node;
    if (node.name != "ArgList")
        return false;
    let callee = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.firstChild;
    if ((callee === null || callee === void 0 ? void 0 : callee.name) != "Callee")
        return false;
    return doc.sliceString(callee.from, callee.to) == "var";
}
const VariablesByNode = /*@__PURE__*/new common_dist/* NodeWeakMap */.RY();
const declSelector = ["Declaration"];
function astTop(node) {
    for (let cur = node;;) {
        if (cur.type.isTop)
            return cur;
        if (!(cur = cur.parent))
            return node;
    }
}
function variableNames(doc, node, isVariable) {
    if (node.to - node.from > 4096) {
        let known = VariablesByNode.get(node);
        if (known)
            return known;
        let result = [], seen = new Set, cursor = node.cursor(common_dist/* IterMode */.Qj.IncludeAnonymous);
        if (cursor.firstChild())
            do {
                for (let option of variableNames(doc, cursor.node, isVariable))
                    if (!seen.has(option.label)) {
                        seen.add(option.label);
                        result.push(option);
                    }
            } while (cursor.nextSibling());
        VariablesByNode.set(node, result);
        return result;
    }
    else {
        let result = [], seen = new Set;
        node.cursor().iterate(node => {
            var _a;
            if (isVariable(node) && node.matchContext(declSelector) && ((_a = node.node.nextSibling) === null || _a === void 0 ? void 0 : _a.name) == ":") {
                let name = doc.sliceString(node.from, node.to);
                if (!seen.has(name)) {
                    seen.add(name);
                    result.push({ label: name, type: "variable" });
                }
            }
        });
        return result;
    }
}
/**
Create a completion source for a CSS dialect, providing a
predicate for determining what kind of syntax node can act as a
completable variable. This is used by language modes like Sass and
Less to reuse this package's completion logic.
*/
const defineCSSCompletionSource = (isVariable) => context => {
    let { state, pos } = context, node = (0,language_dist/* syntaxTree */.mv)(state).resolveInner(pos, -1);
    let isDash = node.type.isError && node.from == node.to - 1 && state.doc.sliceString(node.from, node.to) == "-";
    if (node.name == "PropertyName" ||
        (isDash || node.name == "TagName") && /^(Block|Styles)$/.test(node.resolve(node.to).name))
        return { from: node.from, options: properties(), validFor: dist_identifier };
    if (node.name == "ValueName")
        return { from: node.from, options: values, validFor: dist_identifier };
    if (node.name == "PseudoClassName")
        return { from: node.from, options: pseudoClasses, validFor: dist_identifier };
    if (isVariable(node) || (context.explicit || isDash) && isVarArg(node, state.doc))
        return { from: isVariable(node) || isDash ? node.from : pos,
            options: variableNames(state.doc, astTop(node), isVariable),
            validFor: variable };
    if (node.name == "TagName") {
        for (let { parent } = node; parent; parent = parent.parent)
            if (parent.name == "Block")
                return { from: node.from, options: properties(), validFor: dist_identifier };
        return { from: node.from, options: tags, validFor: dist_identifier };
    }
    if (!context.explicit)
        return null;
    let above = node.resolve(pos), before = above.childBefore(pos);
    if (before && before.name == ":" && above.name == "PseudoClassSelector")
        return { from: pos, options: pseudoClasses, validFor: dist_identifier };
    if (before && before.name == ":" && above.name == "Declaration" || above.name == "ArgList")
        return { from: pos, options: values, validFor: dist_identifier };
    if (above.name == "Block" || above.name == "Styles")
        return { from: pos, options: properties(), validFor: dist_identifier };
    return null;
};
/**
CSS property, variable, and value keyword completion source.
*/
const cssCompletionSource = /*@__PURE__*/defineCSSCompletionSource(n => n.name == "VariableName");

/**
A language provider based on the [Lezer CSS
parser](https://github.com/lezer-parser/css), extended with
highlighting and indentation information.
*/
const cssLanguage = /*@__PURE__*/language_dist/* LRLanguage */.bj.define({
    name: "css",
    parser: /*@__PURE__*/parser.configure({
        props: [
            /*@__PURE__*/language_dist/* indentNodeProp */.Oh.add({
                Declaration: /*@__PURE__*/(0,language_dist/* continuedIndent */.mz)()
            }),
            /*@__PURE__*/language_dist/* foldNodeProp */.b_.add({
                Block: language_dist/* foldInside */.yd
            })
        ]
    }),
    languageData: {
        commentTokens: { block: { open: "/*", close: "*/" } },
        indentOnInput: /^\s*\}$/,
        wordChars: "-"
    }
});
/**
Language support for CSS.
*/
function css() {
    return new language_dist/* LanguageSupport */.Yy(cssLanguage, cssLanguage.data.of({ autocomplete: cssCompletionSource }));
}




/***/ }),

/***/ 20811:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  autoCloseTags: () => (/* binding */ autoCloseTags),
  html: () => (/* binding */ html),
  htmlCompletionSource: () => (/* binding */ htmlCompletionSource),
  htmlCompletionSourceWith: () => (/* binding */ htmlCompletionSourceWith),
  htmlLanguage: () => (/* binding */ htmlLanguage)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+lr@1.3.4/node_modules/@lezer/lr/dist/index.js
var dist = __webpack_require__(65983);
// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+highlight@1.0.0/node_modules/@lezer/highlight/dist/index.js
var highlight_dist = __webpack_require__(38682);
// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+common@1.2.1/node_modules/@lezer/common/dist/index.js
var common_dist = __webpack_require__(33933);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@lezer+html@1.0.0/node_modules/@lezer/html/dist/index.es.js




// This file was generated by lezer-generator. You probably shouldn't edit it.
const scriptText = 53,
  StartCloseScriptTag = 1,
  styleText = 54,
  StartCloseStyleTag = 2,
  textareaText = 55,
  StartCloseTextareaTag = 3,
  StartTag = 4,
  StartScriptTag = 5,
  StartStyleTag = 6,
  StartTextareaTag = 7,
  StartSelfClosingTag = 8,
  StartCloseTag = 9,
  NoMatchStartCloseTag = 10,
  MismatchedStartCloseTag = 11,
  missingCloseTag = 56,
  IncompleteCloseTag = 12,
  commentContent$1 = 57,
  Element = 18,
  ScriptText = 27,
  StyleText = 30,
  TextareaText = 33,
  OpenTag = 35,
  Dialect_noMatch = 0;

/* Hand-written tokenizers for HTML. */

const selfClosers = {
  area: true, base: true, br: true, col: true, command: true,
  embed: true, frame: true, hr: true, img: true, input: true,
  keygen: true, link: true, meta: true, param: true, source: true,
  track: true, wbr: true, menuitem: true
};

const implicitlyClosed = {
  dd: true, li: true, optgroup: true, option: true, p: true,
  rp: true, rt: true, tbody: true, td: true, tfoot: true,
  th: true, tr: true
};

const closeOnOpen = {
  dd: {dd: true, dt: true},
  dt: {dd: true, dt: true},
  li: {li: true},
  option: {option: true, optgroup: true},
  optgroup: {optgroup: true},
  p: {
    address: true, article: true, aside: true, blockquote: true, dir: true,
    div: true, dl: true, fieldset: true, footer: true, form: true,
    h1: true, h2: true, h3: true, h4: true, h5: true, h6: true,
    header: true, hgroup: true, hr: true, menu: true, nav: true, ol: true,
    p: true, pre: true, section: true, table: true, ul: true
  },
  rp: {rp: true, rt: true},
  rt: {rp: true, rt: true},
  tbody: {tbody: true, tfoot: true},
  td: {td: true, th: true},
  tfoot: {tbody: true},
  th: {td: true, th: true},
  thead: {tbody: true, tfoot: true},
  tr: {tr: true}
};

function nameChar(ch) {
  return ch == 45 || ch == 46 || ch == 58 || ch >= 65 && ch <= 90 || ch == 95 || ch >= 97 && ch <= 122 || ch >= 161
}

function isSpace(ch) {
  return ch == 9 || ch == 10 || ch == 13 || ch == 32
}

let cachedName = null, cachedInput = null, cachedPos = 0;
function tagNameAfter(input, offset) {
  let pos = input.pos + offset;
  if (cachedPos == pos && cachedInput == input) return cachedName
  let next = input.peek(offset);
  while (isSpace(next)) next = input.peek(++offset);
  let name = "";
  for (;;) {
    if (!nameChar(next)) break
    name += String.fromCharCode(next);
    next = input.peek(++offset);
  }
  // Undefined to signal there's a <? or <!, null for just missing
  cachedInput = input; cachedPos = pos;
  return cachedName = name ? name.toLowerCase() : next == question || next == bang ? undefined : null
}

const lessThan = 60, greaterThan = 62, slash = 47, question = 63, bang = 33, dash = 45;

function ElementContext(name, parent) {
  this.name = name;
  this.parent = parent;
  this.hash = parent ? parent.hash : 0;
  for (let i = 0; i < name.length; i++) this.hash += (this.hash << 4) + name.charCodeAt(i) + (name.charCodeAt(i) << 8);
}

const startTagTerms = [StartTag, StartSelfClosingTag, StartScriptTag, StartStyleTag, StartTextareaTag];

const elementContext = new dist/* ContextTracker */.Aj({
  start: null,
  shift(context, term, stack, input) {
    return startTagTerms.indexOf(term) > -1 ? new ElementContext(tagNameAfter(input, 1) || "", context) : context
  },
  reduce(context, term) {
    return term == Element && context ? context.parent : context
  },
  reuse(context, node, stack, input) {
    let type = node.type.id;
    return type == StartTag || type == OpenTag
      ? new ElementContext(tagNameAfter(input, 1) || "", context) : context
  },
  hash(context) { return context ? context.hash : 0 },
  strict: false
});

const tagStart = new dist/* ExternalTokenizer */.Lu((input, stack) => {
  if (input.next != lessThan) {
    // End of file, close any open tags
    if (input.next < 0 && stack.context) input.acceptToken(missingCloseTag);
    return
  }
  input.advance();
  let close = input.next == slash;
  if (close) input.advance();
  let name = tagNameAfter(input, 0);
  if (name === undefined) return
  if (!name) return input.acceptToken(close ? IncompleteCloseTag : StartTag)

  let parent = stack.context ? stack.context.name : null;
  if (close) {
    if (name == parent) return input.acceptToken(StartCloseTag)
    if (parent && implicitlyClosed[parent]) return input.acceptToken(missingCloseTag, -2)
    if (stack.dialectEnabled(Dialect_noMatch)) return input.acceptToken(NoMatchStartCloseTag)
    for (let cx = stack.context; cx; cx = cx.parent) if (cx.name == name) return
    input.acceptToken(MismatchedStartCloseTag);
  } else {
    if (name == "script") return input.acceptToken(StartScriptTag)
    if (name == "style") return input.acceptToken(StartStyleTag)
    if (name == "textarea") return input.acceptToken(StartTextareaTag)
    if (selfClosers.hasOwnProperty(name)) return input.acceptToken(StartSelfClosingTag)
    if (parent && closeOnOpen[parent] && closeOnOpen[parent][name]) input.acceptToken(missingCloseTag, -1);
    else input.acceptToken(StartTag);
  }
}, {contextual: true});

const commentContent = new dist/* ExternalTokenizer */.Lu(input => {
  for (let dashes = 0, i = 0;; i++) {
    if (input.next < 0) {
      if (i) input.acceptToken(commentContent$1);
      break
    }
    if (input.next == dash) {
      dashes++;
    } else if (input.next == greaterThan && dashes >= 2) {
      if (i > 3) input.acceptToken(commentContent$1, -2);
      break
    } else {
      dashes = 0;
    }
    input.advance();
  }
});

function contentTokenizer(tag, textToken, endToken) {
  let lastState = 2 + tag.length;
  return new dist/* ExternalTokenizer */.Lu(input => {
    // state means:
    // - 0 nothing matched
    // - 1 '<' matched
    // - 2 '</' + possibly whitespace matched
    // - 3-(1+tag.length) part of the tag matched
    // - lastState whole tag + possibly whitespace matched
    for (let state = 0, matchedLen = 0, i = 0;; i++) {
      if (input.next < 0) {
        if (i) input.acceptToken(textToken);
        break
      }
      if (state == 0 && input.next == lessThan ||
          state == 1 && input.next == slash ||
          state >= 2 && state < lastState && input.next == tag.charCodeAt(state - 2)) {
        state++;
        matchedLen++;
      } else if ((state == 2 || state == lastState) && isSpace(input.next)) {
        matchedLen++;
      } else if (state == lastState && input.next == greaterThan) {
        if (i > matchedLen)
          input.acceptToken(textToken, -matchedLen);
        else
          input.acceptToken(endToken, -(matchedLen - 2));
        break
      } else if ((input.next == 10 /* '\n' */ || input.next == 13 /* '\r' */) && i) {
        input.acceptToken(textToken, 1);
        break
      } else {
        state = matchedLen = 0;
      }
      input.advance();
    }
  })
}

const scriptTokens = contentTokenizer("script", scriptText, StartCloseScriptTag);

const styleTokens = contentTokenizer("style", styleText, StartCloseStyleTag);

const textareaTokens = contentTokenizer("textarea", textareaText, StartCloseTextareaTag);

const htmlHighlighting = (0,highlight_dist/* styleTags */.pn)({
  "Text RawText": highlight_dist/* tags */._A.content,
  "StartTag StartCloseTag SelfCloserEndTag EndTag SelfCloseEndTag": highlight_dist/* tags */._A.angleBracket,
  TagName: highlight_dist/* tags */._A.tagName,
  "MismatchedCloseTag/TagName": [highlight_dist/* tags */._A.tagName,  highlight_dist/* tags */._A.invalid],
  AttributeName: highlight_dist/* tags */._A.attributeName,
  "AttributeValue UnquotedAttributeValue": highlight_dist/* tags */._A.attributeValue,
  Is: highlight_dist/* tags */._A.definitionOperator,
  "EntityReference CharacterReference": highlight_dist/* tags */._A.character,
  Comment: highlight_dist/* tags */._A.blockComment,
  ProcessingInst: highlight_dist/* tags */._A.processingInstruction,
  DoctypeDecl: highlight_dist/* tags */._A.documentMeta
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = dist/* LRParser */.U1.deserialize({
  version: 14,
  states: ",xOVOxOOO!WQ!bO'#CoO!]Q!bO'#CyO!bQ!bO'#C|O!gQ!bO'#DPO!lQ!bO'#DRO!qOXO'#CnO!|OYO'#CnO#XO[O'#CnO$eOxO'#CnOOOW'#Cn'#CnO$lO!rO'#DSO$tQ!bO'#DUO$yQ!bO'#DVOOOW'#Dj'#DjOOOW'#DX'#DXQVOxOOO%OQ#tO,59ZO%WQ#tO,59eO%`Q#tO,59hO%hQ#tO,59kO%pQ#tO,59mOOOX'#D]'#D]O%xOXO'#CwO&TOXO,59YOOOY'#D^'#D^O&]OYO'#CzO&hOYO,59YOOO['#D_'#D_O&pO[O'#C}O&{O[O,59YOOOW'#D`'#D`O'TOxO,59YO'[Q!bO'#DQOOOW,59Y,59YOOO`'#Da'#DaO'aO!rO,59nOOOW,59n,59nO'iQ!bO,59pO'nQ!bO,59qOOOW-E7V-E7VO'sQ#tO'#CqOOQO'#DY'#DYO(OQ#tO1G.uOOOX1G.u1G.uO(WQ#tO1G/POOOY1G/P1G/PO(`Q#tO1G/SOOO[1G/S1G/SO(hQ#tO1G/VOOOW1G/V1G/VO(pQ#tO1G/XOOOW1G/X1G/XOOOX-E7Z-E7ZO(xQ!bO'#CxOOOW1G.t1G.tOOOY-E7[-E7[O(}Q!bO'#C{OOO[-E7]-E7]O)SQ!bO'#DOOOOW-E7^-E7^O)XQ!bO,59lOOO`-E7_-E7_OOOW1G/Y1G/YOOOW1G/[1G/[OOOW1G/]1G/]O)^Q&jO,59]OOQO-E7W-E7WOOOX7+$a7+$aOOOY7+$k7+$kOOO[7+$n7+$nOOOW7+$q7+$qOOOW7+$s7+$sO)iQ!bO,59dO)nQ!bO,59gO)sQ!bO,59jOOOW1G/W1G/WO)xO,UO'#CtO*WO7[O'#CtOOQO1G.w1G.wOOOW1G/O1G/OOOOW1G/R1G/ROOOW1G/U1G/UOOOO'#DZ'#DZO*fO,UO,59`OOQO,59`,59`OOOO'#D['#D[O*tO7[O,59`OOOO-E7X-E7XOOQO1G.z1G.zOOOO-E7Y-E7Y",
  stateData: "+[~O!]OS~OSSOTPOUQOVROWTOY]OZ[O[^O^^O_^O`^Oa^Ow^Oz_O!cZO~OdaO~OdbO~OdcO~OddO~OdeO~O!VfOPkP!YkP~O!WiOQnP!YnP~O!XlORqP!YqP~OSSOTPOUQOVROWTOXqOY]OZ[O[^O^^O_^O`^Oa^Ow^O!cZO~O!YrO~P#dO!ZsO!duO~OdvO~OdwO~OfyOj|O~OfyOj!OO~OfyOj!QO~OfyOj!SO~OfyOj!UO~O!VfOPkX!YkX~OP!WO!Y!XO~O!WiOQnX!YnX~OQ!ZO!Y!XO~O!XlORqX!YqX~OR!]O!Y!XO~O!Y!XO~P#dOd!_O~O!ZsO!d!aO~Oj!bO~Oj!cO~Og!dOfeXjeX~OfyOj!fO~OfyOj!gO~OfyOj!hO~OfyOj!iO~OfyOj!jO~Od!kO~Od!lO~Od!mO~Oj!nO~Oi!qO!_!oO!a!pO~Oj!rO~Oj!sO~Oj!tO~O_!uO`!uO!_!wO!`!uO~O_!xO`!xO!a!wO!b!xO~O_!uO`!uO!_!{O!`!uO~O_!xO`!xO!a!{O!b!xO~O`_a!cwz!c~",
  goto: "%o!_PPPPPPPPPPPPPPPPPP!`!fP!lPP!xPP!{#O#R#X#[#_#e#h#k#q#w!`P!`!`P#}$T$k$q$w$}%T%Z%aPPPPPPPP%gX^OX`pXUOX`pezabcde{}!P!R!TR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!TeZ!e{}!P!R!TQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue EndTag ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 66,
  context: elementContext,
  nodeProps: [
    ["closedBy", -11,1,2,3,4,5,6,7,8,9,10,11,"EndTag",-4,19,29,32,35,"CloseTag"],
    ["group", -9,12,15,16,17,18,38,39,40,41,"Entity",14,"Entity TextContent",-3,27,30,33,"TextContent Entity"],
    ["openedBy", 26,"StartTag StartCloseTag",-4,28,31,34,36,"OpenTag"]
  ],
  propSources: [htmlHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!#b!aR!WOX$kXY)sYZ)sZ]$k]^)s^p$kpq)sqr$krs*zsv$kvw+dwx2yx}$k}!O3f!O!P$k!P!Q7_!Q![$k![!]8u!]!^$k!^!_>b!_!`!!p!`!a8T!a!c$k!c!}8u!}#R$k#R#S8u#S#T$k#T#o8u#o$f$k$f$g&R$g%W$k%W%o8u%o%p$k%p&a8u&a&b$k&b1p8u1p4U$k4U4d8u4d4e$k4e$IS8u$IS$I`$k$I`$Ib8u$Ib$Kh$k$Kh%#t8u%#t&/x$k&/x&Et8u&Et&FV$k&FV;'S8u;'S;:j<t;:j?&r$k?&r?Ah8u?Ah?BY$k?BY?Mn8u?Mn~$k!Z$vc^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g~$k!R&[V^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&Rq&xT^P!bpOv&qwx'Xx!^&q!^!_'g!_~&qP'^R^POv'Xw!^'X!_~'Xp'lQ!bpOv'gx~'ga'yU^P!``Or'rrs'Xsv'rw!^'r!^!_(]!_~'r`(bR!``Or(]sv(]w~(]!Q(rT!``!bpOr(krs'gsv(kwx(]x~(kW)WXiWOX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!a*O^^P!``!bp!]^OX&RXY)sYZ)sZ]&R]^)s^p&Rpq)sqr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!Z+TT!_h^P!bpOv&qwx'Xx!^&q!^!_'g!_~&q!Z+kbiWaPOX,sXZ.QZ],s]^.Q^p,sqr,srs.Qst/]tw,swx.Qx!P,s!P!Q.Q!Q!],s!]!^)R!^!a.Q!a$f,s$f$g.Q$g~,s!Z,xbiWOX,sXZ.QZ],s]^.Q^p,sqr,srs.Qst)Rtw,swx.Qx!P,s!P!Q.Q!Q!],s!]!^.i!^!a.Q!a$f,s$f$g.Q$g~,s!R.TTOp.Qqs.Qt!].Q!]!^.d!^~.Q!R.iO_!R!Z.pXiW_!ROX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!Z/baiWOX0gXZ1qZ]0g]^1q^p0gqr0grs1qsw0gwx1qx!P0g!P!Q1q!Q!]0g!]!^)R!^!a1q!a$f0g$f$g1q$g~0g!Z0laiWOX0gXZ1qZ]0g]^1q^p0gqr0grs1qsw0gwx1qx!P0g!P!Q1q!Q!]0g!]!^2V!^!a1q!a$f0g$f$g1q$g~0g!R1tSOp1qq!]1q!]!^2Q!^~1q!R2VO`!R!Z2^XiW`!ROX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!Z3SU!ax^P!``Or'rrs'Xsv'rw!^'r!^!_(]!_~'r!]3qe^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx}$k}!O5S!O!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g~$k!]5_d^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!`&R!`!a6m!a$f$k$f$g&R$g~$k!T6xV^P!``!bp!dQOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!X7hX^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_!`&R!`!a8T!a~&R!X8`VjU^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!a9U!YfSdQ^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx}$k}!O8u!O!P8u!P!Q&R!Q![8u![!]8u!]!^$k!^!_(k!_!a&R!a!c$k!c!}8u!}#R$k#R#S8u#S#T$k#T#o8u#o$f$k$f$g&R$g$}$k$}%O8u%O%W$k%W%o8u%o%p$k%p&a8u&a&b$k&b1p8u1p4U8u4U4d8u4d4e$k4e$IS8u$IS$I`$k$I`$Ib8u$Ib$Je$k$Je$Jg8u$Jg$Kh$k$Kh%#t8u%#t&/x$k&/x&Et8u&Et&FV$k&FV;'S8u;'S;:j<t;:j?&r$k?&r?Ah8u?Ah?BY$k?BY?Mn8u?Mn~$k!a=Pe^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g;=`$k;=`<%l8u<%l~$k!R>iW!``!bpOq(kqr?Rrs'gsv(kwx(]x!a(k!a!bKj!b~(k!R?YZ!``!bpOr(krs'gsv(kwx(]x}(k}!O?{!O!f(k!f!gAR!g#W(k#W#XGz#X~(k!R@SV!``!bpOr(krs'gsv(kwx(]x}(k}!O@i!O~(k!R@rT!``!bp!cPOr(krs'gsv(kwx(]x~(k!RAYV!``!bpOr(krs'gsv(kwx(]x!q(k!q!rAo!r~(k!RAvV!``!bpOr(krs'gsv(kwx(]x!e(k!e!fB]!f~(k!RBdV!``!bpOr(krs'gsv(kwx(]x!v(k!v!wBy!w~(k!RCQV!``!bpOr(krs'gsv(kwx(]x!{(k!{!|Cg!|~(k!RCnV!``!bpOr(krs'gsv(kwx(]x!r(k!r!sDT!s~(k!RD[V!``!bpOr(krs'gsv(kwx(]x!g(k!g!hDq!h~(k!RDxW!``!bpOrDqrsEbsvDqvwEvwxFfx!`Dq!`!aGb!a~DqqEgT!bpOvEbvxEvx!`Eb!`!aFX!a~EbPEyRO!`Ev!`!aFS!a~EvPFXOzPqF`Q!bpzPOv'gx~'gaFkV!``OrFfrsEvsvFfvwEvw!`Ff!`!aGQ!a~FfaGXR!``zPOr(]sv(]w~(]!RGkT!``!bpzPOr(krs'gsv(kwx(]x~(k!RHRV!``!bpOr(krs'gsv(kwx(]x#c(k#c#dHh#d~(k!RHoV!``!bpOr(krs'gsv(kwx(]x#V(k#V#WIU#W~(k!RI]V!``!bpOr(krs'gsv(kwx(]x#h(k#h#iIr#i~(k!RIyV!``!bpOr(krs'gsv(kwx(]x#m(k#m#nJ`#n~(k!RJgV!``!bpOr(krs'gsv(kwx(]x#d(k#d#eJ|#e~(k!RKTV!``!bpOr(krs'gsv(kwx(]x#X(k#X#YDq#Y~(k!RKqW!``!bpOrKjrsLZsvKjvwLowxNPx!aKj!a!b! g!b~KjqL`T!bpOvLZvxLox!aLZ!a!bM^!b~LZPLrRO!aLo!a!bL{!b~LoPMORO!`Lo!`!aMX!a~LoPM^OwPqMcT!bpOvLZvxLox!`LZ!`!aMr!a~LZqMyQ!bpwPOv'gx~'gaNUV!``OrNPrsLosvNPvwLow!aNP!a!bNk!b~NPaNpV!``OrNPrsLosvNPvwLow!`NP!`!a! V!a~NPa! ^R!``wPOr(]sv(]w~(]!R! nW!``!bpOrKjrsLZsvKjvwLowxNPx!`Kj!`!a!!W!a~Kj!R!!aT!``!bpwPOr(krs'gsv(kwx(]x~(k!V!!{VgS^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R",
  tokenizers: [scriptTokens, styleTokens, textareaTokens, tagStart, commentContent, 0, 1, 2, 3, 4, 5],
  topRules: {"Document":[0,13]},
  dialects: {noMatch: 0},
  tokenPrec: 464
});

function getAttrs(element, input) {
  let attrs = Object.create(null);
  for (let att of element.firstChild.getChildren("Attribute")) {
    let name = att.getChild("AttributeName"), value = att.getChild("AttributeValue") || att.getChild("UnquotedAttributeValue");
    if (name) attrs[input.read(name.from, name.to)] =
      !value ? "" : value.name == "AttributeValue" ? input.read(value.from + 1, value.to - 1) : input.read(value.from, value.to);
  }
  return attrs
}

function maybeNest(node, input, tags) {
  let attrs;
  for (let tag of tags) {
    if (!tag.attrs || tag.attrs(attrs || (attrs = getAttrs(node.node.parent, input))))
      return {parser: tag.parser}
  }
  return null
}

// tags: {
//   tag: "script" | "style" | "textarea",
//   attrs?: ({[attr: string]: string}) => boolean,
//   parser: Parser
// }[]
 
function configureNesting(tags) {
  let script = [], style = [], textarea = [];
  for (let tag of tags) {
    let array = tag.tag == "script" ? script : tag.tag == "style" ? style : tag.tag == "textarea" ? textarea : null;
    if (!array) throw new RangeError("Only script, style, and textarea tags can host nested parsers")
    array.push(tag);
  }
  return (0,common_dist/* parseMixed */.$g)((node, input) => {
    let id = node.type.id;
    if (id == ScriptText) return maybeNest(node, input, script)
    if (id == StyleText) return maybeNest(node, input, style)
    if (id == TextareaText) return maybeNest(node, input, textarea)
    return null
  })
}



// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+lang-css@6.2.0_@codemirror+view@6.12.0/node_modules/@codemirror/lang-css/dist/index.js + 1 modules
var lang_css_dist = __webpack_require__(6604);
// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+lang-javascript@6.1.7/node_modules/@codemirror/lang-javascript/dist/index.js + 1 modules
var lang_javascript_dist = __webpack_require__(49609);
// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+view@6.12.0/node_modules/@codemirror/view/dist/index.js
var view_dist = __webpack_require__(17628);
// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+state@6.2.1/node_modules/@codemirror/state/dist/index.js
var state_dist = __webpack_require__(71380);
// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+language@6.7.0/node_modules/@codemirror/language/dist/index.js
var language_dist = __webpack_require__(12726);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@codemirror+lang-html@6.1.0_@codemirror+view@6.12.0/node_modules/@codemirror/lang-html/dist/index.js







const Targets = ["_blank", "_self", "_top", "_parent"];
const Charsets = ["ascii", "utf-8", "utf-16", "latin1", "latin1"];
const Methods = ["get", "post", "put", "delete"];
const Encs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
const Bool = ["true", "false"];
const S = {}; // Empty tag spec
const Tags = {
    a: {
        attrs: {
            href: null, ping: null, type: null,
            media: null,
            target: Targets,
            hreflang: null
        }
    },
    abbr: S,
    acronym: S,
    address: S,
    applet: S,
    area: {
        attrs: {
            alt: null, coords: null, href: null, target: null, ping: null,
            media: null, hreflang: null, type: null,
            shape: ["default", "rect", "circle", "poly"]
        }
    },
    article: S,
    aside: S,
    audio: {
        attrs: {
            src: null, mediagroup: null,
            crossorigin: ["anonymous", "use-credentials"],
            preload: ["none", "metadata", "auto"],
            autoplay: ["autoplay"],
            loop: ["loop"],
            controls: ["controls"]
        }
    },
    b: S,
    base: { attrs: { href: null, target: Targets } },
    basefont: S,
    bdi: S,
    bdo: S,
    big: S,
    blockquote: { attrs: { cite: null } },
    body: S,
    br: S,
    button: {
        attrs: {
            form: null, formaction: null, name: null, value: null,
            autofocus: ["autofocus"],
            disabled: ["autofocus"],
            formenctype: Encs,
            formmethod: Methods,
            formnovalidate: ["novalidate"],
            formtarget: Targets,
            type: ["submit", "reset", "button"]
        }
    },
    canvas: { attrs: { width: null, height: null } },
    caption: S,
    center: S,
    cite: S,
    code: S,
    col: { attrs: { span: null } },
    colgroup: { attrs: { span: null } },
    command: {
        attrs: {
            type: ["command", "checkbox", "radio"],
            label: null, icon: null, radiogroup: null, command: null, title: null,
            disabled: ["disabled"],
            checked: ["checked"]
        }
    },
    data: { attrs: { value: null } },
    datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
    datalist: { attrs: { data: null } },
    dd: S,
    del: { attrs: { cite: null, datetime: null } },
    details: { attrs: { open: ["open"] } },
    dfn: S,
    dir: S,
    div: S,
    dl: S,
    dt: S,
    em: S,
    embed: { attrs: { src: null, type: null, width: null, height: null } },
    eventsource: { attrs: { src: null } },
    fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
    figcaption: S,
    figure: S,
    font: S,
    footer: S,
    form: {
        attrs: {
            action: null, name: null,
            "accept-charset": Charsets,
            autocomplete: ["on", "off"],
            enctype: Encs,
            method: Methods,
            novalidate: ["novalidate"],
            target: Targets
        }
    },
    frame: S,
    frameset: S,
    h1: S, h2: S, h3: S, h4: S, h5: S, h6: S,
    head: {
        children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
    },
    header: S,
    hgroup: S,
    hr: S,
    html: {
        attrs: { manifest: null }
    },
    i: S,
    iframe: {
        attrs: {
            src: null, srcdoc: null, name: null, width: null, height: null,
            sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
            seamless: ["seamless"]
        }
    },
    img: {
        attrs: {
            alt: null, src: null, ismap: null, usemap: null, width: null, height: null,
            crossorigin: ["anonymous", "use-credentials"]
        }
    },
    input: {
        attrs: {
            alt: null, dirname: null, form: null, formaction: null,
            height: null, list: null, max: null, maxlength: null, min: null,
            name: null, pattern: null, placeholder: null, size: null, src: null,
            step: null, value: null, width: null,
            accept: ["audio/*", "video/*", "image/*"],
            autocomplete: ["on", "off"],
            autofocus: ["autofocus"],
            checked: ["checked"],
            disabled: ["disabled"],
            formenctype: Encs,
            formmethod: Methods,
            formnovalidate: ["novalidate"],
            formtarget: Targets,
            multiple: ["multiple"],
            readonly: ["readonly"],
            required: ["required"],
            type: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month",
                "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio",
                "file", "submit", "image", "reset", "button"]
        }
    },
    ins: { attrs: { cite: null, datetime: null } },
    kbd: S,
    keygen: {
        attrs: {
            challenge: null, form: null, name: null,
            autofocus: ["autofocus"],
            disabled: ["disabled"],
            keytype: ["RSA"]
        }
    },
    label: { attrs: { for: null, form: null } },
    legend: S,
    li: { attrs: { value: null } },
    link: {
        attrs: {
            href: null, type: null,
            hreflang: null,
            media: null,
            sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
        }
    },
    map: { attrs: { name: null } },
    mark: S,
    menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
    meta: {
        attrs: {
            content: null,
            charset: Charsets,
            name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
            "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
        }
    },
    meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
    nav: S,
    noframes: S,
    noscript: S,
    object: {
        attrs: {
            data: null, type: null, name: null, usemap: null, form: null, width: null, height: null,
            typemustmatch: ["typemustmatch"]
        }
    },
    ol: { attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
        children: ["li", "script", "template", "ul", "ol"] },
    optgroup: { attrs: { disabled: ["disabled"], label: null } },
    option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
    output: { attrs: { for: null, form: null, name: null } },
    p: S,
    param: { attrs: { name: null, value: null } },
    pre: S,
    progress: { attrs: { value: null, max: null } },
    q: { attrs: { cite: null } },
    rp: S,
    rt: S,
    ruby: S,
    s: S,
    samp: S,
    script: {
        attrs: {
            type: ["text/javascript"],
            src: null,
            async: ["async"],
            defer: ["defer"],
            charset: Charsets
        }
    },
    section: S,
    select: {
        attrs: {
            form: null, name: null, size: null,
            autofocus: ["autofocus"],
            disabled: ["disabled"],
            multiple: ["multiple"]
        }
    },
    slot: { attrs: { name: null } },
    small: S,
    source: { attrs: { src: null, type: null, media: null } },
    span: S,
    strike: S,
    strong: S,
    style: {
        attrs: {
            type: ["text/css"],
            media: null,
            scoped: null
        }
    },
    sub: S,
    summary: S,
    sup: S,
    table: S,
    tbody: S,
    td: { attrs: { colspan: null, rowspan: null, headers: null } },
    template: S,
    textarea: {
        attrs: {
            dirname: null, form: null, maxlength: null, name: null, placeholder: null,
            rows: null, cols: null,
            autofocus: ["autofocus"],
            disabled: ["disabled"],
            readonly: ["readonly"],
            required: ["required"],
            wrap: ["soft", "hard"]
        }
    },
    tfoot: S,
    th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
    thead: S,
    time: { attrs: { datetime: null } },
    title: S,
    tr: S,
    track: {
        attrs: {
            src: null, label: null, default: null,
            kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
            srclang: null
        }
    },
    tt: S,
    u: S,
    ul: { children: ["li", "script", "template", "ul", "ol"] },
    var: S,
    video: {
        attrs: {
            src: null, poster: null, width: null, height: null,
            crossorigin: ["anonymous", "use-credentials"],
            preload: ["auto", "metadata", "none"],
            autoplay: ["autoplay"],
            mediagroup: ["movie"],
            muted: ["muted"],
            controls: ["controls"]
        }
    },
    wbr: S
};
const GlobalAttrs = {
    accesskey: null,
    class: null,
    contenteditable: Bool,
    contextmenu: null,
    dir: ["ltr", "rtl", "auto"],
    draggable: ["true", "false", "auto"],
    dropzone: ["copy", "move", "link", "string:", "file:"],
    hidden: ["hidden"],
    id: null,
    inert: ["inert"],
    itemid: null,
    itemprop: null,
    itemref: null,
    itemscope: ["itemscope"],
    itemtype: null,
    lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
    spellcheck: Bool,
    autocorrect: Bool,
    autocapitalize: Bool,
    style: null,
    tabindex: null,
    title: null,
    translate: ["yes", "no"],
    onclick: null,
    rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
    role: /*@__PURE__*/"alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
    "aria-activedescendant": null,
    "aria-atomic": Bool,
    "aria-autocomplete": ["inline", "list", "both", "none"],
    "aria-busy": Bool,
    "aria-checked": ["true", "false", "mixed", "undefined"],
    "aria-controls": null,
    "aria-describedby": null,
    "aria-disabled": Bool,
    "aria-dropeffect": null,
    "aria-expanded": ["true", "false", "undefined"],
    "aria-flowto": null,
    "aria-grabbed": ["true", "false", "undefined"],
    "aria-haspopup": Bool,
    "aria-hidden": Bool,
    "aria-invalid": ["true", "false", "grammar", "spelling"],
    "aria-label": null,
    "aria-labelledby": null,
    "aria-level": null,
    "aria-live": ["off", "polite", "assertive"],
    "aria-multiline": Bool,
    "aria-multiselectable": Bool,
    "aria-owns": null,
    "aria-posinset": null,
    "aria-pressed": ["true", "false", "mixed", "undefined"],
    "aria-readonly": Bool,
    "aria-relevant": null,
    "aria-required": Bool,
    "aria-selected": ["true", "false", "undefined"],
    "aria-setsize": null,
    "aria-sort": ["ascending", "descending", "none", "other"],
    "aria-valuemax": null,
    "aria-valuemin": null,
    "aria-valuenow": null,
    "aria-valuetext": null
};
class Schema {
    constructor(extraTags, extraAttrs) {
        this.tags = Object.assign(Object.assign({}, Tags), extraTags);
        this.globalAttrs = Object.assign(Object.assign({}, GlobalAttrs), extraAttrs);
        this.allTags = Object.keys(this.tags);
        this.globalAttrNames = Object.keys(this.globalAttrs);
    }
}
Schema.default = /*@__PURE__*/new Schema;
function elementName(doc, tree, max = doc.length) {
    if (!tree)
        return "";
    let tag = tree.firstChild;
    let name = tag && tag.getChild("TagName");
    return name ? doc.sliceString(name.from, Math.min(name.to, max)) : "";
}
function findParentElement(tree, skip = false) {
    for (let cur = tree.parent; cur; cur = cur.parent)
        if (cur.name == "Element") {
            if (skip)
                skip = false;
            else
                return cur;
        }
    return null;
}
function allowedChildren(doc, tree, schema) {
    let parentInfo = schema.tags[elementName(doc, findParentElement(tree, true))];
    return (parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.children) || schema.allTags;
}
function openTags(doc, tree) {
    let open = [];
    for (let parent = tree; parent = findParentElement(parent);) {
        let tagName = elementName(doc, parent);
        if (tagName && parent.lastChild.name == "CloseTag")
            break;
        if (tagName && open.indexOf(tagName) < 0 && (tree.name == "EndTag" || tree.from >= parent.firstChild.to))
            open.push(tagName);
    }
    return open;
}
const identifier = /^[:\-\.\w\u00b7-\uffff]*$/;
function completeTag(state, schema, tree, from, to) {
    let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
    return { from, to,
        options: allowedChildren(state.doc, tree, schema).map(tagName => ({ label: tagName, type: "type" })).concat(openTags(state.doc, tree).map((tag, i) => ({ label: "/" + tag, apply: "/" + tag + end,
            type: "type", boost: 99 - i }))),
        validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function completeCloseTag(state, tree, from, to) {
    let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
    return { from, to,
        options: openTags(state.doc, tree).map((tag, i) => ({ label: tag, apply: tag + end, type: "type", boost: 99 - i })),
        validFor: identifier };
}
function completeStartTag(state, schema, tree, pos) {
    let options = [], level = 0;
    for (let tagName of allowedChildren(state.doc, tree, schema))
        options.push({ label: "<" + tagName, type: "type" });
    for (let open of openTags(state.doc, tree))
        options.push({ label: "</" + open + ">", type: "type", boost: 99 - level++ });
    return { from: pos, to: pos, options, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function completeAttrName(state, schema, tree, from, to) {
    let elt = findParentElement(tree), info = elt ? schema.tags[elementName(state.doc, elt)] : null;
    let names = (info && info.attrs ? Object.keys(info.attrs).concat(schema.globalAttrNames) : schema.globalAttrNames);
    return { from, to,
        options: names.map(attrName => ({ label: attrName, type: "property" })),
        validFor: identifier };
}
function completeAttrValue(state, schema, tree, from, to) {
    var _a;
    let nameNode = (_a = tree.parent) === null || _a === void 0 ? void 0 : _a.getChild("AttributeName");
    let options = [], token = undefined;
    if (nameNode) {
        let attrName = state.sliceDoc(nameNode.from, nameNode.to);
        let attrs = schema.globalAttrs[attrName];
        if (!attrs) {
            let elt = findParentElement(tree), info = elt ? schema.tags[elementName(state.doc, elt)] : null;
            attrs = (info === null || info === void 0 ? void 0 : info.attrs) && info.attrs[attrName];
        }
        if (attrs) {
            let base = state.sliceDoc(from, to).toLowerCase(), quoteStart = '"', quoteEnd = '"';
            if (/^['"]/.test(base)) {
                token = base[0] == '"' ? /^[^"]*$/ : /^[^']*$/;
                quoteStart = "";
                quoteEnd = state.sliceDoc(to, to + 1) == base[0] ? "" : base[0];
                base = base.slice(1);
                from++;
            }
            else {
                token = /^[^\s<>='"]*$/;
            }
            for (let value of attrs)
                options.push({ label: value, apply: quoteStart + value + quoteEnd, type: "constant" });
        }
    }
    return { from, to, options, validFor: token };
}
function htmlCompletionFor(schema, context) {
    let { state, pos } = context, around = (0,language_dist/* syntaxTree */.mv)(state).resolveInner(pos), tree = around.resolve(pos, -1);
    for (let scan = pos, before; around == tree && (before = tree.childBefore(scan));) {
        let last = before.lastChild;
        if (!last || !last.type.isError || last.from < last.to)
            break;
        around = tree = before;
        scan = last.from;
    }
    if (tree.name == "TagName") {
        return tree.parent && /CloseTag$/.test(tree.parent.name) ? completeCloseTag(state, tree, tree.from, pos)
            : completeTag(state, schema, tree, tree.from, pos);
    }
    else if (tree.name == "StartTag") {
        return completeTag(state, schema, tree, pos, pos);
    }
    else if (tree.name == "StartCloseTag" || tree.name == "IncompleteCloseTag") {
        return completeCloseTag(state, tree, pos, pos);
    }
    else if (context.explicit && (tree.name == "OpenTag" || tree.name == "SelfClosingTag") || tree.name == "AttributeName") {
        return completeAttrName(state, schema, tree, tree.name == "AttributeName" ? tree.from : pos, pos);
    }
    else if (tree.name == "Is" || tree.name == "AttributeValue" || tree.name == "UnquotedAttributeValue") {
        return completeAttrValue(state, schema, tree, tree.name == "Is" ? pos : tree.from, pos);
    }
    else if (context.explicit && (around.name == "Element" || around.name == "Text" || around.name == "Document")) {
        return completeStartTag(state, schema, tree, pos);
    }
    else {
        return null;
    }
}
/**
HTML tag completion. Opens and closes tags and attributes in a
context-aware way.
*/
function htmlCompletionSource(context) {
    return htmlCompletionFor(Schema.default, context);
}
/**
Create a completion source for HTML extended with additional tags
or attributes.
*/
function htmlCompletionSourceWith(config) {
    let { extraTags, extraGlobalAttributes: extraAttrs } = config;
    let schema = extraAttrs || extraTags ? new Schema(extraTags, extraAttrs) : Schema.default;
    return (context) => htmlCompletionFor(schema, context);
}

/**
A language provider based on the [Lezer HTML
parser](https://github.com/lezer-parser/html), extended with the
JavaScript and CSS parsers to parse the content of `<script>` and
`<style>` tags.
*/
const htmlLanguage = /*@__PURE__*/language_dist/* LRLanguage */.bj.define({
    parser: /*@__PURE__*/parser.configure({
        props: [
            /*@__PURE__*/language_dist/* indentNodeProp */.Oh.add({
                Element(context) {
                    let after = /^(\s*)(<\/)?/.exec(context.textAfter);
                    if (context.node.to <= context.pos + after[0].length)
                        return context.continue();
                    return context.lineIndent(context.node.from) + (after[2] ? 0 : context.unit);
                },
                "OpenTag CloseTag SelfClosingTag"(context) {
                    return context.column(context.node.from) + context.unit;
                },
                Document(context) {
                    if (context.pos + /\s*/.exec(context.textAfter)[0].length < context.node.to)
                        return context.continue();
                    let endElt = null, close;
                    for (let cur = context.node;;) {
                        let last = cur.lastChild;
                        if (!last || last.name != "Element" || last.to != cur.to)
                            break;
                        endElt = cur = last;
                    }
                    if (endElt && !((close = endElt.lastChild) && (close.name == "CloseTag" || close.name == "SelfClosingTag")))
                        return context.lineIndent(endElt.from) + context.unit;
                    return null;
                }
            }),
            /*@__PURE__*/language_dist/* foldNodeProp */.b_.add({
                Element(node) {
                    let first = node.firstChild, last = node.lastChild;
                    if (!first || first.name != "OpenTag")
                        return null;
                    return { from: first.to, to: last.name == "CloseTag" ? last.from : node.to };
                }
            })
        ],
        wrap: /*@__PURE__*/configureNesting([
            { tag: "script",
                attrs(attrs) {
                    return !attrs.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(attrs.type);
                },
                parser: lang_javascript_dist.javascriptLanguage.parser },
            { tag: "style",
                attrs(attrs) {
                    return (!attrs.lang || attrs.lang == "css") && (!attrs.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(attrs.type));
                },
                parser: lang_css_dist.cssLanguage.parser }
        ])
    }),
    languageData: {
        commentTokens: { block: { open: "<!--", close: "-->" } },
        indentOnInput: /^\s*<\/\w+\W$/,
        wordChars: "-._"
    }
});
/**
Language support for HTML, including
[`htmlCompletion`](https://codemirror.net/6/docs/ref/#lang-html.htmlCompletion) and JavaScript and
CSS support extensions.
*/
function html(config = {}) {
    let lang = htmlLanguage;
    if (config.matchClosingTags === false)
        lang = lang.configure({ dialect: "noMatch" });
    return new language_dist/* LanguageSupport */.Yy(lang, [
        htmlLanguage.data.of({ autocomplete: htmlCompletionSourceWith(config) }),
        config.autoCloseTags !== false ? autoCloseTags : [],
        (0,lang_javascript_dist.javascript)().support,
        (0,lang_css_dist.css)().support
    ]);
}
/**
Extension that will automatically insert close tags when a `>` or
`/` is typed.
*/
const autoCloseTags = /*@__PURE__*/view_dist/* EditorView */.Lz.inputHandler.of((view, from, to, text) => {
    if (view.composing || view.state.readOnly || from != to || (text != ">" && text != "/") ||
        !htmlLanguage.isActiveAt(view.state, from, -1))
        return false;
    let { state } = view;
    let changes = state.changeByRange(range => {
        var _a, _b, _c;
        let { head } = range, around = (0,language_dist/* syntaxTree */.mv)(state).resolveInner(head, -1), name;
        if (around.name == "TagName" || around.name == "StartTag")
            around = around.parent;
        if (text == ">" && around.name == "OpenTag") {
            if (((_b = (_a = around.parent) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.name) != "CloseTag" && (name = elementName(state.doc, around.parent, head)))
                return { range: state_dist/* EditorSelection */.OF.cursor(head + 1), changes: { from: head, insert: `></${name}>` } };
        }
        else if (text == "/" && around.name == "OpenTag") {
            let empty = around.parent, base = empty === null || empty === void 0 ? void 0 : empty.parent;
            if (empty.from == head - 1 && ((_c = base.lastChild) === null || _c === void 0 ? void 0 : _c.name) != "CloseTag" && (name = elementName(state.doc, base, head))) {
                let insert = `/${name}>`;
                return { range: state_dist/* EditorSelection */.OF.cursor(head + insert.length), changes: { from: head, insert } };
            }
        }
        return { range };
    });
    if (changes.changes.empty)
        return false;
    view.dispatch(changes, { userEvent: "input.type", scrollIntoView: true });
    return true;
});




/***/ }),

/***/ 49609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  autoCloseTags: () => (/* binding */ autoCloseTags),
  completionPath: () => (/* binding */ completionPath),
  esLint: () => (/* binding */ esLint),
  javascript: () => (/* binding */ javascript),
  javascriptLanguage: () => (/* binding */ javascriptLanguage),
  jsxLanguage: () => (/* binding */ jsxLanguage),
  localCompletionSource: () => (/* binding */ localCompletionSource),
  scopeCompletionSource: () => (/* binding */ scopeCompletionSource),
  snippets: () => (/* binding */ snippets),
  tsxLanguage: () => (/* binding */ tsxLanguage),
  typescriptLanguage: () => (/* binding */ typescriptLanguage)
});

// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+lr@1.3.4/node_modules/@lezer/lr/dist/index.js
var dist = __webpack_require__(65983);
// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+highlight@1.0.0/node_modules/@lezer/highlight/dist/index.js
var highlight_dist = __webpack_require__(38682);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@lezer+javascript@1.0.0/node_modules/@lezer/javascript/dist/index.es.js



// This file was generated by lezer-generator. You probably shouldn't edit it.
const noSemi = 281,
  incdec = 1,
  incdecPrefix = 2,
  templateContent = 282,
  InterpolationStart = 3,
  templateEnd = 283,
  insertSemi = 284,
  TSExtends = 4,
  spaces = 286,
  newline = 287,
  LineComment = 5,
  BlockComment = 6,
  Dialect_ts = 1;

/* Hand-written tokenizers for JavaScript tokens that can't be
   expressed by lezer's built-in tokenizer. */

const space = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200,
               8201, 8202, 8232, 8233, 8239, 8287, 12288];

const braceR = 125, braceL = 123, semicolon = 59, slash = 47, star = 42,
      plus = 43, minus = 45, dollar = 36, backtick = 96, backslash = 92;

const trackNewline = new dist/* ContextTracker */.Aj({
  start: false,
  shift(context, term) {
    return term == LineComment || term == BlockComment || term == spaces ? context : term == newline
  },
  strict: false
});

const insertSemicolon = new dist/* ExternalTokenizer */.Lu((input, stack) => {
  let {next} = input;
  if ((next == braceR || next == -1 || stack.context) && stack.canShift(insertSemi))
    input.acceptToken(insertSemi);
}, {contextual: true, fallback: true});

const noSemicolon = new dist/* ExternalTokenizer */.Lu((input, stack) => {
  let {next} = input, after;
  if (space.indexOf(next) > -1) return
  if (next == slash && ((after = input.peek(1)) == slash || after == star)) return
  if (next != braceR && next != semicolon && next != -1 && !stack.context && stack.canShift(noSemi))
    input.acceptToken(noSemi);
}, {contextual: true});

const incdecToken = new dist/* ExternalTokenizer */.Lu((input, stack) => {
  let {next} = input;
  if (next == plus || next == minus) {
    input.advance();
    if (next == input.next) {
      input.advance();
      let mayPostfix = !stack.context && stack.canShift(incdec);
      input.acceptToken(mayPostfix ? incdec : incdecPrefix);
    }
  }
}, {contextual: true});

const template = new dist/* ExternalTokenizer */.Lu(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input;
    if (next < 0) {
      if (i) input.acceptToken(templateContent);
      break
    } else if (next == backtick) {
      if (i) input.acceptToken(templateContent);
      else input.acceptToken(templateEnd, 1);
      break
    } else if (next == braceL && afterDollar) {
      if (i == 1) input.acceptToken(InterpolationStart, 1);
      else input.acceptToken(templateContent, -1);
      break
    } else if (next == 10 /* "\n" */ && i) {
      // Break up template strings on lines, to avoid huge tokens
      input.advance();
      input.acceptToken(templateContent);
      break
    } else if (next == backslash) {
      input.advance();
    }
    afterDollar = next == dollar;
    input.advance();
  }
});

function tsExtends(value, stack) {
  return value == "extends" && stack.dialectEnabled(Dialect_ts) ? TSExtends : -1
}

const jsHighlight = (0,highlight_dist/* styleTags */.pn)({
  "get set async static": highlight_dist/* tags */._A.modifier,
  "for while do if else switch try catch finally return throw break continue default case": highlight_dist/* tags */._A.controlKeyword,
  "in of await yield void typeof delete instanceof": highlight_dist/* tags */._A.operatorKeyword,
  "let var const function class extends": highlight_dist/* tags */._A.definitionKeyword,
  "import export from": highlight_dist/* tags */._A.moduleKeyword,
  "with debugger as new": highlight_dist/* tags */._A.keyword,
  TemplateString: highlight_dist/* tags */._A.special(highlight_dist/* tags */._A.string),
  Super: highlight_dist/* tags */._A.atom,
  BooleanLiteral: highlight_dist/* tags */._A.bool,
  this: highlight_dist/* tags */._A.self,
  null: highlight_dist/* tags */._A.null,
  Star: highlight_dist/* tags */._A.modifier,
  VariableName: highlight_dist/* tags */._A.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": highlight_dist/* tags */._A.function(highlight_dist/* tags */._A.variableName),
  VariableDefinition: highlight_dist/* tags */._A.definition(highlight_dist/* tags */._A.variableName),
  Label: highlight_dist/* tags */._A.labelName,
  PropertyName: highlight_dist/* tags */._A.propertyName,
  PrivatePropertyName: highlight_dist/* tags */._A.special(highlight_dist/* tags */._A.propertyName),
  "CallExpression/MemberExpression/PropertyName": highlight_dist/* tags */._A.function(highlight_dist/* tags */._A.propertyName),
  "FunctionDeclaration/VariableDefinition": highlight_dist/* tags */._A.function(highlight_dist/* tags */._A.definition(highlight_dist/* tags */._A.variableName)),
  "ClassDeclaration/VariableDefinition": highlight_dist/* tags */._A.definition(highlight_dist/* tags */._A.className),
  PropertyDefinition: highlight_dist/* tags */._A.definition(highlight_dist/* tags */._A.propertyName),
  PrivatePropertyDefinition: highlight_dist/* tags */._A.definition(highlight_dist/* tags */._A.special(highlight_dist/* tags */._A.propertyName)),
  UpdateOp: highlight_dist/* tags */._A.updateOperator,
  LineComment: highlight_dist/* tags */._A.lineComment,
  BlockComment: highlight_dist/* tags */._A.blockComment,
  Number: highlight_dist/* tags */._A.number,
  String: highlight_dist/* tags */._A.string,
  ArithOp: highlight_dist/* tags */._A.arithmeticOperator,
  LogicOp: highlight_dist/* tags */._A.logicOperator,
  BitOp: highlight_dist/* tags */._A.bitwiseOperator,
  CompareOp: highlight_dist/* tags */._A.compareOperator,
  RegExp: highlight_dist/* tags */._A.regexp,
  Equals: highlight_dist/* tags */._A.definitionOperator,
  "Arrow : Spread": highlight_dist/* tags */._A.punctuation,
  "( )": highlight_dist/* tags */._A.paren,
  "[ ]": highlight_dist/* tags */._A.squareBracket,
  "{ }": highlight_dist/* tags */._A.brace,
  "InterpolationStart InterpolationEnd": highlight_dist/* tags */._A.special(highlight_dist/* tags */._A.brace),
  ".": highlight_dist/* tags */._A.derefOperator,
  ", ;": highlight_dist/* tags */._A.separator,

  TypeName: highlight_dist/* tags */._A.typeName,
  TypeDefinition: highlight_dist/* tags */._A.definition(highlight_dist/* tags */._A.typeName),
  "type enum interface implements namespace module declare": highlight_dist/* tags */._A.definitionKeyword,
  "abstract global Privacy readonly override": highlight_dist/* tags */._A.modifier,
  "is keyof unique infer": highlight_dist/* tags */._A.operatorKeyword,

  JSXAttributeValue: highlight_dist/* tags */._A.attributeValue,
  JSXText: highlight_dist/* tags */._A.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": highlight_dist/* tags */._A.angleBracket,
  "JSXIdentifier JSXNameSpacedName": highlight_dist/* tags */._A.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": highlight_dist/* tags */._A.attributeName
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_identifier = {__proto__:null,export:18, as:23, from:29, default:32, async:37, function:38, this:48, true:56, false:56, void:66, typeof:70, null:86, super:88, new:122, await:139, yield:141, delete:142, class:152, extends:154, public:197, private:197, protected:197, readonly:199, instanceof:220, in:222, const:224, import:256, keyof:307, unique:311, infer:317, is:351, abstract:371, implements:373, type:375, let:378, var:380, interface:387, enum:391, namespace:397, module:399, declare:403, global:407, for:428, of:437, while:440, with:444, do:448, if:452, else:454, switch:458, case:464, try:470, catch:474, finally:478, return:482, throw:486, break:490, continue:494, debugger:498};
const spec_word = {__proto__:null,async:109, get:111, set:113, public:161, private:161, protected:161, static:163, abstract:165, override:167, readonly:173, new:355};
const spec_LessThan = {__proto__:null,"<":129};
const parser = dist/* LRParser */.U1.deserialize({
  version: 14,
  states: "$4|O`QYOOO'QQ$IfO'#ChO'XOSO'#DVO)dQYO'#D]O)tQYO'#DhO){QYO'#DrO-xQYO'#DxOOQO'#E]'#E]O.]QWO'#E[O.bQWO'#E[OOQ$IU'#Ef'#EfO0aQ$IfO'#ItO2wQ$IfO'#IuO3eQWO'#EzO3jQpO'#FaOOQ$IU'#FS'#FSO3rO!bO'#FSO4QQWO'#FhO5_QWO'#FgOOQ$IU'#Iu'#IuOOQ$IS'#It'#ItOOQQ'#J^'#J^O5dQWO'#HpO5iQ$I[O'#HqOOQQ'#Ih'#IhOOQQ'#Hr'#HrQ`QYOOO){QYO'#DjO5qQWO'#G[O5vQ#tO'#CmO6UQWO'#EZO6aQWO'#EgO6fQ#tO'#FRO7QQWO'#G[O7VQWO'#G`O7bQWO'#G`O7pQWO'#GcO7pQWO'#GdO7pQWO'#GfO5qQWO'#GiO8aQWO'#GlO9oQWO'#CdO:PQWO'#GyO:XQWO'#HPO:XQWO'#HRO`QYO'#HTO:XQWO'#HVO:XQWO'#HYO:^QWO'#H`O:cQ$I]O'#HfO){QYO'#HhO:nQ$I]O'#HjO:yQ$I]O'#HlO5iQ$I[O'#HnO){QYO'#DWOOOS'#Ht'#HtO;UOSO,59qOOQ$IU,59q,59qO=gQbO'#ChO=qQYO'#HuO>UQWO'#IvO@TQbO'#IvO'dQYO'#IvO@[QWO,59wO@rQ&jO'#DbOAkQWO'#E]OAxQWO'#JROBTQWO'#JQOBTQWO'#JQOB]QWO,5:yOBbQWO'#JPOBiQWO'#DyO5vQ#tO'#EZOBwQWO'#EZOCSQ`O'#FROOQ$IU,5:S,5:SOC[QYO,5:SOEYQ$IfO,5:^OEvQWO,5:dOFaQ$I[O'#JOO7VQWO'#I}OFhQWO'#I}OFpQWO,5:xOFuQWO'#I}OGTQYO,5:vOITQWO'#EWOJ_QWO,5:vOKnQWO'#DlOKuQYO'#DqOLPQ&jO,5;PO){QYO,5;POOQQ'#Er'#ErOOQQ'#Et'#EtO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;ROOQQ'#Ex'#ExOLXQYO,5;cOOQ$IU,5;h,5;hOOQ$IU,5;i,5;iONXQWO,5;iOOQ$IU,5;j,5;jO){QYO'#IPON^Q$I[O,5<TONxQWO,5;RO){QYO,5;fO! bQpO'#JVO! PQpO'#JVO! iQpO'#JVO! zQpO,5;qOOOO,5;{,5;{O!!YQYO'#FcOOOO'#IO'#IOO3rO!bO,5;nO!!aQpO'#FeOOQ$IU,5;n,5;nO!!}Q,UO'#CrOOQ$IU'#Cu'#CuO!#bQWO'#CuO!#gOSO'#CyO!$TQ#tO,5<QO!$[QWO,5<SO!%hQWO'#FrO!%uQWO'#FsO!%zQWO'#FwO!&yQ&jO'#F{O!'lQ,UO'#IqOOQ$IU'#Iq'#IqO!'vQWO'#IpO!(UQWO'#IoOOQ$IU'#Cs'#CsOOQ$IU'#C|'#C|O!(^QWO'#DOOJdQWO'#FjOJdQWO'#FlO!(cQWO'#FnO!(hQWO'#FoO!(mQWO'#FuOJdQWO'#FzO!(rQWO'#E^O!)ZQWO,5<RO`QYO,5>[OOQQ'#Ik'#IkOOQQ,5>],5>]OOQQ-E;p-E;pO!+VQ$IfO,5:UOOQ$IS'#Cp'#CpO!+vQ#tO,5<vOOQO'#Cf'#CfO!,XQWO'#CqO!,aQ$I[O'#IlO5_QWO'#IlO:^QWO,59XO!,rQpO,59XO!,zQ#tO,59XO5vQ#tO,59XO!-VQWO,5:vO!-_QWO'#GxO!-mQWO'#JbO){QYO,5;kO!-uQ&jO,5;mO!-zQWO,5=cO!.PQWO,5=cO!.UQWO,5=cO5iQ$I[O,5=cO5qQWO,5<vO!.dQWO'#E_O!.xQ&jO'#E`OOQ$IS'#JP'#JPO!/ZQ$I[O'#J_O5iQ$I[O,5<zO7pQWO,5=QOOQO'#Cr'#CrO!/fQpO,5<}O!/nQ#tO,5=OO!/yQWO,5=QO!0OQ`O,5=TO:^QWO'#GnO5qQWO'#GpO!0WQWO'#GpO5vQ#tO'#GsO!0]QWO'#GsOOQQ,5=W,5=WO!0bQWO'#GtO!0jQWO'#CmO!0oQWO,59OO!0yQWO,59OO!2{QYO,59OOOQQ,59O,59OO!3YQ$I[O,59OO){QYO,59OO!3eQYO'#G{OOQQ'#G|'#G|OOQQ'#G}'#G}O`QYO,5=eO!3uQWO,5=eO){QYO'#DxO`QYO,5=kO`QYO,5=mO!3zQWO,5=oO`QYO,5=qO!4PQWO,5=tO!4UQYO,5=zOOQQ,5>Q,5>QO){QYO,5>QO5iQ$I[O,5>SOOQQ,5>U,5>UO!8VQWO,5>UOOQQ,5>W,5>WO!8VQWO,5>WOOQQ,5>Y,5>YO!8[Q`O,59rOOOS-E;r-E;rOOQ$IU1G/]1G/]O!8aQbO,5>aO'dQYO,5>aOOQO,5>f,5>fO!8kQYO'#HuOOQO-E;s-E;sO!8xQWO,5?bO!9QQbO,5?bO!9XQWO,5?lOOQ$IU1G/c1G/cO!9aQpO'#DTOOQO'#Ix'#IxO){QYO'#IxO!:OQpO'#IxO!:mQpO'#DcO!;OQ&jO'#DcO!=ZQYO'#DcO!=bQWO'#IwO!=jQWO,59|O!=oQWO'#EaO!=}QWO'#JSO!>VQWO,5:zO!>mQ&jO'#DcO){QYO,5?mO!>wQWO'#HzOOQO-E;x-E;xO!9XQWO,5?lOOQ$IS1G0e1G0eO!@TQ&jO'#D|OOQ$IU,5:e,5:eO){QYO,5:eOITQWO,5:eO!@[QWO,5:eO:^QWO,5:uO!,rQpO,5:uO!,zQ#tO,5:uO5vQ#tO,5:uOOQ$IU1G/n1G/nOOQ$IU1G0O1G0OOOQ$IS'#EV'#EVO){QYO,5?jO!@gQ$I[O,5?jO!@xQ$I[O,5?jO!APQWO,5?iO!AXQWO'#H|O!APQWO,5?iOOQ$IS1G0d1G0dO7VQWO,5?iOOQ$IU1G0b1G0bO!AsQ$IfO1G0bO!BdQ$IdO,5:rOOQ$IU'#Fq'#FqO!CQQ$IfO'#IqOGTQYO1G0bO!EPQ#tO'#IyO!EZQWO,5:WO!E`QbO'#IzO){QYO'#IzO!EjQWO,5:]OOQ$IU'#DT'#DTOOQ$IU1G0k1G0kO!EoQWO1G0kO!HQQ$IfO1G0mO!HXQ$IfO1G0mO!JlQ$IfO1G0mO!JsQ$IfO1G0mO!LzQ$IfO1G0mO!M_Q$IfO1G0mO#!OQ$IfO1G0mO#!VQ$IfO1G0mO#$jQ$IfO1G0mO#$qQ$IfO1G0mO#&fQ$IfO1G0mO#)`Q7^O'#ChO#+ZQ7^O1G0}O#-UQ7^O'#IuOOQ$IU1G1T1G1TO#-iQ$IfO,5>kOOQ$IS-E;}-E;}O#.YQ$IfO1G0mOOQ$IU1G0m1G0mO#0[Q$IfO1G1QO#0{QpO,5;sO#1QQpO,5;tO#1VQpO'#F[O#1kQWO'#FZOOQO'#JW'#JWOOQO'#H}'#H}O#1pQpO1G1]OOQ$IU1G1]1G1]OOOO1G1f1G1fO#2OQ7^O'#ItO#2YQWO,5;}OLXQYO,5;}OOOO-E;|-E;|OOQ$IU1G1Y1G1YOOQ$IU,5<P,5<PO#2_QpO,5<POOQ$IU,59a,59aOITQWO'#C{OOOS'#Hs'#HsO#2dOSO,59eOOQ$IU,59e,59eO){QYO1G1lO!(hQWO'#IRO#2oQWO,5<eOOQ$IU,5<b,5<bOOQO'#GV'#GVOJdQWO,5<pOOQO'#GX'#GXOJdQWO,5<rOJdQWO,5<tOOQO1G1n1G1nO#2zQ`O'#CpO#3_Q`O,5<^O#3fQWO'#JZO5qQWO'#JZO#3tQWO,5<`OJdQWO,5<_O#3yQ`O'#FqO#4WQ`O'#J[O#4bQWO'#J[OITQWO'#J[O#4gQWO,5<cOOQ$IS'#Dg'#DgO#4lQWO'#FtO#4wQpO'#F|O!&tQ&jO'#F|O!&tQ&jO'#GOO#5YQWO'#GPO!(mQWO'#GSO#5_Q$I[O'#ITO#5jQ&jO,5<gOOQ$IU,5<g,5<gO#5qQ&jO'#F|O#6PQ&jO'#F}O#6XQ&jO'#F}OOQ$IU,5<u,5<uOJdQWO,5?[OJdQWO,5?[O#6^QWO'#IUO#6iQWO,5?ZOOQ$IU'#Ch'#ChO#7]Q#tO,59jOOQ$IU,59j,59jO#8OQ#tO,5<UO#8qQ#tO,5<WO#8{QWO,5<YOOQ$IU,5<Z,5<ZO#9QQWO,5<aO#9VQ#tO,5<fOGTQYO1G1mO#9gQWO1G1mOOQQ1G3v1G3vOOQ$IU1G/p1G/pONXQWO1G/pOOQQ1G2b1G2bOITQWO1G2bO){QYO1G2bOITQWO1G2bO#9lQWO1G2bO#9zQWO,59]O#;TQWO'#EWOOQ$IS,5?W,5?WO#;_Q$I[O,5?WOOQQ1G.s1G.sO:^QWO1G.sO!,rQpO1G.sO!,zQ#tO1G.sO#;pQWO1G0bO#;uQWO'#ChO#<QQWO'#JcO#<YQWO,5=dO#<_QWO'#JcO#<dQWO'#JcO#<lQWO'#I^O#<zQWO,5?|O#=SQbO1G1VOOQ$IU1G1X1G1XO5qQWO1G2}O#=ZQWO1G2}O#=`QWO1G2}O#=eQWO1G2}OOQQ1G2}1G2}O#=jQ#tO1G2bO7VQWO'#JQO7VQWO'#EaO7VQWO'#IWO#={Q$I[O,5?yOOQQ1G2f1G2fO!/yQWO1G2lOITQWO1G2iO#>WQWO1G2iOOQQ1G2j1G2jOITQWO1G2jO#>]QWO1G2jO#>eQ&jO'#GhOOQQ1G2l1G2lO!&tQ&jO'#IYO!0OQ`O1G2oOOQQ1G2o1G2oOOQQ,5=Y,5=YO#>mQ#tO,5=[O5qQWO,5=[O#5YQWO,5=_O5_QWO,5=_O!,rQpO,5=_O!,zQ#tO,5=_O5vQ#tO,5=_O#?OQWO'#JaO#?ZQWO,5=`OOQQ1G.j1G.jO#?`Q$I[O1G.jO#?kQWO1G.jO#?pQWO1G.jO5iQ$I[O1G.jO#?xQbO,5@OO#@SQWO,5@OO#@_QYO,5=gO#@fQWO,5=gO7VQWO,5@OOOQQ1G3P1G3PO`QYO1G3POOQQ1G3V1G3VOOQQ1G3X1G3XO:XQWO1G3ZO#@kQYO1G3]O#DfQYO'#H[OOQQ1G3`1G3`O#DsQWO'#HbO:^QWO'#HdOOQQ1G3f1G3fO#D{QYO1G3fO5iQ$I[O1G3lOOQQ1G3n1G3nOOQ$IS'#Fx'#FxO5iQ$I[O1G3pO5iQ$I[O1G3rOOOS1G/^1G/^O#HyQ`O,5<TO#IRQbO1G3{OOQO1G4Q1G4QO){QYO,5>aO#I]QWO1G4|O#IeQWO1G5WO#ImQWO,5?dOLXQYO,5:{O7VQWO,5:{O:^QWO,59}OLXQYO,59}O!,rQpO,59}O#IrQ7^O,59}OOQO,5:{,5:{O#I|Q&jO'#HvO#JdQWO,5?cOOQ$IU1G/h1G/hO#JlQ&jO'#H{O#KQQWO,5?nOOQ$IS1G0f1G0fO!;OQ&jO,59}O#KYQbO1G5XO7VQWO,5>fOOQ$IS'#ES'#ESO#KdQ$ItO'#ETO!?{Q&jO'#D}OOQO'#Hy'#HyO#LOQ&jO,5:hOOQ$IU,5:h,5:hO#LVQ&jO'#D}O#LhQ&jO'#D}O#LoQ&jO'#EYO#LrQ&jO'#ETO#MPQ&jO'#ETO!?{Q&jO'#ETO#MdQWO1G0PO#MiQ`O1G0POOQ$IU1G0P1G0PO){QYO1G0POITQWO1G0POOQ$IU1G0a1G0aO:^QWO1G0aO!,rQpO1G0aO!,zQ#tO1G0aO#MpQ$IfO1G5UO){QYO1G5UO#NQQ$I[O1G5UO#NcQWO1G5TO7VQWO,5>hOOQO,5>h,5>hO#NkQWO,5>hOOQO-E;z-E;zO#NcQWO1G5TO#NyQ$IfO,59jO$!xQ$IfO,5<UO$$zQ$IfO,5<WO$&|Q$IfO,5<fOOQ$IU7+%|7+%|O$)UQ$IfO7+%|O$)uQWO'#HwO$*PQWO,5?eOOQ$IU1G/r1G/rO$*XQYO'#HxO$*fQWO,5?fO$*nQbO,5?fOOQ$IU1G/w1G/wOOQ$IU7+&V7+&VO$*xQ7^O,5:^O){QYO7+&iO$+SQ7^O,5:UOOQO1G1_1G1_OOQO1G1`1G1`O$+aQMhO,5;vOLXQYO,5;uOOQO-E;{-E;{OOQ$IU7+&w7+&wOOOO7+'Q7+'QOOOO1G1i1G1iO$+lQWO1G1iOOQ$IU1G1k1G1kO$+qQ`O,59gOOOS-E;q-E;qOOQ$IU1G/P1G/PO$+xQ$IfO7+'WOOQ$IU,5>m,5>mO$,iQWO,5>mOOQ$IU1G2P1G2PP$,nQWO'#IRPOQ$IU-E<P-E<PO$-_Q#tO1G2[O$.QQ#tO1G2^O$.[Q#tO1G2`OOQ$IU1G1x1G1xO$.cQWO'#IQO$.qQWO,5?uO$.qQWO,5?uO$.yQWO,5?uO$/UQWO,5?uOOQO1G1z1G1zO$/dQ#tO1G1yO$/tQWO'#ISO$0UQWO,5?vOITQWO,5?vO$0^Q`O,5?vOOQ$IU1G1}1G1}OOQ$IS,5<h,5<hOOQ$IS,5<i,5<iO$0hQWO,5<iO#5TQWO,5<iO!,rQpO,5<hO$0mQWO,5<jOOQ$IS,5<k,5<kO$0hQWO,5<nOOQO,5>o,5>oOOQO-E<R-E<ROOQ$IU1G2R1G2RO!&tQ&jO,5<hO$0uQWO,5<iO!&tQ&jO,5<jO!&tQ&jO,5<iO$1QQ#tO1G4vO$1[Q#tO1G4vOOQO,5>p,5>pOOQO-E<S-E<SO!-uQ&jO,59lO){QYO,59lO$1iQWO1G1tOJdQWO1G1{O$1nQ$IfO7+'XOOQ$IU7+'X7+'XOGTQYO7+'XOOQ$IU7+%[7+%[O$2_Q`O'#J]O#MdQWO7+'|O$2iQWO7+'|O$2qQ`O7+'|OOQQ7+'|7+'|OITQWO7+'|O){QYO7+'|OITQWO7+'|OOQO1G.w1G.wO$2{Q$IdO'#ChO$3`Q$IdO,5<lO$4QQWO,5<lOOQ$IS1G4r1G4rOOQQ7+$_7+$_O:^QWO7+$_O!,rQpO7+$_OGTQYO7+%|O$4VQWO'#I]O$4hQWO,5?}OOQO1G3O1G3OO5qQWO,5?}O$4hQWO,5?}O$4pQWO,5?}OOQO,5>x,5>xOOQO-E<[-E<[OOQ$IU7+&q7+&qO$4uQWO7+(iO5iQ$I[O7+(iO5qQWO7+(iO$4zQWO7+(iO$5PQWO7+'|OOQ$IS,5>r,5>rOOQ$IS-E<U-E<UOOQQ7+(W7+(WO$5_Q$IdO7+(TOITQWO7+(TO$5iQ`O7+(UOOQQ7+(U7+(UOITQWO7+(UO$5pQWO'#J`O$5{QWO,5=SOOQO,5>t,5>tOOQO-E<W-E<WOOQQ7+(Z7+(ZO$6uQ&jO'#GqOOQQ1G2v1G2vOITQWO1G2vO){QYO1G2vOITQWO1G2vO$6|QWO1G2vO$7[Q#tO1G2vO5iQ$I[O1G2yO#5YQWO1G2yO5_QWO1G2yO!,rQpO1G2yO!,zQ#tO1G2yO$7mQWO'#I[O$7xQWO,5?{O$8QQ&jO,5?{OOQ$IS1G2z1G2zOOQQ7+$U7+$UO$8YQWO7+$UO5iQ$I[O7+$UO$8_QWO7+$UO){QYO1G5jO){QYO1G5kO$8dQYO1G3RO$8kQWO1G3RO$8pQYO1G3RO$8wQ$I[O1G5jOOQQ7+(k7+(kO5iQ$I[O7+(uO`QYO7+(wOOQQ'#Jf'#JfOOQQ'#I_'#I_O$9RQYO,5=vOOQQ,5=v,5=vO){QYO'#H]O$9`QWO'#H_OOQQ,5=|,5=|O7VQWO,5=|OOQQ,5>O,5>OOOQQ7+)Q7+)QOOQQ7+)W7+)WOOQQ7+)[7+)[OOQQ7+)^7+)^OOQO1G5O1G5OO$9eQ7^O1G0gO$9oQWO1G0gOOQO1G/i1G/iO$9zQ7^O1G/iO:^QWO1G/iOLXQYO'#DcOOQO,5>b,5>bOOQO-E;t-E;tOOQO,5>g,5>gOOQO-E;y-E;yO!,rQpO1G/iO:^QWO,5:iOOQO,5:o,5:oO){QYO,5:oO$:UQ$I[O,5:oO$:aQ$I[O,5:oO!,rQpO,5:iOOQO-E;w-E;wOOQ$IU1G0S1G0SO!?{Q&jO,5:iO$:oQ&jO,5:iO$;QQ$ItO,5:oO$;lQ&jO,5:iO!?{Q&jO,5:oOOQO,5:t,5:tO$;sQ&jO,5:oO$<QQ$I[O,5:oOOQ$IU7+%k7+%kO#MdQWO7+%kO#MiQ`O7+%kOOQ$IU7+%{7+%{O:^QWO7+%{O!,rQpO7+%{O$<fQ$IfO7+*pO){QYO7+*pOOQO1G4S1G4SO7VQWO1G4SO$<vQWO7+*oO$=OQ$IfO1G2[O$?QQ$IfO1G2^O$ASQ$IfO1G1yO$C[Q#tO,5>cOOQO-E;u-E;uO$CfQbO,5>dO){QYO,5>dOOQO-E;v-E;vO$CpQWO1G5QO$CxQ7^O1G0bO$FPQ7^O1G0mO$FWQ7^O1G0mO$HXQ7^O1G0mO$H`Q7^O1G0mO$JTQ7^O1G0mO$JhQ7^O1G0mO$LuQ7^O1G0mO$L|Q7^O1G0mO$N}Q7^O1G0mO% UQ7^O1G0mO%!yQ7^O1G0mO%#^Q$IfO<<JTO%#}Q7^O1G0mO%&UQ7^O'#IqO%'nQ7^O1G1QOLXQYO'#F^OOQO'#JX'#JXOOQO1G1b1G1bO%'{QWO1G1aO%(QQ7^O,5>kOOOO7+'T7+'TOOOS1G/R1G/ROOQ$IU1G4X1G4XOJdQWO7+'zO%([QWO,5>lO5qQWO,5>lOOQO-E<O-E<OO%(jQWO1G5aO%(jQWO1G5aO%(rQWO1G5aO%(}Q`O,5>nO%)XQWO,5>nOITQWO,5>nOOQO-E<Q-E<QO%)^Q`O1G5bO%)hQWO1G5bOOQ$IS1G2T1G2TO$0hQWO1G2TOOQ$IS1G2S1G2SO%)pQWO1G2UOITQWO1G2UOOQ$IS1G2Y1G2YO!,rQpO1G2SO#5TQWO1G2TO%)uQWO1G2UO%)}QWO1G2TOJdQWO7+*bOOQ$IU1G/W1G/WO%*YQWO1G/WOOQ$IU7+'`7+'`O%*_Q#tO7+'gO%*oQ$IfO<<JsOOQ$IU<<Js<<JsOITQWO'#IVO%+`QWO,5?wOOQQ<<Kh<<KhOITQWO<<KhO#MdQWO<<KhO%+hQWO<<KhO%+pQ`O<<KhOITQWO1G2WOOQQ<<Gy<<GyO:^QWO<<GyO%+zQ$IfO<<IhOOQ$IU<<Ih<<IhOOQO,5>w,5>wO%,kQWO,5>wO%,pQWO,5>wOOQO-E<Z-E<ZO%,xQWO1G5iO%,xQWO1G5iO5qQWO1G5iO%-QQWO<<LTOOQQ<<LT<<LTO%-VQWO<<LTO5iQ$I[O<<LTO){QYO<<KhOITQWO<<KhOOQQ<<Ko<<KoO$5_Q$IdO<<KoOOQQ<<Kp<<KpO$5iQ`O<<KpO%-[Q&jO'#IXO%-gQWO,5?zOLXQYO,5?zOOQQ1G2n1G2nO#KdQ$ItO'#ETO!?{Q&jO'#GrOOQO'#IZ'#IZO%-oQ&jO,5=]OOQQ,5=],5=]O%-vQ&jO'#ETO%.RQ&jO'#ETO%.jQ&jO'#ETO%.tQ&jO'#GrO%/VQWO7+(bO%/[QWO7+(bO%/dQ`O7+(bOOQQ7+(b7+(bOITQWO7+(bO){QYO7+(bOITQWO7+(bO%/nQWO7+(bOOQQ7+(e7+(eO5iQ$I[O7+(eO#5YQWO7+(eO5_QWO7+(eO!,rQpO7+(eO%/|QWO,5>vOOQO-E<Y-E<YOOQO'#Gu'#GuO%0XQWO1G5gO5iQ$I[O<<GpOOQQ<<Gp<<GpO%0aQWO<<GpO%0fQWO7++UO%0kQWO7++VOOQQ7+(m7+(mO%0pQWO7+(mO%0uQYO7+(mO%0|QWO7+(mO){QYO7++UO){QYO7++VOOQQ<<La<<LaOOQQ<<Lc<<LcOOQQ-E<]-E<]OOQQ1G3b1G3bO%1RQWO,5=wOOQQ,5=y,5=yO%1WQWO1G3hOLXQYO7+&ROOQO7+%T7+%TO%1]Q7^O1G5XO:^QWO7+%TOOQO1G0T1G0TO%1gQ$IfO1G0ZOOQO1G0Z1G0ZO){QYO1G0ZO%1qQ$I[O1G0ZO:^QWO1G0TO!,rQpO1G0TO!?{Q&jO1G0TO%1|Q$I[O1G0ZO%2[Q&jO1G0TO%2mQ$I[O1G0ZO%3RQ$ItO1G0ZO%3]Q&jO1G0TO!?{Q&jO1G0ZOOQ$IU<<IV<<IVOOQ$IU<<Ig<<IgO:^QWO<<IgO%3dQ$IfO<<N[OOQO7+)n7+)nO%3tQ$IfO7+'gO%5|QbO1G4OO%6WQ7^O7+%|O%6|Q7^O,59jO%8zQ7^O,5<UO%:{Q7^O,5<WO%<hQ7^O,5<fO%>WQ7^O7+'WO%>eQ7^O7+'XO%>rQWO,5;xOOQO7+&{7+&{O%>wQ#tO<<KfOOQO1G4W1G4WO%?XQWO1G4WO%?dQWO1G4WO%?rQWO7+*{O%?rQWO7+*{OITQWO1G4YO%?zQ`O1G4YO%@UQWO7+*|OOQ$IS7+'o7+'oO$0hQWO7+'pO%@^Q`O7+'pOOQ$IS7+'n7+'nO$0hQWO7+'oO%@eQWO7+'pOITQWO7+'pO#5TQWO7+'oO%@jQ#tO<<M|OOQ$IU7+$r7+$rO%@tQ`O,5>qOOQO-E<T-E<TO#MdQWOANASOOQQANASANASOITQWOANASO%AOQ$IdO7+'rOOQQAN=eAN=eO5qQWO1G4cOOQO1G4c1G4cO%A`QWO1G4cO%AeQWO7++TO%AeQWO7++TO5iQ$I[OANAoO%AmQWOANAoOOQQANAoANAoO%ArQWOANASO%AzQ`OANASOOQQANAZANAZOOQQANA[ANA[O%BUQWO,5>sOOQO-E<V-E<VO%BaQ7^O1G5fO#5YQWO,5=^O5_QWO,5=^O!,rQpO,5=^OOQO-E<X-E<XOOQQ1G2w1G2wO$;QQ$ItO,5:oO!?{Q&jO,5=^O%BkQ&jO,5=^O%B|Q&jO,5:oOOQQ<<K|<<K|OITQWO<<K|O%/VQWO<<K|O%CWQWO<<K|O%C`Q`O<<K|O){QYO<<K|OITQWO<<K|OOQQ<<LP<<LPO5iQ$I[O<<LPO#5YQWO<<LPO5_QWO<<LPO%CjQ&jO1G4bO%CrQWO7++ROOQQAN=[AN=[O5iQ$I[OAN=[OOQQ<<Np<<NpOOQQ<<Nq<<NqOOQQ<<LX<<LXO%CzQWO<<LXO%DPQYO<<LXO%DWQWO<<NpO%D]QWO<<NqOOQQ1G3c1G3cO:^QWO7+)SO%DbQ7^O<<ImOOQO<<Ho<<HoOOQO7+%u7+%uO%1gQ$IfO7+%uO){QYO7+%uOOQO7+%o7+%oO:^QWO7+%oO!,rQpO7+%oO%DlQ$I[O7+%uO!?{Q&jO7+%oO%DwQ$I[O7+%uO%EVQ&jO7+%oO%EhQ$I[O7+%uOOQ$IUAN?RAN?RO%E|Q$IfO<<KfO%HUQ7^O<<JTO%HcQ7^O1G1yO%JgQ7^O1G2[O%LhQ7^O1G2^O%NTQ7^O<<JsO%NbQ7^O<<IhOOQO1G1d1G1dOOQO7+)r7+)rO%NoQWO7+)rO%NzQWO<<NgO& SQ`O7+)tOOQ$IS<<K[<<K[O$0hQWO<<K[OOQ$IS<<KZ<<KZO& ^Q`O<<K[O$0hQWO<<KZOOQQG26nG26nO#MdQWOG26nOOQO7+)}7+)}O5qQWO7+)}O& eQWO<<NoOOQQG27ZG27ZO5iQ$I[OG27ZOITQWOG26nOLXQYO1G4_O& mQWO7++QO5iQ$I[O1G2xO#5YQWO1G2xO5_QWO1G2xO!,rQpO1G2xO!?{Q&jO1G2xO%3RQ$ItO1G0ZO& uQ&jO1G2xO%/VQWOANAhOOQQANAhANAhOITQWOANAhO&!WQWOANAhO&!`Q`OANAhOOQQANAkANAkO5iQ$I[OANAkO#5YQWOANAkOOQO'#Gv'#GvOOQO7+)|7+)|OOQQG22vG22vOOQQANAsANAsO&!jQWOANAsOOQQAND[AND[OOQQAND]AND]OOQQ<<Ln<<LnOOQO<<Ia<<IaO%1gQ$IfO<<IaOOQO<<IZ<<IZO:^QWO<<IZO){QYO<<IaO!,rQpO<<IZO&!oQ$I[O<<IaO!?{Q&jO<<IZO&!zQ$I[O<<IaO&#YQ7^O7+'gOOQO<<M^<<M^OOQ$ISAN@vAN@vO$0hQWOAN@vOOQ$ISAN@uAN@uOOQQLD,YLD,YOOQO<<Mi<<MiOOQQLD,uLD,uO#MdQWOLD,YO&$xQ7^O7+)yOOQO7+(d7+(dO5iQ$I[O7+(dO#5YQWO7+(dO5_QWO7+(dO!,rQpO7+(dO!?{Q&jO7+(dOOQQG27SG27SO%/VQWOG27SOITQWOG27SOOQQG27VG27VO5iQ$I[OG27VOOQQG27_G27_OOQOAN>{AN>{OOQOAN>uAN>uO%1gQ$IfOAN>{O:^QWOAN>uO){QYOAN>{O!,rQpOAN>uO&%SQ$I[OAN>{O&%_Q7^O<<KfOOQ$ISG26bG26bOOQQ!$( t!$( tOOQO<<LO<<LOO5iQ$I[O<<LOO#5YQWO<<LOO5_QWO<<LOO!,rQpO<<LOOOQQLD,nLD,nO%/VQWOLD,nOOQQLD,qLD,qOOQOG24gG24gOOQOG24aG24aO%1gQ$IfOG24gO:^QWOG24aO){QYOG24gO&&}QMhO,5:rO&'tQ!LQO'#IqOOQOANAjANAjO5iQ$I[OANAjO#5YQWOANAjO5_QWOANAjOOQQ!$(!Y!$(!YOOQOLD*RLD*ROOQOLD){LD){O%1gQ$IfOLD*RO&(hQMhO,59jO&)[QMhO,5<UO&*OQMhO,5<WO&*rQMhO,5<fOOQOG27UG27UO5iQ$I[OG27UO#5YQWOG27UOOQO!$'Mm!$'MmO&+iQMhO1G2[O&,]QMhO1G2^O&-PQMhO1G1yOOQOLD,pLD,pO5iQ$I[OLD,pO&-vQMhO7+'gOOQO!$(![!$(![O&.mQMhO<<KfOLXQYO'#DrO&/dQbO'#ItOLXQYO'#DjO&/kQ$IfO'#ChO&0UQbO'#ChO&0fQYO,5:vO&2fQWO'#EWOLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO'#IPO&3pQWO,5<TO&5SQWO,5;ROLXQYO,5;fO!(^QWO'#DOO!(^QWO'#DOO!(^QWO'#DOOITQWO'#FjO&2fQWO'#FjO&3xQWO'#FjOITQWO'#FlO&2fQWO'#FlO&3xQWO'#FlOITQWO'#FzO&2fQWO'#FzO&3xQWO'#FzOLXQYO,5?mO&0fQYO1G0bO&5ZQ7^O'#ChOLXQYO1G1lOITQWO,5<pO&2fQWO,5<pO&3xQWO,5<pOITQWO,5<rO&2fQWO,5<rO&3xQWO,5<rOITQWO,5<_O&2fQWO,5<_O&3xQWO,5<_O&0fQYO1G1mOLXQYO7+&iOITQWO1G1{O&2fQWO1G1{O&3xQWO1G1{O&0fQYO7+'XO&0fQYO7+%|OITQWO7+'zO&2fQWO7+'zO&3xQWO7+'zO&5eQWO7+'pO&5eQWO<<K[O&5eQWOAN@vO&5jQWO'#E[O&5oQWO'#E[O&5wQWO'#EzO&5|QWO'#EgO&6RQWO'#JRO&6^QWO'#JPO&6iQWO,5:vO&6nQ#tO,5<QO&6uQWO'#FsO&6zQWO'#FsO&7PQWO'#FsO&7UQWO,5<RO&7^QWO,5:vO&7fQ7^O1G0}O&7mQWO,5<aO&7rQWO,5<aO&7wQWO,5<aO&7|QWO1G1mO&8RQWO1G0bO&8WQ#tO1G2`O&8_Q#tO1G2`O&8fQ#tO1G2`O&8mQWO1G2UO&8rQ`O7+'pO&8yQWO7+'pO&9OQ`O<<K[O4QQWO'#FhO5_QWO'#FgOBwQWO'#EZOLXQYO,5;cO!(mQWO'#FuO!(mQWO'#FuO!(mQWO'#FuOJdQWO,5<tOJdQWO,5<tOJdQWO,5<tO&9VQWO,5<jOITQWO1G2UO&9_QWO1G2UOITQWO7+'pO!&tQ&jO'#GOO!&tQ&jO,5<j",
  stateData: "&:]~O'YOS'ZOSTOSUOS~OPTOQTOXyO]cO_hObnOcmOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!TSO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!nlO#dsO#tpO#x^O%PqO%RtO%TrO%UrO%XuO%ZvO%^wO%_wO%axO%nzO%t{O%v|O%x}O%z!OO%}!PO&T!QO&Z!RO&]!SO&_!TO&a!UO&c!VO']PO'fQO'oYO'|aO~OP[XZ[X_[Xj[Xu[Xv[Xx[X!R[X!a[X!b[X!d[X!j[X!{[X#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'W[X'f[X'p[X'w[X'x[X~O!]$lX~P$zOR!WO'U!XO'V!ZO~OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O']![O'fQO'oYO'|aO~O!Q!`O!R!]O!O'jP!O'tP~P'dO!S!mO~P`OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O']9WO'fQO'oYO'|aO~OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O'fQO'oYO'|aO~O!Q!rO#U!uO#V!rO']9XO!c'qP~P+{O#W!vO~O!]!wO#W!vO~OP#^OZ#dOj#ROu!{Ov!{Ox!|O!R#bO!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'fQO'p#[O'w!}O'x#OO~O_'hX'W'hX!c'hX!O'hX!T'hX%Q'hX!]'hX~P.jO!{#eO#o#eOP'iXZ'iX_'iXj'iXu'iXv'iXx'iX!R'iX!a'iX!b'iX!d'iX!j'iX#['iX#]'iX#^'iX#_'iX#`'iX#a'iX#b'iX#e'iX#g'iX#i'iX#j'iX'f'iX'p'iX'w'iX'x'iX~O#c'iX'W'iX!O'iX!c'iXn'iX!T'iX%Q'iX!]'iX~P0zO!{#eO~O#z#fO$R#jO~O!T#kO#x^O$U#lO$W#nO~O]#qOh$OOj#rOk#qOl#qOq$POs$QOx#xO!T#yO!_$VO!d#vO#V$WO#t$TO$_$RO$a$SO$d$UO']#pO'f#sO'a'cP~O!d$XO~O!]$ZO~O_$[O'W$[O~O']$`O~O!d$XO']$`O'^$bO'b$cO~Oc$iO!d$XO']$`O~O#c#TO~O]$rOu$nO!T$kO!d$mO%R$qO']$`O'^$bO^(UP~O!n$sO~Ox$tO!T$uO']$`O~Ox$tO!T$uO%Z$yO']$`O~O']$zO~O#dsO%RtO%TrO%UrO%XuO%ZvO%^wO%_wO~Ob%TOc%SO!n%QO%P%RO%c%PO~P7uOb%WOcmO!T%VO!nlO#dsO%PqO%TrO%UrO%XuO%ZvO%^wO%_wO%axO~O`%ZO!{%^O%R%XO'^$bO~P8tO!d%_O!g%cO~O!d%dO~O!TSO~O_$[O'T%lO'W$[O~O_$[O'T%oO'W$[O~O_$[O'T%qO'W$[O~OR!WO'U!XO'V%uO~OP[XZ[Xj[Xu[Xv[Xx[X!R[X!RdX!a[X!b[X!d[X!j[X!{[X!{dX#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'f[X'p[X'w[X'x[X~O!O[X!OdX~P;aO!Q%wO!O&iX!O&nX!R&iX!R&nX~P'dO!R%yO!O'jX~OP#^OZ#dOj#ROu!{Ov!{Ox!|O!R%yO!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'fQO'p#[O'w!}O'x#OO~O!O'jX~P>^O!O&OO~Ox&RO!W&]O!X&UO!Y&UO'^$bO~O]&SOk&SO!Q&VO'g&PO!S'kP!S'vP~P@aO!O'sX!R'sX!]'sX!c'sX'p'sX~O!{'sX#W#PX!S'sX~PAYO!{&^O!O'uX!R'uX~O!R&_O!O'tX~O!O&bO~O!{#eO~PAYOS&fO!T&cO!o&eO']$`O~Oc&kO!d$XO']$`O~Ou$nO!d$mO~O!S&lO~P`Ou!{Ov!{Ox!|O!b!yO!d!zO'fQOP!faZ!faj!fa!R!fa!a!fa!j!fa#[!fa#]!fa#^!fa#_!fa#`!fa#a!fa#b!fa#c!fa#e!fa#g!fa#i!fa#j!fa'p!fa'w!fa'x!fa~O_!fa'W!fa!O!fa!c!fan!fa!T!fa%Q!fa!]!fa~PCcO!c&mO~O!]!wO!{&oO'p&nO!R'rX_'rX'W'rX~O!c'rX~PE{O!R&sO!c'qX~O!c&uO~Ox$tO!T$uO#V&vO']$`O~OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!TSO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O']9WO'fQO'oYO'|aO~O]#qOh$OOj#rOk#qOl#qOq$POs9kOx#xO!T#yO!_;RO!d#vO#V9tO#t$TO$_9nO$a9qO$d$UO']&zO'f#sO~O#W&|O~O]#qOh$OOj#rOk#qOl#qOq$POs$QOx#xO!T#yO!_$VO!d#vO#V$WO#t$TO$_$RO$a$SO$d$UO']&zO'f#sO~O'a'mP~PJdO!Q'QO!c'nP~P){O'g'SO'oYO~OP9TOQ9TO]cOb;POc!jOhcOj9TOkcOlcOq9TOs9TOxRO{cO|cO}cO!T!bO!_9VO!dUO!g9TO!h9TO!i9TO!j9TO!k9TO!n!iO#t!lO#x^O']'bO'fQO'oYO'|:}O~O!d!zO~O!R#bO_$]a'W$]a!c$]a!O$]a!T$]a%Q$]a!]$]a~O#d'iO~PITO!]'kO!T'yX#w'yX#z'yX$R'yX~Ou'lO~P! POu'lO!T'yX#w'yX#z'yX$R'yX~O!T'nO#w'rO#z'mO$R'sO~O!Q'vO~PLXO#z#fO$R'yO~Ou$eXx$eX!b$eX'p$eX'w$eX'x$eX~OSfX!RfX!{fX'afX'a$eX~P!!iOk'{O~OR'|O'U'}O'V(PO~Ou(ROx(SO'p#[O'w(UO'x(WO~O'a(QO~P!#rO'a(ZO~O]#qOh$OOj#rOk#qOl#qOq$POs9kOx#xO!T#yO!_;RO!d#vO#V9tO#t$TO$_9nO$a9qO$d$UO'f#sO~O!Q(_O']([O!c'}P~P!$aO#W(aO~O!Q(eO'](bO!O(OP~P!$aOj(sOx(kO!W(qO!X(jO!Y(jO!d(hO!x(rO$w(mO'^$bO'g(gO~O!S(pO~P!&XO!b!yOu'eXx'eX'p'eX'w'eX'x'eX!R'eX!{'eX~O'a'eX#m'eX~P!'QOS(vO!{(uO!R'dX'a'dX~O!R(wO'a'cX~O'](yO~O!d)OO~O']&zO~O!d(hO~Ox$tO!Q!rO!T$uO#U!uO#V!rO']$`O!c'qP~O!]!wO#W)SO~OP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'fQO'p#[O'w!}O'x#OO~O_!^a!R!^a'W!^a!O!^a!c!^an!^a!T!^a%Q!^a!]!^a~P!)cOS)[O!T&cO!o)ZO%Q)YO'b$cO~O']$zO'a'cP~O!])_O!T'`X_'`X!R'`X'W'`X~O!d$XO'b$cO~O!d$XO']$`O'b$cO~O!]!wO#W&|O~O])jO%R)kO'])gO!S(VP~O!R)lO^(UX~O'g'SO~OZ)pO~O^)qO~O!T$kO']$`O'^$bO^(UP~Ox$tO!Q)vO!R&_O!T$uO']$`O!O'tP~O]&YOk&YO!Q)wO'g'SO!S'vP~O!R)xO_(RX'W(RX~O!{)|O'b$cO~OS*PO!T#yO'b$cO~O!T*RO~Ou*TO!TSO~O!n*YO~Oc*_O~O'](yO!S(TP~Oc$iO~O%RtO']$zO~P8tOZ*eO^*dO~OPTOQTO]cObnOcmOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!nlO#x^O%PqO'fQO'oYO'|aO~O!T!bO#t!lO']9WO~P!1RO^*dO_$[O'W$[O~O_*iO#d*kO%T*kO%U*kO~P){O!d%_O~O%t*pO~O!T*rO~O&V*tO&X*uOP&SaQ&SaX&Sa]&Sa_&Sab&Sac&Sah&Saj&Sak&Sal&Saq&Sas&Sax&Sa{&Sa|&Sa}&Sa!T&Sa!_&Sa!d&Sa!g&Sa!h&Sa!i&Sa!j&Sa!k&Sa!n&Sa#d&Sa#t&Sa#x&Sa%P&Sa%R&Sa%T&Sa%U&Sa%X&Sa%Z&Sa%^&Sa%_&Sa%a&Sa%n&Sa%t&Sa%v&Sa%x&Sa%z&Sa%}&Sa&T&Sa&Z&Sa&]&Sa&_&Sa&a&Sa&c&Sa'S&Sa']&Sa'f&Sa'o&Sa'|&Sa!S&Sa%{&Sa`&Sa&Q&Sa~O']*zO~On*}O~O!O&ia!R&ia~P!)cO!Q+RO!O&iX!R&iX~P){O!R%yO!O'ja~O!O'ja~P>^O!R&_O!O'ta~O!RwX!R!ZX!SwX!S!ZX!]wX!]!ZX!d!ZX!{wX'b!ZX~O!]+WO!{+VO!R#TX!R'lX!S#TX!S'lX!]'lX!d'lX'b'lX~O!]+YO!d$XO'b$cO!R!VX!S!VX~O]&QOk&QOx&RO'g(gO~OP9TOQ9TO]cOb;POc!jOhcOj9TOkcOlcOq9TOs9TOxRO{cO|cO}cO!T!bO!_9VO!dUO!g9TO!h9TO!i9TO!j9TO!k9TO!n!iO#t!lO#x^O'fQO'oYO'|:}O~O']9yO~P!;^O!R+^O!S'kX~O!S+`O~O!]+WO!{+VO!R#TX!S#TX~O!R+aO!S'vX~O!S+cO~O]&QOk&QOx&RO'^$bO'g(gO~O!X+dO!Y+dO~P!>[Ox$tO!Q+fO!T$uO']$`O!O&nX!R&nX~O_+jO!W+mO!X+iO!Y+iO!r+qO!s+oO!t+pO!u+nO!x+rO'^$bO'g(gO'o+gO~O!S+lO~P!?]OS+wO!T&cO!o+vO~O!{+}O!R'ra!c'ra_'ra'W'ra~O!]!wO~P!@gO!R&sO!c'qa~Ox$tO!Q,QO!T$uO#U,SO#V,QO']$`O!R&pX!c&pX~O_#Oi!R#Oi'W#Oi!O#Oi!c#Oin#Oi!T#Oi%Q#Oi!]#Oi~P!)cO#W!za!R!za!c!za!{!za!T!za_!za'W!za!O!za~P!#rO#W'eXP'eXZ'eX_'eXj'eXv'eX!a'eX!d'eX!j'eX#['eX#]'eX#^'eX#_'eX#`'eX#a'eX#b'eX#c'eX#e'eX#g'eX#i'eX#j'eX'W'eX'f'eX!c'eX!O'eX!T'eXn'eX%Q'eX!]'eX~P!'QO!R,]O'a'mX~P!#rO'a,_O~O!R,`O!c'nX~P!)cO!c,cO~O!O,dO~OP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O'fQOZ#Zi_#Zij#Zi!R#Zi!a#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'w#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O#[#Zi~P!EtO#[#PO~P!EtOP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO'fQOZ#Zi_#Zi!R#Zi!a#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'w#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~Oj#Zi~P!H`Oj#RO~P!H`OP#^Oj#ROu!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO'fQO_#Zi!R#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'w#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~OZ#Zi!a#Zi#a#Zi#b#Zi#c#Zi~P!JzOZ#dO!a#TO#a#TO#b#TO#c#TO~P!JzOP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO'fQO_#Zi!R#Zi#g#Zi#i#Zi#j#Zi'W#Zi'p#Zi'x#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O'w#Zi~P!MrO'w!}O~P!MrOP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO'fQO'w!}O_#Zi!R#Zi#i#Zi#j#Zi'W#Zi'p#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O'x#Zi~P#!^O'x#OO~P#!^OP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO'fQO'w!}O'x#OO~O_#Zi!R#Zi#j#Zi'W#Zi'p#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~P#$xOP[XZ[Xj[Xu[Xv[Xx[X!a[X!b[X!d[X!j[X!{[X#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'f[X'p[X'w[X'x[X!R[X!S[X~O#m[X~P#']OP#^OZ9iOj9^Ou!{Ov!{Ox!|O!a9`O!b!yO!d!zO!j#^O#[9[O#]9]O#^9]O#_9]O#`9_O#a9`O#b9`O#c9`O#e9aO#g9cO#i9eO#j9fO'fQO'p#[O'w!}O'x#OO~O#m,fO~P#)gOP'iXZ'iXj'iXu'iXv'iXx'iX!a'iX!b'iX!d'iX!j'iX#['iX#]'iX#^'iX#_'iX#`'iX#a'iX#b'iX#e'iX#g'iX#i'iX#j'iX'f'iX'p'iX'w'iX'x'iX!R'iX~O!{9jO#o9jO#c'iX#m'iX!S'iX~P#+bO_&sa!R&sa'W&sa!c&san&sa!O&sa!T&sa%Q&sa!]&sa~P!)cOP#ZiZ#Zi_#Zij#Ziv#Zi!R#Zi!a#Zi!b#Zi!d#Zi!j#Zi#[#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'W#Zi'f#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~P!#rO_#ni!R#ni'W#ni!O#ni!c#nin#ni!T#ni%Q#ni!]#ni~P!)cO#z,hO~O#z,iO~O!]'kO!{,jO!T$OX#w$OX#z$OX$R$OX~O!Q,kO~O!T'nO#w,mO#z'mO$R,nO~O!R9gO!S'hX~P#)gO!S,oO~O$R,qO~OR'|O'U'}O'V,tO~O],wOk,wO!O,xO~O!RdX!]dX!cdX!c$eX'pdX~P!!iO!c-OO~P!#rO!R-PO!]!wO'p&nO!c'}X~O!c-UO~O!O$eX!R$eX!]$lX~P!!iO!R-WO!O(OX~P!#rO!]-YO~O!O-[O~O!Q(_O']$`O!c'}P~Oj-`O!]!wO!d$XO'b$cO'p&nO~O!])_O~O_$[O!R-eO'W$[O~O!S-gO~P!&XO!X-hO!Y-hO'^$bO'g(gO~Ox-jO'g(gO~O!x-kO~O']$zO!R&xX'a&xX~O!R(wO'a'ca~Ou-pOv-pOx-qO'pra'wra'xra!Rra!{ra~O'ara#mra~P#6qOu(ROx(SO'p$^a'w$^a'x$^a!R$^a!{$^a~O'a$^a#m$^a~P#7gOu(ROx(SO'p$`a'w$`a'x$`a!R$`a!{$`a~O'a$`a#m$`a~P#8YO]-rO~O#W-sO~O'a$na!R$na#m$na!{$na~P!#rO#W-vO~OS.PO!T&cO!o.OO%Q-}O~O'a.QO~O]#qOj#rOk#qOl#qOq$POs9kOx#xO!T#yO!_;RO!d#vO#V9tO#t$TO$_9nO$a9qO$d$UO'f#sO~Oh.SO'].RO~P#:PO!])_O!T'`a_'`a!R'`a'W'`a~O#W.YO~OZ[X!RdX!SdX~O!R.ZO!S(VX~O!S.]O~OZ.^O~O].`O'])gO~O!T$kO']$`O^'QX!R'QX~O!R)lO^(Ua~O!c.cO~P!)cO].eO~OZ.fO~O^.gO~OS.PO!T&cO!o.OO%Q-}O'b$cO~O!R)xO_(Ra'W(Ra~O!{.mO~OS.pO!T#yO~O'g'SO!S(SP~OS.zO!T.vO!o.yO%Q.xO'b$cO~OZ/UO!R/SO!S(TX~O!S/VO~O^/XO_$[O'W$[O~O]/YO~O]/ZO'](yO~O#c/[O%r/]O~P0zO!{#eO#c/[O%r/]O~O_/^O~P){O_/`O~O%{/dOP%yiQ%yiX%yi]%yi_%yib%yic%yih%yij%yik%yil%yiq%yis%yix%yi{%yi|%yi}%yi!T%yi!_%yi!d%yi!g%yi!h%yi!i%yi!j%yi!k%yi!n%yi#d%yi#t%yi#x%yi%P%yi%R%yi%T%yi%U%yi%X%yi%Z%yi%^%yi%_%yi%a%yi%n%yi%t%yi%v%yi%x%yi%z%yi%}%yi&T%yi&Z%yi&]%yi&_%yi&a%yi&c%yi'S%yi']%yi'f%yi'o%yi'|%yi!S%yi`%yi&Q%yi~O`/jO!S/hO&Q/iO~P`O!TSO!d/lO~O&X*uOP&SiQ&SiX&Si]&Si_&Sib&Sic&Sih&Sij&Sik&Sil&Siq&Sis&Six&Si{&Si|&Si}&Si!T&Si!_&Si!d&Si!g&Si!h&Si!i&Si!j&Si!k&Si!n&Si#d&Si#t&Si#x&Si%P&Si%R&Si%T&Si%U&Si%X&Si%Z&Si%^&Si%_&Si%a&Si%n&Si%t&Si%v&Si%x&Si%z&Si%}&Si&T&Si&Z&Si&]&Si&_&Si&a&Si&c&Si'S&Si']&Si'f&Si'o&Si'|&Si!S&Si%{&Si`&Si&Q&Si~O!R#bOn$]a~O!O&ii!R&ii~P!)cO!R%yO!O'ji~O!R&_O!O'ti~O!O/rO~O!R!Va!S!Va~P#)gO]&QOk&QO!Q/xO'g(gO!R&jX!S&jX~P@aO!R+^O!S'ka~O]&YOk&YO!Q)wO'g'SO!R&oX!S&oX~O!R+aO!S'va~O!O'ui!R'ui~P!)cO_$[O!]!wO!d$XO!j0SO!{0QO'W$[O'b$cO'p&nO~O!S0VO~P!?]O!X0WO!Y0WO'^$bO'g(gO'o+gO~O!W0XO~P#LVO!TSO!W0XO!u0ZO!x0[O~P#LVO!W0XO!s0^O!t0^O!u0ZO!x0[O~P#LVO!T&cO~O!T&cO~P!#rO!R'ri!c'ri_'ri'W'ri~P!)cO!{0gO!R'ri!c'ri_'ri'W'ri~O!R&sO!c'qi~Ox$tO!T$uO#V0iO']$`O~O#WraPraZra_rajra!ara!bra!dra!jra#[ra#]ra#^ra#_ra#`ra#ara#bra#cra#era#gra#ira#jra'Wra'fra!cra!Ora!Tranra%Qra!]ra~P#6qO#W$^aP$^aZ$^a_$^aj$^av$^a!a$^a!b$^a!d$^a!j$^a#[$^a#]$^a#^$^a#_$^a#`$^a#a$^a#b$^a#c$^a#e$^a#g$^a#i$^a#j$^a'W$^a'f$^a!c$^a!O$^a!T$^an$^a%Q$^a!]$^a~P#7gO#W$`aP$`aZ$`a_$`aj$`av$`a!a$`a!b$`a!d$`a!j$`a#[$`a#]$`a#^$`a#_$`a#`$`a#a$`a#b$`a#c$`a#e$`a#g$`a#i$`a#j$`a'W$`a'f$`a!c$`a!O$`a!T$`an$`a%Q$`a!]$`a~P#8YO#W$naP$naZ$na_$naj$nav$na!R$na!a$na!b$na!d$na!j$na#[$na#]$na#^$na#_$na#`$na#a$na#b$na#c$na#e$na#g$na#i$na#j$na'W$na'f$na!c$na!O$na!T$na!{$nan$na%Q$na!]$na~P!#rO_#Oq!R#Oq'W#Oq!O#Oq!c#Oqn#Oq!T#Oq%Q#Oq!]#Oq~P!)cO!R&kX'a&kX~PJdO!R,]O'a'ma~O!Q0qO!R&lX!c&lX~P){O!R,`O!c'na~O!R,`O!c'na~P!)cO#m!fa!S!fa~PCcO#m!^a!R!^a!S!^a~P#)gO!T1UO#x^O$P1VO~O!S1ZO~On1[O~P!#rO_$Yq!R$Yq'W$Yq!O$Yq!c$Yqn$Yq!T$Yq%Q$Yq!]$Yq~P!)cO!O1]O~O],wOk,wO~Ou(ROx(SO'x(WO'p$xi'w$xi!R$xi!{$xi~O'a$xi#m$xi~P$,vOu(ROx(SO'p$zi'w$zi'x$zi!R$zi!{$zi~O'a$zi#m$zi~P$-iO#m1^O~P!#rO!Q1`O']$`O!R&tX!c&tX~O!R-PO!c'}a~O!R-PO!]!wO!c'}a~O!R-PO!]!wO'p&nO!c'}a~O'a$gi!R$gi#m$gi!{$gi~P!#rO!Q1gO'](bO!O&vX!R&vX~P!$aO!R-WO!O(Oa~O!R-WO!O(Oa~P!#rO!]!wO~O!]!wO#c1oO~Oj1rO!]!wO'p&nO~O!R'di'a'di~P!#rO!{1uO!R'di'a'di~P!#rO!c1xO~O_$Zq!R$Zq'W$Zq!O$Zq!c$Zqn$Zq!T$Zq%Q$Zq!]$Zq~P!)cO!R1|O!T(PX~P!#rO!T&cO%Q2PO~O!T&cO%Q2PO~P!#rO!T$eX$u[X_$eX!R$eX'W$eX~P!!iO$u2TOugXxgX!TgX'pgX'wgX'xgX_gX!RgX'WgX~O$u2TO~O]2ZO%R2[O'])gO!R'PX!S'PX~O!R.ZO!S(Va~OZ2`O~O^2aO~O]2dO~OS2fO!T&cO!o2eO%Q2PO~O_$[O'W$[O~P!#rO!T#yO~P!#rO!R2kO!{2mO!S(SX~O!S2nO~Ox;]O!W2wO!X2pO!Y2pO!r2vO!s2uO!t2uO!x2tO'^$bO'g(gO'o+gO~O!S2sO~P$6QOS3OO!T.vO!o2}O%Q2|O~OS3OO!T.vO!o2}O%Q2|O'b$cO~O'](yO!R'OX!S'OX~O!R/SO!S(Ta~O]3YO'g3XO~O]3ZO~O^3]O~O!c3`O~P){O_3bO~O_3bO~P){O#c3dO%r3eO~PE{O`/jO!S3iO&Q/iO~P`O!]3kO~O!R#Ti!S#Ti~P#)gO!{3mO!R#Ti!S#Ti~O!R!Vi!S!Vi~P#)gO_$[O!{3tO'W$[O~O_$[O!]!wO!{3tO'W$[O~O!X3xO!Y3xO'^$bO'g(gO'o+gO~O_$[O!]!wO!d$XO!j3yO!{3tO'W$[O'b$cO'p&nO~O!W3zO~P$:oO!W3zO!u3}O!x4OO~P$:oO_$[O!]!wO!j3yO!{3tO'W$[O'p&nO~O!R'rq!c'rq_'rq'W'rq~P!)cO!R&sO!c'qq~O#W$xiP$xiZ$xi_$xij$xiv$xi!a$xi!b$xi!d$xi!j$xi#[$xi#]$xi#^$xi#_$xi#`$xi#a$xi#b$xi#c$xi#e$xi#g$xi#i$xi#j$xi'W$xi'f$xi!c$xi!O$xi!T$xin$xi%Q$xi!]$xi~P$,vO#W$ziP$ziZ$zi_$zij$ziv$zi!a$zi!b$zi!d$zi!j$zi#[$zi#]$zi#^$zi#_$zi#`$zi#a$zi#b$zi#c$zi#e$zi#g$zi#i$zi#j$zi'W$zi'f$zi!c$zi!O$zi!T$zin$zi%Q$zi!]$zi~P$-iO#W$giP$giZ$gi_$gij$giv$gi!R$gi!a$gi!b$gi!d$gi!j$gi#[$gi#]$gi#^$gi#_$gi#`$gi#a$gi#b$gi#c$gi#e$gi#g$gi#i$gi#j$gi'W$gi'f$gi!c$gi!O$gi!T$gi!{$gin$gi%Q$gi!]$gi~P!#rO!R&ka'a&ka~P!#rO!R&la!c&la~P!)cO!R,`O!c'ni~O#m#Oi!R#Oi!S#Oi~P#)gOP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O'fQOZ#Zij#Zi!a#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'w#Zi'x#Zi!R#Zi!S#Zi~O#[#Zi~P$DVO#[9[O~P$DVOP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[9[O#]9]O#^9]O#_9]O'fQOZ#Zi!a#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'w#Zi'x#Zi!R#Zi!S#Zi~Oj#Zi~P$F_Oj9^O~P$F_OP#^Oj9^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[9[O#]9]O#^9]O#_9]O#`9_O'fQO#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'w#Zi'x#Zi!R#Zi!S#Zi~OZ#Zi!a#Zi#a#Zi#b#Zi#c#Zi~P$HgOZ9iO!a9`O#a9`O#b9`O#c9`O~P$HgOP#^OZ9iOj9^Ou!{Ov!{Ox!|O!a9`O!b!yO!d!zO!j#^O#[9[O#]9]O#^9]O#_9]O#`9_O#a9`O#b9`O#c9`O#e9aO'fQO#g#Zi#i#Zi#j#Zi#m#Zi'p#Zi'x#Zi!R#Zi!S#Zi~O'w#Zi~P$J{O'w!}O~P$J{OP#^OZ9iOj9^Ou!{Ov!{Ox!|O!a9`O!b!yO!d!zO!j#^O#[9[O#]9]O#^9]O#_9]O#`9_O#a9`O#b9`O#c9`O#e9aO#g9cO'fQO'w!}O#i#Zi#j#Zi#m#Zi'p#Zi!R#Zi!S#Zi~O'x#Zi~P$MTO'x#OO~P$MTOP#^OZ9iOj9^Ou!{Ov!{Ox!|O!a9`O!b!yO!d!zO!j#^O#[9[O#]9]O#^9]O#_9]O#`9_O#a9`O#b9`O#c9`O#e9aO#g9cO#i9eO'fQO'w!}O'x#OO~O#j#Zi#m#Zi'p#Zi!R#Zi!S#Zi~P% ]O_#ky!R#ky'W#ky!O#ky!c#kyn#ky!T#ky%Q#ky!]#ky~P!)cOP#ZiZ#Zij#Ziv#Zi!a#Zi!b#Zi!d#Zi!j#Zi#[#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'f#Zi!R#Zi!S#Zi~P!#rO!b!yOu'eXx'eX'p'eX'w'eX'x'eX!S'eX~OP'eXZ'eXj'eXv'eX!a'eX!d'eX!j'eX#['eX#]'eX#^'eX#_'eX#`'eX#a'eX#b'eX#c'eX#e'eX#g'eX#i'eX#j'eX#m'eX'f'eX!R'eX~P%%mO#m#ni!R#ni!S#ni~P#)gO!S4`O~O!R&sa!S&sa~P#)gO!]!wO'p&nO!R&ta!c&ta~O!R-PO!c'}i~O!R-PO!]!wO!c'}i~O!O&va!R&va~P!#rO!]4gO~O!R-WO!O(Oi~P!#rO!R-WO!O(Oi~O!O4kO~O!]!wO#c4pO~Oj4qO!]!wO'p&nO~O!O4sO~O'a$iq!R$iq#m$iq!{$iq~P!#rO_$Zy!R$Zy'W$Zy!O$Zy!c$Zyn$Zy!T$Zy%Q$Zy!]$Zy~P!)cO!R1|O!T(Pa~O!T&cO%Q4xO~O!T&cO%Q4xO~P!#rO_#Oy!R#Oy'W#Oy!O#Oy!c#Oyn#Oy!T#Oy%Q#Oy!]#Oy~P!)cOZ4{O~O]4}O'])gO~O!R.ZO!S(Vi~O]5QO~O^5RO~O'g'SO!R&{X!S&{X~O!R2kO!S(Sa~O!S5`O~P$6QOx;^O'g(gO'o+gO~O!W5cO!X5bO!Y5bO!x0[O'^$bO'g(gO'o+gO~O!s5dO!t5dO~P%.RO!X5bO!Y5bO'^$bO'g(gO'o+gO~O!T.vO~O!T.vO%Q5fO~O!T.vO%Q5fO~P!#rOS5kO!T.vO!o5jO%Q5fO~OZ5pO!R'Oa!S'Oa~O!R/SO!S(Ti~O]5sO~O!c5tO~O!c5uO~O!c5vO~O!c5vO~P){O_5xO~O!]5{O~O!c5|O~O!R'ui!S'ui~P#)gO_$[O'W$[O~P!)cO_$[O!{6RO'W$[O~O_$[O!]!wO!{6RO'W$[O~O!X6WO!Y6WO'^$bO'g(gO'o+gO~O_$[O!]!wO!j6XO!{6RO'W$[O'p&nO~O!d$XO'b$cO~P%2mO!W6YO~P%2[O!R'ry!c'ry_'ry'W'ry~P!)cO#W$iqP$iqZ$iq_$iqj$iqv$iq!R$iq!a$iq!b$iq!d$iq!j$iq#[$iq#]$iq#^$iq#_$iq#`$iq#a$iq#b$iq#c$iq#e$iq#g$iq#i$iq#j$iq'W$iq'f$iq!c$iq!O$iq!T$iq!{$iqn$iq%Q$iq!]$iq~P!#rO!R&li!c&li~P!)cO#m#Oq!R#Oq!S#Oq~P#)gOu-pOv-pOx-qO'pra'wra'xra!Sra~OPraZrajra!ara!bra!dra!jra#[ra#]ra#^ra#_ra#`ra#ara#bra#cra#era#gra#ira#jra#mra'fra!Rra~P%6eOu(ROx(SO'p$^a'w$^a'x$^a!S$^a~OP$^aZ$^aj$^av$^a!a$^a!b$^a!d$^a!j$^a#[$^a#]$^a#^$^a#_$^a#`$^a#a$^a#b$^a#c$^a#e$^a#g$^a#i$^a#j$^a#m$^a'f$^a!R$^a~P%8fOu(ROx(SO'p$`a'w$`a'x$`a!S$`a~OP$`aZ$`aj$`av$`a!a$`a!b$`a!d$`a!j$`a#[$`a#]$`a#^$`a#_$`a#`$`a#a$`a#b$`a#c$`a#e$`a#g$`a#i$`a#j$`a#m$`a'f$`a!R$`a~P%:gOP$naZ$naj$nav$na!a$na!b$na!d$na!j$na#[$na#]$na#^$na#_$na#`$na#a$na#b$na#c$na#e$na#g$na#i$na#j$na#m$na'f$na!R$na!S$na~P!#rO#m$Yq!R$Yq!S$Yq~P#)gO#m$Zq!R$Zq!S$Zq~P#)gO!S6dO~O'a$|y!R$|y#m$|y!{$|y~P!#rO!]!wO!R&ti!c&ti~O!]!wO'p&nO!R&ti!c&ti~O!R-PO!c'}q~O!O&vi!R&vi~P!#rO!R-WO!O(Oq~O!O6jO~P!#rO!O6jO~O!R'dy'a'dy~P!#rO!R&ya!T&ya~P!#rO!T$tq_$tq!R$tq'W$tq~P!#rOZ6qO~O!R.ZO!S(Vq~O]6tO~O!T&cO%Q6uO~O!T&cO%Q6uO~P!#rO!{6vO!R&{a!S&{a~O!R2kO!S(Si~P#)gO!X6|O!Y6|O'^$bO'g(gO'o+gO~O!W7OO!x4OO~P%BkO!T.vO%Q7RO~O!T.vO%Q7RO~P!#rO]7YO'g7XO~O!R/SO!S(Tq~O!c7[O~O!c7[O~P){O!c7^O~O!c7_O~O!R#Ty!S#Ty~P#)gO_$[O!{7eO'W$[O~O_$[O!]!wO!{7eO'W$[O~O!X7hO!Y7hO'^$bO'g(gO'o+gO~O_$[O!]!wO!j7iO!{7eO'W$[O'p&nO~O#W$|yP$|yZ$|y_$|yj$|yv$|y!R$|y!a$|y!b$|y!d$|y!j$|y#[$|y#]$|y#^$|y#_$|y#`$|y#a$|y#b$|y#c$|y#e$|y#g$|y#i$|y#j$|y'W$|y'f$|y!c$|y!O$|y!T$|y!{$|yn$|y%Q$|y!]$|y~P!#rO#m#ky!R#ky!S#ky~P#)gOP$giZ$gij$giv$gi!a$gi!b$gi!d$gi!j$gi#[$gi#]$gi#^$gi#_$gi#`$gi#a$gi#b$gi#c$gi#e$gi#g$gi#i$gi#j$gi#m$gi'f$gi!R$gi!S$gi~P!#rOu(ROx(SO'x(WO'p$xi'w$xi!S$xi~OP$xiZ$xij$xiv$xi!a$xi!b$xi!d$xi!j$xi#[$xi#]$xi#^$xi#_$xi#`$xi#a$xi#b$xi#c$xi#e$xi#g$xi#i$xi#j$xi#m$xi'f$xi!R$xi~P%JROu(ROx(SO'p$zi'w$zi'x$zi!S$zi~OP$ziZ$zij$ziv$zi!a$zi!b$zi!d$zi!j$zi#[$zi#]$zi#^$zi#_$zi#`$zi#a$zi#b$zi#c$zi#e$zi#g$zi#i$zi#j$zi#m$zi'f$zi!R$zi~P%LSO#m$Zy!R$Zy!S$Zy~P#)gO#m#Oy!R#Oy!S#Oy~P#)gO!]!wO!R&tq!c&tq~O!R-PO!c'}y~O!O&vq!R&vq~P!#rO!O7mO~P!#rO!R.ZO!S(Vy~O!R2kO!S(Sq~O!X7yO!Y7yO'^$bO'g(gO'o+gO~O!T.vO%Q7|O~O!T.vO%Q7|O~P!#rO!c8PO~O_$[O!{8UO'W$[O~O_$[O!]!wO!{8UO'W$[O~OP$iqZ$iqj$iqv$iq!a$iq!b$iq!d$iq!j$iq#[$iq#]$iq#^$iq#_$iq#`$iq#a$iq#b$iq#c$iq#e$iq#g$iq#i$iq#j$iq#m$iq'f$iq!R$iq!S$iq~P!#rO!R&{q!S&{q~P#)gO_$[O!{8hO'W$[O~OP$|yZ$|yj$|yv$|y!a$|y!b$|y!d$|y!j$|y#[$|y#]$|y#^$|y#_$|y#`$|y#a$|y#b$|y#c$|y#e$|y#g$|y#i$|y#j$|y#m$|y'f$|y!R$|y!S$|y~P!#rO!S!za!W!za!X!za!Y!za!r!za!s!za!t!za!x!za'^!za'g!za'o!za~P!#rO!W'eX!X'eX!Y'eX!r'eX!s'eX!t'eX!x'eX'^'eX'g'eX'o'eX~P%%mO!Wra!Xra!Yra!rra!sra!tra!xra'^ra'gra'ora~P%6eO!W$^a!X$^a!Y$^a!r$^a!s$^a!t$^a!x$^a'^$^a'g$^a'o$^a~P%8fO!W$`a!X$`a!Y$`a!r$`a!s$`a!t$`a!x$`a'^$`a'g$`a'o$`a~P%:gO!S$na!W$na!X$na!Y$na!r$na!s$na!t$na!x$na'^$na'g$na'o$na~P!#rO!W$xi!X$xi!Y$xi!r$xi!s$xi!t$xi!x$xi'^$xi'g$xi'o$xi~P%JRO!W$zi!X$zi!Y$zi!r$zi!s$zi!t$zi!x$zi'^$zi'g$zi'o$zi~P%LSO!S$gi!W$gi!X$gi!Y$gi!r$gi!s$gi!t$gi!x$gi'^$gi'g$gi'o$gi~P!#rO!S$iq!W$iq!X$iq!Y$iq!r$iq!s$iq!t$iq!x$iq'^$iq'g$iq'o$iq~P!#rO!S$|y!W$|y!X$|y!Y$|y!r$|y!s$|y!t$|y!x$|y'^$|y'g$|y'o$|y~P!#rOn'hX~P.jOn[X!O[X!c[X%r[X!T[X%Q[X!][X~P$zO!]dX!c[X!cdX'pdX~P;aOP9TOQ9TO]cOb;POc!jOhcOj9TOkcOlcOq9TOs9TOxRO{cO|cO}cO!TSO!_9VO!dUO!g9TO!h9TO!i9TO!j9TO!k9TO!n!iO#t!lO#x^O']'bO'fQO'oYO'|:}O~O]#qOh$OOj#rOk#qOl#qOq$POs9lOx#xO!T#yO!_;SO!d#vO#V9uO#t$TO$_9oO$a9rO$d$UO']&zO'f#sO~O!R9gO!S$]a~O]#qOh$OOj#rOk#qOl#qOq$POs9mOx#xO!T#yO!_;TO!d#vO#V9vO#t$TO$_9pO$a9sO$d$UO']&zO'f#sO~O#d'iO~P&3xO!S[X!SdX~P;aO!]9ZO~O#W9YO~O!]!wO#W9YO~O!{9jO~O#c9`O~O!{9wO!R'uX!S'uX~O!{9jO!R'sX!S'sX~O#W9xO~O'a9zO~P!#rO#W:RO~O#W:SO~O#W:TO~O!]!wO#W:UO~O!]!wO#W9xO~O#m:VO~P#)gO#W:WO~O#W:XO~O#W:YO~O#W:ZO~O#W:[O~O#m:]O~P!#rO#m:^O~P!#rO#m:_O~P!#rO!O:`O~O!O:aO~P!#rO!O:aO~O!O:bO~P!#rO!]!wO#c;YO~O!]!wO#c;[O~O#x~!b!r!t!u#U#V'|$_$a$d$u%P%Q%R%X%Z%^%_%a%c~UT#x'|#]}'Y'Z#z'Y']'g~",
  goto: "#Hc(ZPPPPPPPP([P(lP*`PPPP-zPP.a3s5g5zP5zPPP5zP7t5zP5zP7xPP8OP8d<uPPPP<yPPPP<y?kPPP?qBSP<yPDgPPPPF`<yPPPPPHX<yPPKYLVPPPPLZMsPM{N|PLV<y<y!$^!'X!+z!+z!/ZPPP!/b!2W<yPPPPPPPPPP!4}P!6`PP<y!7mP<yP<y<y<y<yP<y!:[PP!=TP!?x!@Q!@U!@UP!=QP!@Y!@YP!B}P!CR<y<y!CX!E{5zP5zP5z5zP!GO5z5z!IU5z!Ki5z!Mi5z5z!NV#!]#!]#!a#!]#!iP#!]P5z##e5z#$y5z5z-zPPP#&cPP#&{#&{P#&{P#'b#&{PP#'hP#'_P#'_#'zMw#'_#(i#(o#(r([#(u([P#(|#(|#(|P([P([P([P([PP([P#)S#)VP#)V([P#)ZP#)^P([P([P([P([P([P([([#)d#)n#)t#)z#*Y#*`#*f#*p#*v#+V#+]#+k#+q#+w#,V#,l#.[#.j#.p#.v#.|#/S#/^#/d#/j#/t#0W#0^PPPPPPPP#0dPP#1W#4`PP#5v#5}#6VPP#;X#=l#Ch#Ck#Cn#Cy#C|PP#DP#DT#Dr#Ei#Em#FRPP#FV#F]#FaP#Fd#Fh#Fk#GZ#Gq#Gv#Gy#G|#HS#HV#HZ#H_mhOSj}!n$Z%b%e%f%h*m*r/d/gQ$hmQ$opQ%YyS&U!b+^Q&j!jS(j#y(oQ)e$iQ)r$qQ*^%SQ+d&]S+i&c+kQ+{&kQ-h(qQ/R*_Y0W+m+n+o+p+qS2p.v2rU3x0X0Z0^U5b2u2v2wS6W3z3}S6|5c5dQ7h6YR7y7O$p[ORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+R+v+},`,f-q-v.O.Y.y/[/]/^/`/d/g/i0Q0g0q2e2}3b3d3e3t5j5x6R7e8U8h!j'd#]#k&V'v+V+Y,k/x1U2m3m6v9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QQ(z$QQ)j$kQ*`%VQ*g%_Q,V9kQ.T)_Q.`)kQ/Z*eQ2Z.ZQ3V/SQ4X9mQ4}2[R8s9lpeOSjy}!n$Z%X%b%e%f%h*m*r/d/gR*b%Z&WVOSTjkn}!S!W!k!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%y&R&^&e&o&|'Q'v(Q)S)Z*i*m*r+R+V+Y+v+},`,f,k-q-v.O.Y.y/[/]/^/`/d/g/i/x0Q0g0q1U2e2m2}3b3d3e3m3t5j5x6R6v7e8U8h9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;P;Q[!cRU!]!`%w&VQ$alQ$gmS$lp$qv$vrs!r!u$X$t&_&s&v)v)w)x*k+W+f,Q,S/l0iQ%OwQ&g!iQ&i!jS(^#v(hS)d$h$iQ)h$kQ)u$sQ*X%QQ*]%SS+z&j&kQ-T(_Q.X)eQ._)kQ.a)lQ.d)pQ.|*YS/Q*^*_Q0e+{Q1_-PQ2Y.ZQ2^.^Q2c.fQ3U/RQ4d1`Q4|2[Q5P2`Q6p4{R7p6q!Y$em!j$g$h$i&T&i&j&k(i)d)e+Z+h+z+{-a.X/}0T0Y0e1q3w3|6U7f8VQ)]$aQ)}${Q*Q$|Q*[%SQ.h)uQ.{*XU/P*]*^*_Q3P.|S3T/Q/RQ5]2oQ5o3US6z5^5aS7w6{6}Q8_7xR8n8`W#|a$c(w:}S${t%XQ$|uQ$}vR){$y$o#{a!w!y#d#v#x$R$S$W&f'|(V(X(Y(a(e(u(v)Y)[)_)|*P+w,]-W-Y-s-}.P.m.p.x.z1^1g1o1u1|2P2T2f2|3O4g4p4x5f5k6u7R7|9Z9i9n9o9p9q9r9s9t9u9v9{9|9}:O:P:Q:R:S:T:W:X:Y:]:^:_:};U;V;W;Y;[T'}#s(OX({$Q9k9l9mU&Y!b$u+aQ'T!{Q)o$nQ.q*RQ1v-pR5X2k&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+R+V+Y+v+},`,f,k-q-v.O.Y.y/[/]/^/`/d/g/i/x0Q0g0q1U2e2m2}3b3d3e3m3t5j5x6R6v7e8U8h9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;Q$]#aZ!_!o$_%v%|&x'P'V'W'X'Y'Z'[']'^'_'`'a'c'f'j't)n+P+[+e+|,[,b,e,g,u-t/s/v0f0p0t0u0v0w0x0y0z0{0|0}1O1P1Q1T1Y1z2W3o3r4S4V4W4]4^5Z5}6Q6^6b6c7b7s8S8f8r9U:pT!XQ!Y&_cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+R+V+Y+v+},`,f,k-q-v.O.Y.y/[/]/^/`/d/g/i/x0Q0g0q1U2e2m2}3b3d3e3m3t5j5x6R6v7e8U8h9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QQ&W!bR/y+^Y&Q!b&U&]+^+dS(i#y(oS+h&c+kS-a(j(qQ-b(kQ-i(rQ.s*TU0T+i+m+nU0Y+o+p+qS0_+r2tQ1q-hQ1s-jQ1t-kS2o.v2rU3w0W0X0ZQ3{0[Q3|0^S5^2p2wS5a2u2vU6U3x3z3}Q6Z4OS6{5b5cQ6}5dS7f6W6YS7x6|7OQ8V7hQ8`7yQ;X;]R;Z;^lhOSj}!n$Z%b%e%f%h*m*r/d/gQ%j!QS&w!v9YQ)b$fQ*V%OQ*W%PQ+x&hS,Z&|9xS-u)S:UQ.V)cQ.u*UQ/k*tQ/m*uQ/u+XQ0]+oQ0c+yS1{-v:ZQ2U.WS2X.Y:[Q3n/wQ3q0OQ4Q0dQ4z2VQ6O3pQ6S3vQ6[4RQ7`5|Q7c6TQ8R7dQ8e8TR8q8g$W#`Z!_!o%v%|&x'P'V'W'X'Y'Z'[']'^'_'`'a'c'f'j't)n+P+[+e+|,[,b,e,u-t/s/v0f0p0t0u0v0w0x0y0z0{0|0}1O1P1Q1T1Y1z2W3o3r4S4V4W4]4^5Z5}6Q6^6b6c7b7s8S8f8r9U:pW(t#z&{1S8jT)W$_,g$W#_Z!_!o%v%|&x'P'V'W'X'Y'Z'[']'^'_'`'a'c'f'j't)n+P+[+e+|,[,b,e,u-t/s/v0f0p0t0u0v0w0x0y0z0{0|0}1O1P1Q1T1Y1z2W3o3r4S4V4W4]4^5Z5}6Q6^6b6c7b7s8S8f8r9U:pQ'e#`S)V$_,gR-w)W&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+R+V+Y+v+},`,f,k-q-v.O.Y.y/[/]/^/`/d/g/i/x0Q0g0q1U2e2m2}3b3d3e3m3t5j5x6R6v7e8U8h9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QQ%e{Q%f|Q%h!OQ%i!PR/c*pQ&d!iQ)X$aQ+u&gS-|)])uS0`+s+tW2O-y-z-{.hS4P0a0bU4w2Q2R2SU6n4v5T5UQ7o6oR8Z7rT+j&c+kS+h&c+kU0T+i+m+nU0Y+o+p+qS0_+r2tS2o.v2rU3w0W0X0ZQ3{0[Q3|0^S5^2p2wS5a2u2vU6U3x3z3}Q6Z4OS6{5b5cQ6}5dS7f6W6YS7x6|7OQ8V7hR8`7yS+j&c+kT2q.v2rS&q!q/aQ-S(^Q-_(iS0S+h2oQ1d-TS1l-`-iU3y0Y0_5aQ4c1_S4n1r1tU6X3{3|6}Q6f4dQ6m4qR7i6ZQ!xXS&p!q/aQ)T$YQ)`$dQ)f$jQ,O&qQ-R(^Q-^(iQ-c(lQ.U)aQ.}*ZS0R+h2oS1c-S-TS1k-_-iQ1n-bQ1p-dQ3R/OW3u0S0Y0_5aQ4b1_Q4f1dS4j1l1tQ4o1sQ5m3SW6V3y3{3|6}S6e4c4dS6i4k:`Q6k4nQ6x5[Q7V5nS7g6X6ZQ7k6fS7l6j:aQ7n6mQ7u6yQ8O7WQ8W7iS8Y7m:bQ8]7vQ8l8^Q8x8mQ9P8yQ:i:dQ:t:nQ:u:oQ:y;XR:{;Z$rWORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+R+v+},`,f-q-v.O.Y.y/[/]/^/`/d/g/i0Q0g0q2e2}3b3d3e3t5j5x6R7e8U8hS!xn!k!j:c#]#k&V'v+V+Y,k/x1U2m3m6v9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QR:i;P$rXORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+R+v+},`,f-q-v.O.Y.y/[/]/^/`/d/g/i0Q0g0q2e2}3b3d3e3t5j5x6R7e8U8hQ$Yb!Y$dm!j$g$h$i&T&i&j&k(i)d)e+Z+h+z+{-a.X/}0T0Y0e1q3w3|6U7f8VS$jn!kQ)a$eQ*Z%SW/O*[*]*^*_U3S/P/Q/RQ5[2oS5n3T3UU6y5]5^5aQ7W5oU7v6z6{6}S8^7w7xS8m8_8`Q8y8n!j:d#]#k&V'v+V+Y,k/x1U2m3m6v9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QQ:n;OR:o;P$f]OSTjk}!S!W!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%b%d%e%f%h%l%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+R+v+},`,f-q-v.O.Y.y/[/]/^/`/d/g/i0Q0g0q2e2}3b3d3e3t5j5x6R7e8U8hY!hRU!]!`%wv$vrs!r!u$X$t&_&s&v)v)w)x*k+W+f,Q,S/l0iQ*h%_!h:e#]#k'v+V+Y,k/x1U2m3m6v9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QR:h&VS&Z!b$uR/{+a$p[ORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+R+v+},`,f-q-v.O.Y.y/[/]/^/`/d/g/i0Q0g0q2e2}3b3d3e3t5j5x6R7e8U8h!j'd#]#k&V'v+V+Y,k/x1U2m3m6v9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QR*g%_$roORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+R+v+},`,f-q-v.O.Y.y/[/]/^/`/d/g/i0Q0g0q2e2}3b3d3e3t5j5x6R7e8U8hQ'T!{!k:f#]#k&V'v+V+Y,k/x1U2m3m6v9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;Q!h#VZ!_$_%v%|&x'P'^'_'`'a'f'j)n+P+e+|,[,b,u-t0f0p1Q1z2W3r4S4V6Q7b8S8f8r9U!R9b'c't+[,g/s/v0t0|0}1O1P1T1Y3o4W4]4^5Z5}6^6b6c7s:p!d#XZ!_$_%v%|&x'P'`'a'f'j)n+P+e+|,[,b,u-t0f0p1Q1z2W3r4S4V6Q7b8S8f8r9U}9d'c't+[,g/s/v0t1O1P1T1Y3o4W4]4^5Z5}6^6b6c7s:p!`#]Z!_$_%v%|&x'P'f'j)n+P+e+|,[,b,u-t0f0p1Q1z2W3r4S4V6Q7b8S8f8r9Un(Y#t&})R,}-V-l-m0n1y4a4r:j:v:w:xx;Q'c't+[,g/s/v0t1T1Y3o4W4]4^5Z5}6^6b6c7s:p!d;U&y'h(](c+t,Y,r-Z-x-{.l.n0b0m1e1i2S2h2j2z4U4h4l4t4y5U5i6]6h6l7T:z:|Y;V8i8v8}9Q9SZ;W1R4[6_7j8X&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+R+V+Y+v+},`,f,k-q-v.O.Y.y/[/]/^/`/d/g/i/x0Q0g0q1U2e2m2}3b3d3e3m3t5j5x6R6v7e8U8h9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QS#l`#mR1V,j&e_ORSTU`jk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k#m$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+R+V+Y+v+},`,f,j,k-q-v.O.Y.y/[/]/^/`/d/g/i/x0Q0g0q1U2e2m2}3b3d3e3m3t5j5x6R6v7e8U8h9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QS#g^#nT'm#i'qT#h^#nT'o#i'q&e`ORSTU`jk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k#m$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+R+V+Y+v+},`,f,j,k-q-v.O.Y.y/[/]/^/`/d/g/i/x0Q0g0q1U2e2m2}3b3d3e3m3t5j5x6R6v7e8U8h9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;QT#l`#mQ#o`R'x#m$rbORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+R+v+},`,f-q-v.O.Y.y/[/]/^/`/d/g/i0Q0g0q2e2}3b3d3e3t5j5x6R7e8U8h!k;O#]#k&V'v+V+Y,k/x1U2m3m6v9T9V9Y9[9]9^9_9`9a9b9c9d9e9f9g9j9w9x9z:U:V:Z:[;Q#RdOSUj}!S!W!n!|#k$Z%Z%^%_%b%d%e%f%h%l&R&e'v)Z*i*m*r+v,k-q.O.y/[/]/^/`/d/g/i1U2e2}3b3d3e5j5xv#za!y$R$S$W(V(X(Y(a(u(v,]-s1^1u:};U;V;W#Q&{!w#d#v#x&f'|(e)Y)[)_)|*P+w-W-Y-}.P.m.p.x.z1g1o1|2P2T2f2|3O4g4p4x5f5k6u7R7|9n9q9t9{:O:R:W:];Y;[Q)P$UQ,v(Rb1S9i9p9s9v9}:Q:T:Y:_c8j9Z9o9r9u9|:P:S:X:^v#wa!y$R$S$W(V(X(Y(a(u(v,]-s1^1u:};U;V;WS(l#y(oQ)Q$VQ-d(m#Q:k!w#d#v#x&f'|(e)Y)[)_)|*P+w-W-Y-}.P.m.p.x.z1g1o1|2P2T2f2|3O4g4p4x5f5k6u7R7|9n9q9t9{:O:R:W:];Y;[b:l9Z9o9r9u9|:P:S:X:^b:m9i9p9s9v9}:Q:T:Y:_Q:q;RQ:r;SR:s;Tv#za!y$R$S$W(V(X(Y(a(u(v,]-s1^1u:};U;V;W#Q&{!w#d#v#x&f'|(e)Y)[)_)|*P+w-W-Y-}.P.m.p.x.z1g1o1|2P2T2f2|3O4g4p4x5f5k6u7R7|9n9q9t9{:O:R:W:];Y;[b1S9i9p9s9v9}:Q:T:Y:_c8j9Z9o9r9u9|:P:S:X:^lfOSj}!n$Z%b%e%f%h*m*r/d/gQ(d#xQ*{%oQ*|%qR1f-W$n#{a!w!y#d#v#x$R$S$W&f'|(V(X(Y(a(e(u(v)Y)[)_)|*P+w,]-W-Y-s-}.P.m.p.x.z1^1g1o1u1|2P2T2f2|3O4g4p4x5f5k6u7R7|9Z9i9n9o9p9q9r9s9t9u9v9{9|9}:O:P:Q:R:S:T:W:X:Y:]:^:_:};U;V;W;Y;[Q*O$|Q.o*QQ2i.nR5W2jT(n#y(oS(n#y(oT2q.v2rQ)`$dQ-c(lQ.U)aQ.}*ZQ3R/OQ5m3SQ6x5[Q7V5nQ7u6yQ8O7WQ8]7vQ8l8^Q8x8mR9P8yn(V#t&})R,}-V-l-m0n1y4a4r:j:v:w:x!d9{&y'h(](c+t,Y,r-Z-x-{.l.n0b0m1e1i2S2h2j2z4U4h4l4t4y5U5i6]6h6l7T:z:|Y9|8i8v8}9Q9SZ9}1R4[6_7j8Xp(X#t&})R,{,}-V-l-m0n1y4a4r:j:v:w:x!f:O&y'h(](c+t,Y,r-Z-x-{.l.n0b0k0m1e1i2S2h2j2z4U4h4l4t4y5U5i6]6h6l7T:z:|[:P8i8v8{8}9Q9S]:Q1R4[6_6`7j8XpeOSjy}!n$Z%X%b%e%f%h*m*r/d/gQ%UxR*i%_peOSjy}!n$Z%X%b%e%f%h*m*r/d/gR%UxQ*S$}R.k){qeOSjy}!n$Z%X%b%e%f%h*m*r/d/gQ.w*XS2{.{.|W5e2x2y2z3PU7Q5g5h5iU7z7P7S7TQ8a7{R8o8bQ%]yR*c%XR3Y/UR7Y5pS$lp$qR.a)lQ%bzR*m%cR*s%iT/e*r/gR*w%jQ*v%jR/n*wQjOQ!nST$^j!nQ(O#sR,s(OQ!YQR%t!YQ!^RU%z!^%{+SQ%{!_R+S%|Q+_&WR/z+_Q,^&}R0o,^Q,a'PS0r,a0sR0s,bQ+k&cR0U+kS!eR$tU&`!e&a+TQ&a!fR+T%}Q+b&ZR/|+bQ&t!sQ,P&rU,T&t,P0jR0j,UQ'q#iR,l'qQ#m`R'w#mQ#cZU'g#c+O9hQ+O9UR9h'tQ-Q(^W1a-Q1b4e6gU1b-R-S-TS4e1c1dR6g4f$Z(T#t&y&}'h(](c(|(})R+t,W,X,Y,r,{,|,}-V-Z-l-m-x-{.l.n0b0k0l0m0n1R1e1i1y2S2h2j2z4U4Y4Z4[4a4h4l4r4t4y5U5i6]6_6`6a6h6l7T7j8X8i8t8u8v8{8|8}9Q9S:j:v:w:x:z:|Q-X(cU1h-X1j4iQ1j-ZR4i1iQ(o#yR-f(oQ(x#}R-o(xQ1}-xR4u1}Q)y$wR.j)yQ2l.qS5Y2l6wR6w5ZQ*U%OR.t*UQ2r.vR5_2rQ/T*`S3W/T5qR5q3YQ.[)hW2].[2_5O6rQ2_._Q5O2^R6r5PQ)m$lR.b)mQ/g*rR3h/gWiOSj!nQ%g}Q)U$ZQ*l%bQ*n%eQ*o%fQ*q%hQ/b*mS/e*r/gR3g/dQ$]gQ%k!RQ%n!TQ%p!UQ%r!VQ)t$rQ)z$xQ*b%]Q*y%mQ-e(nS/W*c*fQ/o*xQ/p*{Q/q*|S0P+h2oQ2b.eQ2g.lQ3Q.}Q3[/YQ3f/cY3s0R0S0Y0_5aQ5S2dQ5V2hQ5l3RQ5r3Z[6P3r3u3y3{3|6}Q6s5QQ7U5mQ7Z5sW7a6Q6V6X6ZQ7q6tQ7t6xQ7}7VU8Q7b7g7iQ8[7uQ8c8OS8d8S8WQ8k8]Q8p8fQ8w8lQ8z8rQ9O8xR9R9PQ$fmQ&h!jU)c$g$h$iQ+X&TU+y&i&j&kQ-](iS.W)d)eQ/w+ZQ0O+hS0d+z+{Q1m-aQ2V.XQ3p/}S3v0T0YQ4R0eQ4m1qS6T3w3|Q7d6UQ8T7fR8g8VS#ua:}R)^$cU#}a$c:}R-n(wQ#taS&y!w)_Q&}!yQ'h#dQ(]#vQ(c#xQ(|$RQ(}$SQ)R$WQ+t&fQ,W9nQ,X9qQ,Y9tQ,r'|Q,{(VQ,|(XQ,}(YQ-V(aQ-Z(eQ-l(uQ-m(vd-x)Y-}.x2P2|4x5f6u7R7|Q-{)[Q.l)|Q.n*PQ0b+wQ0k9{Q0l:OQ0m:RQ0n,]Q1R9iQ1e-WQ1i-YQ1y-sQ2S.PQ2h.mQ2j.pQ2z.zQ4U:WQ4Y9pQ4Z9sQ4[9vQ4a1^Q4h1gQ4l1oQ4r1uQ4t1|Q4y2TQ5U2fQ5i3OQ6]:]Q6_:TQ6`9}Q6a:QQ6h4gQ6l4pQ7T5kQ7j:YQ8X:_Q8i9ZQ8t9oQ8u9rQ8v9uQ8{9|Q8|:PQ8}:SQ9Q:XQ9S:^Q:j:}Q:v;UQ:w;VQ:x;WQ:z;YR:|;[lgOSj}!n$Z%b%e%f%h*m*r/d/gS!pU%dQ%m!SQ%s!WQ'U!|Q'u#kS*f%Z%^Q*j%_Q*x%lQ+U&RQ+s&eQ,p'vQ-z)ZQ/_*iQ0a+vQ1X,kQ1w-qQ2R.OQ2y.yQ3^/[Q3_/]Q3a/^Q3c/`Q3j/iQ4_1UQ5T2eQ5h2}Q5w3bQ5y3dQ5z3eQ7S5jR7]5x!vZOSUj}!S!n!|$Z%Z%^%_%b%d%e%f%h%l&R&e)Z*i*m*r+v-q.O.y/[/]/^/`/d/g/i2e2}3b3d3e5j5xQ!_RQ!oTQ$_kS%v!]%yQ%|!`Q&x!vQ'P!zQ'V#PQ'W#QQ'X#RQ'Y#SQ'Z#TQ'[#UQ']#VQ'^#WQ'_#XQ'`#YQ'a#ZQ'c#]Q'f#bQ'j#eW't#k'v,k1UQ)n$mS+P%w+RS+[&V/xQ+e&^Q+|&oQ,[&|Q,b'QQ,e9TQ,g9VQ,u(QQ-t)SQ/s+VQ/v+YQ0f+}Q0p,`Q0t9YQ0u9[Q0v9]Q0w9^Q0x9_Q0y9`Q0z9aQ0{9bQ0|9cQ0}9dQ1O9eQ1P9fQ1Q,fQ1T9jQ1Y9gQ1z-vQ2W.YQ3o9wQ3r0QQ4S0gQ4V0qQ4W9xQ4]9zQ4^:UQ5Z2mQ5}3mQ6Q3tQ6^:VQ6b:ZQ6c:[Q7b6RQ7s6vQ8S7eQ8f8UQ8r8hQ9U!WR:p;QR!aRR&X!bS&T!b+^S+Z&U&]R/}+dR'O!yR'R!zT!tU$XS!sU$XU$wrs*kS&r!r!uQ,R&sQ,U&vQ.i)xS0h,Q,SR4T0i`!dR!]!`$t%w&_)v+fh!qUrs!r!u$X&s&v)x,Q,S0iQ/a*kQ/t+WQ3l/lT:g&V)wT!gR$tS!fR$tS%x!]&_S%}!`)vS+Q%w+fT+]&V)wT&[!b$uQ#i^R'z#nT'p#i'qR1W,jT(`#v(hR(f#xQ-y)YQ2Q-}Q2x.xQ4v2PQ5g2|Q6o4xQ7P5fQ7r6uQ7{7RR8b7|lhOSj}!n$Z%b%e%f%h*m*r/d/gQ%[yR*b%XV$xrs*kR.r*RR*a%VQ$ppR)s$qR)i$kT%`z%cT%az%cT/f*r/g",
  nodeNames: "⚠ ArithOp ArithOp InterpolationStart extends LineComment BlockComment Script ExportDeclaration export Star as VariableName String from ; default FunctionDeclaration async function VariableDefinition TypeParamList TypeDefinition ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Interpolation null super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression await yield delete LogicOp BitOp ParenthesizedExpression ClassExpression class extends ClassBody MethodDeclaration Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression PrivatePropertyName BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody MethodDeclaration AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement",
  maxTerm: 332,
  context: trackNewline,
  nodeProps: [
    ["closedBy", 3,"InterpolationEnd",40,"]",51,"}",66,")",132,"JSXSelfCloseEndTag JSXEndTag",146,"JSXEndTag"],
    ["group", -26,8,15,17,58,184,188,191,192,194,197,200,211,213,219,221,223,225,228,234,240,242,244,246,248,250,251,"Statement",-30,12,13,24,27,28,41,43,44,45,47,52,60,68,74,75,91,92,101,103,119,122,124,125,126,127,129,130,148,149,151,"Expression",-22,23,25,29,32,34,152,154,156,157,159,160,161,163,164,165,167,168,169,178,180,182,183,"Type",-3,79,85,90,"ClassItem"],
    ["openedBy", 30,"InterpolationStart",46,"[",50,"{",65,"(",131,"JSXStartTag",141,"JSXStartTag JSXStartCloseTag"]
  ],
  propSources: [jsHighlight],
  skippedNodes: [0,5,6],
  repeatNodeCount: 28,
  tokenData: "!C}~R!`OX%TXY%cYZ'RZ[%c[]%T]^'R^p%Tpq%cqr'crs(kst0htu2`uv4pvw5ewx6cxy<yyz=Zz{=k{|>k|}?O}!O>k!O!P?`!P!QCl!Q!R!0[!R![!1q![!]!7s!]!^!8V!^!_!8g!_!`!9d!`!a!:[!a!b!<R!b!c%T!c!}2`!}#O!=d#O#P%T#P#Q!=t#Q#R!>U#R#S2`#S#T!>i#T#o2`#o#p!>y#p#q!?O#q#r!?f#r#s!?x#s$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$I|2`$I|$I}!Bq$I}$JO!Bq$JO$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`W%YR$UWO!^%T!_#o%T#p~%T7Z%jg$UW'Y7ROX%TXY%cYZ%TZ[%c[p%Tpq%cq!^%T!_#o%T#p$f%T$f$g%c$g#BY%T#BY#BZ%c#BZ$IS%T$IS$I_%c$I_$JT%T$JT$JU%c$JU$KV%T$KV$KW%c$KW&FU%T&FU&FV%c&FV?HT%T?HT?HU%c?HU~%T7Z'YR$UW'Z7RO!^%T!_#o%T#p~%T$T'jS$UW!j#{O!^%T!_!`'v!`#o%T#p~%T$O'}S#e#v$UWO!^%T!_!`(Z!`#o%T#p~%T$O(bR#e#v$UWO!^%T!_#o%T#p~%T'u(rZ$UW]!ROY(kYZ)eZr(krs*rs!^(k!^!_+U!_#O(k#O#P-b#P#o(k#o#p+U#p~(k&r)jV$UWOr)ers*Ps!^)e!^!_*a!_#o)e#o#p*a#p~)e&r*WR$P&j$UWO!^%T!_#o%T#p~%T&j*dROr*ars*ms~*a&j*rO$P&j'u*{R$P&j$UW]!RO!^%T!_#o%T#p~%T'm+ZV]!ROY+UYZ*aZr+Urs+ps#O+U#O#P+w#P~+U'm+wO$P&j]!R'm+zROr+Urs,Ts~+U'm,[U$P&j]!ROY,nZr,nrs-Vs#O,n#O#P-[#P~,n!R,sU]!ROY,nZr,nrs-Vs#O,n#O#P-[#P~,n!R-[O]!R!R-_PO~,n'u-gV$UWOr(krs-|s!^(k!^!_+U!_#o(k#o#p+U#p~(k'u.VZ$P&j$UW]!ROY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x!Z/PZ$UW]!ROY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x!Z/yR$UW]!RO!^%T!_#o%T#p~%T!Z0XT$UWO!^.x!^!_,n!_#o.x#o#p,n#p~.x2k0mZ$UWOt%Ttu1`u!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`2k1g]$UW'o2cOt%Ttu1`u!Q%T!Q![1`![!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`7Z2k_$UW#zS']%k'g2bOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`[3q_$UW#zSOt%Ttu3ju}%T}!O3j!O!Q%T!Q![3j![!^%T!_!c%T!c!}3j!}#R%T#R#S3j#S#T%T#T#o3j#p$g%T$g~3j$O4wS#^#v$UWO!^%T!_!`5T!`#o%T#p~%T$O5[R$UW#o#vO!^%T!_#o%T#p~%T6d5lU'x6[$UWOv%Tvw6Ow!^%T!_!`5T!`#o%T#p~%T$O6VS$UW#i#vO!^%T!_!`5T!`#o%T#p~%T'u6jZ$UW]!ROY6cYZ7]Zw6cwx*rx!^6c!^!_8T!_#O6c#O#P:T#P#o6c#o#p8T#p~6c&r7bV$UWOw7]wx*Px!^7]!^!_7w!_#o7]#o#p7w#p~7]&j7zROw7wwx*mx~7w'm8YV]!ROY8TYZ7wZw8Twx+px#O8T#O#P8o#P~8T'm8rROw8Twx8{x~8T'm9SU$P&j]!ROY9fZw9fwx-Vx#O9f#O#P9}#P~9f!R9kU]!ROY9fZw9fwx-Vx#O9f#O#P9}#P~9f!R:QPO~9f'u:YV$UWOw6cwx:ox!^6c!^!_8T!_#o6c#o#p8T#p~6c'u:xZ$P&j$UW]!ROY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k!Z;rZ$UW]!ROY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k!Z<jT$UWO!^;k!^!_9f!_#o;k#o#p9f#p~;k%V=QR!d$}$UWO!^%T!_#o%T#p~%TZ=bR!cR$UWO!^%T!_#o%T#p~%T5s=tU'^2s#_#v$UWOz%Tz{>W{!^%T!_!`5T!`#o%T#p~%T$O>_S#[#v$UWO!^%T!_!`5T!`#o%T#p~%T$u>rSj$m$UWO!^%T!_!`5T!`#o%T#p~%T&i?VR!R&a$UWO!^%T!_#o%T#p~%T7Z?gVu6`$UWO!O%T!O!P?|!P!Q%T!Q![@r![!^%T!_#o%T#p~%Ty@RT$UWO!O%T!O!P@b!P!^%T!_#o%T#p~%Ty@iR!Qq$UWO!^%T!_#o%T#p~%Ty@yZ$UWkqO!Q%T!Q![@r![!^%T!_!g%T!g!hAl!h#R%T#R#S@r#S#X%T#X#YAl#Y#o%T#p~%TyAqZ$UWO{%T{|Bd|}%T}!OBd!O!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%TyBiV$UWO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%TyCVV$UWkqO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%T7ZCs`$UW#]#vOYDuYZ%TZzDuz{Jl{!PDu!P!Q!-e!Q!^Du!^!_Fx!_!`!.^!`!a!/]!a!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXD|[$UW}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXEy_$UW}PO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%TPF}V}POYFxZ!PFx!P!QGd!Q!}Fx!}#OG{#O#PHh#P~FxPGiU}P#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGdPHOTOYG{Z#OG{#O#PH_#P#QFx#Q~G{PHbQOYG{Z~G{PHkQOYFxZ~FxXHvY$UWOYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~HqXIkV$UWOYHqYZ%TZ!^Hq!^!_G{!_#oHq#o#pG{#p~HqXJVV$UWOYDuYZ%TZ!^Du!^!_Fx!_#oDu#o#pFx#p~Du7ZJs^$UW}POYJlYZKoZzJlz{NQ{!PJl!P!Q!,R!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl7ZKtV$UWOzKoz{LZ{!^Ko!^!_M]!_#oKo#o#pM]#p~Ko7ZL`X$UWOzKoz{LZ{!PKo!P!QL{!Q!^Ko!^!_M]!_#oKo#o#pM]#p~Ko7ZMSR$UWU7RO!^%T!_#o%T#p~%T7RM`ROzM]z{Mi{~M]7RMlTOzM]z{Mi{!PM]!P!QM{!Q~M]7RNQOU7R7ZNX^$UW}POYJlYZKoZzJlz{NQ{!PJl!P!Q! T!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl7Z! ^_$UWU7R}PO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%T7R!!bY}POY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!&x!Q!}!!]!}#O!$`#O#P!&f#P~!!]7R!#VY}POY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!#u!Q!}!!]!}#O!$`#O#P!&f#P~!!]7R!#|UU7R}P#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGd7R!$cWOY!$`YZM]Zz!$`z{!${{#O!$`#O#P!&S#P#Q!!]#Q~!$`7R!%OYOY!$`YZM]Zz!$`z{!${{!P!$`!P!Q!%n!Q#O!$`#O#P!&S#P#Q!!]#Q~!$`7R!%sTU7ROYG{Z#OG{#O#PH_#P#QFx#Q~G{7R!&VTOY!$`YZM]Zz!$`z{!${{~!$`7R!&iTOY!!]YZM]Zz!!]z{!#Q{~!!]7R!&}_}POzM]z{Mi{#ZM]#Z#[!&x#[#]M]#]#^!&x#^#aM]#a#b!&x#b#gM]#g#h!&x#h#iM]#i#j!&x#j#mM]#m#n!&x#n~M]7Z!(R[$UWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|7Z!(|^$UWOY!'|YZKoZz!'|z{!(w{!P!'|!P!Q!)x!Q!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|7Z!*PY$UWU7ROYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~Hq7Z!*tX$UWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#o!'|#o#p!$`#p~!'|7Z!+fX$UWOYJlYZKoZzJlz{NQ{!^Jl!^!_!!]!_#oJl#o#p!!]#p~Jl7Z!,Yc$UW}POzKoz{LZ{!^Ko!^!_M]!_#ZKo#Z#[!,R#[#]Ko#]#^!,R#^#aKo#a#b!,R#b#gKo#g#h!,R#h#iKo#i#j!,R#j#mKo#m#n!,R#n#oKo#o#pM]#p~Ko7Z!-lV$UWT7ROY!-eYZ%TZ!^!-e!^!_!.R!_#o!-e#o#p!.R#p~!-e7R!.WQT7ROY!.RZ~!.R$P!.g[$UW#o#v}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Du]!/f[#wS$UW}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Duy!0cd$UWkqO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#U%T#U#V!3X#V#X%T#X#YAl#Y#b%T#b#c!2w#c#d!4m#d#l%T#l#m!5{#m#o%T#p~%Ty!1x_$UWkqO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#X%T#X#YAl#Y#b%T#b#c!2w#c#o%T#p~%Ty!3OR$UWkqO!^%T!_#o%T#p~%Ty!3^W$UWO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#o%T#p~%Ty!3}Y$UWkqO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#b%T#b#c!2w#c#o%T#p~%Ty!4rV$UWO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#o%T#p~%Ty!5`X$UWkqO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#b%T#b#c!2w#c#o%T#p~%Ty!6QZ$UWO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#o%T#p~%Ty!6z]$UWkqO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#b%T#b#c!2w#c#o%T#p~%T%w!7|R!]V$UW#m%hO!^%T!_#o%T#p~%T!P!8^R_w$UWO!^%T!_#o%T#p~%T6i!8rR'bd!a0`#x&s'|P!P!Q!8{!^!_!9Q!_!`!9_W!9QO$WW#v!9VP#`#v!_!`!9Y#v!9_O#o#v#v!9dO#a#v%w!9kT!{%o$UWO!^%T!_!`'v!`!a!9z!a#o%T#p~%T$P!:RR#W#w$UWO!^%T!_#o%T#p~%T%w!:gT'a!s#a#v$RS$UWO!^%T!_!`!:v!`!a!;W!a#o%T#p~%T$O!:}R#a#v$UWO!^%T!_#o%T#p~%T$O!;_T#`#v$UWO!^%T!_!`5T!`!a!;n!a#o%T#p~%T$O!;uS#`#v$UWO!^%T!_!`5T!`#o%T#p~%T6i!<YV'p6a$UWO!O%T!O!P!<o!P!^%T!_!a%T!a!b!=P!b#o%T#p~%T)z!<vRv)r$UWO!^%T!_#o%T#p~%T$O!=WS$UW#j#vO!^%T!_!`5T!`#o%T#p~%T7V!=kRx6}$UWO!^%T!_#o%T#p~%TZ!={R!OR$UWO!^%T!_#o%T#p~%T$O!>]S#g#v$UWO!^%T!_!`5T!`#o%T#p~%T$P!>pR$UW'f#wO!^%T!_#o%T#p~%T~!?OO!T~6d!?VT'w6[$UWO!^%T!_!`5T!`#o%T#p#q!=P#q~%T5g!?oR!S5]nQ$UWO!^%T!_#o%T#p~%TX!@PR!kP$UWO!^%T!_#o%T#p~%T7Z!@gr$UW'Y7R#zS']%k'g2bOX%TXY%cYZ%TZ[%c[p%Tpq%cqt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`7Z!CO_$UW'Z7R#zS']%k'g2bOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`",
  tokenizers: [noSemicolon, incdecToken, template, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, insertSemicolon],
  topRules: {"Script":[0,7]},
  dialects: {jsx: 11707, ts: 11709},
  dynamicPrecedences: {"149":1,"176":1},
  specialized: [{term: 289, get: (value, stack) => (tsExtends(value, stack) << 1)},{term: 289, get: value => spec_identifier[value] || -1},{term: 299, get: value => spec_word[value] || -1},{term: 63, get: value => spec_LessThan[value] || -1}],
  tokenPrec: 11730
});



// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+language@6.7.0/node_modules/@codemirror/language/dist/index.js
var language_dist = __webpack_require__(12726);
// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+state@6.2.1/node_modules/@codemirror/state/dist/index.js
var state_dist = __webpack_require__(71380);
// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+view@6.12.0/node_modules/@codemirror/view/dist/index.js
var view_dist = __webpack_require__(17628);
// EXTERNAL MODULE: ../node_modules/.pnpm/@codemirror+autocomplete@6.0.2_@codemirror+language@6.7.0_@codemirror+state@6.2.1_@codemirror_roqc7tgjhz5nw5npvufidw452q/node_modules/@codemirror/autocomplete/dist/index.js
var autocomplete_dist = __webpack_require__(75525);
// EXTERNAL MODULE: ../node_modules/.pnpm/@lezer+common@1.2.1/node_modules/@lezer/common/dist/index.js
var common_dist = __webpack_require__(33933);
;// CONCATENATED MODULE: ../node_modules/.pnpm/@codemirror+lang-javascript@6.1.7/node_modules/@codemirror/lang-javascript/dist/index.js







/**
A collection of JavaScript-related
[snippets](https://codemirror.net/6/docs/ref/#autocomplete.snippet).
*/
const snippets = [
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("function ${name}(${params}) {\n\t${}\n}", {
        label: "function",
        detail: "definition",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n\t${}\n}", {
        label: "for",
        detail: "loop",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("for (let ${name} of ${collection}) {\n\t${}\n}", {
        label: "for",
        detail: "of loop",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("do {\n\t${}\n} while (${})", {
        label: "do",
        detail: "loop",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("while (${}) {\n\t${}\n}", {
        label: "while",
        detail: "loop",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("try {\n\t${}\n} catch (${error}) {\n\t${}\n}", {
        label: "try",
        detail: "/ catch block",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("if (${}) {\n\t${}\n}", {
        label: "if",
        detail: "block",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("if (${}) {\n\t${}\n} else {\n\t${}\n}", {
        label: "if",
        detail: "/ else block",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("class ${name} {\n\tconstructor(${params}) {\n\t\t${}\n\t}\n}", {
        label: "class",
        detail: "definition",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("import {${names}} from \"${module}\"\n${}", {
        label: "import",
        detail: "named",
        type: "keyword"
    }),
    /*@__PURE__*/(0,autocomplete_dist/* snippetCompletion */.Gw)("import ${name} from \"${module}\"\n${}", {
        label: "import",
        detail: "default",
        type: "keyword"
    })
];

const cache = /*@__PURE__*/new common_dist/* NodeWeakMap */.RY();
const ScopeNodes = /*@__PURE__*/new Set([
    "Script", "Block",
    "FunctionExpression", "FunctionDeclaration", "ArrowFunction", "MethodDeclaration",
    "ForStatement"
]);
function defID(type) {
    return (node, def) => {
        let id = node.node.getChild("VariableDefinition");
        if (id)
            def(id, type);
        return true;
    };
}
const functionContext = ["FunctionDeclaration"];
const gatherCompletions = {
    FunctionDeclaration: /*@__PURE__*/defID("function"),
    ClassDeclaration: /*@__PURE__*/defID("class"),
    ClassExpression: () => true,
    EnumDeclaration: /*@__PURE__*/defID("constant"),
    TypeAliasDeclaration: /*@__PURE__*/defID("type"),
    NamespaceDeclaration: /*@__PURE__*/defID("namespace"),
    VariableDefinition(node, def) { if (!node.matchContext(functionContext))
        def(node, "variable"); },
    TypeDefinition(node, def) { def(node, "type"); },
    __proto__: null
};
function getScope(doc, node) {
    let cached = cache.get(node);
    if (cached)
        return cached;
    let completions = [], top = true;
    function def(node, type) {
        let name = doc.sliceString(node.from, node.to);
        completions.push({ label: name, type });
    }
    node.cursor(common_dist/* IterMode */.Qj.IncludeAnonymous).iterate(node => {
        if (top) {
            top = false;
        }
        else if (node.name) {
            let gather = gatherCompletions[node.name];
            if (gather && gather(node, def) || ScopeNodes.has(node.name))
                return false;
        }
        else if (node.to - node.from > 8192) {
            // Allow caching for bigger internal nodes
            for (let c of getScope(doc, node.node))
                completions.push(c);
            return false;
        }
    });
    cache.set(node, completions);
    return completions;
}
const Identifier = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/;
const dontComplete = [
    "TemplateString", "String", "RegExp",
    "LineComment", "BlockComment",
    "VariableDefinition", "TypeDefinition", "Label",
    "PropertyDefinition", "PropertyName",
    "PrivatePropertyDefinition", "PrivatePropertyName"
];
/**
Completion source that looks up locally defined names in
JavaScript code.
*/
function localCompletionSource(context) {
    let inner = (0,language_dist/* syntaxTree */.mv)(context.state).resolveInner(context.pos, -1);
    if (dontComplete.indexOf(inner.name) > -1)
        return null;
    let isWord = inner.name == "VariableName" ||
        inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to));
    if (!isWord && !context.explicit)
        return null;
    let options = [];
    for (let pos = inner; pos; pos = pos.parent) {
        if (ScopeNodes.has(pos.name))
            options = options.concat(getScope(context.state.doc, pos));
    }
    return {
        options,
        from: isWord ? inner.from : context.pos,
        validFor: Identifier
    };
}
function pathFor(read, member, name) {
    var _a;
    let path = [];
    for (;;) {
        let obj = member.firstChild, prop;
        if ((obj === null || obj === void 0 ? void 0 : obj.name) == "VariableName") {
            path.push(read(obj));
            return { path: path.reverse(), name };
        }
        else if ((obj === null || obj === void 0 ? void 0 : obj.name) == "MemberExpression" && ((_a = (prop = obj.lastChild)) === null || _a === void 0 ? void 0 : _a.name) == "PropertyName") {
            path.push(read(prop));
            member = obj;
        }
        else {
            return null;
        }
    }
}
/**
Helper function for defining JavaScript completion sources. It
returns the completable name and object path for a completion
context, or null if no name/property completion should happen at
that position. For example, when completing after `a.b.c` it will
return `{path: ["a", "b"], name: "c"}`. When completing after `x`
it will return `{path: [], name: "x"}`. When not in a property or
name, it will return null if `context.explicit` is false, and
`{path: [], name: ""}` otherwise.
*/
function completionPath(context) {
    let read = (node) => context.state.doc.sliceString(node.from, node.to);
    let inner = (0,language_dist/* syntaxTree */.mv)(context.state).resolveInner(context.pos, -1);
    if (inner.name == "PropertyName") {
        return pathFor(read, inner.parent, read(inner));
    }
    else if (dontComplete.indexOf(inner.name) > -1) {
        return null;
    }
    else if (inner.name == "VariableName" || inner.to - inner.from < 20 && Identifier.test(read(inner))) {
        return { path: [], name: read(inner) };
    }
    else if ((inner.name == "." || inner.name == "?.") && inner.parent.name == "MemberExpression") {
        return pathFor(read, inner.parent, "");
    }
    else if (inner.name == "MemberExpression") {
        return pathFor(read, inner, "");
    }
    else {
        return context.explicit ? { path: [], name: "" } : null;
    }
}
function enumeratePropertyCompletions(obj, top) {
    let options = [], seen = new Set;
    for (let depth = 0;; depth++) {
        for (let name of (Object.getOwnPropertyNames || Object.keys)(obj)) {
            if (seen.has(name))
                continue;
            seen.add(name);
            let value;
            try {
                value = obj[name];
            }
            catch (_) {
                continue;
            }
            options.push({
                label: name,
                type: typeof value == "function" ? (/^[A-Z]/.test(name) ? "class" : top ? "function" : "method")
                    : top ? "variable" : "property",
                boost: -depth
            });
        }
        let next = Object.getPrototypeOf(obj);
        if (!next)
            return options;
        obj = next;
    }
}
/**
Defines a [completion source](https://codemirror.net/6/docs/ref/#autocomplete.CompletionSource) that
completes from the given scope object (for example `globalThis`).
Will enter properties of the object when completing properties on
a directly-named path.
*/
function scopeCompletionSource(scope) {
    let cache = new Map;
    return (context) => {
        let path = completionPath(context);
        if (!path)
            return null;
        let target = scope;
        for (let step of path.path) {
            target = target[step];
            if (!target)
                return null;
        }
        let options = cache.get(target);
        if (!options)
            cache.set(target, options = enumeratePropertyCompletions(target, !path.path.length));
        return {
            from: context.pos - path.name.length,
            options,
            validFor: Identifier
        };
    };
}

/**
A language provider based on the [Lezer JavaScript
parser](https://github.com/lezer-parser/javascript), extended with
highlighting and indentation information.
*/
const javascriptLanguage = /*@__PURE__*/language_dist/* LRLanguage */.bj.define({
    name: "javascript",
    parser: /*@__PURE__*/parser.configure({
        props: [
            /*@__PURE__*/language_dist/* indentNodeProp */.Oh.add({
                IfStatement: /*@__PURE__*/(0,language_dist/* continuedIndent */.mz)({ except: /^\s*({|else\b)/ }),
                TryStatement: /*@__PURE__*/(0,language_dist/* continuedIndent */.mz)({ except: /^\s*({|catch\b|finally\b)/ }),
                LabeledStatement: language_dist/* flatIndent */._Y,
                SwitchBody: context => {
                    let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after);
                    return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
                },
                Block: /*@__PURE__*/(0,language_dist/* delimitedIndent */.Ay)({ closing: "}" }),
                ArrowFunction: cx => cx.baseIndent + cx.unit,
                "TemplateString BlockComment": () => null,
                "Statement Property": /*@__PURE__*/(0,language_dist/* continuedIndent */.mz)({ except: /^{/ }),
                JSXElement(context) {
                    let closed = /^\s*<\//.test(context.textAfter);
                    return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
                },
                JSXEscape(context) {
                    let closed = /\s*\}/.test(context.textAfter);
                    return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
                },
                "JSXOpenTag JSXSelfClosingTag"(context) {
                    return context.column(context.node.from) + context.unit;
                }
            }),
            /*@__PURE__*/language_dist/* foldNodeProp */.b_.add({
                "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": language_dist/* foldInside */.yd,
                BlockComment(tree) { return { from: tree.from + 2, to: tree.to - 2 }; }
            })
        ]
    }),
    languageData: {
        closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
        commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
        indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
        wordChars: "$"
    }
});
const jsxSublanguage = {
    test: node => /^JSX/.test(node.name),
    facet: /*@__PURE__*/(0,language_dist/* defineLanguageFacet */.p9)({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
};
/**
A language provider for TypeScript.
*/
const typescriptLanguage = /*@__PURE__*/javascriptLanguage.configure({ dialect: "ts" }, "typescript");
/**
Language provider for JSX.
*/
const jsxLanguage = /*@__PURE__*/javascriptLanguage.configure({
    dialect: "jsx",
    props: [/*@__PURE__*/language_dist/* sublanguageProp */.Q0.add(n => n.isTop ? [jsxSublanguage] : undefined)]
});
/**
Language provider for JSX + TypeScript.
*/
const tsxLanguage = /*@__PURE__*/javascriptLanguage.configure({
    dialect: "jsx ts",
    props: [/*@__PURE__*/language_dist/* sublanguageProp */.Q0.add(n => n.isTop ? [jsxSublanguage] : undefined)]
}, "typescript");
const keywords = /*@__PURE__*/"break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(kw => ({ label: kw, type: "keyword" }));
/**
JavaScript support. Includes [snippet](https://codemirror.net/6/docs/ref/#lang-javascript.snippets)
completion.
*/
function javascript(config = {}) {
    let lang = config.jsx ? (config.typescript ? tsxLanguage : jsxLanguage)
        : config.typescript ? typescriptLanguage : javascriptLanguage;
    return new language_dist/* LanguageSupport */.Yy(lang, [
        javascriptLanguage.data.of({
            autocomplete: (0,autocomplete_dist/* ifNotIn */.Ar)(dontComplete, (0,autocomplete_dist/* completeFromList */.et)(snippets.concat(keywords)))
        }),
        javascriptLanguage.data.of({
            autocomplete: localCompletionSource
        }),
        config.jsx ? autoCloseTags : [],
    ]);
}
function findOpenTag(node) {
    for (;;) {
        if (node.name == "JSXOpenTag" || node.name == "JSXSelfClosingTag" || node.name == "JSXFragmentTag")
            return node;
        if (node.name == "JSXEscape" || !node.parent)
            return null;
        node = node.parent;
    }
}
function elementName(doc, tree, max = doc.length) {
    for (let ch = tree === null || tree === void 0 ? void 0 : tree.firstChild; ch; ch = ch.nextSibling) {
        if (ch.name == "JSXIdentifier" || ch.name == "JSXBuiltin" || ch.name == "JSXNamespacedName" ||
            ch.name == "JSXMemberExpression")
            return doc.sliceString(ch.from, Math.min(ch.to, max));
    }
    return "";
}
function isEndTag(node) {
    return node && (node.name == "JSXEndTag" || node.name == "JSXSelfCloseEndTag");
}
const android = typeof navigator == "object" && /*@__PURE__*//Android\b/.test(navigator.userAgent);
/**
Extension that will automatically insert JSX close tags when a `>` or
`/` is typed.
*/
const autoCloseTags = /*@__PURE__*/view_dist/* EditorView */.Lz.inputHandler.of((view, from, to, text) => {
    if ((android ? view.composing : view.compositionStarted) || view.state.readOnly ||
        from != to || (text != ">" && text != "/") ||
        !javascriptLanguage.isActiveAt(view.state, from, -1))
        return false;
    let { state } = view;
    let changes = state.changeByRange(range => {
        var _a;
        let { head } = range, around = (0,language_dist/* syntaxTree */.mv)(state).resolveInner(head, -1), name;
        if (around.name == "JSXStartTag")
            around = around.parent;
        if (around.name == "JSXAttributeValue" && around.to > head) ;
        else if (text == ">" && around.name == "JSXFragmentTag") {
            return { range: state_dist/* EditorSelection */.OF.cursor(head + 1), changes: { from: head, insert: `></>` } };
        }
        else if (text == "/" && around.name == "JSXFragmentTag") {
            let empty = around.parent, base = empty === null || empty === void 0 ? void 0 : empty.parent;
            if (empty.from == head - 1 && ((_a = base.lastChild) === null || _a === void 0 ? void 0 : _a.name) != "JSXEndTag" &&
                (name = elementName(state.doc, base === null || base === void 0 ? void 0 : base.firstChild, head))) {
                let insert = `/${name}>`;
                return { range: state_dist/* EditorSelection */.OF.cursor(head + insert.length), changes: { from: head, insert } };
            }
        }
        else if (text == ">") {
            let openTag = findOpenTag(around);
            if (openTag && !isEndTag(openTag.lastChild) &&
                state.sliceDoc(head, head + 2) != "</" &&
                (name = elementName(state.doc, openTag, head)))
                return { range: state_dist/* EditorSelection */.OF.cursor(head + 1), changes: { from: head, insert: `></${name}>` } };
        }
        return { range };
    });
    if (changes.changes.empty)
        return false;
    view.dispatch(changes, { userEvent: "input.type", scrollIntoView: true });
    return true;
});

/**
Connects an [ESLint](https://eslint.org/) linter to CodeMirror's
[lint](https://codemirror.net/6/docs/ref/#lint) integration. `eslint` should be an instance of the
[`Linter`](https://eslint.org/docs/developer-guide/nodejs-api#linter)
class, and `config` an optional ESLint configuration. The return
value of this function can be passed to [`linter`](https://codemirror.net/6/docs/ref/#lint.linter)
to create a JavaScript linting extension.

Note that ESLint targets node, and is tricky to run in the
browser. The
[eslint-linter-browserify](https://github.com/UziTech/eslint-linter-browserify)
package may help with that (see
[example](https://github.com/UziTech/eslint-linter-browserify/blob/master/example/script.js)).
*/
function esLint(eslint, config) {
    if (!config) {
        config = {
            parserOptions: { ecmaVersion: 2019, sourceType: "module" },
            env: { browser: true, node: true, es6: true, es2015: true, es2017: true, es2020: true },
            rules: {}
        };
        eslint.getRules().forEach((desc, name) => {
            if (desc.meta.docs.recommended)
                config.rules[name] = 2;
        });
    }
    return (view) => {
        let { state } = view, found = [];
        for (let { from, to } of javascriptLanguage.findRegions(state)) {
            let fromLine = state.doc.lineAt(from), offset = { line: fromLine.number - 1, col: from - fromLine.from, pos: from };
            for (let d of eslint.verify(state.sliceDoc(from, to), config))
                found.push(translateDiagnostic(d, state.doc, offset));
        }
        return found;
    };
}
function mapPos(line, col, doc, offset) {
    return doc.line(line + offset.line).from + col + (line == 1 ? offset.col - 1 : -1);
}
function translateDiagnostic(input, doc, offset) {
    let start = mapPos(input.line, input.column, doc, offset);
    let result = {
        from: start,
        to: input.endLine != null && input.endColumn != 1 ? mapPos(input.endLine, input.endColumn, doc, offset) : start,
        message: input.message,
        source: input.ruleId ? "eslint:" + input.ruleId : "eslint",
        severity: input.severity == 1 ? "warning" : "error",
    };
    if (input.fix) {
        let { range, text } = input.fix, from = range[0] + offset.pos - start, to = range[1] + offset.pos - start;
        result.actions = [{
                name: "fix",
                apply(view, start) {
                    view.dispatch({ changes: { from: start + from, to: start + to, insert: text }, scrollIntoView: true });
                }
            }];
    }
    return result;
}




/***/ }),

/***/ 65983:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Aj: () => (/* binding */ ContextTracker),
/* harmony export */   Lu: () => (/* binding */ ExternalTokenizer),
/* harmony export */   U1: () => (/* binding */ LRParser),
/* harmony export */   uC: () => (/* binding */ LocalTokenGroup)
/* harmony export */ });
/* unused harmony exports InputStream, Stack */
/* harmony import */ var _lezer_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33933);


/// A parse stack. These are used internally by the parser to track
/// parsing progress. They also provide some properties and methods
/// that external code such as a tokenizer can use to get information
/// about the parse state.
class Stack {
    /// @internal
    constructor(
    /// The parse that this stack is part of @internal
    p, 
    /// Holds state, input pos, buffer index triplets for all but the
    /// top state @internal
    stack, 
    /// The current parse state @internal
    state, 
    // The position at which the next reduce should take place. This
    // can be less than `this.pos` when skipped expressions have been
    // added to the stack (which should be moved outside of the next
    // reduction)
    /// @internal
    reducePos, 
    /// The input position up to which this stack has parsed.
    pos, 
    /// The dynamic score of the stack, including dynamic precedence
    /// and error-recovery penalties
    /// @internal
    score, 
    // The output buffer. Holds (type, start, end, size) quads
    // representing nodes created by the parser, where `size` is
    // amount of buffer array entries covered by this node.
    /// @internal
    buffer, 
    // The base offset of the buffer. When stacks are split, the split
    // instance shared the buffer history with its parent up to
    // `bufferBase`, which is the absolute offset (including the
    // offset of previous splits) into the buffer at which this stack
    // starts writing.
    /// @internal
    bufferBase, 
    /// @internal
    curContext, 
    /// @internal
    lookAhead = 0, 
    // A parent stack from which this was split off, if any. This is
    // set up so that it always points to a stack that has some
    // additional buffer content, never to a stack with an equal
    // `bufferBase`.
    /// @internal
    parent) {
        this.p = p;
        this.stack = stack;
        this.state = state;
        this.reducePos = reducePos;
        this.pos = pos;
        this.score = score;
        this.buffer = buffer;
        this.bufferBase = bufferBase;
        this.curContext = curContext;
        this.lookAhead = lookAhead;
        this.parent = parent;
    }
    /// @internal
    toString() {
        return `[${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
    }
    // Start an empty stack
    /// @internal
    static start(p, state, pos = 0) {
        let cx = p.parser.context;
        return new Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
    }
    /// The stack's current [context](#lr.ContextTracker) value, if
    /// any. Its type will depend on the context tracker's type
    /// parameter, or it will be `null` if there is no context
    /// tracker.
    get context() { return this.curContext ? this.curContext.context : null; }
    // Push a state onto the stack, tracking its start position as well
    // as the buffer base at that point.
    /// @internal
    pushState(state, start) {
        this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
        this.state = state;
    }
    // Apply a reduce action
    /// @internal
    reduce(action) {
        var _a;
        let depth = action >> 19 /* Action.ReduceDepthShift */, type = action & 65535 /* Action.ValueMask */;
        let { parser } = this.p;
        let dPrec = parser.dynamicPrecedence(type);
        if (dPrec)
            this.score += dPrec;
        if (depth == 0) {
            this.pushState(parser.getGoto(this.state, type, true), this.reducePos);
            // Zero-depth reductions are a special case—they add stuff to
            // the stack without popping anything off.
            if (type < parser.minRepeatTerm)
                this.storeNode(type, this.reducePos, this.reducePos, 4, true);
            this.reduceContext(type, this.reducePos);
            return;
        }
        // Find the base index into `this.stack`, content after which will
        // be dropped. Note that with `StayFlag` reductions we need to
        // consume two extra frames (the dummy parent node for the skipped
        // expression and the state that we'll be staying in, which should
        // be moved to `this.state`).
        let base = this.stack.length - ((depth - 1) * 3) - (action & 262144 /* Action.StayFlag */ ? 6 : 0);
        let start = base ? this.stack[base - 2] : this.p.ranges[0].from, size = this.reducePos - start;
        // This is a kludge to try and detect overly deep left-associative
        // trees, which will not increase the parse stack depth and thus
        // won't be caught by the regular stack-depth limit check.
        if (size >= 2000 /* Recover.MinBigReduction */ && !((_a = this.p.parser.nodeSet.types[type]) === null || _a === void 0 ? void 0 : _a.isAnonymous)) {
            if (start == this.p.lastBigReductionStart) {
                this.p.bigReductionCount++;
                this.p.lastBigReductionSize = size;
            }
            else if (this.p.lastBigReductionSize < size) {
                this.p.bigReductionCount = 1;
                this.p.lastBigReductionStart = start;
                this.p.lastBigReductionSize = size;
            }
        }
        let bufferBase = base ? this.stack[base - 1] : 0, count = this.bufferBase + this.buffer.length - bufferBase;
        // Store normal terms or `R -> R R` repeat reductions
        if (type < parser.minRepeatTerm || (action & 131072 /* Action.RepeatFlag */)) {
            let pos = parser.stateFlag(this.state, 1 /* StateFlag.Skipped */) ? this.pos : this.reducePos;
            this.storeNode(type, start, pos, count + 4, true);
        }
        if (action & 262144 /* Action.StayFlag */) {
            this.state = this.stack[base];
        }
        else {
            let baseStateID = this.stack[base - 3];
            this.state = parser.getGoto(baseStateID, type, true);
        }
        while (this.stack.length > base)
            this.stack.pop();
        this.reduceContext(type, start);
    }
    // Shift a value into the buffer
    /// @internal
    storeNode(term, start, end, size = 4, isReduce = false) {
        if (term == 0 /* Term.Err */ &&
            (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
            // Try to omit/merge adjacent error nodes
            let cur = this, top = this.buffer.length;
            if (top == 0 && cur.parent) {
                top = cur.bufferBase - cur.parent.bufferBase;
                cur = cur.parent;
            }
            if (top > 0 && cur.buffer[top - 4] == 0 /* Term.Err */ && cur.buffer[top - 1] > -1) {
                if (start == end)
                    return;
                if (cur.buffer[top - 2] >= start) {
                    cur.buffer[top - 2] = end;
                    return;
                }
            }
        }
        if (!isReduce || this.pos == end) { // Simple case, just append
            this.buffer.push(term, start, end, size);
        }
        else { // There may be skipped nodes that have to be moved forward
            let index = this.buffer.length;
            if (index > 0 && this.buffer[index - 4] != 0 /* Term.Err */)
                while (index > 0 && this.buffer[index - 2] > end) {
                    // Move this record forward
                    this.buffer[index] = this.buffer[index - 4];
                    this.buffer[index + 1] = this.buffer[index - 3];
                    this.buffer[index + 2] = this.buffer[index - 2];
                    this.buffer[index + 3] = this.buffer[index - 1];
                    index -= 4;
                    if (size > 4)
                        size -= 4;
                }
            this.buffer[index] = term;
            this.buffer[index + 1] = start;
            this.buffer[index + 2] = end;
            this.buffer[index + 3] = size;
        }
    }
    // Apply a shift action
    /// @internal
    shift(action, next, nextEnd) {
        let start = this.pos;
        if (action & 131072 /* Action.GotoFlag */) {
            this.pushState(action & 65535 /* Action.ValueMask */, this.pos);
        }
        else if ((action & 262144 /* Action.StayFlag */) == 0) { // Regular shift
            let nextState = action, { parser } = this.p;
            if (nextEnd > this.pos || next <= parser.maxNode) {
                this.pos = nextEnd;
                if (!parser.stateFlag(nextState, 1 /* StateFlag.Skipped */))
                    this.reducePos = nextEnd;
            }
            this.pushState(nextState, start);
            this.shiftContext(next, start);
            if (next <= parser.maxNode)
                this.buffer.push(next, start, nextEnd, 4);
        }
        else { // Shift-and-stay, which means this is a skipped token
            this.pos = nextEnd;
            this.shiftContext(next, start);
            if (next <= this.p.parser.maxNode)
                this.buffer.push(next, start, nextEnd, 4);
        }
    }
    // Apply an action
    /// @internal
    apply(action, next, nextEnd) {
        if (action & 65536 /* Action.ReduceFlag */)
            this.reduce(action);
        else
            this.shift(action, next, nextEnd);
    }
    // Add a prebuilt (reused) node into the buffer.
    /// @internal
    useNode(value, next) {
        let index = this.p.reused.length - 1;
        if (index < 0 || this.p.reused[index] != value) {
            this.p.reused.push(value);
            index++;
        }
        let start = this.pos;
        this.reducePos = this.pos = start + value.length;
        this.pushState(next, start);
        this.buffer.push(index, start, this.reducePos, -1 /* size == -1 means this is a reused value */);
        if (this.curContext)
            this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
    }
    // Split the stack. Due to the buffer sharing and the fact
    // that `this.stack` tends to stay quite shallow, this isn't very
    // expensive.
    /// @internal
    split() {
        let parent = this;
        let off = parent.buffer.length;
        // Because the top of the buffer (after this.pos) may be mutated
        // to reorder reductions and skipped tokens, and shared buffers
        // should be immutable, this copies any outstanding skipped tokens
        // to the new buffer, and puts the base pointer before them.
        while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
            off -= 4;
        let buffer = parent.buffer.slice(off), base = parent.bufferBase + off;
        // Make sure parent points to an actual parent with content, if there is such a parent.
        while (parent && base == parent.bufferBase)
            parent = parent.parent;
        return new Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base, this.curContext, this.lookAhead, parent);
    }
    // Try to recover from an error by 'deleting' (ignoring) one token.
    /// @internal
    recoverByDelete(next, nextEnd) {
        let isNode = next <= this.p.parser.maxNode;
        if (isNode)
            this.storeNode(next, this.pos, nextEnd, 4);
        this.storeNode(0 /* Term.Err */, this.pos, nextEnd, isNode ? 8 : 4);
        this.pos = this.reducePos = nextEnd;
        this.score -= 190 /* Recover.Delete */;
    }
    /// Check if the given term would be able to be shifted (optionally
    /// after some reductions) on this stack. This can be useful for
    /// external tokenizers that want to make sure they only provide a
    /// given token when it applies.
    canShift(term) {
        for (let sim = new SimulatedStack(this);;) {
            let action = this.p.parser.stateSlot(sim.state, 4 /* ParseState.DefaultReduce */) || this.p.parser.hasAction(sim.state, term);
            if (action == 0)
                return false;
            if ((action & 65536 /* Action.ReduceFlag */) == 0)
                return true;
            sim.reduce(action);
        }
    }
    // Apply up to Recover.MaxNext recovery actions that conceptually
    // inserts some missing token or rule.
    /// @internal
    recoverByInsert(next) {
        if (this.stack.length >= 300 /* Recover.MaxInsertStackDepth */)
            return [];
        let nextStates = this.p.parser.nextStates(this.state);
        if (nextStates.length > 4 /* Recover.MaxNext */ << 1 || this.stack.length >= 120 /* Recover.DampenInsertStackDepth */) {
            let best = [];
            for (let i = 0, s; i < nextStates.length; i += 2) {
                if ((s = nextStates[i + 1]) != this.state && this.p.parser.hasAction(s, next))
                    best.push(nextStates[i], s);
            }
            if (this.stack.length < 120 /* Recover.DampenInsertStackDepth */)
                for (let i = 0; best.length < 4 /* Recover.MaxNext */ << 1 && i < nextStates.length; i += 2) {
                    let s = nextStates[i + 1];
                    if (!best.some((v, i) => (i & 1) && v == s))
                        best.push(nextStates[i], s);
                }
            nextStates = best;
        }
        let result = [];
        for (let i = 0; i < nextStates.length && result.length < 4 /* Recover.MaxNext */; i += 2) {
            let s = nextStates[i + 1];
            if (s == this.state)
                continue;
            let stack = this.split();
            stack.pushState(s, this.pos);
            stack.storeNode(0 /* Term.Err */, stack.pos, stack.pos, 4, true);
            stack.shiftContext(nextStates[i], this.pos);
            stack.score -= 200 /* Recover.Insert */;
            result.push(stack);
        }
        return result;
    }
    // Force a reduce, if possible. Return false if that can't
    // be done.
    /// @internal
    forceReduce() {
        let reduce = this.p.parser.stateSlot(this.state, 5 /* ParseState.ForcedReduce */);
        if ((reduce & 65536 /* Action.ReduceFlag */) == 0)
            return false;
        let { parser } = this.p;
        if (!parser.validAction(this.state, reduce)) {
            let depth = reduce >> 19 /* Action.ReduceDepthShift */, term = reduce & 65535 /* Action.ValueMask */;
            let target = this.stack.length - depth * 3;
            if (target < 0 || parser.getGoto(this.stack[target], term, false) < 0)
                return false;
            this.storeNode(0 /* Term.Err */, this.reducePos, this.reducePos, 4, true);
            this.score -= 100 /* Recover.Reduce */;
        }
        this.reducePos = this.pos;
        this.reduce(reduce);
        return true;
    }
    /// @internal
    forceAll() {
        while (!this.p.parser.stateFlag(this.state, 2 /* StateFlag.Accepting */)) {
            if (!this.forceReduce()) {
                this.storeNode(0 /* Term.Err */, this.pos, this.pos, 4, true);
                break;
            }
        }
        return this;
    }
    /// Check whether this state has no further actions (assumed to be a direct descendant of the
    /// top state, since any other states must be able to continue
    /// somehow). @internal
    get deadEnd() {
        if (this.stack.length != 3)
            return false;
        let { parser } = this.p;
        return parser.data[parser.stateSlot(this.state, 1 /* ParseState.Actions */)] == 65535 /* Seq.End */ &&
            !parser.stateSlot(this.state, 4 /* ParseState.DefaultReduce */);
    }
    /// Restart the stack (put it back in its start state). Only safe
    /// when this.stack.length == 3 (state is directly below the top
    /// state). @internal
    restart() {
        this.state = this.stack[0];
        this.stack.length = 0;
    }
    /// @internal
    sameState(other) {
        if (this.state != other.state || this.stack.length != other.stack.length)
            return false;
        for (let i = 0; i < this.stack.length; i += 3)
            if (this.stack[i] != other.stack[i])
                return false;
        return true;
    }
    /// Get the parser used by this stack.
    get parser() { return this.p.parser; }
    /// Test whether a given dialect (by numeric ID, as exported from
    /// the terms file) is enabled.
    dialectEnabled(dialectID) { return this.p.parser.dialect.flags[dialectID]; }
    shiftContext(term, start) {
        if (this.curContext)
            this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
    }
    reduceContext(term, start) {
        if (this.curContext)
            this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
    }
    /// @internal
    emitContext() {
        let last = this.buffer.length - 1;
        if (last < 0 || this.buffer[last] != -3)
            this.buffer.push(this.curContext.hash, this.reducePos, this.reducePos, -3);
    }
    /// @internal
    emitLookAhead() {
        let last = this.buffer.length - 1;
        if (last < 0 || this.buffer[last] != -4)
            this.buffer.push(this.lookAhead, this.reducePos, this.reducePos, -4);
    }
    updateContext(context) {
        if (context != this.curContext.context) {
            let newCx = new StackContext(this.curContext.tracker, context);
            if (newCx.hash != this.curContext.hash)
                this.emitContext();
            this.curContext = newCx;
        }
    }
    /// @internal
    setLookAhead(lookAhead) {
        if (lookAhead > this.lookAhead) {
            this.emitLookAhead();
            this.lookAhead = lookAhead;
        }
    }
    /// @internal
    close() {
        if (this.curContext && this.curContext.tracker.strict)
            this.emitContext();
        if (this.lookAhead > 0)
            this.emitLookAhead();
    }
}
class StackContext {
    constructor(tracker, context) {
        this.tracker = tracker;
        this.context = context;
        this.hash = tracker.strict ? tracker.hash(context) : 0;
    }
}
var Recover;
(function (Recover) {
    Recover[Recover["Insert"] = 200] = "Insert";
    Recover[Recover["Delete"] = 190] = "Delete";
    Recover[Recover["Reduce"] = 100] = "Reduce";
    Recover[Recover["MaxNext"] = 4] = "MaxNext";
    Recover[Recover["MaxInsertStackDepth"] = 300] = "MaxInsertStackDepth";
    Recover[Recover["DampenInsertStackDepth"] = 120] = "DampenInsertStackDepth";
    Recover[Recover["MinBigReduction"] = 2000] = "MinBigReduction";
})(Recover || (Recover = {}));
// Used to cheaply run some reductions to scan ahead without mutating
// an entire stack
class SimulatedStack {
    constructor(start) {
        this.start = start;
        this.state = start.state;
        this.stack = start.stack;
        this.base = this.stack.length;
    }
    reduce(action) {
        let term = action & 65535 /* Action.ValueMask */, depth = action >> 19 /* Action.ReduceDepthShift */;
        if (depth == 0) {
            if (this.stack == this.start.stack)
                this.stack = this.stack.slice();
            this.stack.push(this.state, 0, 0);
            this.base += 3;
        }
        else {
            this.base -= (depth - 1) * 3;
        }
        let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
        this.state = goto;
    }
}
// This is given to `Tree.build` to build a buffer, and encapsulates
// the parent-stack-walking necessary to read the nodes.
class StackBufferCursor {
    constructor(stack, pos, index) {
        this.stack = stack;
        this.pos = pos;
        this.index = index;
        this.buffer = stack.buffer;
        if (this.index == 0)
            this.maybeNext();
    }
    static create(stack, pos = stack.bufferBase + stack.buffer.length) {
        return new StackBufferCursor(stack, pos, pos - stack.bufferBase);
    }
    maybeNext() {
        let next = this.stack.parent;
        if (next != null) {
            this.index = this.stack.bufferBase - next.bufferBase;
            this.stack = next;
            this.buffer = next.buffer;
        }
    }
    get id() { return this.buffer[this.index - 4]; }
    get start() { return this.buffer[this.index - 3]; }
    get end() { return this.buffer[this.index - 2]; }
    get size() { return this.buffer[this.index - 1]; }
    next() {
        this.index -= 4;
        this.pos -= 4;
        if (this.index == 0)
            this.maybeNext();
    }
    fork() {
        return new StackBufferCursor(this.stack, this.pos, this.index);
    }
}

// See lezer-generator/src/encode.ts for comments about the encoding
// used here
function decodeArray(input, Type = Uint16Array) {
    if (typeof input != "string")
        return input;
    let array = null;
    for (let pos = 0, out = 0; pos < input.length;) {
        let value = 0;
        for (;;) {
            let next = input.charCodeAt(pos++), stop = false;
            if (next == 126 /* Encode.BigValCode */) {
                value = 65535 /* Encode.BigVal */;
                break;
            }
            if (next >= 92 /* Encode.Gap2 */)
                next--;
            if (next >= 34 /* Encode.Gap1 */)
                next--;
            let digit = next - 32 /* Encode.Start */;
            if (digit >= 46 /* Encode.Base */) {
                digit -= 46 /* Encode.Base */;
                stop = true;
            }
            value += digit;
            if (stop)
                break;
            value *= 46 /* Encode.Base */;
        }
        if (array)
            array[out++] = value;
        else
            array = new Type(value);
    }
    return array;
}

class CachedToken {
    constructor() {
        this.start = -1;
        this.value = -1;
        this.end = -1;
        this.extended = -1;
        this.lookAhead = 0;
        this.mask = 0;
        this.context = 0;
    }
}
const nullToken = new CachedToken;
/// [Tokenizers](#lr.ExternalTokenizer) interact with the input
/// through this interface. It presents the input as a stream of
/// characters, tracking lookahead and hiding the complexity of
/// [ranges](#common.Parser.parse^ranges) from tokenizer code.
class InputStream {
    /// @internal
    constructor(
    /// @internal
    input, 
    /// @internal
    ranges) {
        this.input = input;
        this.ranges = ranges;
        /// @internal
        this.chunk = "";
        /// @internal
        this.chunkOff = 0;
        /// Backup chunk
        this.chunk2 = "";
        this.chunk2Pos = 0;
        /// The character code of the next code unit in the input, or -1
        /// when the stream is at the end of the input.
        this.next = -1;
        /// @internal
        this.token = nullToken;
        this.rangeIndex = 0;
        this.pos = this.chunkPos = ranges[0].from;
        this.range = ranges[0];
        this.end = ranges[ranges.length - 1].to;
        this.readNext();
    }
    /// @internal
    resolveOffset(offset, assoc) {
        let range = this.range, index = this.rangeIndex;
        let pos = this.pos + offset;
        while (pos < range.from) {
            if (!index)
                return null;
            let next = this.ranges[--index];
            pos -= range.from - next.to;
            range = next;
        }
        while (assoc < 0 ? pos > range.to : pos >= range.to) {
            if (index == this.ranges.length - 1)
                return null;
            let next = this.ranges[++index];
            pos += next.from - range.to;
            range = next;
        }
        return pos;
    }
    /// @internal
    clipPos(pos) {
        if (pos >= this.range.from && pos < this.range.to)
            return pos;
        for (let range of this.ranges)
            if (range.to > pos)
                return Math.max(pos, range.from);
        return this.end;
    }
    /// Look at a code unit near the stream position. `.peek(0)` equals
    /// `.next`, `.peek(-1)` gives you the previous character, and so
    /// on.
    ///
    /// Note that looking around during tokenizing creates dependencies
    /// on potentially far-away content, which may reduce the
    /// effectiveness incremental parsing—when looking forward—or even
    /// cause invalid reparses when looking backward more than 25 code
    /// units, since the library does not track lookbehind.
    peek(offset) {
        let idx = this.chunkOff + offset, pos, result;
        if (idx >= 0 && idx < this.chunk.length) {
            pos = this.pos + offset;
            result = this.chunk.charCodeAt(idx);
        }
        else {
            let resolved = this.resolveOffset(offset, 1);
            if (resolved == null)
                return -1;
            pos = resolved;
            if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) {
                result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
            }
            else {
                let i = this.rangeIndex, range = this.range;
                while (range.to <= pos)
                    range = this.ranges[++i];
                this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
                if (pos + this.chunk2.length > range.to)
                    this.chunk2 = this.chunk2.slice(0, range.to - pos);
                result = this.chunk2.charCodeAt(0);
            }
        }
        if (pos >= this.token.lookAhead)
            this.token.lookAhead = pos + 1;
        return result;
    }
    /// Accept a token. By default, the end of the token is set to the
    /// current stream position, but you can pass an offset (relative to
    /// the stream position) to change that.
    acceptToken(token, endOffset = 0) {
        let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
        if (end == null || end < this.token.start)
            throw new RangeError("Token end out of bounds");
        this.token.value = token;
        this.token.end = end;
    }
    getChunk() {
        if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
            let { chunk, chunkPos } = this;
            this.chunk = this.chunk2;
            this.chunkPos = this.chunk2Pos;
            this.chunk2 = chunk;
            this.chunk2Pos = chunkPos;
            this.chunkOff = this.pos - this.chunkPos;
        }
        else {
            this.chunk2 = this.chunk;
            this.chunk2Pos = this.chunkPos;
            let nextChunk = this.input.chunk(this.pos);
            let end = this.pos + nextChunk.length;
            this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
            this.chunkPos = this.pos;
            this.chunkOff = 0;
        }
    }
    readNext() {
        if (this.chunkOff >= this.chunk.length) {
            this.getChunk();
            if (this.chunkOff == this.chunk.length)
                return this.next = -1;
        }
        return this.next = this.chunk.charCodeAt(this.chunkOff);
    }
    /// Move the stream forward N (defaults to 1) code units. Returns
    /// the new value of [`next`](#lr.InputStream.next).
    advance(n = 1) {
        this.chunkOff += n;
        while (this.pos + n >= this.range.to) {
            if (this.rangeIndex == this.ranges.length - 1)
                return this.setDone();
            n -= this.range.to - this.pos;
            this.range = this.ranges[++this.rangeIndex];
            this.pos = this.range.from;
        }
        this.pos += n;
        if (this.pos >= this.token.lookAhead)
            this.token.lookAhead = this.pos + 1;
        return this.readNext();
    }
    setDone() {
        this.pos = this.chunkPos = this.end;
        this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
        this.chunk = "";
        return this.next = -1;
    }
    /// @internal
    reset(pos, token) {
        if (token) {
            this.token = token;
            token.start = pos;
            token.lookAhead = pos + 1;
            token.value = token.extended = -1;
        }
        else {
            this.token = nullToken;
        }
        if (this.pos != pos) {
            this.pos = pos;
            if (pos == this.end) {
                this.setDone();
                return this;
            }
            while (pos < this.range.from)
                this.range = this.ranges[--this.rangeIndex];
            while (pos >= this.range.to)
                this.range = this.ranges[++this.rangeIndex];
            if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) {
                this.chunkOff = pos - this.chunkPos;
            }
            else {
                this.chunk = "";
                this.chunkOff = 0;
            }
            this.readNext();
        }
        return this;
    }
    /// @internal
    read(from, to) {
        if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length)
            return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
        if (from >= this.chunk2Pos && to <= this.chunk2Pos + this.chunk2.length)
            return this.chunk2.slice(from - this.chunk2Pos, to - this.chunk2Pos);
        if (from >= this.range.from && to <= this.range.to)
            return this.input.read(from, to);
        let result = "";
        for (let r of this.ranges) {
            if (r.from >= to)
                break;
            if (r.to > from)
                result += this.input.read(Math.max(r.from, from), Math.min(r.to, to));
        }
        return result;
    }
}
/// @internal
class TokenGroup {
    constructor(data, id) {
        this.data = data;
        this.id = id;
    }
    token(input, stack) {
        let { parser } = stack.p;
        readToken(this.data, input, stack, this.id, parser.data, parser.tokenPrecTable);
    }
}
TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
/// @hide
class LocalTokenGroup {
    constructor(data, precTable, elseToken) {
        this.precTable = precTable;
        this.elseToken = elseToken;
        this.data = typeof data == "string" ? decodeArray(data) : data;
    }
    token(input, stack) {
        let start = input.pos, skipped = 0;
        for (;;) {
            readToken(this.data, input, stack, 0, this.data, this.precTable);
            if (input.token.value > -1)
                break;
            if (this.elseToken == null)
                return;
            if (input.next < 0)
                break;
            input.advance();
            input.reset(input.pos, input.token);
            skipped++;
        }
        if (skipped) {
            input.reset(start, input.token);
            input.acceptToken(this.elseToken, skipped);
        }
    }
}
LocalTokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
/// `@external tokens` declarations in the grammar should resolve to
/// an instance of this class.
class ExternalTokenizer {
    /// Create a tokenizer. The first argument is the function that,
    /// given an input stream, scans for the types of tokens it
    /// recognizes at the stream's position, and calls
    /// [`acceptToken`](#lr.InputStream.acceptToken) when it finds
    /// one.
    constructor(
    /// @internal
    token, options = {}) {
        this.token = token;
        this.contextual = !!options.contextual;
        this.fallback = !!options.fallback;
        this.extend = !!options.extend;
    }
}
// Tokenizer data is stored a big uint16 array containing, for each
// state:
//
//  - A group bitmask, indicating what token groups are reachable from
//    this state, so that paths that can only lead to tokens not in
//    any of the current groups can be cut off early.
//
//  - The position of the end of the state's sequence of accepting
//    tokens
//
//  - The number of outgoing edges for the state
//
//  - The accepting tokens, as (token id, group mask) pairs
//
//  - The outgoing edges, as (start character, end character, state
//    index) triples, with end character being exclusive
//
// This function interprets that data, running through a stream as
// long as new states with the a matching group mask can be reached,
// and updating `input.token` when it matches a token.
function readToken(data, input, stack, group, precTable, precOffset) {
    let state = 0, groupMask = 1 << group, { dialect } = stack.p.parser;
    scan: for (;;) {
        if ((groupMask & data[state]) == 0)
            break;
        let accEnd = data[state + 1];
        // Check whether this state can lead to a token in the current group
        // Accept tokens in this state, possibly overwriting
        // lower-precedence / shorter tokens
        for (let i = state + 3; i < accEnd; i += 2)
            if ((data[i + 1] & groupMask) > 0) {
                let term = data[i];
                if (dialect.allows(term) &&
                    (input.token.value == -1 || input.token.value == term ||
                        overrides(term, input.token.value, precTable, precOffset))) {
                    input.acceptToken(term);
                    break;
                }
            }
        let next = input.next, low = 0, high = data[state + 2];
        // Special case for EOF
        if (input.next < 0 && high > low && data[accEnd + high * 3 - 3] == 65535 /* Seq.End */ && data[accEnd + high * 3 - 3] == 65535 /* Seq.End */) {
            state = data[accEnd + high * 3 - 1];
            continue scan;
        }
        // Do a binary search on the state's edges
        for (; low < high;) {
            let mid = (low + high) >> 1;
            let index = accEnd + mid + (mid << 1);
            let from = data[index], to = data[index + 1] || 0x10000;
            if (next < from)
                high = mid;
            else if (next >= to)
                low = mid + 1;
            else {
                state = data[index + 2];
                input.advance();
                continue scan;
            }
        }
        break;
    }
}
function findOffset(data, start, term) {
    for (let i = start, next; (next = data[i]) != 65535 /* Seq.End */; i++)
        if (next == term)
            return i - start;
    return -1;
}
function overrides(token, prev, tableData, tableOffset) {
    let iPrev = findOffset(tableData, tableOffset, prev);
    return iPrev < 0 || findOffset(tableData, tableOffset, token) < iPrev;
}

// Environment variable used to control console output
const verbose = typeof process != "undefined" && process.env && /\bparse\b/.test(process.env.LOG);
let stackIDs = null;
var Safety;
(function (Safety) {
    Safety[Safety["Margin"] = 25] = "Margin";
})(Safety || (Safety = {}));
function cutAt(tree, pos, side) {
    let cursor = tree.cursor(_lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .IterMode */ .Qj.IncludeAnonymous);
    cursor.moveTo(pos);
    for (;;) {
        if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
            for (;;) {
                if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError)
                    return side < 0 ? Math.max(0, Math.min(cursor.to - 1, pos - 25 /* Safety.Margin */))
                        : Math.min(tree.length, Math.max(cursor.from + 1, pos + 25 /* Safety.Margin */));
                if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
                    break;
                if (!cursor.parent())
                    return side < 0 ? 0 : tree.length;
            }
    }
}
class FragmentCursor {
    constructor(fragments, nodeSet) {
        this.fragments = fragments;
        this.nodeSet = nodeSet;
        this.i = 0;
        this.fragment = null;
        this.safeFrom = -1;
        this.safeTo = -1;
        this.trees = [];
        this.start = [];
        this.index = [];
        this.nextFragment();
    }
    nextFragment() {
        let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
        if (fr) {
            this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
            this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
            while (this.trees.length) {
                this.trees.pop();
                this.start.pop();
                this.index.pop();
            }
            this.trees.push(fr.tree);
            this.start.push(-fr.offset);
            this.index.push(0);
            this.nextStart = this.safeFrom;
        }
        else {
            this.nextStart = 1e9;
        }
    }
    // `pos` must be >= any previously given `pos` for this cursor
    nodeAt(pos) {
        if (pos < this.nextStart)
            return null;
        while (this.fragment && this.safeTo <= pos)
            this.nextFragment();
        if (!this.fragment)
            return null;
        for (;;) {
            let last = this.trees.length - 1;
            if (last < 0) { // End of tree
                this.nextFragment();
                return null;
            }
            let top = this.trees[last], index = this.index[last];
            if (index == top.children.length) {
                this.trees.pop();
                this.start.pop();
                this.index.pop();
                continue;
            }
            let next = top.children[index];
            let start = this.start[last] + top.positions[index];
            if (start > pos) {
                this.nextStart = start;
                return null;
            }
            if (next instanceof _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .Tree */ .PH) {
                if (start == pos) {
                    if (start < this.safeFrom)
                        return null;
                    let end = start + next.length;
                    if (end <= this.safeTo) {
                        let lookAhead = next.prop(_lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .NodeProp */ .uY.lookAhead);
                        if (!lookAhead || end + lookAhead < this.fragment.to)
                            return next;
                    }
                }
                this.index[last]++;
                if (start + next.length >= Math.max(this.safeFrom, pos)) { // Enter this node
                    this.trees.push(next);
                    this.start.push(start);
                    this.index.push(0);
                }
            }
            else {
                this.index[last]++;
                this.nextStart = start + next.length;
            }
        }
    }
}
class TokenCache {
    constructor(parser, stream) {
        this.stream = stream;
        this.tokens = [];
        this.mainToken = null;
        this.actions = [];
        this.tokens = parser.tokenizers.map(_ => new CachedToken);
    }
    getActions(stack) {
        let actionIndex = 0;
        let main = null;
        let { parser } = stack.p, { tokenizers } = parser;
        let mask = parser.stateSlot(stack.state, 3 /* ParseState.TokenizerMask */);
        let context = stack.curContext ? stack.curContext.hash : 0;
        let lookAhead = 0;
        for (let i = 0; i < tokenizers.length; i++) {
            if (((1 << i) & mask) == 0)
                continue;
            let tokenizer = tokenizers[i], token = this.tokens[i];
            if (main && !tokenizer.fallback)
                continue;
            if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
                this.updateCachedToken(token, tokenizer, stack);
                token.mask = mask;
                token.context = context;
            }
            if (token.lookAhead > token.end + 25 /* Safety.Margin */)
                lookAhead = Math.max(token.lookAhead, lookAhead);
            if (token.value != 0 /* Term.Err */) {
                let startIndex = actionIndex;
                if (token.extended > -1)
                    actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
                actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
                if (!tokenizer.extend) {
                    main = token;
                    if (actionIndex > startIndex)
                        break;
                }
            }
        }
        while (this.actions.length > actionIndex)
            this.actions.pop();
        if (lookAhead)
            stack.setLookAhead(lookAhead);
        if (!main && stack.pos == this.stream.end) {
            main = new CachedToken;
            main.value = stack.p.parser.eofTerm;
            main.start = main.end = stack.pos;
            actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
        }
        this.mainToken = main;
        return this.actions;
    }
    getMainToken(stack) {
        if (this.mainToken)
            return this.mainToken;
        let main = new CachedToken, { pos, p } = stack;
        main.start = pos;
        main.end = Math.min(pos + 1, p.stream.end);
        main.value = pos == p.stream.end ? p.parser.eofTerm : 0 /* Term.Err */;
        return main;
    }
    updateCachedToken(token, tokenizer, stack) {
        let start = this.stream.clipPos(stack.pos);
        tokenizer.token(this.stream.reset(start, token), stack);
        if (token.value > -1) {
            let { parser } = stack.p;
            for (let i = 0; i < parser.specialized.length; i++)
                if (parser.specialized[i] == token.value) {
                    let result = parser.specializers[i](this.stream.read(token.start, token.end), stack);
                    if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
                        if ((result & 1) == 0 /* Specialize.Specialize */)
                            token.value = result >> 1;
                        else
                            token.extended = result >> 1;
                        break;
                    }
                }
        }
        else {
            token.value = 0 /* Term.Err */;
            token.end = this.stream.clipPos(start + 1);
        }
    }
    putAction(action, token, end, index) {
        // Don't add duplicate actions
        for (let i = 0; i < index; i += 3)
            if (this.actions[i] == action)
                return index;
        this.actions[index++] = action;
        this.actions[index++] = token;
        this.actions[index++] = end;
        return index;
    }
    addActions(stack, token, end, index) {
        let { state } = stack, { parser } = stack.p, { data } = parser;
        for (let set = 0; set < 2; set++) {
            for (let i = parser.stateSlot(state, set ? 2 /* ParseState.Skip */ : 1 /* ParseState.Actions */);; i += 3) {
                if (data[i] == 65535 /* Seq.End */) {
                    if (data[i + 1] == 1 /* Seq.Next */) {
                        i = pair(data, i + 2);
                    }
                    else {
                        if (index == 0 && data[i + 1] == 2 /* Seq.Other */)
                            index = this.putAction(pair(data, i + 2), token, end, index);
                        break;
                    }
                }
                if (data[i] == token)
                    index = this.putAction(pair(data, i + 1), token, end, index);
            }
        }
        return index;
    }
}
var Rec;
(function (Rec) {
    Rec[Rec["Distance"] = 5] = "Distance";
    Rec[Rec["MaxRemainingPerStep"] = 3] = "MaxRemainingPerStep";
    // When two stacks have been running independently long enough to
    // add this many elements to their buffers, prune one.
    Rec[Rec["MinBufferLengthPrune"] = 500] = "MinBufferLengthPrune";
    Rec[Rec["ForceReduceLimit"] = 10] = "ForceReduceLimit";
    // Once a stack reaches this depth (in .stack.length) force-reduce
    // it back to CutTo to avoid creating trees that overflow the stack
    // on recursive traversal.
    Rec[Rec["CutDepth"] = 15000] = "CutDepth";
    Rec[Rec["CutTo"] = 9000] = "CutTo";
    Rec[Rec["MaxLeftAssociativeReductionCount"] = 300] = "MaxLeftAssociativeReductionCount";
    // The maximum number of non-recovering stacks to explore (to avoid
    // getting bogged down with exponentially multiplying stacks in
    // ambiguous content)
    Rec[Rec["MaxStackCount"] = 12] = "MaxStackCount";
})(Rec || (Rec = {}));
class Parse {
    constructor(parser, input, fragments, ranges) {
        this.parser = parser;
        this.input = input;
        this.ranges = ranges;
        this.recovering = 0;
        this.nextStackID = 0x2654; // ♔, ♕, ♖, ♗, ♘, ♙, ♠, ♡, ♢, ♣, ♤, ♥, ♦, ♧
        this.minStackPos = 0;
        this.reused = [];
        this.stoppedAt = null;
        this.lastBigReductionStart = -1;
        this.lastBigReductionSize = 0;
        this.bigReductionCount = 0;
        this.stream = new InputStream(input, ranges);
        this.tokens = new TokenCache(parser, this.stream);
        this.topTerm = parser.top[1];
        let { from } = ranges[0];
        this.stacks = [Stack.start(this, parser.top[0], from)];
        this.fragments = fragments.length && this.stream.end - from > parser.bufferLength * 4
            ? new FragmentCursor(fragments, parser.nodeSet) : null;
    }
    get parsedPos() {
        return this.minStackPos;
    }
    // Move the parser forward. This will process all parse stacks at
    // `this.pos` and try to advance them to a further position. If no
    // stack for such a position is found, it'll start error-recovery.
    //
    // When the parse is finished, this will return a syntax tree. When
    // not, it returns `null`.
    advance() {
        let stacks = this.stacks, pos = this.minStackPos;
        // This will hold stacks beyond `pos`.
        let newStacks = this.stacks = [];
        let stopped, stoppedTokens;
        // If a large amount of reductions happened with the same start
        // position, force the stack out of that production in order to
        // avoid creating a tree too deep to recurse through.
        // (This is an ugly kludge, because unfortunately there is no
        // straightforward, cheap way to check for this happening, due to
        // the history of reductions only being available in an
        // expensive-to-access format in the stack buffers.)
        if (this.bigReductionCount > 300 /* Rec.MaxLeftAssociativeReductionCount */ && stacks.length == 1) {
            let [s] = stacks;
            while (s.forceReduce() && s.stack.length && s.stack[s.stack.length - 2] >= this.lastBigReductionStart) { }
            this.bigReductionCount = this.lastBigReductionSize = 0;
        }
        // Keep advancing any stacks at `pos` until they either move
        // forward or can't be advanced. Gather stacks that can't be
        // advanced further in `stopped`.
        for (let i = 0; i < stacks.length; i++) {
            let stack = stacks[i];
            for (;;) {
                this.tokens.mainToken = null;
                if (stack.pos > pos) {
                    newStacks.push(stack);
                }
                else if (this.advanceStack(stack, newStacks, stacks)) {
                    continue;
                }
                else {
                    if (!stopped) {
                        stopped = [];
                        stoppedTokens = [];
                    }
                    stopped.push(stack);
                    let tok = this.tokens.getMainToken(stack);
                    stoppedTokens.push(tok.value, tok.end);
                }
                break;
            }
        }
        if (!newStacks.length) {
            let finished = stopped && findFinished(stopped);
            if (finished)
                return this.stackToTree(finished);
            if (this.parser.strict) {
                if (verbose && stopped)
                    console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
                throw new SyntaxError("No parse at " + pos);
            }
            if (!this.recovering)
                this.recovering = 5 /* Rec.Distance */;
        }
        if (this.recovering && stopped) {
            let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0]
                : this.runRecovery(stopped, stoppedTokens, newStacks);
            if (finished)
                return this.stackToTree(finished.forceAll());
        }
        if (this.recovering) {
            let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3 /* Rec.MaxRemainingPerStep */;
            if (newStacks.length > maxRemaining) {
                newStacks.sort((a, b) => b.score - a.score);
                while (newStacks.length > maxRemaining)
                    newStacks.pop();
            }
            if (newStacks.some(s => s.reducePos > pos))
                this.recovering--;
        }
        else if (newStacks.length > 1) {
            // Prune stacks that are in the same state, or that have been
            // running without splitting for a while, to avoid getting stuck
            // with multiple successful stacks running endlessly on.
            outer: for (let i = 0; i < newStacks.length - 1; i++) {
                let stack = newStacks[i];
                for (let j = i + 1; j < newStacks.length; j++) {
                    let other = newStacks[j];
                    if (stack.sameState(other) ||
                        stack.buffer.length > 500 /* Rec.MinBufferLengthPrune */ && other.buffer.length > 500 /* Rec.MinBufferLengthPrune */) {
                        if (((stack.score - other.score) || (stack.buffer.length - other.buffer.length)) > 0) {
                            newStacks.splice(j--, 1);
                        }
                        else {
                            newStacks.splice(i--, 1);
                            continue outer;
                        }
                    }
                }
            }
            if (newStacks.length > 12 /* Rec.MaxStackCount */)
                newStacks.splice(12 /* Rec.MaxStackCount */, newStacks.length - 12 /* Rec.MaxStackCount */);
        }
        this.minStackPos = newStacks[0].pos;
        for (let i = 1; i < newStacks.length; i++)
            if (newStacks[i].pos < this.minStackPos)
                this.minStackPos = newStacks[i].pos;
        return null;
    }
    stopAt(pos) {
        if (this.stoppedAt != null && this.stoppedAt < pos)
            throw new RangeError("Can't move stoppedAt forward");
        this.stoppedAt = pos;
    }
    // Returns an updated version of the given stack, or null if the
    // stack can't advance normally. When `split` and `stacks` are
    // given, stacks split off by ambiguous operations will be pushed to
    // `split`, or added to `stacks` if they move `pos` forward.
    advanceStack(stack, stacks, split) {
        let start = stack.pos, { parser } = this;
        let base = verbose ? this.stackID(stack) + " -> " : "";
        if (this.stoppedAt != null && start > this.stoppedAt)
            return stack.forceReduce() ? stack : null;
        if (this.fragments) {
            let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
            for (let cached = this.fragments.nodeAt(start); cached;) {
                let match = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser.getGoto(stack.state, cached.type.id) : -1;
                if (match > -1 && cached.length && (!strictCx || (cached.prop(_lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .NodeProp */ .uY.contextHash) || 0) == cxHash)) {
                    stack.useNode(cached, match);
                    if (verbose)
                        console.log(base + this.stackID(stack) + ` (via reuse of ${parser.getName(cached.type.id)})`);
                    return true;
                }
                if (!(cached instanceof _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .Tree */ .PH) || cached.children.length == 0 || cached.positions[0] > 0)
                    break;
                let inner = cached.children[0];
                if (inner instanceof _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .Tree */ .PH && cached.positions[0] == 0)
                    cached = inner;
                else
                    break;
            }
        }
        let defaultReduce = parser.stateSlot(stack.state, 4 /* ParseState.DefaultReduce */);
        if (defaultReduce > 0) {
            stack.reduce(defaultReduce);
            if (verbose)
                console.log(base + this.stackID(stack) + ` (via always-reduce ${parser.getName(defaultReduce & 65535 /* Action.ValueMask */)})`);
            return true;
        }
        if (stack.stack.length >= 15000 /* Rec.CutDepth */) {
            while (stack.stack.length > 9000 /* Rec.CutTo */ && stack.forceReduce()) { }
        }
        let actions = this.tokens.getActions(stack);
        for (let i = 0; i < actions.length;) {
            let action = actions[i++], term = actions[i++], end = actions[i++];
            let last = i == actions.length || !split;
            let localStack = last ? stack : stack.split();
            localStack.apply(action, term, end);
            if (verbose)
                console.log(base + this.stackID(localStack) + ` (via ${(action & 65536 /* Action.ReduceFlag */) == 0 ? "shift"
                    : `reduce of ${parser.getName(action & 65535 /* Action.ValueMask */)}`} for ${parser.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
            if (last)
                return true;
            else if (localStack.pos > start)
                stacks.push(localStack);
            else
                split.push(localStack);
        }
        return false;
    }
    // Advance a given stack forward as far as it will go. Returns the
    // (possibly updated) stack if it got stuck, or null if it moved
    // forward and was given to `pushStackDedup`.
    advanceFully(stack, newStacks) {
        let pos = stack.pos;
        for (;;) {
            if (!this.advanceStack(stack, null, null))
                return false;
            if (stack.pos > pos) {
                pushStackDedup(stack, newStacks);
                return true;
            }
        }
    }
    runRecovery(stacks, tokens, newStacks) {
        let finished = null, restarted = false;
        for (let i = 0; i < stacks.length; i++) {
            let stack = stacks[i], token = tokens[i << 1], tokenEnd = tokens[(i << 1) + 1];
            let base = verbose ? this.stackID(stack) + " -> " : "";
            if (stack.deadEnd) {
                if (restarted)
                    continue;
                restarted = true;
                stack.restart();
                if (verbose)
                    console.log(base + this.stackID(stack) + " (restarted)");
                let done = this.advanceFully(stack, newStacks);
                if (done)
                    continue;
            }
            let force = stack.split(), forceBase = base;
            for (let j = 0; force.forceReduce() && j < 10 /* Rec.ForceReduceLimit */; j++) {
                if (verbose)
                    console.log(forceBase + this.stackID(force) + " (via force-reduce)");
                let done = this.advanceFully(force, newStacks);
                if (done)
                    break;
                if (verbose)
                    forceBase = this.stackID(force) + " -> ";
            }
            for (let insert of stack.recoverByInsert(token)) {
                if (verbose)
                    console.log(base + this.stackID(insert) + " (via recover-insert)");
                this.advanceFully(insert, newStacks);
            }
            if (this.stream.end > stack.pos) {
                if (tokenEnd == stack.pos) {
                    tokenEnd++;
                    token = 0 /* Term.Err */;
                }
                stack.recoverByDelete(token, tokenEnd);
                if (verbose)
                    console.log(base + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
                pushStackDedup(stack, newStacks);
            }
            else if (!finished || finished.score < stack.score) {
                finished = stack;
            }
        }
        return finished;
    }
    // Convert the stack's buffer to a syntax tree.
    stackToTree(stack) {
        stack.close();
        return _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .Tree */ .PH.build({ buffer: StackBufferCursor.create(stack),
            nodeSet: this.parser.nodeSet,
            topID: this.topTerm,
            maxBufferLength: this.parser.bufferLength,
            reused: this.reused,
            start: this.ranges[0].from,
            length: stack.pos - this.ranges[0].from,
            minRepeatType: this.parser.minRepeatTerm });
    }
    stackID(stack) {
        let id = (stackIDs || (stackIDs = new WeakMap)).get(stack);
        if (!id)
            stackIDs.set(stack, id = String.fromCodePoint(this.nextStackID++));
        return id + stack;
    }
}
function pushStackDedup(stack, newStacks) {
    for (let i = 0; i < newStacks.length; i++) {
        let other = newStacks[i];
        if (other.pos == stack.pos && other.sameState(stack)) {
            if (newStacks[i].score < stack.score)
                newStacks[i] = stack;
            return;
        }
    }
    newStacks.push(stack);
}
class Dialect {
    constructor(source, flags, disabled) {
        this.source = source;
        this.flags = flags;
        this.disabled = disabled;
    }
    allows(term) { return !this.disabled || this.disabled[term] == 0; }
}
const id = x => x;
/// Context trackers are used to track stateful context (such as
/// indentation in the Python grammar, or parent elements in the XML
/// grammar) needed by external tokenizers. You declare them in a
/// grammar file as `@context exportName from "module"`.
///
/// Context values should be immutable, and can be updated (replaced)
/// on shift or reduce actions.
///
/// The export used in a `@context` declaration should be of this
/// type.
class ContextTracker {
    /// Define a context tracker.
    constructor(spec) {
        this.start = spec.start;
        this.shift = spec.shift || id;
        this.reduce = spec.reduce || id;
        this.reuse = spec.reuse || id;
        this.hash = spec.hash || (() => 0);
        this.strict = spec.strict !== false;
    }
}
/// Holds the parse tables for a given grammar, as generated by
/// `lezer-generator`, and provides [methods](#common.Parser) to parse
/// content with.
class LRParser extends _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .Parser */ .iX {
    /// @internal
    constructor(spec) {
        super();
        /// @internal
        this.wrappers = [];
        if (spec.version != 14 /* File.Version */)
            throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${14 /* File.Version */})`);
        let nodeNames = spec.nodeNames.split(" ");
        this.minRepeatTerm = nodeNames.length;
        for (let i = 0; i < spec.repeatNodeCount; i++)
            nodeNames.push("");
        let topTerms = Object.keys(spec.topRules).map(r => spec.topRules[r][1]);
        let nodeProps = [];
        for (let i = 0; i < nodeNames.length; i++)
            nodeProps.push([]);
        function setProp(nodeID, prop, value) {
            nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
        }
        if (spec.nodeProps)
            for (let propSpec of spec.nodeProps) {
                let prop = propSpec[0];
                if (typeof prop == "string")
                    prop = _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .NodeProp */ .uY[prop];
                for (let i = 1; i < propSpec.length;) {
                    let next = propSpec[i++];
                    if (next >= 0) {
                        setProp(next, prop, propSpec[i++]);
                    }
                    else {
                        let value = propSpec[i + -next];
                        for (let j = -next; j > 0; j--)
                            setProp(propSpec[i++], prop, value);
                        i++;
                    }
                }
            }
        this.nodeSet = new _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .NodeSet */ .fI(nodeNames.map((name, i) => _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .NodeType */ .Z6.define({
            name: i >= this.minRepeatTerm ? undefined : name,
            id: i,
            props: nodeProps[i],
            top: topTerms.indexOf(i) > -1,
            error: i == 0,
            skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i) > -1
        })));
        if (spec.propSources)
            this.nodeSet = this.nodeSet.extend(...spec.propSources);
        this.strict = false;
        this.bufferLength = _lezer_common__WEBPACK_IMPORTED_MODULE_0__/* .DefaultBufferLength */ .cF;
        let tokenArray = decodeArray(spec.tokenData);
        this.context = spec.context;
        this.specializerSpecs = spec.specialized || [];
        this.specialized = new Uint16Array(this.specializerSpecs.length);
        for (let i = 0; i < this.specializerSpecs.length; i++)
            this.specialized[i] = this.specializerSpecs[i].term;
        this.specializers = this.specializerSpecs.map(getSpecializer);
        this.states = decodeArray(spec.states, Uint32Array);
        this.data = decodeArray(spec.stateData);
        this.goto = decodeArray(spec.goto);
        this.maxTerm = spec.maxTerm;
        this.tokenizers = spec.tokenizers.map(value => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
        this.topRules = spec.topRules;
        this.dialects = spec.dialects || {};
        this.dynamicPrecedences = spec.dynamicPrecedences || null;
        this.tokenPrecTable = spec.tokenPrec;
        this.termNames = spec.termNames || null;
        this.maxNode = this.nodeSet.types.length - 1;
        this.dialect = this.parseDialect();
        this.top = this.topRules[Object.keys(this.topRules)[0]];
    }
    createParse(input, fragments, ranges) {
        let parse = new Parse(this, input, fragments, ranges);
        for (let w of this.wrappers)
            parse = w(parse, input, fragments, ranges);
        return parse;
    }
    /// Get a goto table entry @internal
    getGoto(state, term, loose = false) {
        let table = this.goto;
        if (term >= table[0])
            return -1;
        for (let pos = table[term + 1];;) {
            let groupTag = table[pos++], last = groupTag & 1;
            let target = table[pos++];
            if (last && loose)
                return target;
            for (let end = pos + (groupTag >> 1); pos < end; pos++)
                if (table[pos] == state)
                    return target;
            if (last)
                return -1;
        }
    }
    /// Check if this state has an action for a given terminal @internal
    hasAction(state, terminal) {
        let data = this.data;
        for (let set = 0; set < 2; set++) {
            for (let i = this.stateSlot(state, set ? 2 /* ParseState.Skip */ : 1 /* ParseState.Actions */), next;; i += 3) {
                if ((next = data[i]) == 65535 /* Seq.End */) {
                    if (data[i + 1] == 1 /* Seq.Next */)
                        next = data[i = pair(data, i + 2)];
                    else if (data[i + 1] == 2 /* Seq.Other */)
                        return pair(data, i + 2);
                    else
                        break;
                }
                if (next == terminal || next == 0 /* Term.Err */)
                    return pair(data, i + 1);
            }
        }
        return 0;
    }
    /// @internal
    stateSlot(state, slot) {
        return this.states[(state * 6 /* ParseState.Size */) + slot];
    }
    /// @internal
    stateFlag(state, flag) {
        return (this.stateSlot(state, 0 /* ParseState.Flags */) & flag) > 0;
    }
    /// @internal
    validAction(state, action) {
        if (action == this.stateSlot(state, 4 /* ParseState.DefaultReduce */))
            return true;
        for (let i = this.stateSlot(state, 1 /* ParseState.Actions */);; i += 3) {
            if (this.data[i] == 65535 /* Seq.End */) {
                if (this.data[i + 1] == 1 /* Seq.Next */)
                    i = pair(this.data, i + 2);
                else
                    return false;
            }
            if (action == pair(this.data, i + 1))
                return true;
        }
    }
    /// Get the states that can follow this one through shift actions or
    /// goto jumps. @internal
    nextStates(state) {
        let result = [];
        for (let i = this.stateSlot(state, 1 /* ParseState.Actions */);; i += 3) {
            if (this.data[i] == 65535 /* Seq.End */) {
                if (this.data[i + 1] == 1 /* Seq.Next */)
                    i = pair(this.data, i + 2);
                else
                    break;
            }
            if ((this.data[i + 2] & (65536 /* Action.ReduceFlag */ >> 16)) == 0) {
                let value = this.data[i + 1];
                if (!result.some((v, i) => (i & 1) && v == value))
                    result.push(this.data[i], value);
            }
        }
        return result;
    }
    /// Configure the parser. Returns a new parser instance that has the
    /// given settings modified. Settings not provided in `config` are
    /// kept from the original parser.
    configure(config) {
        // Hideous reflection-based kludge to make it easy to create a
        // slightly modified copy of a parser.
        let copy = Object.assign(Object.create(LRParser.prototype), this);
        if (config.props)
            copy.nodeSet = this.nodeSet.extend(...config.props);
        if (config.top) {
            let info = this.topRules[config.top];
            if (!info)
                throw new RangeError(`Invalid top rule name ${config.top}`);
            copy.top = info;
        }
        if (config.tokenizers)
            copy.tokenizers = this.tokenizers.map(t => {
                let found = config.tokenizers.find(r => r.from == t);
                return found ? found.to : t;
            });
        if (config.specializers) {
            copy.specializers = this.specializers.slice();
            copy.specializerSpecs = this.specializerSpecs.map((s, i) => {
                let found = config.specializers.find(r => r.from == s.external);
                if (!found)
                    return s;
                let spec = Object.assign(Object.assign({}, s), { external: found.to });
                copy.specializers[i] = getSpecializer(spec);
                return spec;
            });
        }
        if (config.contextTracker)
            copy.context = config.contextTracker;
        if (config.dialect)
            copy.dialect = this.parseDialect(config.dialect);
        if (config.strict != null)
            copy.strict = config.strict;
        if (config.wrap)
            copy.wrappers = copy.wrappers.concat(config.wrap);
        if (config.bufferLength != null)
            copy.bufferLength = config.bufferLength;
        return copy;
    }
    /// Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
    /// are registered for this parser.
    hasWrappers() {
        return this.wrappers.length > 0;
    }
    /// Returns the name associated with a given term. This will only
    /// work for all terms when the parser was generated with the
    /// `--names` option. By default, only the names of tagged terms are
    /// stored.
    getName(term) {
        return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
    }
    /// The eof term id is always allocated directly after the node
    /// types. @internal
    get eofTerm() { return this.maxNode + 1; }
    /// The type of top node produced by the parser.
    get topNode() { return this.nodeSet.types[this.top[1]]; }
    /// @internal
    dynamicPrecedence(term) {
        let prec = this.dynamicPrecedences;
        return prec == null ? 0 : prec[term] || 0;
    }
    /// @internal
    parseDialect(dialect) {
        let values = Object.keys(this.dialects), flags = values.map(() => false);
        if (dialect)
            for (let part of dialect.split(" ")) {
                let id = values.indexOf(part);
                if (id >= 0)
                    flags[id] = true;
            }
        let disabled = null;
        for (let i = 0; i < values.length; i++)
            if (!flags[i]) {
                for (let j = this.dialects[values[i]], id; (id = this.data[j++]) != 65535 /* Seq.End */;)
                    (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id] = 1;
            }
        return new Dialect(dialect, flags, disabled);
    }
    /// Used by the output of the parser generator. Not available to
    /// user code. @hide
    static deserialize(spec) {
        return new LRParser(spec);
    }
}
function pair(data, off) { return data[off] | (data[off + 1] << 16); }
function findFinished(stacks) {
    let best = null;
    for (let stack of stacks) {
        let stopped = stack.p.stoppedAt;
        if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) &&
            stack.p.parser.stateFlag(stack.state, 2 /* StateFlag.Accepting */) &&
            (!best || best.score < stack.score))
            best = stack;
    }
    return best;
}
function getSpecializer(spec) {
    if (spec.external) {
        let mask = spec.extend ? 1 /* Specialize.Extend */ : 0 /* Specialize.Specialize */;
        return (value, stack) => (spec.external(value, stack) << 1) | mask;
    }
    return spec.get;
}




/***/ })

};
;