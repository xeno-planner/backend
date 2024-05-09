"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const components_1 = require("@react-email/components");
const MyButton = ({ url, children, style, ...props }) => {
    return (React.createElement(components_1.Button, { href: url, style: {
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: '1em',
            padding: '1em 1.5em',
            borderRadius: '8px',
            background: '#6E51D7',
            color: '#E6E5E6',
            ...style
        }, ...props }, children));
};
exports.default = MyButton;
//# sourceMappingURL=MyButton.js.map