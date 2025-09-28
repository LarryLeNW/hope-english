import * as path from 'node:path';

export interface EventInviteVars {
    name: string;
    event: {
        title: string;
        startsAt: string | Date;
        location?: string;
    };
    locale?: 'vi' | 'en';
}

export type TemplateName = 'event-invite';

export interface TemplateSpec<TVars = any> {
    name: TemplateName;
    dir: string;
    validate?: (vars: any) => asserts vars is TVars;
}

const EMAIL_MODULES_DIR = "src/modules/email/templates"

export const TEMPLATE_REGISTRY: Record<TemplateName, TemplateSpec> = {
    'event-invite': {
        name: 'event-invite',
        dir: path.join(process.cwd(), `${EMAIL_MODULES_DIR}/event-invite`),
        validate: (vars): asserts vars is EventInviteVars => {
            if (typeof vars.name !== 'string') throw new Error('Invalid name');
            if (typeof vars.event !== 'object') throw new Error('Invalid event');
            if (typeof vars.event.title !== 'string') throw new Error('Invalid event title');
        },
    },
};
