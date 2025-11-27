import { Prisma } from '@prisma/client';

export async function paginate<T>(
  prismaModel: {
    findMany: (args: Prisma.UserFindManyArgs) => Promise<T[]>;
    count: (args?: Prisma.UserCountArgs) => Promise<number>;
  },
  options: {
    page?: number;
    limit?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    select?: Object;
    include?: Object;
  },
) {
  const pageNumber = options.page || 1;
  const pageSize = options.limit || 10;

  const skip = (pageNumber - 1) * pageSize;

  const [items, total] = await Promise.all([
    prismaModel.findMany({
      skip,
      take: pageSize,
      where: options.where,
      orderBy: options.orderBy,
      select: options.select,
      include: options.include,
    }),
    prismaModel.count({ where: options.where }),
  ]);

  return {
    pagination: {
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
    data: items,
  };
}
