// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("customer")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("agent")
        .extend("customer")
        .readAny("profile")

    ac.grant("admin")
        .extend("customer")
        .extend("agent")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;
})();