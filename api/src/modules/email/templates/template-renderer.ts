import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import Handlebars from 'handlebars';
import { registerHbsHelpers } from 'helpers/email';
import { TEMPLATE_REGISTRY, TemplateName } from 'modules/email/templates/template-registry';

type Compiled = Handlebars.TemplateDelegate;

export class TemplateRenderer {
    private compiled = new Map<string, Compiled>();
    private partialsLoaded = false;
    private EMAIL_MODULES_DIR = "src/modules/email/templates"

    constructor(
        private root = path.join(process.cwd(), this.EMAIL_MODULES_DIR),
    ) {
        registerHbsHelpers();
    }

    private async loadPartialsOnce() {
        if (this.partialsLoaded) return;
        const partialDir = path.join(this.root, '_partials');
        try {
            const files = await fs.readdir(partialDir);
            await Promise.all(files.map(async (f) => {
                const src = await fs.readFile(path.join(partialDir, f), 'utf8');
                Handlebars.registerPartial(path.parse(f).name, src);
            }));
        } catch (err) {
            console.error('Error loading partials:', err);
        }
        this.partialsLoaded = true;
    }

    private async compile(key: string, file: string) {
        if (this.compiled.has(key)) return this.compiled.get(key)!;
        const src = await fs.readFile(file, 'utf8');
        const tpl = Handlebars.compile(src, { noEscape: true });
        this.compiled.set(key, tpl);
        return tpl;
    }

    private async wrapWithLayout(htmlBody: string) {
        const base = path.join(this.root, '_layouts', 'base.hbs');
        try {
            const baseTpl = await this.compile('_layout:base', base);
            return baseTpl({ body: htmlBody });
        } catch {
            return htmlBody;
        }
    }

    async render(template: TemplateName, vars: Record<string, any>) {
        await this.loadPartialsOnce();

        const spec = TEMPLATE_REGISTRY[template];
        if (!spec) throw new Error(`Unknown template: ${template}`);
        spec.validate?.(vars);

        const [subjectTpl, htmlTpl, textTpl] = await Promise.all([
            this.compile(`${template}:subject`, path.join(spec.dir, 'subject.hbs')),
            this.compile(`${template}:html`, path.join(spec.dir, 'html.hbs')),
            this.compile(`${template}:text`, path.join(spec.dir, 'text.hbs')),
        ]);

        const subject = subjectTpl(vars);
        const htmlBody = htmlTpl(vars);
        const html = await this.wrapWithLayout(htmlBody);
        const text = textTpl(vars);

        return { subject, html, text };
    }
}
