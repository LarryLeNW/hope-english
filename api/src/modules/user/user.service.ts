import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUserInfo(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!user) throw new UnauthorizedException('Invalid credentials')
        return user
    }

    async *listRecipientsInBatches(pageSize = 100) {
        let lastId: string | undefined;
        const where = {
        };

        for (; ;) {
            const page = await this.prisma.user.findMany({
                where,
                select: { id: true, email: true, name: true },
                take: pageSize,
                ...(lastId ? { cursor: { id: lastId }, skip: 1 } : {}),
                orderBy: { id: 'asc' },
            });

            if (page.length === 0) break;
            yield page as Array<{ id: string; email: string; name?: string; locale?: string }>;

            lastId = page[page.length - 1].id;
            if (page.length < pageSize) break;
        }
    }


}
