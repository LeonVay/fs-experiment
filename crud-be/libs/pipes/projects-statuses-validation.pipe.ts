import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ProjectsStatus } from "@backend/projects";


export class ProjectsStatusesValidationPipe implements PipeTransform {
    readonly availableStatuses = [
        ProjectsStatus.OPEN,
        ProjectsStatus.IN_PROGRESS,
        ProjectsStatus.ON_HOLD,
        ProjectsStatus.CLOSED
    ];
    
    transform(value: any) {
        if (!this.isStatusAvailable(value)) {
            throw new BadRequestException(`Wrong project status: ${value}`);
        }

        return value;
    }

    isStatusAvailable(value: any) {
        let indx = this.availableStatuses.indexOf(value);

        return indx !== -1;
    }
}