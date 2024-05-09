"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Header_1 = require("./Header");
const components_1 = require("@react-email/components");
const Logo_1 = require("./Logo");
const EmailLayout = ({ children }) => {
    return (React.createElement(components_1.Html, { style: {
            fontSize: '20px',
            background: '#0C0D0E',
            color: '#E6E5E6',
        } },
        React.createElement(Header_1.Header, null),
        React.createElement(Logo_1.default, null),
        React.createElement(components_1.Section, { style: {
                padding: '0 24px 24px'
            } }, children)));
};
exports.default = EmailLayout;
//# sourceMappingURL=EmailLayout.js.map