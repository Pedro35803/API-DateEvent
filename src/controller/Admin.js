const admin = require("../database/crud/admin");

module.exports = {
    async getAllAdmins(req, res, next) {
        const { adminType } = res.locals;

        if (adminType !== "superAdmin") {
            throw new Error("Unauthorized access");
        }

        const allAdmin = admin.getAll();
        res.json(allAdmin);
    },

    async getAdminById(req, res, next) {
        const { adminId, adminType } = res.locals;
        const { id } = req.params;

        if (adminId !== id && adminType !== "superAdmin") {
            throw new Error("Unauthorized access");
        }

        const record = admin.getById(id);
        res.json(record);
    },

    async create(req, res, next) {
        const { adminType } = res.locals;

        if (adminType !== "superAdmin") {
            throw new Error("Unauthorized access");
        }

        const response = admin.create(...req.body);
        res.status(201).json(response);
    },

    async update(req, res, next) {
        const { id } = req.body;

        if (adminId !== id && adminType !== "superAdmin") {
            throw new Error("Unauthorized access");
        }

        const response = await admin.update(...req.body, id);
        res.status(203).json(response);
    },

    async destroy(req, res, next) {
        const { id } = req.body;
        
        if (adminId !== id && adminType !== "superAdmin") {
            throw new Error("Unauthorized access");
        }

        const response = await admin.destroy(id);
        res.status(204).json(response);
    },
};
