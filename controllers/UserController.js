const Directory = require("../model/Directory");
const User = require("../model/User");
const Contact = require("../model/Contact");
const ContactItem = require("../model/ContactItem");

const getAllUsers = async (req, res, next) => {
    let allUsers;
    try {
        allUsers = await User.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    return res.json({ data: allUsers });
};

const addDirectoryForUser = async (req, res, next) => {
    const userEmail = req?.params?.email ? req?.params?.email : req.user.email;
    const { directoryId } = req.body;

    let authUser;
    let locatedDir;
    try {
        authUser = await User.findOne({ email: userEmail });
        locatedDir = await Directory.findById(directoryId);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (!authUser || !locatedDir)
        return res.status(500).json({ message: "User or Directory not found" });

    let updated;
    try {
        authUser.userMeta.push(directoryId);
        updated = await authUser.save();
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    return res
        .status(200)
        .json({ message: "Directory added successfully", data: updated });
};

const getUserMeta = async (req, res, next) => {
    const userEmail = req?.params?.email ? req?.params?.email : req.user.email;
    let authUser;
    try {
        authUser = await User.findOne({ email: userEmail })
            .populate({
                path: "userMeta",
                populate: {
                    path: "sections",
                    model: "Directory",
                    populate: { path: "sections", model: "Directory" },
                    populate: { path: "files", model: "File" },
                },
            })
            .populate({
                path: "userMeta",
                populate: { path: "files", model: "File" },
            });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    return res.json({ data: authUser.userMeta });
};

const createContact = async (req, res, next) => {
    const { title } = req?.body;
    if (!title) return res.status(500).json({ message: "No title given" });
    let newConact;
    try {
        newConact = await Contact.create({ title });
    } catch (err) {
        return res.status(500).json({ message: "Unable to create contact" });
    }
    if (!newConact) {
        return res.status(500).json({ message: "Unable to create contact" });
    }
    return res
        .status(200)
        .json({ message: "Contact created successfully", data: newConact });
};

const createContactItem = async (req, res, next) => {
    const { title, href } = req?.body;
    if (!title) return res.status(500).json({ message: "No title given" });
    let newConactItem;
    try {
        newConactItem = await ContactItem.create({ title, href });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Unable to create contact item" });
    }
    if (!newConactItem) {
        return res
            .status(500)
            .json({ message: "Unable to create contact item" });
    }
    return res.status(200).json({
        message: "Contact item created successfully",
        data: newConactItem,
    });
};

const addContactItemToContact = async (req, res, next) => {
    const { contactItemId, contactId } = req?.body;
    let locatedContact;
    let locatedContactItem;
    try {
        locatedContact = await Contact.findById(contactId);
        locatedContactItem = await ContactItem.findById(contactItemId);
    } catch (err) {
        return res.status(500);
    }
    if (!locatedContact || !locatedContactItem)
        return res
            .status(500)
            .json({ message: "Contact or Contact item not found" });
    locatedContact.items.push(locatedContactItem);
    let updatedContact;
    try {
        updatedContact = await locatedContact.save();
    } catch (err) {
        return res.status(500).json({ message: "Unable to add contact item" });
    }
    if (!updatedContact)
        return res.status(500).json({ message: "Unable to add contact item" });
    return res.status(200).json({
        message: "Item added successfully to contact",
        data: updatedContact,
    });
};

const addContactDataForUser = async (req, res, next) => {
    const userEmail = req?.params?.email
        ? req?.params?.email
        : req?.user?.email;
    const { contactId } = req?.body;
    let locatedUser;
    let locatedContact;
    try {
        locatedUser = await User.findOne({ email: userEmail });
        locatedContact = await Contact.findById(contactId);
    } catch (err) {
        return res.status(500);
    }
    if (!locatedUser || !locatedContact)
        return res.status(500).json({ message: "User or Contact not found" });
    locatedUser.contactData.push(locatedContact);
    let updatedUser;
    try {
        updatedUser = await locatedUser.save();
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Unable to save Contact for user" });
    }
    if (!updatedUser)
        return res
            .status(500)
            .json({ message: "Unable to save Contact for user" });
    return res.status(200).json({
        message: "Contact saved successfully for user",
        data: updatedUser,
    });
};

const getUserContactData = async (req, res, next) => {
    const userEmail = req?.params?.email ? req?.params?.email : req.user.email;
    let authUser;
    try {
        authUser = await User.findOne({ email: userEmail }).populate({
            path: "contactData",
            populate: {
                path: "items",
                model: "ContactItem",
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    return res.json({ data: authUser.contactData });
};

const getUserContactDataByTitle = async (req, res, next) => {
    const userEmail = req?.params?.email ? req?.params?.email : req.user.email;
    const contactType = req?.params?.type ? req?.params?.type : req.user.type;
    let contactData;
    try {
        let authUser;
        authUser = await User.findOne({ email: userEmail }).populate({
            path: "contactData",
            populate: {
                path: "items",
                model: "ContactItem",
            },
        });
        contactData = authUser.contactData.find(
            (contact) => contact.title === contactType
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    if (!contactData)
        return res.status(404).json({ message: "User or Contact not found" });
    return res.json({ data: contactData });
};

module.exports = {
    getAllUsers,
    addDirectoryForUser,
    getUserMeta,
    createContact,
    createContactItem,
    addContactItemToContact,
    addContactDataForUser,
    getUserContactData,
    getUserContactDataByTitle,
};
