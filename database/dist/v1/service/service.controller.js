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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const rxjs_1 = require("rxjs");
let ServiceController = class ServiceController {
    constructor(sub, not, tem) {
        this.sub = sub;
        this.not = not;
        this.tem = tem;
    }
    getSuscriptor(ids, kind) {
        const subs = this.sub.find({ where: { userId: (0, typeorm_2.In)(ids), kind } });
        return (0, rxjs_1.from)(subs).pipe((0, rxjs_1.map)((list) => list.map(({ endPoint, id }) => ({ endPoint, id }))));
    }
    addTemplate(kind, name, content) {
        const template = this.tem.create({ kind, name, content });
        return (0, rxjs_1.from)(this.tem.save(template));
    }
    CreateNotification({ ids, kind, content, name }) {
        return (0, rxjs_1.zip)(this.getSuscriptor(ids, kind), this.addTemplate(kind, name, content)).pipe((0, rxjs_1.mergeMap)(([subs, template]) => (0, rxjs_1.iif)(() => subs.length !== ids.length, (0, rxjs_1.of)({ state: `ERROR` }), (0, rxjs_1.forkJoin)(subs.map((subscriptor) => (0, rxjs_1.of)(this.not.insert({ subscriptor, template })))).pipe((0, rxjs_1.map)(() => ({ state: 'OK' }))))));
    }
    async Hello({ state }) {
        console.log('Hello');
        return { state };
    }
};
__decorate([
    (0, microservices_1.GrpcMethod)('DatabaseService'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "CreateNotification", null);
__decorate([
    (0, microservices_1.GrpcMethod)('DatabaseService'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "Hello", null);
ServiceController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Subscriptor)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Notification)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Template)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ServiceController);
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map