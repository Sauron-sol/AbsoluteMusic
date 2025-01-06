"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTranscriptionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_transcription_dto_1 = require("./create-transcription.dto");
class UpdateTranscriptionDto extends (0, mapped_types_1.PartialType)(create_transcription_dto_1.CreateTranscriptionDto) {
}
exports.UpdateTranscriptionDto = UpdateTranscriptionDto;
//# sourceMappingURL=update-transcription.dto.js.map