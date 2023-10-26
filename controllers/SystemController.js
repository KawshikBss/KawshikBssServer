const CodeSnippet = require("../model/CodeSnippet");
const Directory = require("../model/Directory");
const FileModel = require("../model/File");

const getCodeSnippet = async (req, res, next) => {
    const codeId = req?.params?.id ? req?.params?.id : req.user.id;
    let codeSnippet;
    try {
        codeSnippet = await CodeSnippet.findById(codeId);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (codeSnippet) return res.status(200).json({ data: codeSnippet });
    return res.status(500).json({ message: "Code not found" });
};

const createCodeSnippet = async (req, res, next) => {
    const { codeType, lines } = req.body;
    let newCode;
    try {
        newCode = await CodeSnippet.create({
            codeType,
            lines,
        });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (newCode)
        return res
            .status(201)
            .json({ data: newCode, message: "Code created successfully" });
};

const createFile = async (req, res, next) => {
    const { contentType, label, title, href } = req.body;
    let newCode;
    try {
        newCode = await FileModel.create({
            contentType,
            label,
            title,
            href,
        });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (newCode)
        return res
            .status(201)
            .json({ data: newCode, message: "File created successfully" });
};

const createDirectory = async (req, res, next) => {
    const { title } = req.body;
    let newDir;
    try {
        newDir = await Directory.create({
            title,
        });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (newDir)
        return res
            .status(201)
            .json({ message: "Directory created successfully", data: newDir });
};

const addFileToDirectory = async (req, res, next) => {
    const { directoryId, fileId } = req.body;
    let locatedDir;
    let locatedFile;
    try {
        locatedDir = await Directory.findById(directoryId);
        locatedFile = await FileModel.findById(fileId);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (!locatedDir || !locatedFile)
        return res.status(500).json({ message: "Directory or File not found" });
    let updatedDir;
    try {
        locatedDir.files.push(fileId);
        updatedDir = await locatedDir.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    if (updatedDir)
        return res.status(200).json({
            message: "File added to Directory successfully",
            data: updatedDir,
        });
};

const addSectionToDirectory = async (req, res, next) => {
    const { parentDirectoryId, childDirectoryId } = req.body;
    let locatedParent;
    let locatedChild;
    try {
        locatedParent = await Directory.findById(parentDirectoryId);
        locatedChild = await Directory.findById(childDirectoryId);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (!locatedParent || !locatedChild) {
        return res.status(500).json({ message: "Directory or File not found" });
    }
    let updatedDir;
    try {
        locatedParent.sections.push(childDirectoryId);
        updatedDir = await locatedParent.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err });
    }
    if (updatedDir)
        return res.status(200).json({
            message: "Section added to Directory successfully",
            data: updatedDir,
        });
};

const addCodeToFile = async (req, res, next) => {
    const { fileId, codeId } = req.body;
    let locatedFile;
    let locatedCode;
    try {
        locatedFile = await FileModel.findById(fileId);
        locatedCode = await CodeSnippet.findById(codeId);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (!locatedFile || !locatedCode)
        return res
            .status(500)
            .json({ message: "Either File or Code Snippet not found" });
    let updatedFile;
    try {
        locatedFile.code = locatedCode;
        updatedFile = await locatedFile.save();
    } catch (err) {
        return res.status(500).json({ message: err });
    }
    if (updatedFile)
        return res.json({
            message: "Code added to file successfully",
            data: updatedFile,
        });
    return res
        .status(500)
        .json({ message: "Unexpected error occurred while adding code" });
};

module.exports = {
    getCodeSnippet,
    createCodeSnippet,
    createFile,
    createDirectory,
    addFileToDirectory,
    addSectionToDirectory,
    addCodeToFile,
};
