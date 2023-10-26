const express = require("express");
const JwtAuth = require("../middlewares/JwtAuth");
const router = express.Router();
const jsonBodyParser = require("body-parser").json();
const SystemController = require("../controllers/SystemController");
const UserController = require("../controllers/UserController");

router.get("/code/:id", jsonBodyParser, SystemController.getCodeSnippet);

router.post(
    "/code/create",
    jsonBodyParser,
    JwtAuth.verifyToken,
    SystemController.createCodeSnippet
);
router.post(
    "/file/create",
    jsonBodyParser,
    JwtAuth.verifyToken,
    SystemController.createFile
);
router.post(
    "/dir/create",
    jsonBodyParser,
    JwtAuth.verifyToken,
    SystemController.createDirectory
);
router.post(
    "/dir/add-file",
    jsonBodyParser,
    JwtAuth.verifyToken,
    SystemController.addFileToDirectory
);
router.post(
    "/dir/add-section",
    jsonBodyParser,
    JwtAuth.verifyToken,
    SystemController.addSectionToDirectory
);
router.post(
    "/file/add-code",
    jsonBodyParser,
    JwtAuth.verifyToken,
    SystemController.addCodeToFile
);
router.post(
    "/contact/create",
    jsonBodyParser,
    JwtAuth.verifyToken,
    UserController.createContact
);
router.post(
    "/contact-item/create",
    jsonBodyParser,
    JwtAuth.verifyToken,
    UserController.createContactItem
);
router.post(
    "/contact/add-item",
    jsonBodyParser,
    JwtAuth.verifyToken,
    UserController.addContactItemToContact
);
router.post(
    "/add-contact",
    jsonBodyParser,
    JwtAuth.verifyToken,
    UserController.addContactDataForUser
);
router.post(
    "/add-contact/:email",
    jsonBodyParser,
    JwtAuth.verifyToken,
    UserController.addContactDataForUser
);
router.get(
    "/contacts",
    jsonBodyParser,
    JwtAuth.verifyToken,
    UserController.getUserContactData
);
router.get("/contacts/:email/:type", UserController.getUserContactDataByTitle);
router.get(
    "/contacts/:email",
    jsonBodyParser,
    UserController.getUserContactData
);

module.exports = router;
