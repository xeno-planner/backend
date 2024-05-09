"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MyButton_1 = require("./components/MyButton");
const EmailLayout_1 = require("./components/EmailLayout");
const components_1 = require("@react-email/components");
const VerificationTemplate = ({ url }) => {
    return (React.createElement(EmailLayout_1.default, null,
        React.createElement(components_1.Heading, { as: 'h2' }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 XENO Planner"),
        React.createElement(components_1.Section, null,
            React.createElement(MyButton_1.default, { url: url }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E"))));
};
exports.default = VerificationTemplate;
//# sourceMappingURL=Verification.template.js.map