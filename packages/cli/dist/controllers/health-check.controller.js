"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const config_1 = require("@n8n/config");
const db_1 = require("@n8n/db");
const decorators_1 = require("@n8n/decorators");
const constants_1 = require("../constants");
let HealthCheckController = class HealthCheckController {
    constructor(globalConfig, dbConnection) {
        this.globalConfig = globalConfig;
        this.dbConnection = dbConnection;
        this.startTime = Date.now();
    }
    getHealth() {
        const { connected, migrated } = this.dbConnection.connectionState;
        const isHealthy = connected && migrated;
        return {
            status: isHealthy ? 'ok' : 'degraded',
            version: constants_1.N8N_VERSION,
            uptime: Math.floor((Date.now() - this.startTime) / 1000),
            timestamp: new Date().toISOString(),
            database: {
                connected,
                migrated,
                type: this.globalConfig.database.type,
            },
        };
    }
};
exports.HealthCheckController = HealthCheckController;
__decorate([
    (0, decorators_1.Get)('/', { skipAuth: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthCheckController.prototype, "getHealth", null);
exports.HealthCheckController = HealthCheckController = __decorate([
    (0, decorators_1.RestController)('/health'),
    __metadata("design:paramtypes", [config_1.GlobalConfig,
        db_1.DbConnection])
], HealthCheckController);
//# sourceMappingURL=health-check.controller.js.map