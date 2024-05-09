"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const React = require("react");
const components_1 = require("@react-email/components");
const Header = () => {
    return (React.createElement(components_1.Head, null,
        React.createElement(components_1.Font, { fontFamily: 'Geologica', fallbackFontFamily: 'sans-serif', webFont: {
                url: 'https://cdn.jsdelivr.net/fontsource/fonts/geologica:vf@latest/latin-wght-normal.woff2',
                format: 'woff2'
            }, fontWeight: 400, fontStyle: 'normal' })));
};
exports.Header = Header;
//# sourceMappingURL=Header.js.map